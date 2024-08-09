import SpacedRepetitionSystem from './spacedRepetitionSystem';
import { Card, Grade, StudySessionConfig, ProgressData } from './types';

export class StudySession {
    private srs: SpacedRepetitionSystem;

    constructor(cards: Card[], config: StudySessionConfig) {
        this.srs = new SpacedRepetitionSystem(config);
        cards.forEach(card => this.srs.addNewCard(card));
    }


    public getNextCard(): Card | null {
        return this.srs.getNextCard();
    }

    public answerNewCard(card: Card, isCorrect: boolean): Card {
        const userAnswers = isCorrect ? card.correctAnswers : 0;
        this.srs.submitAnswer(card, userAnswers);
        return card;
    }

    public answerReviewCard(card: Card, grade: Grade): Card {
        this.srs.submitSelfEvaluation(card, grade);
        return card;
    }

    public getSessionState(): {
        newCardsStudied: number;
        reviewCardsStudied: number;
        totalNewCards: number;
        totalReviewCards: number;
    } {
        return {
            newCardsStudied: this.srs.getTodayNewCardCount(),
            reviewCardsStudied: this.srs.getTodayReviewCardCount(),
            totalNewCards: this.srs.getNewCardCount(),
            totalReviewCards: this.srs.getReviewCardCount(),
        };
    }

    public restoreSession(savedState: any): void {
        this.srs.restoreState(savedState);
    }

    public getProgressData(): ProgressData {
        return this.srs.getProgressData();
    }

    public updateConfig(newConfig: StudySessionConfig): void {
        this.srs.updateConfig(newConfig);
    }
}