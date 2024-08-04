import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const BasicsPage: React.FC = () => {
    const sections = [
        {
            title: "1. 接客の基本",
            description: "お客様への挨拶、オーダーの取り方、商品の受け渡し方など",
            link: "/home/basics/customer-service"
        },
        {
            title: "2. レジの使い方",
            description: "注文の入力、会計のやり方など",
            link: "/home/basics/register-usage"
        },
        {
            title: "3. セットアップについて",
            description: "注文に対応した取り揃えのやり方",
            link: "/home/basics/setup"
        },
        {
            title: "4. ドリンクの基礎知識",
            description: "グラス・カップのサイズ、商品の対応しているサイズなど",
            link: "/home/basics/drink-basics"
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
                            <Button variant="outline">詳細を見る</Button>
                        </Link>
                    </section>
                ))}
            </div>
        </Layout>
    );
};

export default BasicsPage;