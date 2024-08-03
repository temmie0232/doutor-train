"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const LogoutButton: React.FC = () => {
    const { logOut } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logOut();
            router.push('/auth');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <Button size="sm" className="w-2/5" onClick={handleLogout} variant="outline">
            ログアウト
        </Button>
    );
};

export default LogoutButton;