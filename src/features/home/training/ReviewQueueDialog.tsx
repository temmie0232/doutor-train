import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardDetails } from '@/types/types';

interface ReviewQueueDialogProps {
    isOpen: boolean;
    onClose: () => void;
    category: string;
    queue: {
        newCards: CardDetails[];
        reviewCards: CardDetails[];
    };
}

const ReviewQueueDialog: React.FC<ReviewQueueDialogProps> = ({
    isOpen,
    onClose,
    category,
    queue
}) => {
    const getCategoryTitle = (cat: string) => {
        switch (cat) {
            case 'hot':
                return 'ホットドリンク';
            case 'ice':
                return 'アイスドリンク';
            case 'food':
                return 'フード';
            default:
                return '';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{getCategoryTitle(category)}の学習キュー</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[60vh] mt-4 pr-4">
                    <h3 className="font-semibold mb-2">新規カード ({queue.newCards.length})</h3>
                    <ul className="list-disc pl-5 mb-4">
                        {queue.newCards.map((card, index) => (
                            <li key={`new-${card.productId}-${index}`}>
                                {card.productName}
                                <span className="text-sm text-gray-500 ml-2">
                                    (正解回数: {card.correctCount})
                                </span>
                            </li>
                        ))}
                    </ul>
                    <Separator className="my-4" />
                    <h3 className="font-semibold mb-2">復習カード ({queue.reviewCards.length})</h3>
                    <ul className="list-disc pl-5">
                        {queue.reviewCards.map((card, index) => (
                            <li key={`review-${card.productId}-${index}`}>
                                {card.productName}
                                <span className="text-sm text-gray-500 ml-2">
                                    (間隔: {card.interval}日, 難易度: {card.easeFactor.toFixed(2)})
                                </span>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
                <Button onClick={onClose} className="mt-4">閉じる</Button>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewQueueDialog;