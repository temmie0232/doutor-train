"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from '@/components/elements/LogoutButton';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>ホーム</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {user ? (
              user.isAnonymous ?
                "ゲストとしてログインしています。" :
                `ようこそ、${user.email || 'ユーザー'}さん！`
            ) : (
              "ログインしていません。"
            )}
          </p>
          <div className="flex justify-between">
            <Button variant="outline">マニュアル</Button>
            <Button disabled={user?.isAnonymous}>トレーニング</Button>
          </div>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;