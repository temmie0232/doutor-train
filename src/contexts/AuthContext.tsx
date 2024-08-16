"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserCredential, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, saveUserData } from '@/lib/firebase';
import { saveUserName, getUserName } from '@/lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
    signInWithGoogle: () => Promise<UserCredential>;
    saveUserName: (name: string) => Promise<void>;
    getUserName: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // Google認証成功後にユーザーデータを保存
            if (user.email) {
                await saveUserData(user.uid, user.displayName || '', user.email);
            }
            return result;
        } catch (error) {
            console.error("Google sign in error:", error);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        signIn,
        signUp,
        logOut,
        signInWithGoogle,
        saveUserName: (name: string) => saveUserName(user?.uid ?? '', name),
        getUserName: () => getUserName(user?.uid ?? ''),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};