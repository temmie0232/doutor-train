"use client"
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import UnderDevelopmentDialog from '@/components/elements/UnderDevelopmentDialog';

const TrainingPage: React.FC = () => {
    const [showDialog, setShowDialog] = useState(true);
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

    useEffect(() => {
        setShowDialog(true);
    }, []);

    return (
        <Layout>
            <div className="space-y-6">
                {sections.map((section, index) => (
                    <section key={index} className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                        <p className="mb-4">{section.description}</p>
                        <Button variant="outline" onClick={() => setShowDialog(true)}>開始する</Button>
                    </section>
                ))}
            </div>
            <UnderDevelopmentDialog open={showDialog} onOpenChange={setShowDialog} />
        </Layout>
    );
};

export default TrainingPage;