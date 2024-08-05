import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product, products } from '@/data/products';
import { getQuizAnswerByProduct, QuizAnswerItem } from '@/data/quizAnswers';
import ProductImage from './ProductImage';
import MaterialSelector from './MaterialSelector';
import QuizResult from './QuizResult';
import NavigationButtons from './NavigationButtons';

interface ProductQuizProps {
    productName: string;
}

const ProductQuiz: React.FC<ProductQuizProps> = ({ productName }) => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [correctAnswer, setCorrectAnswer] = useState<QuizAnswerItem[]>([]);
    const [score, setScore] = useState<number>(0);
    const product: Product | undefined = products.find(p => p.name === productName);
    const router = useRouter();

    useEffect(() => {
        if (product) {
            const answer = getQuizAnswerByProduct(product);
            setCorrectAnswer(answer);
        }
    }, [productName, product]);

    const handleSubmit = (quizScore: number) => {
        setSubmitted(true);
        setScore(quizScore);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        {productName}を作るために必要なものを選択してみよう
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductImage product={product} />
                    {product && (
                        <MaterialSelector
                            correctAnswer={correctAnswer}
                            product={product}
                            onSubmit={handleSubmit}
                        />
                    )}
                    {submitted && (
                        <QuizResult score={score} correctAnswer={correctAnswer} />
                    )}
                </CardContent>
            </Card>
            <NavigationButtons productName={productName} />
        </div>
    );
};

export default ProductQuiz;