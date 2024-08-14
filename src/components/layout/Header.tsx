"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { IoMdArrowBack } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import AccountRequiredAlert from '@/components/elements/AccountRequiredAlert';

const Header: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logOut } = useAuth();
    const [showAlert, setShowAlert] = useState(false);

    const handleLogout = async () => {
        try {
            await logOut();
            router.push('/auth');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleTrainingClick = () => {
        if (user?.isAnonymous) {
            setShowAlert(true);
        } else {
            router.push('/home/training');
        }
    };

    const getPageTitle = () => {
        switch (true) {
            case pathname === '/home':
                return 'ホーム';
            case pathname.includes('/basics'):
                return '基本 (Tips)';
            case pathname.includes('/manual'):
                return 'マニュアル';
            case pathname.includes('/training'):
                return 'トレーニング';
            case pathname.includes('/help'):
                return 'ヘルプ';
            default:
                return '';
        }
    };

    const buttonClass = `
        p-2 
        rounded-full 
        transition-all 
        duration-300 
        ease-in-out 
        hover:bg-gray-200 
        focus:outline-none 
        focus:ring-0 
        active:scale-95
    `;

    return (
        <>
            <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-white bg-opacity-90 backdrop-blur-sm shadow-md z-50 rounded-b-2xl">
                <button
                    onClick={() => router.back()}
                    className={buttonClass}
                >
                    <IoMdArrowBack className="h-6 w-6 text-gray-700" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-800">
                    {getPageTitle()}
                </h1>
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            className={buttonClass}
                        >
                            <IoSettingsOutline className="h-6 w-6 text-gray-700" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src={user?.photoURL || ''} />
                                <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'G'}</AvatarFallback>
                            </Avatar>
                            <div className="overflow-hidden">
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
            <AccountRequiredAlert open={showAlert} onOpenChange={setShowAlert} />
        </>
    );
};

export default Header;