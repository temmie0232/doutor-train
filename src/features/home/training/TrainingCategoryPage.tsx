import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productData, Product } from '@/data/productData';
import { getQuizResults } from '@/lib/firebase';
import ProductImage from '@/features/home/manual/product/quiz/ProductImage';
import MaterialSelector from '@/features/home/manual/product/quiz/MaterialSelector';
import QuizResult from '@/features/home/manual/product/quiz/QuizResult';

interface TrainingCategoryPageProps {
    category: 'hot' | 'ice' | 'food';
}

const TrainingCategoryPage: React.FC<TrainingCategoryPageProps> = ({ category }) => {
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [quizResults, setQuizResults] = useState<{ [key: string]: { score: number; totalQuestions: number } }>({});
    const router = useRouter();
    const { user } = useAuth();

    const categoryProducts = productData.filter(product => product.category === category);
    const currentProduct = categoryProducts[currentProductIndex];

    useEffect(() => {
        const fetchQuizResults = async () => {
            if (user) {
                const results = await getQuizResults(user.uid);
                setQuizResults(results || {});
            }
        };
        fetchQuizResults();
    }, [user]);

    const handleSubmit = async (quizScore: number) => {
        setSubmitted(true);
        setScore(quizScore);
    };

    const handleNextQuestion = () => {
        if (currentProductIndex < categoryProducts.length - 1) {
            setCurrentProductIndex(prev => prev + 1);
            setSubmitted(false);
            setScore(0);
        } else {
            router.push('/home/training');
        }
    };

    if (!currentProduct) {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">No products found in this category</h1>
                    <Button onClick={() => router.push('/home/training')}>トレーニングメニューに戻る</Button>
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
                            key={currentProduct.name}  // This is important
                            correctAnswer={currentProduct.quizAnswers}
                            product={currentProduct}
                            onSubmit={handleSubmit}
                            submitted={submitted}
                        />
                        {submitted && (
                            <QuizResult
                                score={score}
                                correctAnswer={currentProduct.quizAnswers}
                                productName={currentProduct.name}
                                answerChecked={false}
                                onNextQuestion={handleNextQuestion}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default TrainingCategoryPage;