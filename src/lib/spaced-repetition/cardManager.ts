import { Card, Grade, StudySessionConfig } from './types';
import { isCardDueForReview, getReviewPriority, updateCardAfterReview } from './spacedRepetition';

export class CardManager {
    private newCards: Card[] = [];
    private reviewCards: Card[] = [];
    private todayNewCardCount: number = 0;
    private todayReviewCardCount: number = 0;
    private lastStudyDate: Date | null = null;
    private config: StudySessionConfig;

    constructor(cards: Card[], config: StudySessionConfig) {
        this.distributeCards(cards);
        this.config = config;
        this.checkAndResetDailyCount();
    }

    private distributeCards(cards: Card[]) {
        cards.forEach(card => {
            if (card.reviewCount === 0) {
                this.newCards.push(card);
            } else {
                this.reviewCards.push(card);
            }
        });
        this.sortReviewCards();
    }

    private sortReviewCards() {
        this.reviewCards.sort((a, b) => getReviewPriority(b) - getReviewPriority(a));
    }

    public getNextNewCard(): Card | null {
        this.checkAndResetDailyCount();
        if (this.todayNewCardCount >= this.config.maxNewCardsPerDay || this.newCards.length === 0) {
            return null;
        }
        this.todayNewCardCount++;
        return this.newCards[0];
    }

    public getNextReviewCard(): Card | null {
        this.checkAndResetDailyCount();
        if (this.todayReviewCardCount >= this.config.maxReviewCardsPerDay) {
            return null;
        }
        const dueCard = this.reviewCards.find(isCardDueForReview);
        if (dueCard) {
            this.todayReviewCardCount++;
        }
        return dueCard || null;
    }

    public answerNewCard(card: Card, isCorrect: boolean): Card {
        const updatedCard = { ...card };
        if (isCorrect) {
            updatedCard.correctCount++;
            if (updatedCard.correctCount >= 2) {
                // Move to review cards
                this.newCards = this.newCards.filter(c => c.id !== card.id);
                updatedCard.reviewCount = 1;
                updatedCard.interval = 1; // 1 day
                updatedCard.nextReviewDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
                this.reviewCards.push(updatedCard);
                this.sortReviewCards();
            } else {
                // Move to the end of new cards queue
                this.newCards = this.newCards.filter(c => c.id !== card.id);
                this.newCards.push(updatedCard);
            }
        } else {
            // Move to the end of new cards queue
            this.newCards = this.newCards.filter(c => c.id !== card.id);
            this.newCards.push(updatedCard);
        }
        return updatedCard;
    }

    public answerReviewCard(card: Card, grade: Grade): Card {
        const updatedCard = updateCardAfterReview(card, grade);
        const index = this.reviewCards.findIndex(c => c.id === card.id);
        if (index !== -1) {
            this.reviewCards[index] = updatedCard;
        }
        this.sortReviewCards();
        return updatedCard;
    }

    private checkAndResetDailyCount() {
        const today = new Date();
        if (!this.lastStudyDate || this.lastStudyDate.getDate() !== today.getDate()) {
            this.todayNewCardCount = 0;
            this.todayReviewCardCount = 0;
            this.lastStudyDate = today;
        }
    }

    public getNewCardCount(): number {
        return this.newCards.length;
    }

    public getReviewCardCount(): number {
        return this.reviewCards.filter(isCardDueForReview).length;
    }

    public getTodayNewCardCount(): number {
        return this.todayNewCardCount;
    }

    public getTodayReviewCardCount(): number {
        return this.todayReviewCardCount;
    }

    public restoreState(savedState: any): void {
        this.todayNewCardCount = savedState.newCardsStudied;
        this.todayReviewCardCount = savedState.reviewCardsStudied;
        this.lastStudyDate = new Date(savedState.lastStudyDate);
    }
}