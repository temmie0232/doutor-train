"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { productData, Product } from '@/data/productData';
import { getUserProgress } from '@/lib/spaced-repetition';
import { Timestamp } from 'firebase/firestore';

interface CardDetails {
    productId: string;
    category: 'hot' | 'ice' | 'food';
    isNew: boolean;
    dueDate: Date;
}

const TrainingPage: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [cardDetails, setCardDetails] = useState<CardDetails[]>([]);

    const categories = [
        { title: "ホットドリンク編", description: "ホットドリンクの作り方を中心に復習します。", category: "hot" },
        { title: "アイスドリンク編", description: "アイスドリンクの作り方を中心に復習します。", category: "ice" },
        { title: "フード編", description: "フードの作り方を中心に復習します。", category: "food" }
    ];

    useEffect(() => {
        if (user) {
            loadCardDetails();
        }
    }, [user]);

    const convertToDate = (dateOrTimestamp: Date | Timestamp): Date => {
        if (dateOrTimestamp instanceof Timestamp) {
            return dateOrTimestamp.toDate();
        }
        return dateOrTimestamp;
    };

    const loadCardDetails = async () => {
        if (!user) return;
        const progress = await getUserProgress(user.uid);
        const details = productData.map(product => ({
            productId: product.name,
            category: product.category as 'hot' | 'ice' | 'food',
            isNew: progress.cards[product.name]?.isNew ?? true,
            dueDate: convertToDate(progress.cards[product.name]?.dueDate ?? new Date())
        }));
        setCardDetails(details);
    };

    const handleCategoryClick = (category: string) => {
        router.push(`/home/training/${category}`);
    };

    const CardDetailsDialog = () => (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>全カテゴリーカード詳細</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {['hot', 'ice', 'food'].map((cat) => (
                        <div key={cat} className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">{cat === 'hot' ? 'ホット' : cat === 'ice' ? 'アイス' : 'フード'}</h3>
                            <ul className="space-y-1">
                                {cardDetails
                                    .filter(card => card.category === cat)
                                    .map((card) => (
                                        <li key={card.productId} className="flex justify-between items-center text-sm">
                                            <span className="w-1/3 truncate">{card.productId}</span>
                                            <span className="w-1/4 text-center">{card.isNew ? '新規' : '復習'}</span>
                                            <span className="w-1/3 text-right">
                                                {Math.ceil((card.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}日後
                                                ({card.dueDate.toLocaleDateString()})
                                            </span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))}
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={() => setShowDetailsDialog(false)}>閉じる</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return (
        <Layout>
            <div className="space-y-6">
                {categories.map((category, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>{category.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">{category.description}</p>
                            <Button
                                onClick={() => handleCategoryClick(category.category)}
                                className="w-full bg-black text-white hover:bg-gray-800"
                            >
                                開始する
                            </Button>
                        </CardContent>
                    </Card>
                ))}
                <div className="mt-8 text-center">
                    <Button onClick={() => setShowDetailsDialog(true)}>
                        詳細を確認
                    </Button>
                </div>
                <CardDetailsDialog />
            </div>
        </Layout>
    );
};

export default TrainingPage;