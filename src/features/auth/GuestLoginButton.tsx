"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const GuestLoginButton: React.FC = () => {
    const { signInAsGuest } = useAuth();
    const router = useRouter();

    const handleGuestLogin = async () => {
        try {
            await signInAsGuest();
            router.push('/home');
        } catch (error) {
            console.error('Guest login failed', error);
        }
    };

    return (
        <Button size="sm" onClick={handleGuestLogin} variant="outline" className="w-4/6">
            アカウント無しで開始
        </Button>
    );
};

export default GuestLoginButton;