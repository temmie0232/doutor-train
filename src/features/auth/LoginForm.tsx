"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            router.push('/home');
        } catch (err) {
            setError('ログインに失敗しました。');
        }
    };

    return (
        <div>
            <Card className="w-full">
                <CardHeader className='text-center'>
                    <CardTitle>ログイン</CardTitle>
                    <div className="flex justify-center mt-2">
                        <div className="w-12 h-1 bg-black rounded-lg"></div>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">メールアドレス</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">パスワード</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="パスワードを入力"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center flex-col">
                    <Button type="submit" size="sm" className="w-4/6 text-sm" onClick={handleSubmit}>ログイン</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginForm