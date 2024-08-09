import { Card, Grade, StudySessionConfig } from './types';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

interface ProgressData {
    totalCards: number;
    masteredCards: number;
    newCardsCount: number;
    reviewCardsCount: number;
    scoreHistory: { date: string; score: number }[];
    averageScores: { date: string; averageScore: number }[];
    streakDays: number;
    weeklyCardCounts: { [week: string]: number };
    monthlyCardCounts: { [month: string]: number };
}

class SpacedRepetitionSystem {
    private db = getFirestore();
    private newCards: Card[] = [];
    private reviewCards: Card[] = [];
    private reviewIntervals = [1, 3, 7, 14, 30]; // in days
    public config: StudySessionConfig;
    private todayNewCardCount: number = 0;
    private todayReviewCardCount: number = 0;
    private lastStudyDate: Date | null = null;
    private streakDays: number = 0;
    private lastStreakUpdateDate: Date | null = null;

    constructor(config: StudySessionConfig) {
        this.config = config;
        this.checkAndResetDailyCount();
    }

    public getProgressData(): ProgressData {
        const allCards = [...this.newCards, ...this.reviewCards];
        const totalCards = allCards.length;
        const masteredCards = allCards.filter(card => !card.isNew && card.correctCount >= 2).length;

        const scoreHistory = allCards.flatMap(card =>
            card.reviewHistory.map(review => ({
                date: review.date.toISOString().split('T')[0],
                score: review.score
            }))
        ).sort((a, b) => a.date.localeCompare(b.date));

        const averageScores = this.calculateAverageScores(scoreHistory);
        const weeklyCardCounts = this.calculateWeeklyCardCounts(allCards);
        const monthlyCardCounts = this.calculateMonthlyCardCounts(allCards);

        return {
            totalCards,
            masteredCards,
            newCardsCount: this.newCards.length,
            reviewCardsCount: this.reviewCards.length,
            scoreHistory,
            averageScores,
            streakDays: this.streakDays,
            weeklyCardCounts,
            monthlyCardCounts
        };
    }



    private calculateAverageScores(scoreHistory: { date: string; score: number }[]) {
        const dateMap = new Map<string, number[]>();
        scoreHistory.forEach(({ date, score }) => {
            if (!dateMap.has(date)) {
                dateMap.set(date, []);
            }
            dateMap.get(date)!.push(score);
        });

        return Array.from(dateMap.entries()).map(([date, scores]) => ({
            date,
            averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length
        }));
    }

    private calculateWeeklyCardCounts(cards: Card[]): { [week: string]: number } {
        const weeklyCount: { [week: string]: number } = {};
        cards.forEach(card => {
            card.reviewHistory.forEach(review => {
                const weekStart = this.getWeekStart(review.date);
                weeklyCount[weekStart] = (weeklyCount[weekStart] || 0) + 1;
            });
        });
        return weeklyCount;
    }

    private calculateMonthlyCardCounts(cards: Card[]): { [month: string]: number } {
        const monthlyCount: { [month: string]: number } = {};
        cards.forEach(card => {
            card.reviewHistory.forEach(review => {
                const month = review.date.toISOString().slice(0, 7); // YYYY-MM
                monthlyCount[month] = (monthlyCount[month] || 0) + 1;
            });
        });
        return monthlyCount;
    }

    private getWeekStart(date: Date): string {
        const d = new Date(date);
        d.setDate(d.getDate() - d.getDay());
        return d.toISOString().slice(0, 10);
    }

    updateStreak() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (this.lastStreakUpdateDate) {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            if (this.lastStreakUpdateDate.getTime() === yesterday.getTime()) {
                this.streakDays++;
            } else if (this.lastStreakUpdateDate.getTime() < yesterday.getTime()) {
                this.streakDays = 1;
            }
        } else {
            this.streakDays = 1;
        }

        this.lastStreakUpdateDate = today;
    }

    async saveProgressToFirebase(userId: string) {
        const progressRef = doc(this.db, 'users', userId, 'progress', 'current');
        const progressData = this.getProgressData();
        await setDoc(progressRef, {
            ...progressData,
            lastUpdated: Timestamp.now()
        });
    }

    async loadProgressFromFirebase(userId: string) {
        const progressRef = doc(this.db, 'users', userId, 'progress', 'current');
        const progressDoc = await getDoc(progressRef);
        if (progressDoc.exists()) {
            const data = progressDoc.data() as ProgressData & { lastUpdated: Timestamp };
            this.streakDays = data.streakDays;
            this.lastStreakUpdateDate = data.lastUpdated.toDate();
        }
    }

    async loadCardsFromFirebase(userId: string) {
        const cardsRef = collection(this.db, 'users', userId, 'cards');
        const newCardsQuery = query(cardsRef, where('isNew', '==', true));
        const reviewCardsQuery = query(cardsRef, where('isNew', '==', false));

        const [newCardsSnapshot, reviewCardsSnapshot] = await Promise.all([
            getDocs(newCardsQuery),
            getDocs(reviewCardsQuery)
        ]);

        this.newCards = newCardsSnapshot.docs.map(doc => this.convertFirestoreCardToCard(doc.data() as any));
        this.reviewCards = reviewCardsSnapshot.docs.map(doc => this.convertFirestoreCardToCard(doc.data() as any));

        this.sortReviewCards();
    }

    async saveCardToFirebase(userId: string, card: Card) {
        const cardRef = doc(this.db, 'users', userId, 'cards', card.id);
        await setDoc(cardRef, this.convertCardToFirestoreCard(card));
    }

    async updateCardInFirebase(userId: string, card: Card) {
        const cardRef = doc(this.db, 'users', userId, 'cards', card.id);
        await updateDoc(cardRef, this.convertCardToFirestoreCard(card));
    }

    async saveStudySessionToFirebase(userId: string) {
        const sessionRef = doc(this.db, 'users', userId, 'studySession', 'current');
        await setDoc(sessionRef, {
            newCardsStudied: this.todayNewCardCount,
            reviewCardsStudied: this.todayReviewCardCount,
            lastStudyDate: Timestamp.fromDate(this.lastStudyDate || new Date()),
            lastUpdated: Timestamp.now()
        });
    }

    async loadStudySessionFromFirebase(userId: string) {
        const sessionRef = doc(this.db, 'users', userId, 'studySession', 'current');
        const sessionDoc = await getDoc(sessionRef);
        if (sessionDoc.exists()) {
            const data = sessionDoc.data();
            this.todayNewCardCount = data.newCardsStudied;
            this.todayReviewCardCount = data.reviewCardsStudied;
            this.lastStudyDate = data.lastStudyDate.toDate();
        }
    }

    private convertCardToFirestoreCard(card: Card): any {
        return {
            ...card,
            nextReviewDate: Timestamp.fromDate(card.nextReviewDate),
            lastReviewDate: Timestamp.fromDate(card.lastReviewDate),
            reviewHistory: card.reviewHistory.map(review => ({
                ...review,
                date: Timestamp.fromDate(review.date)
            }))
        };
    }

    private convertFirestoreCardToCard(firestoreCard: any): Card {
        return {
            ...firestoreCard,
            nextReviewDate: firestoreCard.nextReviewDate.toDate(),
            lastReviewDate: firestoreCard.lastReviewDate.toDate(),
            reviewHistory: firestoreCard.reviewHistory.map((review: any) => ({
                ...review,
                date: review.date.toDate()
            }))
        };
    }

    addNewCard(card: Card) {
        this.newCards.push(card);
    }

    getNextCard(): Card | null {
        this.checkAndResetDailyCount();
        if (this.todayNewCardCount < this.config.maxNewCardsPerDay && this.newCards.length > 0) {
            this.todayNewCardCount++;
            return this.newCards[0];
        } else if (this.todayReviewCardCount < this.config.maxReviewCardsPerDay && this.reviewCards.length > 0) {
            const dueCard = this.reviewCards.find(this.isCardDueForReview);
            if (dueCard) {
                this.todayReviewCardCount++;
                return dueCard;
            }
        }
        return null;
    }

    submitAnswer(card: Card, userAnswers: number) {
        card.userAnswers = userAnswers;
        const score = userAnswers / card.correctAnswers;
        card.reviewHistory.push({ date: new Date(), score });

        if (score === 1) {
            card.correctCount++;
            if (card.isNew && card.correctCount >= 2) {
                card.isNew = false;
                card.interval = this.reviewIntervals[0];
                card.nextReviewDate = new Date(Date.now() + card.interval * 24 * 60 * 60 * 1000);
                this.moveCardToReviewQueue(card);
            } else if (card.isNew) {
                this.moveCardToEndOfNewQueue(card);
            }
        } else {
            if (card.isNew) {
                this.moveCardToEndOfNewQueue(card);
            } else {
                // For review cards, we'll handle this in submitSelfEvaluation
                card.interval = 1; // Reset interval for incorrect answers
                card.nextReviewDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // Review again tomorrow
            }
        }

        card.lastReviewDate = new Date();
    }

    submitSelfEvaluation(card: Card, grade: Grade) {
        this.updateReviewInterval(card, grade);
        this.sortReviewCards();
    }

    private isCardDueForReview(card: Card): boolean {
        const now = new Date();
        return card.nextReviewDate <= now;
    }

    private updateReviewInterval(card: Card, grade: Grade) {
        let interval = card.interval;

        switch (grade) {
            case 4: interval *= 2.5; break;
            case 3: interval *= 1.4; break;
            case 2: break; // Keep the same interval
            case 1: interval = 1; break;
        }

        if (interval < 7) {
            interval = Math.ceil(interval);
        } else {
            interval = Math.ceil(interval / 7) * 7;
        }

        card.interval = interval;
        card.nextReviewDate = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);
    }

    private calculatePriority(card: Card): number {
        const daysOverdue = Math.max(0, (Date.now() - card.nextReviewDate.getTime()) / (24 * 60 * 60 * 1000));
        const lastScore = card.reviewHistory[card.reviewHistory.length - 1].score;
        const reviewCount = card.reviewHistory.length;
        const lastEvaluation = card.reviewHistory[card.reviewHistory.length - 1].selfEvaluation || 3;

        return daysOverdue * 10 + (1 - lastScore) * 5 + (1 / reviewCount) * 3 + (5 - lastEvaluation) * 2;
    }

    private moveCardToReviewQueue(card: Card) {
        this.newCards = this.newCards.filter(c => c.id !== card.id);
        this.reviewCards.push(card);
        this.sortReviewCards();
    }

    private moveCardToEndOfNewQueue(card: Card) {
        this.newCards = this.newCards.filter(c => c.id !== card.id);
        this.newCards.push(card);
    }

    private sortReviewCards() {
        this.reviewCards.sort((a, b) => this.calculatePriority(b) - this.calculatePriority(a));
    }

    private checkAndResetDailyCount() {
        const today = new Date();
        if (!this.lastStudyDate || this.lastStudyDate.getDate() !== today.getDate()) {
            this.todayNewCardCount = 0;
            this.todayReviewCardCount = 0;
            this.lastStudyDate = today;
        }
    }

    updateConfig(newConfig: StudySessionConfig) {
        this.config = newConfig;
    }

    async saveConfigToFirebase(userId: string) {
        const configRef = doc(this.db, 'users', userId, 'studyConfig', 'current');
        await setDoc(configRef, this.config);
    }

    async loadConfigFromFirebase(userId: string) {
        const configRef = doc(this.db, 'users', userId, 'studyConfig', 'current');
        const configDoc = await getDoc(configRef);
        if (configDoc.exists()) {
            this.config = configDoc.data() as StudySessionConfig;
        }
    }


    getNewCardCount(): number {
        return this.newCards.length;
    }

    getReviewCardCount(): number {
        return this.reviewCards.filter(this.isCardDueForReview).length;
    }

    getTodayNewCardCount(): number {
        return this.todayNewCardCount;
    }

    getTodayReviewCardCount(): number {
        return this.todayReviewCardCount;
    }

    restoreState(savedState: any): void {
        this.todayNewCardCount = savedState.newCardsStudied;
        this.todayReviewCardCount = savedState.reviewCardsStudied;
        this.lastStudyDate = new Date(savedState.lastStudyDate);
    }
}

export default SpacedRepetitionSystem;