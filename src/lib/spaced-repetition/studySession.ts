import { Card, Grade, StudySessionConfig } from './types';
import { CardManager } from './cardManager';

export class StudySession {
    private cardManager: CardManager;
    private config: StudySessionConfig;
    private newCardsStudiedThisSession: number = 0;

    constructor(cards: Card[], config: StudySessionConfig) {
        this.config = config;
        this.cardManager = new CardManager(cards, config);
    }

    public getNextCard(): Card | null {
        // Prioritize new cards until we reach the newCardPriority limit
        if (this.newCardsStudiedThisSession < this.config.newCardPriority) {
            const newCard = this.cardManager.getNextNewCard();
            if (newCard) {
                this.newCardsStudiedThisSession++;
                return newCard;
            }
        }

        // If no new cards or we've reached the limit, get a review card
        const reviewCard = this.cardManager.getNextReviewCard();
        if (reviewCard) {
            return reviewCard;
        }

        // If no review cards, try to get a new card again
        return this.cardManager.getNextNewCard();
    }

    public answerNewCard(card: Card, isCorrect: boolean): Card {
        return this.cardManager.answerNewCard(card, isCorrect);
    }

    public answerReviewCard(card: Card, grade: Grade): Card {
        return this.cardManager.answerReviewCard(card, grade);
    }

    public getProgress(): { newCards: number; reviewCards: number } {
        return {
            newCards: this.cardManager.getNewCardCount(),
            reviewCards: this.cardManager.getReviewCardCount(),
        };
    }

    public resetSession(): void {
        this.newCardsStudiedThisSession = 0;
    }

    public getSessionState(): {
        newCardsStudied: number;
        reviewCardsStudied: number;
        totalNewCards: number;
        totalReviewCards: number;
    } {
        return {
            newCardsStudied: this.newCardsStudiedThisSession,
            reviewCardsStudied: this.cardManager.getTodayReviewCardCount(),
            totalNewCards: this.cardManager.getNewCardCount(),
            totalReviewCards: this.cardManager.getReviewCardCount(),
        };
    }

    public restoreSession(savedState: any): void {
        this.newCardsStudiedThisSession = savedState.newCardsStudied;
        this.cardManager.restoreState(savedState);
    }
}