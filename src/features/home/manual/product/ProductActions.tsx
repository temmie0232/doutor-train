import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProductActionsProps {
    onQuizClick: () => void;
    onBackClick: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ onQuizClick, onBackClick }) => {
    return (
        <>
            <Separator className="my-8" />
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    onClick={onQuizClick}
                    className="flex-1 bg-black text-whitebg-zinc-800 text-white"
                >
                    クイズに挑戦
                </Button>
                <Button
                    onClick={onBackClick}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                    variant="outline"
                >
                    商品リストに戻る
                </Button>
            </div>
        </>
    );
};

export default ProductActions;