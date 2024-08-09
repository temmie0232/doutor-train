export interface Card {
    id: string;
    question: string;
    correctAnswers: number;
    userAnswers: number;
    isNew: boolean;
    nextReviewDate: Date;
    lastReviewDate: Date;
    correctCount: number;
    interval: number;
    difficulty: number;
    reviewCount: number;  // Added this line
    reviewHistory: {
        date: Date;
        score: number;
        selfEvaluation?: number;
    }[];
}

export type Grade = 1 | 2 | 3 | 4;

export interface StudySessionConfig {
    maxNewCardsPerDay: number;
    maxReviewCardsPerDay: number;
}

export interface ProgressData {
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