"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { MdMenuBook, MdOutlineCoffeeMaker } from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';
import { FaGraduationCap } from 'react-icons/fa';
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
            <div className="w-full max-w-md space-y-4">
                {[
                    { label: '基礎編', icon: FaGraduationCap, onClick: () => router.push('/home/basics') },
                    { label: '商品マニュアル', icon: MdMenuBook, onClick: () => router.push('/home/manual') },
                    { label: 'トレーニング', icon: MdOutlineCoffeeMaker, onClick: handleTrainingClick },
                    { label: 'ヘルプ', icon: BiHelpCircle, onClick: () => router.push('/home/help') },
                ].map((button, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        size="lg"
                        className="w-full h-14 text-lg flex items-center justify-center bg-white hover:bg-gray-100"
                        onClick={button.onClick}
                    >
                        <button.icon className="mr-2 h-6 w-6" /> {button.label}
                    </Button>
                ))}
            </div>
            <AccountRequiredAlert open={showAlert} onOpenChange={setShowAlert} />
        </>
    );
};

export default MenuButtons;