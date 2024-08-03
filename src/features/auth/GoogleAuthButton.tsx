"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button'
import { FaGoogle } from "react-icons/fa"

const GoogleAuthButton = () => {
    const { signInWithGoogle } = useAuth();
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            router.push('/home');
        } catch (error) {
            console.error('Google sign in failed', error);
        }
    };

    return (
        <Button size="sm" onClick={handleGoogleSignIn}>
            <FaGoogle className='mr-2' /> Googleアカウントで始める
        </Button>
    )
}

export default GoogleAuthButton