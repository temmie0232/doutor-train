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
            <Separator className="my-10" />
            <div className="mt-8">
                <Button onClick={onQuizClick} className="w-full mb-4">
                    クイズに挑戦
                </Button>
                <Button onClick={onBackClick} className="w-full">商品リストに戻る</Button>
            </div>
        </>
    );
};

export default ProductActions;