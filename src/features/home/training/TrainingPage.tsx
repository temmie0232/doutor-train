"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productData, Product } from '@/data/productData';
import { getUserProgress, getNextDueCard } from '@/lib/spaced-repetition';
import { Timestamp } from 'firebase/firestore';
import ReviewInfoDialog from './ReviewInfoDialog';
import ReviewQueueDialog from './ReviewQueueDialog';
import { CardDetails, UserProgress } from '@/types/types';

const TrainingPage: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [showQueueDialog, setShowQueueDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<'hot' | 'ice' | 'food'>('hot');
    const [cardDetails, setCardDetails] = useState<CardDetails[]>([]);
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

    const categories = [
        { title: "ホットドリンク編", description: "ホットドリンクの作り方を中心に復習します。", category: "hot" as const },
        { title: "アイスドリンク編", description: "アイスドリンクの作り方を中心に復習します。", category: "ice" as const },
        { title: "フード編", description: "フードの作り方を中心に復習します。", category: "food" as const }
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
        setUserProgress(progress);
        const details: CardDetails[] = Object.entries(progress.cards).map(([productId, card]) => ({
            productId,
            category: productData.find(p => p.productID.toString() === productId)?.category as 'hot' | 'ice' | 'food',
            isNew: card.isNew,
            dueDate: convertToDate(card.dueDate),
            easeFactor: card.easeFactor,
            interval: card.interval,
            correctCount: card.correctCount,
            learningHistory: card.learningHistory.map(item => ({
                date: item.date instanceof Timestamp ? item.date : Timestamp.fromDate(item.date),
                score: item.score
            }))
        }));
        setCardDetails(details);
    };

    const handleCategoryClick = (category: 'hot' | 'ice' | 'food') => {
        router.push(`/home/training/${category}`);
    };

    const handleQueueCheck = (category: 'hot' | 'ice' | 'food') => {
        setSelectedCategory(category);
        setShowQueueDialog(true);
    };

    const getNextDueDays = (dueDate: Date): number => {
        const now = new Date();
        const diffTime = dueDate.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 3600 * 24));
    };

    const getCategoryQueue = (category: 'hot' | 'ice' | 'food') => {
        if (!userProgress) return { newCards: [], reviewCards: [] };

        const newCards = userProgress.newQueue
            .map(id => cardDetails.find(card => card.productId === id && card.category === category))
            .filter((card): card is CardDetails => card !== undefined);

        const reviewCards = userProgress.reviewQueue
            .map(id => cardDetails.find(card => card.productId === id && card.category === category))
            .filter((card): card is CardDetails => card !== undefined);

        return { newCards, reviewCards };
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
                            <Button
                                onClick={() => handleQueueCheck(category.category)}
                                className="w-full mt-2 bg-gray-200 text-black hover:bg-gray-300"
                            >
                                キューの確認
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
                <ReviewQueueDialog
                    isOpen={showQueueDialog}
                    onClose={() => setShowQueueDialog(false)}
                    category={selectedCategory}
                    queue={getCategoryQueue(selectedCategory)}
                />
            </div>
        </Layout>
    );
};

export default TrainingPage;