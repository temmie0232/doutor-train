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
    newCards: CardDetails[];
    reviewCards: CardDetails[];
}

const ReviewQueueDialog: React.FC<ReviewQueueDialogProps> = ({
    isOpen,
    onClose,
    category,
    newCards,
    reviewCards
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
                    <h3 className="font-semibold mb-2">新規カード ({newCards.length})</h3>
                    <ul className="list-disc pl-5 mb-4">
                        {newCards.map((card, index) => (
                            <li key={`new-${card.productId}-${index}`}>{card.productId}</li>
                        ))}
                    </ul>
                    <Separator className="my-4" />
                    <h3 className="font-semibold mb-2">復習カード ({reviewCards.length})</h3>
                    <ul className="list-disc pl-5">
                        {reviewCards.map((card, index) => (
                            <li key={`review-${card.productId}-${index}`}>{card.productId}</li>
                        ))}
                    </ul>
                </ScrollArea>
                <Button onClick={onClose} className="mt-4">閉じる</Button>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewQueueDialog;