import React from 'react';

interface QuizResultProps {
    score: number;
    correctAnswer: string[];
    selectedItems: string[];
}

const QuizResult: React.FC<QuizResultProps> = ({ score, correctAnswer, selectedItems }) => {
    return (
        <div className="mt-4 text-center">
            <p className="text-xl font-bold">スコア: {score} / {correctAnswer.length}</p>
            <p className="mt-2">正解: {correctAnswer.join(", ")}</p>
            <p>あなたの回答: {selectedItems.join(", ")}</p>
        </div>
    );
};

export default QuizResult;