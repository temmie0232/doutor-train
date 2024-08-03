"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import { Button } from "@/components/ui/button";
import { MdMenuBook, MdOutlineCoffeeMaker } from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const HomePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handleTrainingClick = () => {
    if (user?.isAnonymous) {
      setShowAlert(true);
    } else {
      // トレーニングページへの遷移ロジックをここに追加
      console.log("トレーニングページへ遷移");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 pt-16 flex flex-col justify-center">
        <div className="mb-16 text-center">
          {user ? (
            user.isAnonymous ? (
              <div>
                <p className="text-xl font-semibold mb-2">ゲストユーザーでログイン中</p>
                <p className="text-sm text-gray-600">一部機能に制約があります</p>
              </div>
            ) : (
              <p className="text-2xl font-semibold">ようこそ、{user.displayName || user.email || 'ユーザー'}さん！</p>
            )
          ) : (
            <p className="text-xl font-semibold">ログインしていません</p>
          )}
        </div>

        <div className="max-w-xs mx-auto w-full">
          <div className="space-y-8">
            <div>
              <p className="text-sm text-gray-600 mb-2 text-center">作り方何もわからない人は...</p>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-20 text-xl flex items-center justify-center bg-white hover:bg-gray-100"
                onClick={() => console.log("マニュアルページへ遷移")}
              >
                <MdMenuBook className="mr-2 h-7 w-7" /> マニュアル
              </Button>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2 text-center">マニュアルを読み終えた人は...</p>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-20 text-xl flex items-center justify-center bg-white hover:bg-gray-100"
                onClick={handleTrainingClick}
              >
                <MdOutlineCoffeeMaker className="mr-2 h-7 w-7" /> トレーニング
              </Button>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2 text-center">このアプリについて</p>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-20 text-xl flex items-center justify-center bg-white hover:bg-gray-100"
                onClick={() => console.log("ヘルプページへ遷移")}
              >
                <BiHelpCircle className="mr-2 h-7 w-7" /> ヘルプ
              </Button>
            </div>
          </div>
        </div>
      </main>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>アカウントが必要です</AlertDialogTitle>
            <AlertDialogDescription>
              この機能を利用するにはアカウントを作成してログインしてください。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>後で</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push('/auth')}>
              アカウント作成
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HomePage;