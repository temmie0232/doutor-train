import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CardDetails {
    productId: string;
    category: 'hot' | 'ice' | 'food';
    isNew: boolean;
    dueDate: Date;
}

interface ReviewInfoDialogProps {
    isOpen: boolean;
    onClose: () => void;
    cardDetails: CardDetails[];
    getNextDueDays: (dueDate: Date) => number;
}

const ReviewInfoDialog: React.FC<ReviewInfoDialogProps> = ({
    isOpen,
    onClose,
    cardDetails,
    getNextDueDays
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>全カテゴリーカード詳細</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {['hot', 'ice', 'food'].map((cat) => (
                        <div key={cat} className="mb-4">
                            <h3 className="text-lg font-semibold mb-3 mt-10">{cat === 'hot' ? 'ホット' : cat === 'ice' ? 'アイス' : 'フード'}</h3>
                            <div className="space-y-2">
                                {cardDetails
                                    .filter(card => card.category === cat)
                                    .map((card, index, array) => (
                                        <React.Fragment key={card.productId}>
                                            <div className="flex items-center space-x-2">
                                                <span className={`w-2 h-2 rounded-full ${card.isNew ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                                <span className="w-1/2 truncate">{card.productId}</span>
                                                <span className="ml-auto">
                                                    {getNextDueDays(card.dueDate)}日後
                                                </span>
                                            </div>
                                            {index < array.length - 1 && <Separator className="my-2" />}
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={onClose}>閉じる</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewInfoDialog;