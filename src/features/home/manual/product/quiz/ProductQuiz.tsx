import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product, QuizAnswerItem, getQuizAnswerByProduct, productData } from '@/data/productData';
import { saveQuizResult } from '@/lib/firebase';
import ProductImage from './ProductImage';
import MaterialSelector from './MaterialSelector';
import ManualQuizResult from './ManualQuizResult';
import { InstructionDialog } from './InstructionCarousel';
import { ProductQuizProps } from '@/types/types';
import { useToast } from "@/components/ui/use-toast";

const ProductQuiz: React.FC<ProductQuizProps> = ({ productName }) => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [correctAnswer, setCorrectAnswer] = useState<QuizAnswerItem[]>([]);
    const [score, setScore] = useState<number>(0);
    const [showInstructionCarousel, setShowInstructionCarousel] = useState<boolean>(false);
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const router = useRouter();
    const { user } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        const foundProduct = productData.find(p => p.name === productName);
        if (foundProduct) {
            setProduct(foundProduct);
            const answer = getQuizAnswerByProduct(foundProduct);
            setCorrectAnswer(answer);
        }
    }, [productName]);

    const handleSubmit = async (quizScore: number) => {
        setSubmitted(true);
        setScore(quizScore);

        if (user && product) {
            try {
                await saveQuizResult(user.uid, product.name, quizScore, correctAnswer.length);
                toast({
                    title: "クイズ結果を保存しました",
                    description: "あなたの進捗が更新されました。",
                });
            } catch (error) {
                console.error("Error saving quiz result:", error);
                toast({
                    title: "エラー",
                    description: "クイズ結果の保存中にエラーが発生しました。",
                    variant: "destructive",
                });
            }
        }
    };

    const handleBackToInstructions = () => {
        router.push(`/home/manual/${encodeURIComponent(productName)}`);
    };

    const handleBackToProductList = () => {
        router.push('/home/manual');
    };

    if (!product) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">商品が見つかりません</h1>
                <p className="mb-4">検索した商品名: {productName}</p>
                <Button onClick={() => router.back()}>戻る</Button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        {productName} を作るためには？
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductImage product={product} />
                    <MaterialSelector
                        correctAnswer={correctAnswer}
                        product={product}
                        onSubmit={handleSubmit}
                        submitted={submitted}
                    />
                    {submitted && (
                        <ManualQuizResult
                            score={score}
                            correctAnswer={correctAnswer}
                            productName={productName}
                            onBackToInstructions={handleBackToInstructions}
                            onBackToProductList={handleBackToProductList}
                        />
                    )}
                </CardContent>
            </Card>
            <InstructionDialog
                productName={productName}
                instructions={product.instructions}
                isOpen={showInstructionCarousel}
                onClose={() => setShowInstructionCarousel(false)}
            />
        </div>
    );
};

export default ProductQuiz;