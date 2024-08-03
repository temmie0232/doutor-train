import React, { useState } from 'react';
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
    const [showAlert, setShowAlert] = useState(false);

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

    return (
        <>
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                <Tabs value={getCurrentTab()} className="w-full">
                    <TabsList className="flex justify-around h-16 bg-transparent">
                        <TabsTrigger
                            value="manual"
                            onClick={() => handleNavigation('/home/manual')}
                            className="flex flex-col items-center data-[state=active]:text-blue-500"
                        >
                            <MdMenuBook className="h-7 w-7" />
                        </TabsTrigger>
                        <TabsTrigger
                            value="training"
                            onClick={() => handleNavigation('/home/training')}
                            className="flex flex-col items-center data-[state=active]:text-blue-500"
                        >
                            <MdOutlineCoffeeMaker className="h-7 w-7" />
                        </TabsTrigger>
                        <TabsTrigger
                            value="help"
                            onClick={() => handleNavigation('/home/help')}
                            className="flex flex-col items-center data-[state=active]:text-blue-500"
                        >
                            <BiHelpCircle className="h-7 w-7" />
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </footer>
            <AccountRequiredAlert open={showAlert} onOpenChange={setShowAlert} />
        </>
    );
};

export default Footer;