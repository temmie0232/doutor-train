"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button'
import { FaGoogle } from "react-icons/fa"
import { useToast } from "@/components/ui/use-toast"
import { saveUserData } from '@/lib/firebase';

const GoogleAuthButton = () => {
    const { signInWithGoogle } = useAuth();
    const router = useRouter();
    const { toast } = useToast()

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;
            if (user.email) {
                // Google認証成功後にユーザーデータを保存
                await saveUserData(user.uid, user.displayName || '', user.email);
            }
            router.push('/home');
        } catch (error) {
            console.error('Google sign in failed', error);
            toast({
                title: "エラー",
                description: "Googleログインに失敗しました。",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <Button size="sm" onClick={handleGoogleSignIn} className="w-full">
                <FaGoogle className='mr-2' /> Googleアカウントで始める
            </Button>
        </div>
    )
}

export default GoogleAuthButton