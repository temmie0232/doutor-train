import React from 'react';
import { User } from 'firebase/auth';
import { WelcomeMessageProps } from '@/types/types';


const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ user, userName }) => {
    if (!user) {
        return <p className="text-xl font-semibold">ログインしていません</p>;
    }

    if (user.isAnonymous) {
        return (
            <div>
                <p className="text-xl font-semibold mb-2">ゲストユーザーでログイン中</p>
                <p className="text-sm text-gray-600">一部機能に制約があります</p>
            </div>
        );
    }

    return (
        <p className="text-2xl font-semibold">
            ようこそ、{userName || user.displayName || user.email || 'ユーザー'}さん！
        </p>
    );
};

export default WelcomeMessage;