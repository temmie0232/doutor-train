
"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productInstructions, Instruction } from '@/data/productInstructions';

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

const QuizPage: React.FC<{ params: { productID: string } }> = ({ params }) => {
    const router = useRouter();
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const productName = decodeURIComponent(params.productID);
        const instructions = productInstructions[productName] || [];
        const generatedQuestions = generateQuizQuestions(instructions);
        setQuestions(generatedQuestions);
    }, [params.productID]);

    const generateQuizQuestions = (instructions: string[][]): QuizQuestion[] => {
        // ここでクイズの質問を生成するロジックを実装
        // 例: 各手順から質問を作成し、他の手順から不正解の選択肢を生成
        // 実際の実装では、より洗練された質問生成ロジックが必要です
        return instructions.map((step, index) => ({
            question: `ステップ${index + 1}で正しい手順は？`,
            options: [
                step[0],
                instructions[(index + 1) % instructions.length][0],
                instructions[(index + 2) % instructions.length][0],
                instructions[(index + 3) % instructions.length][0],
            ].sort(() => Math.random() - 0.5),
            correctAnswer: step[0],
        }));
    };

    const handleAnswer = (selectedAnswer: string) => {
        if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
    };

    if (questions.length === 0) {
        return <Layout><div>Loading...</div></Layout>;
    }

    if (showResult) {
        return (
            <Layout>
                <Card>
                    <CardHeader>
                        <CardTitle>クイズ結果</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>正解数: {score} / {questions.length}</p>
                        <Button onClick={restartQuiz}>もう一度挑戦</Button>
                        <Button onClick={() => router.back()}>商品詳細に戻る</Button>
                    </CardContent>
                </Card>
            </Layout>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>質問 {currentQuestionIndex + 1} / {questions.length}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{currentQuestion.question}</p>
                    {currentQuestion.options.map((option, index) => (
                        <Button key={index} onClick={() => handleAnswer(option)} className="m-2">
                            {option}
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </Layout>
    );
};

export default QuizPage;