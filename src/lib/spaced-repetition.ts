import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { Product, productData } from '@/data/productData';

const db = getFirestore();

interface CardData {
    productId: string;
    easeFactor: number;
    interval: number;
    dueDate: Date;
}

interface UserProgress {
    cards: { [productId: string]: CardData };
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
                dueDate: new Date()
            };
        });
        const initialProgress: UserProgress = { cards: initialCards };
        await setDoc(doc(db, 'userProgress', userId), initialProgress);
        return initialProgress;
    }

    return data;
}

export async function updateUserProgress(userId: string, productId: string, quality: number): Promise<void> {
    const userProgress = await getUserProgress(userId);
    const card = userProgress.cards[productId] || {
        productId,
        easeFactor: 2.5,
        interval: 0,
        dueDate: new Date()
    };

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

    const easeDelta = 0.1 - (4 - quality) * (0.08 + (4 - quality) * 0.02);
    card.easeFactor = Math.max(1.3, Math.min(2.5, card.easeFactor + easeDelta));

    card.dueDate = new Date(Date.now() + card.interval * 24 * 60 * 60 * 1000);

    userProgress.cards[productId] = card;
    await setDoc(doc(db, 'userProgress', userId), userProgress);
}

export function getNextDueCard(userProgress: UserProgress, filteredProducts: Product[]): string | null {
    const now = new Date();
    const dueCards = Object.values(userProgress.cards)
        .filter(card => filteredProducts.some(p => p.name === card.productId))
        .filter(card => card.dueDate <= now);

    if (dueCards.length === 0) {
        // すべてのカードが未来の日付の場合、フィルタリングされた商品の中で最も早い日付のカードを返す
        const earliestCard = Object.values(userProgress.cards)
            .filter(card => filteredProducts.some(p => p.name === card.productId))
            .reduce((a, b) => a.dueDate < b.dueDate ? a : b);
        return earliestCard.productId;
    }
    return dueCards.reduce((a, b) => a.dueDate < b.dueDate ? a : b).productId;
}