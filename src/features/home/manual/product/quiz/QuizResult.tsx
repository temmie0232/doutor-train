import React, { useState } from 'react';
import { productData, QuizAnswerItem } from '@/data/productData';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import InstructionCarousel from './InstructionCarousel';
import { Separator } from '@/components/ui/separator';
import { QuizResultProps } from '@/types/types';

const QuizResult: React.FC<QuizResultProps> = ({ score, correctAnswer, productName, answerChecked }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="mt-4" variant="outline">作り方を確認</Button>
                </DialogTrigger>
                <DialogContent className="w-5/6 max-w-5xl rounded-lg overflow-hidden">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl">{productName}の作り方</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                        <InstructionCarousel
                            productName={productName}
                            instructions={productData.find(p => p.name === productName)?.instructions || []}
                        />
                    </div>
                </DialogContent>
            </Dialog>
            <Separator className="my-4" />
            <p className="text-sm text-gray-600">
                {answerChecked
                    ? "答えを確認したため、今回の結果は反映されません。"
                    : "今回のテスト結果は、商品リストの右上に反映されます。"}
            </p>
        </div>
    );
};

export default QuizResult;