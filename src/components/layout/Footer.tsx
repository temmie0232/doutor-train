import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MdMenuBook, MdOutlineCoffeeMaker } from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';

const Footer: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="flex justify-around items-center h-16">
                <button
                    onClick={() => router.push('/home/manual')}
                    className={`flex flex-col items-center ${isActive('/home/manual') ? 'text-blue-500' : 'text-gray-500'}`}
                >
                    <MdMenuBook className="h-6 w-6" />
                    <span className="text-xs">マニュアル</span>
                </button>
                <button
                    onClick={() => router.push('/home/training')}
                    className={`flex flex-col items-center ${isActive('/home/training') ? 'text-blue-500' : 'text-gray-500'}`}
                >
                    <MdOutlineCoffeeMaker className="h-6 w-6" />
                    <span className="text-xs">トレーニング</span>
                </button>
                <button
                    onClick={() => router.push('/home/help')}
                    className={`flex flex-col items-center ${isActive('/home/help') ? 'text-blue-500' : 'text-gray-500'}`}
                >
                    <BiHelpCircle className="h-6 w-6" />
                    <span className="text-xs">ヘルプ</span>
                </button>
            </div>
        </footer>
    );
};

export default Footer;