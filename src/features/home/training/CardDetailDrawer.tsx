import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CardDetails } from '@/types/types';
import LearningHistoryChart from './LearningHistoryChart';

interface CardDetailDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    card: CardDetails | null;
    getNextDueDays: (dueDate: Date) => number;
    getProductName: (productId: string) => string;
}


const CardDetailDrawer: React.FC<CardDetailDrawerProps> = ({
    isOpen,
    onClose,
    card,
    getNextDueDays,
    getProductName
}) => {
    if (!card) return null;

    const nextDueDate = new Date(card.dueDate);
    nextDueDate.setDate(nextDueDate.getDate() + getNextDueDays(card.dueDate));

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className='my-3'>{getProductName(card.productId)}</DrawerTitle>
                    <DrawerDescription>
                        <p>状態: {card.isNew ? '新規' : '復習'}</p>
                        <p>次回の出題日: {getNextDueDays(card.dueDate)}日後 ({nextDueDate.toLocaleDateString()})</p>
                        <p>難易度係数: {card.easeFactor.toFixed(2)}</p>
                        <p>間隔: {card.interval}日</p>
                        <p>正解回数: {card.correctCount}</p>
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">学習履歴</h3>
                    <LearningHistoryChart history={card.learningHistory.map(item => ({
                        date: item.date.toDate(),
                        score: item.score
                    }))} />
                </div>
                <DrawerFooter>
                    <Button onClick={onClose}>閉じる</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default CardDetailDrawer;