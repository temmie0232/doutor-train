import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { NavigationButtonsProps } from '@/types/types';


const NavigationButtons: React.FC<NavigationButtonsProps> = ({ productName }) => {
    const router = useRouter();

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <Button
                onClick={() => router.push(`/home/manual/${encodeURIComponent(productName)}`)}
                className="flex-1 bg-white text-black border border-black hover:bg-gray-100"
                variant="outline"
            >
                作り方に戻る
            </Button>
            <Button
                onClick={() => router.push('/home/manual')}
                className="flex-1 bg-black text-white hover:bg-gray-800"
            >
                商品リストに戻る
            </Button>
        </div>
    );
};

export default NavigationButtons;