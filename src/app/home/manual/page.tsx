import React from 'react';
import Layout from '@/components/layout/Layout';

const ManualPage: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">マニュアル</h1>
            <div className="space-y-4">
                <section>
                    <h2 className="text-xl font-semibold mb-2">1. はじめに</h2>
                    <p>このマニュアルでは、アプリケーションの基本的な使い方を説明します。</p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-2">2. 基本操作</h2>
                    <ul className="list-disc list-inside">
                        <li>アカウントの作成方法</li>
                        <li>ログイン・ログアウトの方法</li>
                        <li>各機能の使い方</li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl font-semibold mb-2">3. トラブルシューティング</h2>
                    <p>よくある問題とその解決方法について説明します。</p>
                </section>
            </div>
        </Layout>
    );
};

export default ManualPage;