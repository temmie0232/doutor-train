import { Card, Grade, StudySessionConfig } from './types';
import { CardManager } from './cardManager';

export class StudySession {
    private cardManager: CardManager;
    private config: StudySessionConfig;

    constructor(cards: Card[], config: StudySessionConfig) {
        this.config = config;
        this.cardManager = new CardManager(cards, config);
    }

    public getNextCard(): Card | null {
        // Prioritize new cards until we reach the daily limit
        if (this.cardManager.getTodayNewCardCount() < this.config.maxNewCardsPerDay) {
            const newCard = this.cardManager.getNextNewCard();
            if (newCard) {
                return newCard;
            }
        }

        // If no new cards or we've reached the limit, get a review card
        return this.cardManager.getNextReviewCard();
    }

    public answerNewCard(card: Card, isCorrect: boolean): Card {
        return this.cardManager.answerNewCard(card, isCorrect);
    }

    public answerReviewCard(card: Card, grade: Grade): Card {
        return this.cardManager.answerReviewCard(card, grade);
    }

    public getSessionState(): {
        newCardsStudied: number;
        reviewCardsStudied: number;
        totalNewCards: number;
        totalReviewCards: number;
    } {
        return {
            newCardsStudied: this.cardManager.getTodayNewCardCount(),
            reviewCardsStudied: this.cardManager.getTodayReviewCardCount(),
            totalNewCards: this.cardManager.getNewCardCount(),
            totalReviewCards: this.cardManager.getReviewCardCount(),
        };
    }

    public restoreSession(savedState: any): void {
        this.cardManager.restoreState(savedState);
    }
}