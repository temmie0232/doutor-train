import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressToastProps {
    category: 'hot' | 'ice' | 'food';
    type: 'new' | 'review';
    before: number;
    after: number;
    total: number;
}

const ProgressToast: React.FC<ProgressToastProps> = ({ category, type, before, after, total }) => {
    const [progress, setProgress] = useState(before);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsAnimating(true);
            setProgress(after);
        }, 500);
    }, [after]);

    const getProgressPercentage = (value: number) => ((total - value) / total) * 100;

    return (
        <div className="w-400px">
            <p className="text-sm font-medium">
                {type === 'new' ? '新規カード' : '復習カード'} ({category})
            </p>
            <div className="flex items-center w-full">
                <div className="flex-grow mr-2">
                    <Progress
                        value={getProgressPercentage(progress)}
                        className="w-full transition-all duration-500 ease-in-out"
                    />
                </div>
                <p className="text-sm whitespace-nowrap min-w-[60px] text-right">
                    {total - progress} / {total}
                </p>
            </div>
        </div>
    );
};

export default ProgressToast;