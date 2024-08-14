import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InstructionDialog } from './InstructionCarousel';
import { QuizResultProps } from '@/types/types';
import { productData, QuizAnswerItem } from '@/data/productData';

interface ManualQuizResultProps extends Omit<QuizResultProps, 'answerChecked' | 'onNextQuestion'> {
    onBackToInstructions: () => void;
    onBackToProductList: () => void;
}

const ManualQuizResult: React.FC<ManualQuizResultProps> = ({
    score,
    correctAnswer,
    productName,
    onBackToInstructions,
    onBackToProductList
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const product = productData.find(p => p.name === productName);

    const formatAnswer = (answer: QuizAnswerItem): JSX.Element => {
        let details: string[] = [];

        if (answer.item === 'カップ' && answer.sizeDependent) {
            details = Object.entries(answer.sizeDependent)
                .filter(([_, value]) => value !== null)
                .map(([size, value]) => `${size}サイズ: ${value}`);
        } else if (answer.attributes) {
            details = Object.entries(answer.attributes)
                .filter(([key]) => key !== 'type')
                .map(([key, value]) => `${key}: ${value}`);
        }

        if (answer.sizeDependent && answer.item !== 'カップ') {
            details.push(...Object.entries(answer.sizeDependent)
                .filter(([_, value]) => value !== null)
                .map(([size, value]) => `${size}サイズ: ${value}`));
        }

        if (answer.quantity) {
            if (typeof answer.quantity === 'number') {
                details.push(`数量: ${answer.quantity}`);
            } else {
                details.push(...Object.entries(answer.quantity)
                    .filter(([_, count]) => count !== null && count !== 0)
                    .map(([size, count]) => `${size}サイズ: ${count}個`));
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

    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold mb-2">クイズ結果</h3>
            <p className="text-lg mb-4">スコア: <span className="font-semibold">{score}</span> / {correctAnswer.length}</p>
            <div>
                <h4 className="text-lg font-semibold mb-2">正解:</h4>
                <ul className="list-none">
                    {correctAnswer.map(formatAnswer)}
                </ul>
            </div>
            <Button
                onClick={() => setIsDialogOpen(true)}
                className="w-full mt-4 bg-black text-white"
            >
                作り方を確認する
            </Button>
            <Separator className="my-7" />
            <div className="flex justify-between">
                <Button
                    onClick={onBackToInstructions}
                    className="flex-1 mr-2 bg-black text-white"
                >
                    作り方に戻る
                </Button>
                <Button
                    onClick={onBackToProductList}
                    className="flex-1 ml-2  bg-gray-200 text-black"
                >
                    商品リストに戻る
                </Button>
            </div>

            {product && (
                <InstructionDialog
                    productName={productName}
                    instructions={product.instructions}
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                />
            )}
        </div>
    );
};

export default ManualQuizResult;