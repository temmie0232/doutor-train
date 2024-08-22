import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productData, Product, QuizAnswerItem } from '@/data/productData';
import { InstructionDialog } from '@/features/home/manual/product/quiz/InstructionCarousel';
import { getUserProgress, updateUserProgress, saveUserQueues } from '@/lib/spaced-repetition';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { useToast } from "@/components/ui/use-toast";
import { Toast } from "@/components/ui/toast";
import ProductImage from '@/features/home/manual/product/quiz/ProductImage';
import MaterialSelector from '@/features/home/manual/product/quiz/MaterialSelector';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import ProgressToast from './progressToast';

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
    const [userProgress, setUserProgress] = useState<any>(null);
    const [progressBefore, setProgressBefore] = useState({ new: 0, review: 0 });
    const [progressAfter, setProgressAfter] = useState({ new: 0, review: 0 });
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (user) {
            loadNextCard().catch(error => {
                console.error("Error loading next card:", error);
                toast({
                    title: "エラー",
                    description: "カードの読み込み中にエラーが発生しました。",
                    variant: "destructive",
                });
            });
        }
    }, [user, category]);

    const loadNextCard = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const progress = await getUserProgress(user.uid);
            setUserProgress(progress);

            let nextProductId: string | undefined;
            if (progress[`${category}NewQueue`].length > 0) {
                nextProductId = progress[`${category}NewQueue`][0];
            } else if (progress[`${category}ReviewQueue`].length > 0) {
                nextProductId = progress[`${category}ReviewQueue`][0];
            }

            if (nextProductId) {
                const product = productData.find(p => p.productID.toString() === nextProductId);
                if (product && product.category === category) {
                    setCurrentProduct(product);
                } else {
                    setCurrentProduct(null);
                }
            } else {
                setCurrentProduct(null);
            }
            setSubmitted(false);
            setScore(0);
            setShowInstructions(false);
        } catch (error) {
            console.error("Error in loadNextCard:", error);
            toast({
                title: "エラー",
                description: "データの読み込み中にエラーが発生しました。",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (quizScore: number) => {
        setSubmitted(true);
        setScore(quizScore);

        if (!user || !currentProduct || !userProgress) return;

        const cardData = userProgress.cards[currentProduct.productID];
        const isNewCard = cardData.isNew;
        const totalQuestions = currentProduct.quizAnswers.length;
        const scorePercentage = (quizScore / totalQuestions) * 100;

        // 進捗更新前の状態を保存
        setProgressBefore({
            new: userProgress[`${category}NewQueue`].length,
            review: userProgress[`${category}ReviewQueue`].length
        });

        try {
            await updateUserProgress(user.uid, currentProduct.productID.toString(), scorePercentage);
            const updatedProgress = await getUserProgress(user.uid);
            setUserProgress(updatedProgress);

            // 進捗更新後の状態を保存
            setProgressAfter({
                new: updatedProgress[`${category}NewQueue`].length,
                review: updatedProgress[`${category}ReviewQueue`].length
            });

            // 進捗が変化した場合、トーストを表示
            if (isNewCard) {
                if (progressBefore.new !== progressAfter.new) {
                    showProgressToast(
                        'new',
                        progressBefore.new,
                        progressAfter.new,
                        updatedProgress[`${category}NewCardsAddedToday`]
                    );
                }
            } else {
                if (progressBefore.review !== progressAfter.review) {
                    showProgressToast(
                        'review',
                        progressBefore.review,
                        progressAfter.review,
                        updatedProgress[`${category}ReviewCardsAddedToday`]
                    );
                }
            }
        } catch (error) {
            console.error("Error updating user progress:", error);
            toast({
                title: "エラー",
                description: "進捗の更新中にエラーが発生しました。",
                variant: "destructive",
            });
        }
    };

    const handleRating = async (rating: number) => {
        if (!user || !currentProduct || !userProgress) return;
        try {
            await updateUserProgress(user.uid, currentProduct.productID.toString(), rating * 25);
            loadNextCard();
        } catch (error) {
            console.error("Error in handleRating:", error);
            toast({
                title: "エラー",
                description: "評価の保存中にエラーが発生しました。",
                variant: "destructive",
            });
        }
    };

    const handleNextQuestion = () => {
        loadNextCard();
    };

    const getNextDueDays = (rating: number): number => {
        if (!currentProduct || !userProgress) return 0;
        const card = userProgress.cards[currentProduct.productID];
        let interval;
        switch (rating) {
            case 1: interval = 1; break;
            case 2: interval = Math.max(1, Math.floor(card.interval * 0.5)); break;
            case 3: interval = card.interval * card.easeFactor; break;
            case 4: interval = card.interval * card.easeFactor * 1.3; break;
            default: interval = 1;
        }
        return Math.round(interval);
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

    const showProgressToast = (type: 'new' | 'review', before: number, after: number, total: number) => {
        toast({
            description: (
                <ProgressToast
                    category={category}
                    type={type}
                    before={before}
                    after={after}
                    total={total}
                />
            ),
            duration: 3000,
        });
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
                        本日の学習は完了しました！
                    </h1>
                    <p>明日また新しいカードが利用可能になります。</p>
                    <Button onClick={() => router.push('/home/training')} className="mt-4">トレーニングメニューに戻る</Button>
                </div>
            </Layout>
        );
    }

    const isNewCard = userProgress?.cards[currentProduct.productID]?.isNew;

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
                            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                                <h3 className="text-xl font-bold mb-4">結果</h3>
                                <p className="text-lg mb-4">
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
                                <div className="flex flex-col items-center">
                                    <Button className="my-4" onClick={() => setShowInstructions(true)}>
                                        作り方を確認する
                                    </Button>
                                    {isNewCard ? (
                                        <Button onClick={handleNextQuestion} className="w-full max-w-xs">
                                            次の問題へ
                                        </Button>
                                    ) : (
                                        <>
                                            <div className="w-full h-px bg-gray-300 my-4"></div>
                                            <div className="flex items-center justify-between w-full mb-3">
                                                <h4 className="text-lg font-semibold">あなたの理解度は？</h4>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowInfoDialog(true)}
                                                >
                                                    <IoIosInformationCircleOutline size={24} />
                                                </Button>
                                            </div>
                                            {['完全に忘れていた', '思い出すのに苦労した', '少し努力して思い出した', '完璧に覚えていた'].map((label, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={() => handleRating(index + 1)}
                                                    className="w-full max-w-xs my-2"
                                                >
                                                    {label}
                                                </Button>
                                            ))}
                                        </>
                                    )}
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
                            <li>難易度係数: {userProgress?.cards[currentProduct.productID]?.easeFactor.toFixed(2) || 'N/A'}</li>
                            <li>前回の間隔: {userProgress?.cards[currentProduct.productID]?.interval || 'N/A'}日</li>
                        </ul>
                        <p className="mb-2">各評価に対する次回表示までの日数：</p>
                        <ul className="list-disc list-inside mb-4">
                            <li>完全に忘れていた: {getNextDueDays(1)}日後</li>
                            <li>思い出すのに苦労した: {getNextDueDays(2)}日後</li>
                            <li>少し努力して思い出した: {getNextDueDays(3)}日後</li>
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