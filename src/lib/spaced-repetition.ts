import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, Timestamp, runTransaction, serverTimestamp } from 'firebase/firestore';
import { Product, productData } from '@/data/productData';

const db = getFirestore();

const categories = ['hot', 'ice', 'food'] as const;
type Category = typeof categories[number];

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
    correctCount: number;
    learningHistory: LearningHistoryItem[];
}

export interface UserProgress {
    cards: { [productId: string]: CardData };
    lastStudyDate: Date | Timestamp;
    lastInitializationDate: Date | Timestamp;
    hotNewQueue: string[];
    hotReviewQueue: string[];
    iceNewQueue: string[];
    iceReviewQueue: string[];
    foodNewQueue: string[];
    foodReviewQueue: string[];
    hotNewCardsAddedToday: number;
    hotReviewCardsAddedToday: number;
    iceNewCardsAddedToday: number;
    iceReviewCardsAddedToday: number;
    foodNewCardsAddedToday: number;
    foodReviewCardsAddedToday: number;
    hotNewCardsRemovedQueueToday: number;
    hotReviewCardsRemovedQueueToday: number;
    iceNewCardsRemovedQueueToday: number;
    iceReviewCardsRemovedQueueToday: number;
    foodNewCardsRemovedQueueToday: number;
    foodReviewCardsRemovedQueueToday: number;
    [key: string]: any; // Add index signature
}

function convertToDate(dateOrTimestamp: Date | Timestamp): Date {
    if (dateOrTimestamp instanceof Timestamp) {
        return dateOrTimestamp.toDate();
    }
    return dateOrTimestamp;
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function initializeQueues(userProgress: UserProgress, allProducts: Product[]): UserProgress {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastInitDate = convertToDate(userProgress.lastInitializationDate);

    if (today > lastInitDate) {
        categories.forEach(category => {
            // Initialize new queue for each category
            const newCards = allProducts
                .filter(p => p.category === category && (!userProgress.cards[p.productID] || userProgress.cards[p.productID].isNew));
            const shuffledNewCards = shuffleArray(newCards.map(p => p.productID.toString()));
            const newQueueToAdd = shuffledNewCards.slice(0, 6);
            userProgress[`${category}NewQueue`] = newQueueToAdd;
            userProgress[`${category}NewCardsAddedToday`] = newQueueToAdd.length;

            // Initialize review queue for each category
            const dueReviewCards = Object.entries(userProgress.cards || {})
                .filter(([_, card]) => !card.isNew &&
                    (!card.dueDate || convertToDate(card.dueDate) <= today) &&
                    allProducts.find(p => p.productID.toString() === card.productId)?.category === category)
                .map(([productId, _]) => productId);
            const shuffledDueReviewCards = shuffleArray(dueReviewCards);
            const reviewQueueToAdd = shuffledDueReviewCards.slice(0, 12);
            userProgress[`${category}ReviewQueue`] = reviewQueueToAdd;
            userProgress[`${category}ReviewCardsAddedToday`] = reviewQueueToAdd.length;
        });

        userProgress.lastInitializationDate = Timestamp.fromDate(today);
    }

    return userProgress;
}

export async function updateUserProgress(userId: string, productId: string, score: number): Promise<void> {
    const userProgressRef = doc(db, 'userProgress', userId);

    await runTransaction(db, async (transaction) => {
        const userProgressDoc = await transaction.get(userProgressRef);
        let userProgress = userProgressDoc.data() as UserProgress;

        const card = userProgress.cards[productId];
        const category = getCardCategory(productId);

        // キューの状態を保存
        const initialNewQueue = [...userProgress[`${category}NewQueue`]];
        const initialReviewQueue = [...userProgress[`${category}ReviewQueue`]];

        if (card.isNew) {
            if (score === 100) {
                card.correctCount++;
                if (card.correctCount >= 2) {
                    card.isNew = false;
                    // Remove from new queue
                    userProgress[`${category}NewQueue`] = userProgress[`${category}NewQueue`].filter(id => id !== productId);
                    // Set due date for tomorrow
                    card.dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
                    card.interval = 1;
                    // Do not add to today's review queue
                } else {
                    // Move to the end of new queue
                    userProgress[`${category}NewQueue`] = userProgress[`${category}NewQueue`].filter(id => id !== productId);
                    if (userProgress[`${category}NewQueue`].length < 6) {
                        userProgress[`${category}NewQueue`].push(productId);
                    }
                }
            } else {
                // Move to the end of new queue
                userProgress[`${category}NewQueue`] = userProgress[`${category}NewQueue`].filter(id => id !== productId);
                if (userProgress[`${category}NewQueue`].length < 6) {
                    userProgress[`${category}NewQueue`].push(productId);
                }
            }
        } else {
            // Update review card
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

            // Remove from review queue if due date is in the future
            if (card.dueDate > new Date()) {
                userProgress[`${category}ReviewQueue`] = userProgress[`${category}ReviewQueue`].filter(id => id !== productId);
            } else {
                // Move to the end of review queue
                userProgress[`${category}ReviewQueue`] = userProgress[`${category}ReviewQueue`].filter(id => id !== productId);
                if (userProgress[`${category}ReviewQueue`].length < 12) {
                    userProgress[`${category}ReviewQueue`].push(productId);
                }
            }
        }

        // Update learning history
        card.learningHistory.push({
            date: new Date(),
            score: score
        });

        userProgress.cards[productId] = card;

        // キューの状態を比較し、削除されたカードをカウント
        if (initialNewQueue.includes(productId) && !userProgress[`${category}NewQueue`].includes(productId)) {
            userProgress[`${category}NewCardsRemovedQueueToday`]++;
        }
        if (initialReviewQueue.includes(productId) && !userProgress[`${category}ReviewQueue`].includes(productId)) {
            userProgress[`${category}ReviewCardsRemovedQueueToday`]++;
        }

        // トランザクションでuserProgressを更新
        transaction.set(userProgressRef, userProgress);
    });

    // トランザクション完了後、明示的にキューの状態を保存
    await saveUserQueues(userId);
}

export function getCardCategory(productId: string): Category {
    const product = productData.find(p => p.productID.toString() === productId);
    return product?.category || 'hot'; // Default to 'hot' if not found
}

export async function getUserProgress(userId: string): Promise<UserProgress> {
    const userDoc = await getDoc(doc(db, 'userProgress', userId));
    let data = userDoc.data() as UserProgress | undefined;

    if (!data || Object.keys(data.cards).length === 0) {
        // Initialize the state
        data = {
            cards: {},
            lastStudyDate: new Date(),
            lastInitializationDate: new Date(0), // Set to a past date to ensure initialization on first use
            hotNewQueue: [],
            hotReviewQueue: [],
            iceNewQueue: [],
            iceReviewQueue: [],
            foodNewQueue: [],
            foodReviewQueue: [],
            hotNewCardsAddedToday: 0,
            hotReviewCardsAddedToday: 0,
            iceNewCardsAddedToday: 0,
            iceReviewCardsAddedToday: 0,
            foodNewCardsAddedToday: 0,
            foodReviewCardsAddedToday: 0,
            hotNewCardsRemovedQueueToday: 0,
            hotReviewCardsRemovedQueueToday: 0,
            iceNewCardsRemovedQueueToday: 0,
            iceReviewCardsRemovedQueueToday: 0,
            foodNewCardsRemovedQueueToday: 0,
            foodReviewCardsRemovedQueueToday: 0,
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

    // Initialize queues
    data = initializeQueues(data, productData);

    // Save the updated progress
    await setDoc(doc(db, 'userProgress', userId), data);

    return data;
}

export async function saveUserQueues(userId: string): Promise<void> {
    const userProgressRef = doc(db, 'userProgress', userId);
    const userProgressDoc = await getDoc(userProgressRef);
    const userProgress = userProgressDoc.data() as UserProgress;

    await updateDoc(userProgressRef, {
        hotNewQueue: userProgress.hotNewQueue,
        hotReviewQueue: userProgress.hotReviewQueue,
        iceNewQueue: userProgress.iceNewQueue,
        iceReviewQueue: userProgress.iceReviewQueue,
        foodNewQueue: userProgress.foodNewQueue,
        foodReviewQueue: userProgress.foodReviewQueue,
        lastStudyDate: userProgress.lastStudyDate,
        hotNewCardsAddedToday: userProgress.hotNewCardsAddedToday,
        hotReviewCardsAddedToday: userProgress.hotReviewCardsAddedToday,
        iceNewCardsAddedToday: userProgress.iceNewCardsAddedToday,
        iceReviewCardsAddedToday: userProgress.iceReviewCardsAddedToday,
        foodNewCardsAddedToday: userProgress.foodNewCardsAddedToday,
        foodReviewCardsAddedToday: userProgress.foodReviewCardsAddedToday,
        hotNewCardsRemovedQueueToday: userProgress.hotNewCardsRemovedQueueToday,
        hotReviewCardsRemovedQueueToday: userProgress.hotReviewCardsRemovedQueueToday,
        iceNewCardsRemovedQueueToday: userProgress.iceNewCardsRemovedQueueToday,
        iceReviewCardsRemovedQueueToday: userProgress.iceReviewCardsRemovedQueueToday,
        foodNewCardsRemovedQueueToday: userProgress.foodNewCardsRemovedQueueToday,
        foodReviewCardsRemovedQueueToday: userProgress.foodReviewCardsRemovedQueueToday,
    });
}

export async function ensureUserProgressInitialized(userId: string): Promise<void> {
    const userProgressRef = doc(db, 'userProgress', userId);
    const userProgressDoc = await getDoc(userProgressRef);

    if (!userProgressDoc.exists()) {
        console.log("Initializing user progress for new user:", userId);
        await initializeUserProgress(userId);
    } else {
        console.log("User progress already exists for:", userId);
    }
}

export async function resetUserProgress(userId: string): Promise<void> {
    console.log("Resetting user progress for:", userId);
    await initializeUserProgress(userId);
}

export async function logUserProgress(userId: string): Promise<void> {
    const userProgressRef = doc(db, 'userProgress', userId);
    const userProgressDoc = await getDoc(userProgressRef);

    if (userProgressDoc.exists()) {
        console.log("User Progress for", userId, ":", userProgressDoc.data());
    } else {
        console.log("No user progress found for:", userId);
    }
}

export async function saveUserProgress(userId: string, progress: UserProgress): Promise<void> {
    console.log("Saving user progress...");
    const userProgressRef = doc(db, 'userProgress', userId);
    try {
        await setDoc(userProgressRef, {
            ...progress,
            hotNewCardsAddedToday: progress.hotNewCardsAddedToday,
            hotReviewCardsAddedToday: progress.hotReviewCardsAddedToday,
            iceNewCardsAddedToday: progress.iceNewCardsAddedToday,
            iceReviewCardsAddedToday: progress.iceReviewCardsAddedToday,
            foodNewCardsAddedToday: progress.foodNewCardsAddedToday,
            foodReviewCardsAddedToday: progress.foodReviewCardsAddedToday,
            hotNewCardsRemovedQueueToday: progress.hotNewCardsRemovedQueueToday,
            hotReviewCardsRemovedQueueToday: progress.hotReviewCardsRemovedQueueToday,
            iceNewCardsRemovedQueueToday: progress.iceNewCardsRemovedQueueToday,
            iceReviewCardsRemovedQueueToday: progress.iceReviewCardsRemovedQueueToday,
            foodNewCardsRemovedQueueToday: progress.foodNewCardsRemovedQueueToday,
            foodReviewCardsRemovedQueueToday: progress.foodReviewCardsRemovedQueueToday,
        }, { merge: true });

        console.log("User progress saved successfully for:", userId);
    } catch (error) {
        console.error("Error saving user progress:", error);
    }
}
export async function initializeUserProgress(userId: string): Promise<void> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);  // Set to 00:00 of the previous day

    const initialUserProgress: UserProgress = {
        cards: {},
        lastStudyDate: Timestamp.fromDate(yesterday),
        lastInitializationDate: Timestamp.fromDate(yesterday),
        hotNewQueue: [],
        hotReviewQueue: [],
        iceNewQueue: [],
        iceReviewQueue: [],
        foodNewQueue: [],
        foodReviewQueue: [],
        hotNewCardsAddedToday: 0,
        hotReviewCardsAddedToday: 0,
        iceNewCardsAddedToday: 0,
        iceReviewCardsAddedToday: 0,
        foodNewCardsAddedToday: 0,
        foodReviewCardsAddedToday: 0,
        hotNewCardsRemovedQueueToday: 0,
        hotReviewCardsRemovedQueueToday: 0,
        iceNewCardsRemovedQueueToday: 0,
        iceReviewCardsRemovedQueueToday: 0,
        foodNewCardsRemovedQueueToday: 0,
        foodReviewCardsRemovedQueueToday: 0
    };

    // Initialize card data for all products
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

    // Save data to Firestore
    const userProgressRef = doc(db, 'userProgress', userId);
    await setDoc(userProgressRef, initialUserProgress);
}