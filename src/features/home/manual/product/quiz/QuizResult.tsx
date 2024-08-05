import React from 'react';

interface QuizResultProps {
    score: number;
    correctAnswer: (string | { item: string; attributes?: { [key: string]: string } })[];
}

const QuizResult: React.FC<QuizResultProps> = ({ score, correctAnswer }) => {
    const formatAnswer = (answer: string | { item: string; attributes?: { [key: string]: string } }) => {
        if (typeof answer === 'string') {
            return answer;
        }
        if (answer.attributes) {
            return `${answer.item} (${Object.entries(answer.attributes).map(([key, value]) => `${key}: ${value}`).join(', ')})`;
        }
        return answer.item;
    };

    return (
        <div className="mt-4 text-center">
            <p className="text-xl font-bold">スコア: {score} / {correctAnswer.length}</p>
            <p className="mt-2">正解: {correctAnswer.map(formatAnswer).join(", ")}</p>
        </div>
    );
};

export default QuizResult;