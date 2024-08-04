// app/home/basics/page.tsx

import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const BasicsPage: React.FC = () => {
    return (
        <Layout>
            <div className="space-y-4">
                <section>
                    <h2 className="text-xl font-semibold mb-2">1. 接客の基本</h2>
                    <p>お客様への挨拶、オーダーの取り方、商品の受け渡し方など</p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-2">2. レジの使い方</h2>
                    <p>注文の入力、会計のやり方など</p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-2">3. セットアップについて</h2>
                    <p>注文に対応した取り揃えのやり方</p>
                </section>
                <section>
                    <h3 className="text-xl font-semibold mb-2">4. ドリンクの基礎知識</h3>
                    <p>グラス・カップのサイズ、商品の対応しているサイズなど</p>
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