"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TrainingPage: React.FC = () => {
    const router = useRouter();

    const categories = [
        { title: "ホットドリンク編", description: "ホットドリンクの作り方を中心に復習します。", category: "hot" },
        { title: "アイスドリンク編", description: "アイスドリンクの作り方を中心に復習します。", category: "ice" },
        { title: "フード編", description: "フードの作り方を中心に復習します。", category: "food" }
    ];

    const handleCategoryClick = (category: string) => {
        router.push(`/home/training/${category}`);
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
            </div>
        </Layout>
    );
};

export default TrainingPage;