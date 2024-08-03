import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { MdMenuBook, MdOutlineCoffeeMaker } from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';
import AccountRequiredAlert from '@/components/elements/AccountRequiredAlert';

const MenuButtons: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [showAlert, setShowAlert] = useState(false);

    const handleTrainingClick = () => {
        if (user?.isAnonymous) {
            setShowAlert(true);
        } else {
            router.push('/home/training');
        }
    };

    return (
        <>
            <div className="max-w-xs mx-auto w-full">
                <div className="space-y-8">
                    <div>
                        <p className="text-sm text-gray-600 mb-2 text-center">作り方何もわからない人は...</p>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full h-20 text-xl flex items-center justify-center bg-white hover:bg-gray-100"
                            onClick={() => router.push('/home/manual')}
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
                            onClick={() => router.push('/home/help')}
                        >
                            <BiHelpCircle className="mr-2 h-7 w-7" /> ヘルプ
                        </Button>
                    </div>
                </div>
            </div>
            <AccountRequiredAlert open={showAlert} onOpenChange={setShowAlert} />
        </>
    );
};

export default MenuButtons;