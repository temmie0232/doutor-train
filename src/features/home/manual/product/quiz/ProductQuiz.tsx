import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productData, Product, getQuizAnswerByProduct, QuizAnswerItem } from '@/data/productData';
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
import InstructionCarousel from './InstructionCarousel';

interface ProductQuizProps {
    productName: string;
}

const ProductQuiz: React.FC<ProductQuizProps> = ({ productName }) => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [correctAnswer, setCorrectAnswer] = useState<QuizAnswerItem[]>([]);
    const [score, setScore] = useState<number>(0);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
    const [showInstructionCarousel, setShowInstructionCarousel] = useState<boolean>(false);
    const [answerChecked, setAnswerChecked] = useState<boolean>(false);
    const product: Product | undefined = productData.find(p => p.name === productName);
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (product) {
            const answer = getQuizAnswerByProduct(product);
            setCorrectAnswer(answer);
        }
    }, [productName, product]);

    const handleSubmit = async (quizScore: number) => {
        setSubmitted(true);
        setScore(quizScore);

        if (user && product && !answerChecked) {
            await saveQuizResult(user.uid, product.name, quizScore, correctAnswer.length);
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
                    {product && (
                        <MaterialSelector
                            correctAnswer={correctAnswer}
                            product={product}
                            onSubmit={handleSubmit}
                        />
                    )}
                    {submitted && (
                        <QuizResult
                            score={score}
                            correctAnswer={correctAnswer}
                            productName={productName}
                            answerChecked={answerChecked}
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

            <AlertDialog open={showInstructionCarousel} onOpenChange={setShowInstructionCarousel}>
                <AlertDialogContent className="max-w-4xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{productName}の作り方</AlertDialogTitle>
                    </AlertDialogHeader>
                    <InstructionCarousel
                        productName={productName}
                        instructions={product?.instructions || []}
                    />
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowInstructionCarousel(false)}>
                            閉じる
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ProductQuiz;