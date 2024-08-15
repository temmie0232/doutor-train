"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { MdMenuBook, MdOutlineCoffeeMaker } from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';
import { FaGraduationCap } from 'react-icons/fa';

const MenuButtons: React.FC = () => {
    const router = useRouter();

    const buttons = [
        { label: '基本 (Tips)', icon: FaGraduationCap, onClick: () => router.push('/home/basics') },
        { label: '商品マニュアル', icon: MdMenuBook, onClick: () => router.push('/home/manual') },
        { label: 'トレーニング', icon: MdOutlineCoffeeMaker, onClick: () => router.push('/home/training') },
        { label: 'ヘルプ', icon: BiHelpCircle, onClick: () => router.push('/home/help') },
    ];

    return (
        <div className="w-full max-w-md flex flex-col space-y-4">
            {buttons.map((button, index) => (
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
    );
};

export default MenuButtons;