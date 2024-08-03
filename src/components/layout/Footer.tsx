import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MdMenuBook, MdOutlineCoffeeMaker } from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';
import AccountRequiredAlert from '@/components/elements/AccountRequiredAlert';

const Footer: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuth();
    const [showAlert, setShowAlert] = useState(false);

    const isActive = (path: string) => pathname === path;

    const handleNavigation = (path: string) => {
        if (path === '/home/training' && user?.isAnonymous) {
            setShowAlert(true);
        } else {
            router.push(path);
        }
    };

    return (
        <>
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                <div className="flex justify-around items-center h-16">
                    <button
                        onClick={() => handleNavigation('/home/manual')}
                        className={`flex flex-col items-center ${isActive('/home/manual') ? 'text-blue-500' : 'text-gray-500'}`}
                    >
                        <MdMenuBook className="h-6 w-6" />
                        <span className="text-xs">マニュアル</span>
                    </button>
                    <button
                        onClick={() => handleNavigation('/home/training')}
                        className={`flex flex-col items-center ${isActive('/home/training') ? 'text-blue-500' : 'text-gray-500'}`}
                    >
                        <MdOutlineCoffeeMaker className="h-6 w-6" />
                        <span className="text-xs">トレーニング</span>
                    </button>
                    <button
                        onClick={() => handleNavigation('/home/help')}
                        className={`flex flex-col items-center ${isActive('/home/help') ? 'text-blue-500' : 'text-gray-500'}`}
                    >
                        <BiHelpCircle className="h-6 w-6" />
                        <span className="text-xs">ヘルプ</span>
                    </button>
                </div>
            </footer>
            <AccountRequiredAlert open={showAlert} onOpenChange={setShowAlert} />
        </>
    );
};

export default Footer;