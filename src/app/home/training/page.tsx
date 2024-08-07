"use client"
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";

const TrainingPage: React.FC = () => {
    const sections = [
        {
            title: "ホットドリンク編",
            description: "ホットドリンクの作り方を中心に復習します。",
        },
        {
            title: "アイスドリンク編",
            description: "アイスドリンクの作り方を中心に復習します。",
        },
        {
            title: "フード編",
            description: "フードの作り方を中心に復習します。",
        }
    ];

    return (
        <Layout>
            <div className="space-y-6">
                {sections.map((section, index) => (
                    <section key={index} className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                        <p className="mb-4">{section.description}</p>
                        <Button variant="outline">開始する</Button>
                    </section>
                ))}
            </div>
        </Layout>
    );
};

export default TrainingPage;