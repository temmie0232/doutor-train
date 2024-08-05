import React from 'react';
import { Badge } from "@/components/ui/badge";

interface UnderstandingBadgeProps {
    score: number | null;
    totalQuestions: number;
    showPercentage?: boolean;
}

const UnderstandingBadge: React.FC<UnderstandingBadgeProps> = ({ score, totalQuestions, showPercentage = false }) => {
    if (score === null) {
        return <Badge className="bg-gray-400 border-2 border-white">未受験</Badge>;
    }

    const percentage = (score / totalQuestions) * 100;
    let color = 'bg-red-500';
    if (percentage === 100) {
        color = 'bg-green-500';
    } else if (percentage >= 80) {
        color = 'bg-yellow-500';
    }

    return (
        <Badge className={`${color} border-2 border-white`}>
            {showPercentage ? `理解度: ${Math.round(percentage)}%` : `${Math.round(percentage)}%`}
        </Badge>
    );
};

export default UnderstandingBadge;