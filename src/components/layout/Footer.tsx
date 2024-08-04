"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MdMenuBook, MdOutlineCoffeeMaker } from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccountRequiredAlert from '@/components/elements/AccountRequiredAlert';

const Footer: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuth();
    const [showAlert, setShowAlert] = React.useState(false);

    const handleNavigation = (path: string) => {
        if (path === '/home/training' && user?.isAnonymous) {
            setShowAlert(true);
        } else {
            router.push(path);
        }
    };

    // パス名から現在のタブ値を決定
    const getCurrentTab = () => {
        if (pathname.includes('/manual')) return 'manual';
        if (pathname.includes('/training')) return 'training';
        if (pathname.includes('/help')) return 'help';
        return 'manual'; // デフォルト値
    };

    const currentTab = getCurrentTab();

    const getIconSize = (tabName: string) => {
        return currentTab === tabName ? 32 : 24; // 選択されたアイコンは32px、それ以外は24px
    };

    return (
        <>
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                <Tabs value={currentTab} className="w-full">
                    <TabsList className="flex justify-around h-16 bg-transparent">
                        <TabsTrigger
                            value="manual"
                            onClick={() => handleNavigation('/home/manual')}
                            className={`flex flex-col items-center ${currentTab === 'manual' ? 'text-zinc-950' : ''}`}
                        >
                            <MdMenuBook size={getIconSize('manual')} />
                        </TabsTrigger>
                        <TabsTrigger
                            value="training"
                            onClick={() => handleNavigation('/home/training')}
                            className={`flex flex-col items-center ${currentTab === 'training' ? 'text-zinc-950' : ''}`}
                        >
                            <MdOutlineCoffeeMaker size={getIconSize('training')} />
                        </TabsTrigger>
                        <TabsTrigger
                            value="help"
                            onClick={() => handleNavigation('/home/help')}
                            className={`flex flex-col items-center ${currentTab === 'help' ? 'text-zinc-950' : ''}`}
                        >
                            <BiHelpCircle size={getIconSize('help')} />
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </footer>
            <AccountRequiredAlert open={showAlert} onOpenChange={setShowAlert} />
        </>
    );
};

export default Footer;