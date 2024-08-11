import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CardDetails } from '@/types/types';

interface CardDetailDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    card: CardDetails | null;
    getNextDueDays: (dueDate: Date) => number;
}

const CardDetailDrawer: React.FC<CardDetailDrawerProps> = ({
    isOpen,
    onClose,
    card,
    getNextDueDays
}) => {
    if (!card) return null;

    const nextDueDate = new Date(card.dueDate);
    nextDueDate.setDate(nextDueDate.getDate() + getNextDueDays(card.dueDate));

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className='mt-3'>{card.productId}</DrawerTitle>
                    <DrawerDescription className='my-5'>
                        <p>状態: {card.isNew ? '新規' : '復習'}</p>
                        <p>次回の出題日: {getNextDueDays(card.dueDate)}日後 ({nextDueDate.toLocaleDateString()})</p>
                        <p>難易度係数: {card.easeFactor.toFixed(2)}</p>
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
};

export default CardDetailDrawer;