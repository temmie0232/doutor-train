"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productData, Product } from '@/data/productData';
import { getUserProgress } from '@/lib/spaced-repetition';
import { Timestamp } from 'firebase/firestore';
import ReviewInfoDialog from './ReviewInfoDialog';
import { CardDetails } from '@/types/types';

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
        const details: CardDetails[] = productData.map(product => ({
            productId: product.name,
            category: product.category as 'hot' | 'ice' | 'food',
            isNew: progress.cards[product.name]?.isNew ?? true,
            dueDate: convertToDate(progress.cards[product.name]?.dueDate ?? new Date()),
            easeFactor: progress.cards[product.name]?.easeFactor ?? 2.5,
            learningHistory: progress.cards[product.name]?.learningHistory?.map(item => ({
                date: item.date instanceof Timestamp ? item.date : Timestamp.fromDate(item.date),
                score: item.score
            })) ?? []
        }));

        setCardDetails(details);
    };

    const handleCategoryClick = (category: string) => {
        router.push(`/home/training/${category}`);
    };

    const getNextDueDays = (dueDate: Date): number => {
        const now = new Date();
        const diffTime = dueDate.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 3600 * 24));
    };

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
                <ReviewInfoDialog
                    isOpen={showDetailsDialog}
                    onClose={() => setShowDetailsDialog(false)}
                    cardDetails={cardDetails}
                    getNextDueDays={getNextDueDays}
                />
            </div>
        </Layout>
    );
};

export default TrainingPage;