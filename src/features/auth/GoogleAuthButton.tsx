"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button'
import { FaGoogle } from "react-icons/fa"
import { useToast } from "@/components/ui/use-toast"

const GoogleAuthButton = () => {
    const { signInWithGoogle } = useAuth();
    const router = useRouter();
    const { toast } = useToast()

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            router.push('/home');
        } catch (error) {
            console.error('Google sign in failed', error);
        }
    };

    const handleReasonClick = () => {
        toast({
            title: "アカウントが必要な理由",
            description: "達成度などのユーザーごとに異なる情報を保存するため",
        })
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <Button size="sm" onClick={handleGoogleSignIn} className="w-full">
                <FaGoogle className='mr-2' /> Googleアカウントで始める
            </Button>
            <button
                onClick={handleReasonClick}
                className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
                アカウントが必要な理由
            </button>
        </div>
    )
}

export default GoogleAuthButton