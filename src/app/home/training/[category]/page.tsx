"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import Layout from '@/components/layout/Layout';
import { Product, QuizAnswerItem, getQuizAnswerByProduct, productData } from '@/data/productData';
import { saveQuizResult, getQuizResults, saveStudyCardProgress, getStudyCards, updateStudySession, getStudySession } from '@/lib/firebase';
import ProductImage from '@/features/home/manual/product/quiz/ProductImage';
import MaterialSelector from '@/features/home/manual/product/quiz/MaterialSelector';
import { StudySession } from '@/lib/spaced-repetition/studySession';
import { Card as StudyCard, Grade } from '@/lib/spaced-repetition/types';
import InstructionCarousel from '@/features/home/manual/product/quiz/InstructionCarousel';

interface TrainingQuizPageProps {
    params: { category: string };
}

const TrainingQuizPage: React.FC<TrainingQuizPageProps> = ({ params }) => {
    const router = useRouter();
    const { user } = useAuth();
    const [studySession, setStudySession] = useState<StudySession | null>(null);
    const [currentCard, setCurrentCard] = useState<StudyCard | null>(null);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState<QuizAnswerItem[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [selfEvaluation, setSelfEvaluation] = useState<Grade | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [sessionState, setSessionState] = useState({
        newCardsStudied: 0,
        reviewCardsStudied: 0,
        totalNewCards: 0,
        totalReviewCards: 0,
    });
    const [showInstructions, setShowInstructions] = useState(false);
    const [materialSelectorKey, setMaterialSelectorKey] = useState(0);

    useEffect(() => {
        const initializeSession = async () => {
            if (user) {
                let studyCards: StudyCard[] = await getStudyCards(user.uid);

                if (studyCards.length === 0) {
                    // If no study cards exist, create them from product data
                    const quizResults = await getQuizResults(user.uid);
                    const categoryProducts = productData.filter(product => product.category === params.category);
                    studyCards = categoryProducts.map(product => {
                        const result = quizResults[product.name];
                        return {
                            id: product.name,
                            question: product.name,
                            answer: JSON.stringify(getQuizAnswerByProduct(product)),
                            correctAnswers: result ? result.totalQuestions : 0,
                            userAnswers: result ? result.score : 0,
                            isNew: !result,
                            difficulty: 2,
                            nextReviewDate: new Date(),
                            reviewCount: result ? 1 : 0,
                            correctCount: result ? result.score : 0,
                            interval: 1,
                            lastReviewDate: result ? result.lastAttemptDate : new Date(),
                            reviewHistory: result ? [{ date: result.lastAttemptDate, score: result.score / result.totalQuestions }] : []
                        };
                    });

                    // Save new study cards to Firebase
                    for (const card of studyCards) {
                        await saveStudyCardProgress(user.uid, card);
                    }
                }

                const sessionConfig = {
                    maxNewCardsPerDay: 3,
                    maxReviewCardsPerDay: 20,
                };

                const savedSession = await getStudySession(user.uid);
                const newStudySession = new StudySession(studyCards, sessionConfig);

                if (savedSession) {
                    newStudySession.restoreSession(savedSession);
                }

                setStudySession(newStudySession);
                getNextCard(newStudySession);
            }
        };

        initializeSession();
    }, [params.category, user]);

    const getNextCard = (session: StudySession) => {
        const nextCard = session.getNextCard();
        if (nextCard) {
            setCurrentCard(nextCard);
            const product = productData.find(p => p.name === nextCard.question);
            if (product) {
                setCurrentProduct(product);
                setCorrectAnswer(getQuizAnswerByProduct(product));
            }
            setSubmitted(false);
            setScore(0);
            setSelfEvaluation(null);
            setError(null);
            setSessionState(session.getSessionState());
            setMaterialSelectorKey(prev => prev + 1); // MaterialSelectorをリセット

            // Save session state to Firebase
            if (user) {
                const sessionState = session.getSessionState();
                updateStudySession(user.uid, {
                    ...sessionState,
                    lastStudyDate: new Date().toISOString()
                });
            }
        } else {
            // No more cards to study
            router.push('/home/training');
        }
    };

    const handleSubmit = async (quizScore: number) => {
        setSubmitted(true);
        setScore(quizScore);

        if (user && currentProduct && currentCard && studySession) {
            if (currentCard.reviewCount === 0) {
                // New card
                const updatedCard = studySession.answerNewCard(currentCard, quizScore === correctAnswer.length);
                await saveQuizResult(user.uid, currentProduct.name, quizScore, correctAnswer.length);
                await saveStudyCardProgress(user.uid, updatedCard);
                setCurrentCard(updatedCard);
            }
            // For review cards, wait for self-evaluation
        }
    };

    const handleSelfEvaluation = async (grade: Grade) => {
        if (currentCard && studySession && user) {
            setSelfEvaluation(grade);
            const updatedCard = studySession.answerReviewCard(currentCard, grade);
            setCurrentCard(updatedCard);
            await saveQuizResult(user.uid, currentCard.question, score, correctAnswer.length);
            await saveStudyCardProgress(user.uid, updatedCard);
        }
    };

    const handleNextQuestion = () => {
        if (currentCard?.reviewCount !== 0 && selfEvaluation === null) {
            setError("復習カードの場合は、自己評価を行ってから次の問題に進んでください。");
            return;
        }
        setShowInstructions(false);
        if (studySession) {
            getNextCard(studySession);
        }
    };

    const formatAnswer = (answer: QuizAnswerItem): JSX.Element => {
        let details: string[] = [];

        if (answer.attributes) {
            if (answer.item === 'カップ') {
                details.push(...Object.entries(answer.attributes)
                    .filter(([key]) => key !== 'type')
                    .map(([key, value]) => `${key}: ${value}`));
            } else {
                details.push(...Object.entries(answer.attributes).map(([key, value]) => `${key}: ${value}`));
            }
        }
        if (answer.sizeDependent) {
            details.push(...Object.entries(answer.sizeDependent).map(([size, value]) => `${size}サイズ: ${value}`));
        }
        if (answer.quantity) {
            if (typeof answer.quantity === 'number') {
                details.push(`数量: ${answer.quantity}`);
            } else {
                details.push(...Object.entries(answer.quantity).map(([size, count]) => `${size}サイズ: ${count}個`));
            }
        }

        return (
            <li key={answer.item} className="mb-2">
                <span className="font-semibold">{answer.item}</span>
                {details.length > 0 && (
                    <ul className="list-disc list-inside ml-4 text-sm text-gray-600">
                        {details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                )}
            </li>
        );
    };

    if (!currentProduct || !currentCard) {
        return <Layout><div>Loading...</div></Layout>;
    }

    return (
        <Layout>
            <div className="w-full max-w-4xl mx-auto">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            {currentProduct.name} を作るためには？
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <p>新規カード: {sessionState.newCardsStudied} / {sessionState.totalNewCards}</p>
                            <Progress value={(sessionState.newCardsStudied / sessionState.totalNewCards) * 100} className="mb-2" />
                            <p>復習カード: {sessionState.reviewCardsStudied} / {sessionState.totalReviewCards}</p>
                            <Progress value={(sessionState.reviewCardsStudied / sessionState.totalReviewCards) * 100} />
                        </div>
                        <ProductImage product={currentProduct} />
                        {currentProduct && (
                            <MaterialSelector
                                key={materialSelectorKey}
                                correctAnswer={correctAnswer}
                                product={currentProduct}
                                onSubmit={handleSubmit}
                            />
                        )}
                        {submitted && (
                            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">クイズ結果</h3>
                                <p className="text-lg mb-4">スコア: <span className="font-semibold">{score}</span> / {correctAnswer.length}</p>
                                <div className="mb-4">
                                    <h4 className="text-lg font-semibold mb-2">正解:</h4>
                                    <ul className="list-none">
                                        {correctAnswer.map(formatAnswer)}
                                    </ul>
                                </div>
                                <Button onClick={() => setShowInstructions(true)} className="mb-4">
                                    作り方を確認
                                </Button>
                                {currentCard.reviewCount !== 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-lg font-semibold mb-2">自己評価:</h4>
                                        <RadioGroup value={selfEvaluation?.toString()} onValueChange={(value) => handleSelfEvaluation(parseInt(value) as Grade)}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="1" id="r1" />
                                                <Label htmlFor="r1">1 - だめだめ</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="2" id="r2" />
                                                <Label htmlFor="r2">2 - 難しい</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="3" id="r3" />
                                                <Label htmlFor="r3">3 - 今回は正解した</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="4" id="r4" />
                                                <Label htmlFor="r4">4 - 楽勝</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                )}
                                {(currentCard.reviewCount === 0 || selfEvaluation !== null) && (
                                    <Button
                                        onClick={handleNextQuestion}
                                        className="mt-4 w-full bg-black text-white hover:bg-gray-800"
                                    >
                                        次の問題
                                    </Button>
                                )}
                            </div>
                        )}
                        {error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </div>
            {showInstructions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4">{currentProduct.name}の作り方</h2>
                        <InstructionCarousel
                            productName={currentProduct.name}
                            instructions={currentProduct.instructions}
                        />
                        <Button onClick={() => setShowInstructions(false)} className="mt-4">
                            閉じる
                        </Button>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default TrainingQuizPage;