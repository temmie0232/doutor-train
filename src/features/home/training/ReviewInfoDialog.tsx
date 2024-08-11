import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BiSolidCommentError } from 'react-icons/bi';
import CardDetailDrawer from './CardDetailDrawer';
import { CardDetails } from '@/types/types';
import { X } from 'lucide-react';

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
    const [selectedCard, setSelectedCard] = useState<CardDetails | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = (card: CardDetails) => {
        setSelectedCard(card);
        setIsDrawerOpen(true);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <div className="relative">
                        <Button
                            onClick={onClose}
                            variant="ghost"
                            className="absolute right-2 top-2 rounded-full p-2"
                            aria-label="Close"
                        >
                        </Button>
                        <DialogHeader>
                            <DialogTitle>全カテゴリーカード詳細</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span>: 新規</span>
                                <span className="w-3 h-3 rounded-full bg-yellow-500 ml-4"></span>
                                <span>: 復習</span>
                            </div>
                            {(['hot', 'ice', 'food'] as const).map((cat) => (
                                <div key={cat} className="mb-3 mt-8">
                                    <h3 className="text-lg font-semibold mb-2">{cat === 'hot' ? 'ホット' : cat === 'ice' ? 'アイス' : 'フード'}</h3>
                                    <div className="space-y-2">
                                        {cardDetails
                                            .filter(card => card.category === cat)
                                            .map((card, index, array) => (
                                                <React.Fragment key={card.productId}>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`w-3 h-3 rounded-full ${card.isNew ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                                        <span className="w-1/2 truncate">{card.productId}</span>
                                                        <span className="ml-auto mr-2">
                                                            {getNextDueDays(card.dueDate)}日後
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => openDrawer(card)}
                                                            className="ml-auto"
                                                        >
                                                            <BiSolidCommentError />
                                                        </Button>
                                                    </div>
                                                    {index < array.length - 1 && <Separator className="my-2" />}
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <CardDetailDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                card={selectedCard}
                getNextDueDays={getNextDueDays}
            />
        </>
    );
};

export default ReviewInfoDialog;