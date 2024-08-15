"use client"
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from 'next/image';

const BasicsPage: React.FC = () => {
    const [openDialog, setOpenDialog] = useState<number | null>(null);

    const sections = [
        {
            title: "1. 間違えやすいサイズ",
            description: "アメリカンコーヒーなのにアメリカンカップを使わない...等",
        },
        {
            title: "2. ワンサイズ商品",
            description: "サイズが一つしか用意されていない商品について",
        },
        {
            title: "3. アイスドリンクのカップについて",
            description: "どこまで氷を入れて、どこまでドリンクを注ぐのか(アイスカフェラテなど例外あり)",
        },
        {
            title: "4. エスプレッソまとめ",
            description: "どの商品にはどのサイズのエスプレッソを抽出すればいいの？",
        },
        {
            title: "5. ジェットスチーマーの泡だて",
            description: "ジェットスチーマーで泡立てるものは３つ",
        },
        {
            title: "6. 豆乳を使う商品について",
            description: "～豆乳～と付く商品は、牛乳を豆乳に置き換えればいいだけ(多分)",
        }
    ];

    return (
        <Layout>
            <div className="space-y-6">
                {sections.map((section, index) => (
                    <section key={index} className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                        <p className="mb-4">{section.description}</p>
                        <Button variant="outline" onClick={() => setOpenDialog(index + 1)}>詳細を見る</Button>

                        <Dialog open={openDialog === index + 1} onOpenChange={(open) => !open && setOpenDialog(null)}>
                            <DialogContent className="sm:max-w-[95%] sm:max-h-[90%]">
                                <DialogHeader>
                                    <DialogTitle>{section.title}</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-center items-center">
                                    <Image
                                        src={`/basics/${index + 1}.jpg`}
                                        alt={section.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </section>
                ))}
            </div>
        </Layout>
    );
};

export default BasicsPage;