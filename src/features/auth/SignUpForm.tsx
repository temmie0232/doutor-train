"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { initializeUserProgress } from '@/lib/spaced-repetition'
import { UserCredential } from 'firebase/auth'

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
import { saveUserData } from '@/lib/firebase'

interface FormData {
    name: string
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUpForm: React.FC = () => {
    const { signUp } = useAuth();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: FormData) => {
        try {
            const userCredential = await signUp(data.email, data.password);
            const userId = userCredential.user.uid;

            // ユーザーデータを保存
            await saveUserData(userId, data.name, data.email);

            // ユーザーの進捗データを初期化
            await initializeUserProgress(userId);

            router.push('/home');
        } catch (err) {
            setError("登録に失敗しました。");
            console.error(err);
        }
    };

    return (
        <div>
            <Card className="w-full">
                <CardHeader className='text-center'>
                    <CardTitle>新規登録</CardTitle>
                    <div className="flex justify-center mt-2">
                        <div className="w-12 h-1 bg-black rounded-lg"></div>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">メールアドレス</Label>
                                <Input
                                    id="email"
                                    placeholder="example@gmail.com"
                                    {...register("email", {
                                        required: "メールアドレスは必須です",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "有効なメールアドレスを入力してください"
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">パスワード</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="パスワードを入力"
                                    {...register("password", {
                                        required: "パスワードは必須です",
                                        minLength: {
                                            value: 6,
                                            message: "パスワードは6文字以上である必要があります"
                                        }
                                    })}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="confirmPassword">パスワードの再確認</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="パスワードを再入力"
                                    {...register("confirmPassword", {
                                        required: "パスワードの再確認は必須です",
                                        validate: (value) => value === getValues("password") || "パスワードが一致しません"
                                    })}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center flex-col">
                    <Button type="submit" size="sm" className="w-4/5 text-sm" onClick={handleSubmit(onSubmit)}>登録する</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignUpForm