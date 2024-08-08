export type Difficulty = 1 | 2 | 3 | 4;
export type Grade = 1 | 2 | 3 | 4;

export interface Card {
    id: string;
    question: string;
    answer: string;
    difficulty: Difficulty;
    nextReviewDate: Date;
    reviewCount: number;
    correctCount: number;
    lastReviewGrade?: Grade;
    interval: number; // in days
    lastReviewDate: Date;
    lowGradeCount: number; // Count of grades 1 and 2
}

export interface StudySession {
    newCardsStudied: number;
    reviewCardsStudied: number;
    date: Date;
}

export interface UserProgress {
    masteredCards: number;
    totalCards: number;
    studySessions: StudySession[];
}

export interface StudySessionConfig {
    maxNewCardsPerDay: number;
    maxReviewCardsPerDay: number;
    newCardPriority: number; // Number of new cards to study before switching to review cards
}