import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, Timestamp, runTransaction } from 'firebase/firestore';
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
    correctCount: number;
    learningHistory: LearningHistoryItem[];
}

interface UserProgress {
    cards: { [productId: string]: CardData };
    lastStudyDate: Date | Timestamp;
    hotNewQueue: string[];
    hotReviewQueue: string[];
    iceNewQueue: string[];
    iceReviewQueue: string[];
    foodNewQueue: string[];
    foodReviewQueue: string[];
}

type Category = 'hot' | 'ice' | 'food';

function initializeQueues(userProgress: UserProgress, allProducts: Product[]): UserProgress {
    console.log("Starting initializeQueues function");
    console.log("Current userProgress:", JSON.stringify(userProgress, null, 2));

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    console.log("Today's date:", today);

    let shouldInitialize = false;

    if (!userProgress.lastStudyDate) {
        console.log("No lastStudyDate found. Setting to 2000-01-01 and initializing.");
        userProgress.lastStudyDate = Timestamp.fromDate(new Date(2000, 0, 1));
        shouldInitialize = true;
    } else {
        const lastStudyDate = convertToDate(userProgress.lastStudyDate);
        console.log("Last study date:", lastStudyDate);
        if (today > lastStudyDate) {
            console.log("Today is after last study date. Should initialize.");
            shouldInitialize = true;
        } else {
            console.log("Today is not after last study date. Should not initialize.");
        }
    }

    if (shouldInitialize) {
        console.log("Initializing queues");

        const categories: Category[] = ['hot', 'ice', 'food'];

        categories.forEach(category => {
            // Initialize new queue for each category
            const newCards = allProducts
                .filter(p => p.category === category && (!userProgress.cards[p.productID] || userProgress.cards[p.productID].isNew));
            console.log(`Number of new ${category} cards:`, newCards.length);
            const shuffledNewCards = shuffleArray(newCards.map(p => p.productID.toString()));
            userProgress[`${category}NewQueue`] = shuffledNewCards.slice(0, 6);

            console.log(`New ${category} cards added to new queue:`, userProgress[`${category}NewQueue`]);

            // Initialize review queue for each category
            const dueReviewCards = Object.entries(userProgress.cards || {})
                .filter(([_, card]) => !card.isNew &&
                    (!card.dueDate || convertToDate(card.dueDate) <= today) &&
                    allProducts.find(p => p.productID.toString() === card.productId)?.category === category)
                .map(([productId, _]) => productId);
            console.log(`Number of due ${category} review cards:`, dueReviewCards.length);
            const shuffledDueReviewCards = shuffleArray(dueReviewCards);
            userProgress[`${category}ReviewQueue`] = shuffledDueReviewCards.slice(0, 12);

            console.log(`${category} review cards added to review queue:`, userProgress[`${category}ReviewQueue`]);
        });

        userProgress.lastStudyDate = Timestamp.fromDate(today);
    } else {
        console.log("Queues not initialized: Not a new day");
    }

    // Ensure all queues exist
    const categories: Category[] = ['hot', 'ice', 'food'];
    categories.forEach(category => {
        if (!userProgress[`${category}NewQueue`]) userProgress[`${category}NewQueue`] = [];
        if (!userProgress[`${category}ReviewQueue`]) userProgress[`${category}ReviewQueue`] = [];
    });

    console.log("Final userProgress:", JSON.stringify(userProgress, null, 2));
    return userProgress;
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

export function getNextDueCard(userProgress: UserProgress): string | null {
    const categories = ['hot', 'ice', 'food'] as const;

    for (const category of categories) {
        if (userProgress[`${category}NewQueue`].length > 0) {
            return userProgress[`${category}NewQueue`][0];
        }
        if (userProgress[`${category}ReviewQueue`].length > 0) {
            return userProgress[`${category}ReviewQueue`][0];
        }
    }

    return null;
}

function processCardAfterAnswer(userProgress: UserProgress, productId: string, score: number): UserProgress {
    const card = userProgress.cards[productId];
    const category = getCardCategory(productId);

    if (card.isNew) {
        if (score === 100) {
            card.correctCount++;
            if (card.correctCount >= 2) {
                card.isNew = false;
                // Remove from new queue
                userProgress[`${category}NewQueue`] = userProgress[`${category}NewQueue`].filter(id => id !== productId);
                // Add to review queue (max 12)
                if (userProgress[`${category}ReviewQueue`].length < 12) {
                    userProgress[`${category}ReviewQueue`].push(productId);
                }
            }
        }
        // Move to the end of new queue if still new
        if (card.isNew) {
            userProgress[`${category}NewQueue`] = userProgress[`${category}NewQueue`].filter(id => id !== productId);
            if (userProgress[`${category}NewQueue`].length < 6) {
                userProgress[`${category}NewQueue`].push(productId);
            }
        }
    } else {
        // Move review card to the end of review queue
        userProgress[`${category}ReviewQueue`] = userProgress[`${category}ReviewQueue`].filter(id => id !== productId);
        if (userProgress[`${category}ReviewQueue`].length < 12) {
            userProgress[`${category}ReviewQueue`].push(productId);
        }
    }

    // Update card properties
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

    // Update learning history
    card.learningHistory.push({
        date: new Date(),
        score: score
    });

    return userProgress;
}

function updateReviewCardDueDate(userProgress: UserProgress, productId: string, newDueDate: Date): UserProgress {
    userProgress.cards[productId].dueDate = newDueDate;
    const category = getCardCategory(productId);
    userProgress[`${category}ReviewQueue`] = userProgress[`${category}ReviewQueue`].filter(id => id !== productId);
    return userProgress;
}

export async function getUserProgress(userId: string): Promise<UserProgress> {
    const userDoc = await getDoc(doc(db, 'userProgress', userId));
    let data = userDoc.data() as UserProgress | undefined;

    if (!data || Object.keys(data.cards).length === 0) {
        // Initialize the state
        data = {
            cards: {},
            lastStudyDate: new Date(),
            hotNewQueue: [],
            hotReviewQueue: [],
            iceNewQueue: [],
            iceReviewQueue: [],
            foodNewQueue: [],
            foodReviewQueue: []
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

    // Convert Firestore timestamps to Date objects
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

        transaction.set(userProgressRef, userProgress);
    });
}

function updateCardDueDate(userProgress: UserProgress, productId: string, rating: number): UserProgress {
    const card = userProgress.cards[productId];
    if (!card) return userProgress;

    const oldDueDate = convertToDate(card.dueDate);

    // Calculate next due date using SM-2 algorithm
    let interval: number;
    switch (rating) {
        case 1: // Completely forgot
            interval = 1;
            break;
        case 2: // Difficult to remember
            interval = Math.max(1, Math.floor(card.interval * 0.5));
            break;
        case 3: // Remembered with some effort
            interval = card.interval * card.easeFactor;
            break;
        case 4: // Perfectly remembered
            interval = card.interval * card.easeFactor * 1.3;
            break;
        default:
            interval = card.interval;
    }

    // Set new due date
    const newDueDate = new Date();
    newDueDate.setDate(newDueDate.getDate() + Math.round(interval));
    card.dueDate = Timestamp.fromDate(newDueDate);
    card.interval = interval;

    // Update ease factor
    if (rating > 1) {
        card.easeFactor += 0.1 - (4 - rating) * (0.08 + (4 - rating) * 0.02);
    }
    card.easeFactor = Math.max(1.3, card.easeFactor);

    // Remove from review queue
    const category = getCardCategory(productId);
    userProgress[`${category}ReviewQueue`] = userProgress[`${category}ReviewQueue`].filter(id => id !== productId);

    // If new due date is after today, remove from review queue completely
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newDueDate > today) {
        userProgress[`${category}ReviewQueue`] = userProgress[`${category}ReviewQueue`].filter(id => id !== productId);
    } else {
        // If due date is today or earlier, add to the end of review queue (max 12)
        if (userProgress[`${category}ReviewQueue`].length < 12) {
            userProgress[`${category}ReviewQueue`].push(productId);
        }
    }

    return userProgress;
}

// Helper function for date conversion
function convertToDate(dateOrTimestamp: Date | Timestamp): Date {
    if (dateOrTimestamp instanceof Timestamp) {
        return dateOrTimestamp.toDate();
    }
    return dateOrTimestamp;
}

function getCardCategory(productId: string): Category {
    const product = productData.find(p => p.productID.toString() === productId);
    return product?.category || 'hot'; // Default to 'hot' if not found
}

export async function initializeUserProgress(userId: string): Promise<void> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);  // Set to 00:00 of the previous day

    const initialUserProgress: UserProgress = {
        cards: {},
        lastStudyDate: Timestamp.fromDate(yesterday),
        hotNewQueue: [],
        hotReviewQueue: [],
        iceNewQueue: [],
        iceReviewQueue: [],
        foodNewQueue: [],
        foodReviewQueue: []
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