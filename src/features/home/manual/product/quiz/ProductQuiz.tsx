import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product, QuizAnswerItem, getQuizAnswerByProduct, productData } from '@/data/productData';
import { saveQuizResult } from '@/lib/firebase';
import ProductImage from './ProductImage';
import MaterialSelector from './MaterialSelector';
import QuizResult from './QuizResult';
import NavigationButtons from './NavigationButtons';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InstructionDialog } from './InstructionCarousel';
import { ProductQuizProps } from '@/types/types';
import { useToast } from "@/components/ui/use-toast";

const ProductQuiz: React.FC<ProductQuizProps> = ({ productName }) => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [correctAnswer, setCorrectAnswer] = useState<QuizAnswerItem[]>([]);
    const [score, setScore] = useState<number>(0);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
    const [showInstructionCarousel, setShowInstructionCarousel] = useState<boolean>(false);
    const [answerChecked, setAnswerChecked] = useState<boolean>(false);
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

        if (user && product && !answerChecked) {
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

    const handleCheckAnswer = () => {
        setShowConfirmDialog(true);
    };

    const handleConfirmCheckAnswer = () => {
        setAnswerChecked(true);
        setShowConfirmDialog(false);
        setShowInstructionCarousel(true);
    };

    const handleNextQuestion = () => {
        // Find the index of the current product
        const currentIndex = productData.findIndex(p => p.name === productName);

        // Get the next product (or loop back to the first if we're at the end)
        const nextProduct = productData[(currentIndex + 1) % productData.length];

        // Navigate to the next product's quiz page
        router.push(`/home/manual/${encodeURIComponent(nextProduct.name)}/quiz`);
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
                    <p className="text-sm text-gray-500 text-center mt-2">
                        コツ : 作る工程を頭で想像しながら順番に選択しよう
                    </p>
                </CardHeader>
                <CardContent>
                    <ProductImage product={product} />
                    <Button onClick={handleCheckAnswer} className="mt-4 mb-4 w-full">
                        答えを確認する
                    </Button>
                    <MaterialSelector
                        correctAnswer={correctAnswer}
                        product={product}
                        onSubmit={handleSubmit}
                        submitted={submitted}
                    />
                    {submitted && (
                        <QuizResult
                            score={score}
                            correctAnswer={correctAnswer}
                            productName={productName}
                            answerChecked={answerChecked}
                            onNextQuestion={handleNextQuestion}
                        />
                    )}
                </CardContent>
            </Card>
            <NavigationButtons productName={productName} />

            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>答えを確認しますか？</AlertDialogTitle>
                        <AlertDialogDescription>
                            答えを確認すると、実績に反映されなくなります。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>いいえ</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmCheckAnswer}>はい</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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