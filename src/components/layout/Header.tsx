"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { IoMdArrowBack } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const Header: React.FC = () => {
    const router = useRouter();
    const { user, logOut } = useAuth();

    const handleLogout = async () => {
        try {
            await logOut();
            router.push('/auth');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-transparent">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <IoMdArrowBack className="h-6 w-6" />
            </Button>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <IoSettingsOutline className="h-6 w-6" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={user?.photoURL || ''} />
                            <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'G'}</AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">  {/* オーバーフロー制御を追加 */}
                            <p className="font-medium truncate">{user?.displayName || 'ゲスト'}</p>
                            <p className="text-sm text-gray-500 truncate">{user?.email || 'ゲストユーザー'}</p>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <Button variant="outline" onClick={handleLogout} className="w-full">
                        ログアウト
                    </Button>
                </PopoverContent>
            </Popover>
        </header>
    );
};

export default Header;