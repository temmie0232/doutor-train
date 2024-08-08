import { Card, Difficulty, Grade } from './types';

const INITIAL_INTERVAL = 1; // 1 day
const REVIEW_INTERVALS = [1, 3, 7, 14, 30]; // in days

export function initializeCard(
    id: string,
    question: string,
    answer: string,
    difficulty: Difficulty
): Card {
    return {
        id,
        question,
        answer,
        difficulty,
        nextReviewDate: new Date(),
        reviewCount: 0,
        correctCount: 0,
        interval: INITIAL_INTERVAL,
        lastReviewDate: new Date(),
        lowGradeCount: 0,
    };
}

export function updateCardAfterReview(card: Card, grade: Grade): Card {
    const updatedCard = { ...card };
    updatedCard.reviewCount++;
    updatedCard.lastReviewGrade = grade;
    updatedCard.lastReviewDate = new Date();

    if (grade >= 3) {
        updatedCard.correctCount++;
    } else {
        updatedCard.lowGradeCount++;
    }

    // Adjust interval based on grade
    let intervalMultiplier = 1;
    switch (grade) {
        case 4: // Easy
            intervalMultiplier = 1.5;
            break;
        case 3: // Good
            intervalMultiplier = 1.2;
            break;
        case 2: // Hard
            intervalMultiplier = 1;
            break;
        case 1: // Again
            updatedCard.interval = INITIAL_INTERVAL;
            intervalMultiplier = 0; // To skip the multiplication below
            break;
    }

    // Adjust interval based on difficulty
    const difficultyFactor = 1 + (2.5 - updatedCard.difficulty) * 0.1;
    updatedCard.interval = Math.round(updatedCard.interval * intervalMultiplier * difficultyFactor);

    // Ensure the interval is within the predefined review intervals
    const maxInterval = Math.max(...REVIEW_INTERVALS);
    updatedCard.interval = Math.min(updatedCard.interval, maxInterval);

    // Set next review date
    updatedCard.nextReviewDate = new Date();
    updatedCard.nextReviewDate.setDate(updatedCard.nextReviewDate.getDate() + updatedCard.interval);

    return updatedCard;
}

export function isCardDueForReview(card: Card): boolean {
    const now = new Date();
    return card.nextReviewDate <= now;
}

export function getReviewPriority(card: Card): number {
    const now = new Date();
    const daysOverdue = Math.max(0, (now.getTime() - card.nextReviewDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysSinceLastReview = (now.getTime() - card.lastReviewDate.getTime()) / (1000 * 60 * 60 * 24);

    // Calculate priority based on multiple factors
    let priority = 0;

    // Factor 1: Days overdue (highest priority)
    priority += daysOverdue * 10;

    // Factor 2: Card difficulty
    priority += card.difficulty * 5;

    // Factor 3: Time since last review
    priority += daysSinceLastReview * 2;

    // Factor 4: Low grade count
    priority += card.lowGradeCount * 3;

    return priority;
}