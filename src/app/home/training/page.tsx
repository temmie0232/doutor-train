import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";

const TrainingPage: React.FC = () => {
    return (
        <Layout>
            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">基本トレーニング</h2>
                    <p className="mb-2">アプリケーションの基本的な使い方を学びます。</p>
                    <Button>開始する</Button>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-2">中級トレーニング</h2>
                    <p className="mb-2">より高度な機能と使い方を学びます。</p>
                    <Button>開始する</Button>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-2">上級トレーニング</h2>
                    <p className="mb-2">エキスパート向けの高度なテクニックを学びます。</p>
                    <Button>開始する</Button>
                </section>
            </div>
        </Layout>
    );
};

export default TrainingPage;