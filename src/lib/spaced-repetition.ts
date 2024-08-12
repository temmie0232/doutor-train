import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { Product, productData } from '@/data/productData';

const db = getFirestore();

interface LearningHistoryItem {
    date: Date | Timestamp;
    score: number;
}

interface CardData {
    productId: string;
    easeFactor: number;
    interval: number;
    dueDate: Date | Timestamp;
    isNew: boolean;
    learningHistory: LearningHistoryItem[];
}

interface UserProgress {
    cards: { [productId: string]: CardData };
    lastStudyDate: Date | Timestamp;
    newCardCount: {
        hot: number;
        ice: number;
        food: number;
    };
    totalCardCount: {
        hot: number;
        ice: number;
        food: number;
    };
}

function convertFirestoreTimestampToDate(timestamp: Date | Timestamp): Date {
    if (timestamp instanceof Timestamp) {
        return timestamp.toDate();
    }
    return timestamp;
}

export async function getUserProgress(userId: string): Promise<UserProgress> {
    const userDoc = await getDoc(doc(db, 'userProgress', userId));
    const data = userDoc.data() as UserProgress | undefined;

    if (!data || Object.keys(data.cards).length === 0) {
        // 初期状態：すべての商品を今日の日付で初期化
        const initialCards: { [productId: string]: CardData } = {};
        productData.forEach(product => {
            initialCards[product.name] = {
                productId: product.name,
                easeFactor: 2.5,
                interval: 0,
                dueDate: new Date(),
                isNew: true,
                learningHistory: []
            };
        });
        const initialProgress: UserProgress = {
            cards: initialCards,
            lastStudyDate: new Date(),
            newCardCount: {
                hot: 0,
                ice: 0,
                food: 0
            },
            totalCardCount: {
                hot: 0,
                ice: 0,
                food: 0
            }
        };
        await setDoc(doc(db, 'userProgress', userId), initialProgress);
        return initialProgress;
    }

    // Firestore のタイムスタンプを Date オブジェクトに変換
    const convertedData: UserProgress = {
        ...data,
        lastStudyDate: convertFirestoreTimestampToDate(data.lastStudyDate),
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

    return convertedData;
}

export async function updateUserProgress(userId: string, productId: string, quality: number, category: 'hot' | 'ice' | 'food'): Promise<void> {
    const userProgress = await getUserProgress(userId);
    const card = userProgress.cards[productId] || {
        productId,
        easeFactor: 2.5,
        interval: 0,
        dueDate: new Date(),
        isNew: true,
        learningHistory: []
    };

    // Update interval based on quality
    switch (quality) {
        case 1:
            card.interval = 0;
            break;
        case 2:
            card.interval = Math.max(1, Math.floor(card.interval * 0.5));
            break;
        case 3:
            if (card.interval === 0) {
                card.interval = 1;
            } else if (card.interval === 1) {
                card.interval = 3;
            } else {
                card.interval = Math.round(card.interval * card.easeFactor);
            }
            break;
        case 4:
            if (card.interval === 0) {
                card.interval = 2;
            } else if (card.interval === 1) {
                card.interval = 4;
            } else {
                card.interval = Math.round(card.interval * card.easeFactor * 1.2);
            }
            break;
    }

    // Update ease factor
    const easeDelta = 0.1 - (4 - quality) * (0.08 + (4 - quality) * 0.02);
    card.easeFactor = Math.max(1.3, Math.min(2.5, card.easeFactor + easeDelta));

    // Update due date
    card.dueDate = new Date(Date.now() + card.interval * 24 * 60 * 60 * 1000);
    card.isNew = false;

    // Add new learning history item
    card.learningHistory.push({
        date: new Date(),
        score: quality * 25 // Convert quality (1-4) to a score (25-100)
    });

    userProgress.cards[productId] = card;

    // Update new card count and total card count
    const today = new Date();
    const lastStudyDate = convertFirestoreTimestampToDate(userProgress.lastStudyDate);
    if (today.toDateString() !== lastStudyDate.toDateString()) {
        userProgress.lastStudyDate = today;
        userProgress.newCardCount = { hot: 0, ice: 0, food: 0 };
        userProgress.totalCardCount = { hot: 0, ice: 0, food: 0 };
    }

    if (card.isNew) {
        userProgress.newCardCount[category]++;
    }
    userProgress.totalCardCount[category]++;

    // Update Firestore
    await setDoc(doc(db, 'userProgress', userId), {
        ...userProgress,
        lastStudyDate: Timestamp.fromDate(convertFirestoreTimestampToDate(userProgress.lastStudyDate)),
        cards: Object.entries(userProgress.cards).reduce((acc, [key, card]) => {
            acc[key] = {
                ...card,
                dueDate: Timestamp.fromDate(convertFirestoreTimestampToDate(card.dueDate)),
                learningHistory: card.learningHistory.map(item => ({
                    date: Timestamp.fromDate(convertFirestoreTimestampToDate(item.date)),
                    score: item.score
                }))
            };
            return acc;
        }, {} as { [productId: string]: CardData })
    });
}

export function getNextDueCard(userProgress: UserProgress, filteredProducts: Product[], category: 'hot' | 'ice' | 'food'): { productId: string | null; updatedNewCardCount: number; updatedTotalCardCount: number } {
    const now = new Date();
    const dueCards = Object.values(userProgress.cards)
        .filter(card => filteredProducts.some(p => p.name === card.productId && p.category === category))
        .filter(card => convertFirestoreTimestampToDate(card.dueDate) <= now || card.isNew);

    let newCardCount = userProgress.newCardCount[category];
    let totalCardCount = userProgress.totalCardCount[category];

    // 総カード数が6に達した場合、nullを返す
    if (totalCardCount >= 6) {
        return { productId: null, updatedNewCardCount: newCardCount, updatedTotalCardCount: totalCardCount };
    }

    // 新規カードと復習カードを分離
    const newCards = dueCards.filter(card => card.isNew);
    const reviewCards = dueCards.filter(card => !card.isNew);

    // 新規カードの数が6未満の場合、新規カードを優先
    if (newCardCount < 6 && newCards.length > 0) {
        newCardCount++;
        totalCardCount++;
        return { productId: newCards[0].productId, updatedNewCardCount: newCardCount, updatedTotalCardCount: totalCardCount };
    }

    // 復習カードがある場合、最も早い期日のカードを返す
    if (reviewCards.length > 0) {
        totalCardCount++;
        return {
            productId: reviewCards.reduce((a, b) =>
                convertFirestoreTimestampToDate(a.dueDate) < convertFirestoreTimestampToDate(b.dueDate) ? a : b
            ).productId,
            updatedNewCardCount: newCardCount,
            updatedTotalCardCount: totalCardCount
        };
    }

    // 新規カードの制限に達した場合や復習カードがない場合はnullを返す
    return { productId: null, updatedNewCardCount: newCardCount, updatedTotalCardCount: totalCardCount };
}