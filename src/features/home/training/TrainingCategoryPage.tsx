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
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { productData, Product, QuizAnswerItem } from '@/data/productData';
import ProductImage from '@/features/home/manual/product/quiz/ProductImage';
import MaterialSelector from '@/features/home/manual/product/quiz/MaterialSelector';
import { InstructionDialog } from '@/features/home/manual/product/quiz/InstructionCarousel';
import { getUserProgress, updateUserProgress, getNextDueCard } from '@/lib/spaced-repetition';
import { IoIosInformationCircleOutline } from 'react-icons/io';

interface TrainingCategoryPageProps {
    category: 'hot' | 'ice' | 'food';
}

const TrainingCategoryPage: React.FC<TrainingCategoryPageProps> = ({ category }) => {
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showInstructions, setShowInstructions] = useState(false);
    const [showInfoDialog, setShowInfoDialog] = useState(false);
    const [currentCardData, setCurrentCardData] = useState<{ easeFactor: number, interval: number } | null>(null);
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
            setCurrentCardData(progress.cards[nextProductId]);
        } else {
            setCurrentProduct(null);
            setCurrentCardData(null);
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

    const getNextDueDays = (rating: number) => {
        if (!currentCardData) return 0;
        const { easeFactor } = currentCardData;
        let interval;
        switch (rating) {
            case 1:
                interval = 0;
                break;
            case 2:
                interval = Math.max(1, Math.floor(currentCardData.interval * 0.5));
                break;
            case 3:
                interval = currentCardData.interval === 0 ? 1 :
                    currentCardData.interval === 1 ? 3 :
                        Math.round(currentCardData.interval * easeFactor);
                break;
            case 4:
                interval = currentCardData.interval === 0 ? 2 :
                    currentCardData.interval === 1 ? 4 :
                        Math.round(currentCardData.interval * easeFactor * 1.2);
                break;
            default:
                interval = 0;
        }
        return interval;
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
                                    <div className="flex items-center justify-between w-full">
                                        <h4 className="text-lg font-semibold">あなたの理解度は？</h4>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowInfoDialog(true)}
                                        >
                                            <IoIosInformationCircleOutline size={24} />
                                        </Button>
                                    </div>
                                    {['完全に忘れていた', '思い出すのに苦労した', '少し努力して思い出し正解(100%)', '完璧に覚えていた'].map((label, index) => (
                                        <Button
                                            key={index}
                                            onClick={() => handleRating(index + 1)}
                                            className="w-full max-w-xs"
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <InstructionDialog
                productName={currentProduct.name}
                instructions={currentProduct.instructions}
                isOpen={showInstructions}
                onClose={() => setShowInstructions(false)}
            />
            <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>理解度評価と次回表示までの日数</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <p className="mb-2">現在のカードの状態：</p>
                        <ul className="list-disc list-inside mb-4">
                            <li>難易度係数: {currentCardData ? currentCardData.easeFactor.toFixed(2) : 'N/A'}</li>
                            <li>前回の間隔: {currentCardData ? `${currentCardData.interval}日` : 'N/A'}</li>
                        </ul>
                        <p className="mb-2">各評価に対する次回表示までの日数：</p>
                        <ul className="list-disc list-inside mb-4">
                            <li>完全に忘れていた: {getNextDueDays(1)}日後</li>
                            <li>思い出すのに苦労した: {getNextDueDays(2)}日後</li>
                            <li>少し努力して思い出し正解(100%): {getNextDueDays(3)}日後</li>
                            <li>完璧に覚えていた: {getNextDueDays(4)}日後</li>
                        </ul>
                        <p>※ これらの日数は、カードの現在の状態に基づいて計算されています。</p>
                        <p>頻繁に正解すると間隔が長くなり、間違えると短くなります。</p>
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={() => setShowInfoDialog(false)}>閉じる</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Layout>
    );
};

export default TrainingCategoryPage;