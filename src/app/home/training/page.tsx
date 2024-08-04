import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const TrainingPage: React.FC = () => {
    const sections = [
        {
            title: "ホットドリンク編",
            description: "ホットドリンクの作り方を中心に復習します。",
            link: "/home/training/hot-drinks"
        },
        {
            title: "アイスドリンク編",
            description: "アイスドリンクの作り方を中心に復習します。",
            link: "/home/training/cold-drinks"
        },
        {
            title: "フード編",
            description: "フードの作り方を中心に復習します。",
            link: "/home/training/food"
        }
    ];

    return (
        <Layout>
            <div className="space-y-6">
                {sections.map((section, index) => (
                    <section key={index} className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                        <p className="mb-4">{section.description}</p>
                        <Link href={section.link}>
                            <Button variant="outline">開始する</Button>
                        </Link>
                    </section>
                ))}
            </div>
        </Layout>
    );
};

export default TrainingPage;