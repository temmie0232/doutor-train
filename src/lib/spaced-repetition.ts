import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, Timestamp, runTransaction } from 'firebase/firestore';
import { Product, productData } from '@/data/productData';
import { CardData, UserProgress } from '@/types/types';

const db = getFirestore();

function initializeQueues(userProgress: UserProgress, allProducts: Product[]): UserProgress {
    console.log("Starting initializeQueues function");
    console.log("Current userProgress:", JSON.stringify(userProgress, null, 2));

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    console.log("Today's date:", today);

    let shouldInitialize = false;

    if (!userProgress.lastQueueInitDate) {
        console.log("No lastQueueInitDate found. Initializing queues.");
        shouldInitialize = true;
    } else {
        const lastInitDate = convertToDate(userProgress.lastQueueInitDate);
        console.log("Last queue init date:", lastInitDate);
        if (today > lastInitDate) {
            console.log("Today is after last queue init date. Should initialize.");
            shouldInitialize = true;
        } else {
            console.log("Queues already initialized today. Not reinitializing.");
        }
    }

    if (shouldInitialize) {
        console.log("Initializing queues");

        // 新規キューの初期化（既存のキューを保持）
        const existingNewCards = userProgress.newQueue.filter(id => userProgress.cards[id]?.isNew);
        const newCards = allProducts.filter(p => !userProgress.cards[p.productID] || (userProgress.cards[p.productID].isNew && !existingNewCards.includes(p.productID.toString())));
        const shuffledNewCards = shuffleArray(newCards.map(p => p.productID.toString()));
        userProgress.newQueue = [...existingNewCards, ...shuffledNewCards].slice(0, 6);

        console.log("New cards in queue:", userProgress.newQueue);

        // 復習キューの初期化（既存のキューを保持）
        const existingReviewCards = userProgress.reviewQueue.filter(id => !userProgress.cards[id]?.isNew);
        const dueReviewCards = Object.entries(userProgress.cards || {})
            .filter(([id, card]) => !card.isNew && (!card.dueDate || convertToDate(card.dueDate) <= today) && !existingReviewCards.includes(id))
            .map(([id, _]) => id);
        const shuffledDueReviewCards = shuffleArray(dueReviewCards);
        userProgress.reviewQueue = [...existingReviewCards, ...shuffledDueReviewCards].slice(0, 12);

        console.log("Review cards in queue:", userProgress.reviewQueue);

        userProgress.lastQueueInitDate = Timestamp.fromDate(today);
    }

    if (!userProgress.newQueue) userProgress.newQueue = [];
    if (!userProgress.reviewQueue) userProgress.reviewQueue = [];

    console.log("Final userProgress:", JSON.stringify(userProgress, null, 2));
    return userProgress;
}

export async function initializeUserProgress(userId: string): Promise<void> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);  // 前日の0:00に設定

    const initialUserProgress: UserProgress = {
        cards: {},
        lastStudyDate: Timestamp.fromDate(yesterday),
        lastQueueInitDate: Timestamp.fromDate(yesterday), // 新しく追加
        newQueue: [],
        reviewQueue: []
    };

    // すべての製品に対して初期カードデータを作成
    productData.forEach(product => {
        initialUserProgress.cards[product.productID] = {
            productId: product.productID.toString(),
            easeFactor: 2.5,
            interval: 0,
            dueDate: Timestamp.fromDate(new Date()),
            isNew: true,
            correctCount: 0,
            learningHistory: []
        };
    });

    // Firestoreにデータを保存
    const userProgressRef = doc(db, 'userProgress', userId);
    await setDoc(userProgressRef, initialUserProgress);
}

function convertFirestoreTimestampToDate(timestamp: Date | Timestamp): Date {
    if (timestamp instanceof Timestamp) {
        return timestamp.toDate();
    }
    return new Date(timestamp);
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getNextCard(userProgress: UserProgress): string | null {
    if (userProgress.newQueue.length > 0) {
        return userProgress.newQueue[0];
    } else if (userProgress.reviewQueue.length > 0) {
        return userProgress.reviewQueue[0];
    }
    return null;
}

function processCardAfterAnswer(userProgress: UserProgress, productId: string, score: number): UserProgress {
    const card = userProgress.cards[productId];

    if (card.isNew) {
        if (score === 100) {
            card.correctCount++;
            if (card.correctCount >= 2) {
                card.isNew = false;
                // 新規キューから削除
                userProgress.newQueue = userProgress.newQueue.filter(id => id !== productId);
                // 復習キューに追加（最大12個まで）
                if (userProgress.reviewQueue.length < 12) {
                    userProgress.reviewQueue.push(productId);
                }
            }
        }
        // スコアに関わらず、新規キューの末尾に移動（ただし、復習カードに移行した場合を除く）
        if (card.isNew) {
            userProgress.newQueue = userProgress.newQueue.filter(id => id !== productId);
            if (userProgress.newQueue.length < 6) {
                userProgress.newQueue.push(productId);
            }
        }
    } else {
        // 復習カードの場合、復習キューの末尾に移動
        userProgress.reviewQueue = userProgress.reviewQueue.filter(id => id !== productId);
        if (userProgress.reviewQueue.length < 12) {
            userProgress.reviewQueue.push(productId);
        }
    }

    // カードのプロパティを更新
    const quality = Math.min(5, Math.max(0, Math.floor(score / 20)));
    card.easeFactor = Math.max(1.3, card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

    if (quality >= 3) {
        if (card.interval === 0) {
            card.interval = 1;
        } else if (card.interval === 1) {
            card.interval = 6;
        } else {
            card.interval = Math.round(card.interval * card.easeFactor);
        }
    } else {
        card.interval = 1;
    }

    card.dueDate = new Date(Date.now() + card.interval * 24 * 60 * 60 * 1000);

    // 学習履歴を更新
    card.learningHistory.push({
        date: new Date(),
        score: score
    });

    return userProgress;
}

function updateReviewCardDueDate(userProgress: UserProgress, productId: string, newDueDate: Date): UserProgress {
    userProgress.cards[productId].dueDate = newDueDate;
    userProgress.reviewQueue = userProgress.reviewQueue.filter(id => id !== productId);
    return userProgress;
}

export async function getUserProgress(userId: string): Promise<UserProgress> {
    const userDoc = await getDoc(doc(db, 'userProgress', userId));
    let data = userDoc.data() as UserProgress | undefined;

    if (!data || Object.keys(data.cards).length === 0) {
        // 初期状態の設定
        data = {
            cards: {},
            lastStudyDate: new Date(),
            lastQueueInitDate: new Date(0), // 1970年1月1日に設定
            newQueue: [],
            reviewQueue: []
        };
        productData.forEach(product => {
            data!.cards[product.productID] = {
                productId: product.productID.toString(),
                easeFactor: 2.5,
                interval: 0,
                dueDate: new Date(),
                isNew: true,
                correctCount: 0,
                learningHistory: []
            };
        });
    }

    // キューの初期化（既存のキューを保持）
    data = initializeQueues(data, productData);

    // FirestoreのタイムスタンプをDateオブジェクトに変換
    const convertedData: UserProgress = {
        ...data,
        lastStudyDate: convertFirestoreTimestampToDate(data.lastStudyDate),
        lastQueueInitDate: convertFirestoreTimestampToDate(data.lastQueueInitDate),
        cards: Object.entries(data.cards).reduce((acc, [key, card]) => {
            acc[key] = {
                ...card,
                dueDate: convertFirestoreTimestampToDate(card.dueDate),
                learningHistory: card.learningHistory.map(item => ({
                    date: convertFirestoreTimestampToDate(item.date),
                    score: item.score
                }))
            };
            return acc;
        }, {} as { [productId: string]: CardData })
    };

    // 変換後のデータをFirestoreに保存
    await setDoc(doc(db, 'userProgress', userId), convertedData);

    return convertedData;
}

export async function updateUserProgress(userId: string, productId: string, score: number): Promise<void> {
    const userProgressRef = doc(db, 'userProgress', userId);

    await runTransaction(db, async (transaction) => {
        const userProgressDoc = await transaction.get(userProgressRef);
        let userProgress = userProgressDoc.data() as UserProgress;

        userProgress = processCardAfterAnswer(userProgress, productId, score);

        const card = userProgress.cards[productId];
        card.learningHistory.push({
            date: new Date(),
            score: score
        });

        // キューの状態を更新
        if (card.isNew) {
            if (score === 100 && card.correctCount >= 2) {
                userProgress.newQueue = userProgress.newQueue.filter(id => id !== productId);
                if (userProgress.reviewQueue.length < 12) {
                    userProgress.reviewQueue.push(productId);
                }
            } else {
                // 新規キューの末尾に移動
                userProgress.newQueue = userProgress.newQueue.filter(id => id !== productId);
                if (userProgress.newQueue.length < 6) {
                    userProgress.newQueue.push(productId);
                }
            }
        } else {
            // 復習キューから削除
            userProgress.reviewQueue = userProgress.reviewQueue.filter(id => id !== productId);
        }

        transaction.set(userProgressRef, userProgress);
    });
}

export function getNextDueCard(userProgress: UserProgress): string | null {
    return getNextCard(userProgress);
}

function updateCardDueDate(userProgress: UserProgress, productId: string, rating: number): UserProgress {
    const card = userProgress.cards[productId];
    if (!card) return userProgress;

    const oldDueDate = convertToDate(card.dueDate);

    // SMモデルを使用して次の期日を計算
    let interval: number;
    switch (rating) {
        case 1: // 完全に忘れていた
            interval = 1;
            break;
        case 2: // 思い出すのに苦労した
            interval = Math.max(1, Math.floor(card.interval * 0.5));
            break;
        case 3: // 少し努力して思い出した
            interval = card.interval * card.easeFactor;
            break;
        case 4: // 完璧に覚えていた
            interval = card.interval * card.easeFactor * 1.3;
            break;
        default:
            interval = card.interval;
    }

    // 新しい期日を設定
    const newDueDate = new Date();
    newDueDate.setDate(newDueDate.getDate() + Math.round(interval));
    card.dueDate = Timestamp.fromDate(newDueDate);
    card.interval = interval;

    // ease factorを更新
    if (rating > 1) {
        card.easeFactor += 0.1 - (4 - rating) * (0.08 + (4 - rating) * 0.02);
    }
    card.easeFactor = Math.max(1.3, card.easeFactor);

    // 復習キューから削除
    userProgress.reviewQueue = userProgress.reviewQueue.filter(id => id !== productId);

    // 新しい期日が今日より後の場合、復習キューから完全に削除
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newDueDate > today) {
        userProgress.reviewQueue = userProgress.reviewQueue.filter(id => id !== productId);
    } else {
        // 今日の日付以前の場合は、復習キューの末尾に追加（最大12個まで）
        if (userProgress.reviewQueue.length < 12) {
            userProgress.reviewQueue.push(productId);
        }
    }

    return userProgress;
}

// 日付変換のためのヘルパー関数
function convertToDate(dateOrTimestamp: Date | Timestamp): Date {
    if (dateOrTimestamp instanceof Timestamp) {
        return dateOrTimestamp.toDate();
    }
    return dateOrTimestamp;
}