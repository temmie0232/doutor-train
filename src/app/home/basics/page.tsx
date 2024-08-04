// app/home/basics/page.tsx

import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const BasicsPage: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">基礎編</h1>
            <div className="space-y-4">
                <section>
                    <h2 className="text-xl font-semibold mb-2">1. 接客の基本</h2>
                    <p>お客様への挨拶、オーダーの取り方、商品の受け渡し方など</p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-2">2. 衛生管理</h2>
                    <p>手洗いの仕方、食品の取り扱い方、店内の清掃方法など</p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-2">3. 機器の使い方</h2>
                    <p>コーヒーマシン、レジの操作方法など</p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-2">4. メニュー基礎知識</h2>
                    <p>主要商品の特徴、アレルギー情報など</p>
                </section>
            </div>
            <div className="mt-8">
                <Link href="/home/manual">
                    <Button>商品マニュアルへ</Button>
                </Link>
            </div>
        </Layout>
    );
};

export default BasicsPage;