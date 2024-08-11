import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { productData, Product, QuizAnswerItem } from '@/data/productData';
import ProductImage from '@/features/home/manual/product/quiz/ProductImage';
import MaterialSelector from '@/features/home/manual/product/quiz/MaterialSelector';
import InstructionCarousel from '@/features/home/manual/product/quiz/InstructionCarousel';
import { getUserProgress, updateUserProgress, getNextDueCard } from '@/lib/spaced-repetition';

interface TrainingCategoryPageProps {
    category: 'hot' | 'ice' | 'food';
}

const TrainingCategoryPage: React.FC<TrainingCategoryPageProps> = ({ category }) => {
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showInstructions, setShowInstructions] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            loadNextCard();
        }
    }, [user, category]);

    const loadNextCard = async () => {
        if (!user) return;
        setLoading(true);
        const progress = await getUserProgress(user.uid);
        const filteredProducts = productData.filter(p => p.category === category);
        const nextProductId = getNextDueCard(progress, filteredProducts);
        if (nextProductId) {
            const product = filteredProducts.find(p => p.name === nextProductId);
            setCurrentProduct(product || null);
        } else {
            setCurrentProduct(null);
        }
        setSubmitted(false);
        setScore(0);
        setShowInstructions(false);
        setLoading(false);
    };

    const handleSubmit = async (quizScore: number) => {
        setSubmitted(true);
        setScore(quizScore);
    };

    const handleRating = async (rating: number) => {
        if (!user || !currentProduct) return;
        await updateUserProgress(user.uid, currentProduct.name, rating);
        loadNextCard();
    };

    const formatAnswer = (answer: QuizAnswerItem): string => {
        let result = answer.item;
        if (answer.attributes) {
            result += ` (${Object.entries(answer.attributes).map(([key, value]) => `${key}: ${value}`).join(', ')})`;
        }
        if (answer.sizeDependent) {
            result += ` (${Object.entries(answer.sizeDependent).filter(([_, value]) => value !== null).map(([size, value]) => `${size}: ${value}`).join(', ')})`;
        }
        if (answer.quantity) {
            if (typeof answer.quantity === 'number') {
                result += ` (数量: ${answer.quantity})`;
            } else {
                result += ` (${Object.entries(answer.quantity).filter(([_, count]) => count !== 0).map(([size, count]) => `${size}: ${count}`).join(', ')})`;
            }
        }
        return result;
    };

    if (loading) {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">読み込み中...</h1>
                </div>
            </Layout>
        );
    }

    if (!currentProduct) {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        {loading ? "問題の読み込みに失敗しました" : "全ての復習が完了しました！"}
                    </h1>
                    <p>
                        {loading
                            ? "しばらくしてからもう一度お試しください。"
                            : "新しい復習カードが利用可能になるまでお待ちください。"}
                    </p>
                    {loading && (
                        <Button onClick={loadNextCard} className="mt-4">再読み込み</Button>
                    )}
                </div>
            </Layout>
        );
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
                        <ProductImage product={currentProduct} />
                        <MaterialSelector
                            key={currentProduct.name}
                            correctAnswer={currentProduct.quizAnswers}
                            product={currentProduct}
                            onSubmit={handleSubmit}
                            submitted={submitted}
                        />
                        {submitted && (
                            <div className="mt-8">
                                <h3 className="text-xl font-bold mb-4 text-center">結果</h3>
                                <p className="text-center mb-4">
                                    スコア: {score} / {currentProduct.quizAnswers.length} ({Math.round(score / currentProduct.quizAnswers.length * 100)}%)
                                </p>
                                <div className="mb-4">
                                    <h4 className="text-lg font-semibold mb-2">正解:</h4>
                                    <ul className="list-disc list-inside">
                                        {currentProduct.quizAnswers.map((answer, index) => (
                                            <li key={index}>{formatAnswer(answer)}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col items-center space-y-4">
                                    <Button onClick={() => setShowInstructions(true)}>
                                        作り方を確認する
                                    </Button>
                                    <Separator className="my-4" />
                                    <h4 className="text-lg font-semibold mt-4">あなたの理解度は？</h4>
                                    {['完全に忘れていた', '思い出すのに苦労した', '少し努力して思い出し正解(100%)', '完璧に覚えていた'].map((label, index) => (
                                        <Button key={index} onClick={() => handleRating(index + 1)} className="w-full max-w-xs">
                                            {label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>{currentProduct.name}の作り方</DialogTitle>
                    </DialogHeader>
                    <InstructionCarousel
                        productName={currentProduct.name}
                        instructions={currentProduct.instructions}
                    />
                </DialogContent>
            </Dialog>
        </Layout>
    );
};

export default TrainingCategoryPage;