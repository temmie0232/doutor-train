import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productData, Product } from '@/data/productData';
import ProductImage from '@/features/home/manual/product/quiz/ProductImage';
import MaterialSelector from '@/features/home/manual/product/quiz/MaterialSelector';
import { getUserProgress, updateUserProgress, getNextDueCard } from '@/lib/spaced-repetition';

const TrainingCategoryPage: React.FC = () => {
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            loadNextCard();
        }
    }, [user]);

    const loadNextCard = async () => {
        if (!user) return;
        setLoading(true);
        const progress = await getUserProgress(user.uid);
        const nextProductId = getNextDueCard(progress);
        if (nextProductId) {
            const product = productData.find(p => p.name === nextProductId);
            setCurrentProduct(product || null);
        } else {
            setCurrentProduct(null);
        }
        setSubmitted(false);
        setScore(0);
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
                    <h1 className="text-2xl font-bold mb-4">問題の読み込みに失敗しました</h1>
                    <p>しばらくしてからもう一度お試しください。</p>
                    <Button onClick={loadNextCard} className="mt-4">再読み込み</Button>
                </div>
            </Layout>
        );
    }

    if (!currentProduct) {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">全ての復習が完了しました！</h1>
                    <p>新しい復習カードが利用可能になるまでお待ちください。</p>
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
                            <div className="mt-4">
                                <h3 className="text-xl font-bold mb-2">あなたの理解度は？</h3>
                                <div className="flex justify-between">
                                    {['全くわからない', '難しい', '今回は正解', '楽勝'].map((label, index) => (
                                        <Button key={index} onClick={() => handleRating(index + 1)}>
                                            {label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default TrainingCategoryPage;