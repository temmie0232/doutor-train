import React from 'react';
import { Badge } from "@/components/ui/badge";

interface EnhancedBadgeProps extends React.ComponentProps<typeof Badge> {
    large?: boolean;
}

const EnhancedBadge: React.FC<EnhancedBadgeProps> = ({ className, large = false, ...props }) => (
    <Badge
        className={`
            border-2 border-white shadow-md
            ${large ? 'text-sm px-3 py-1' : 'text-xs px-2 py-0.5'}
            ${className}
        `}
        {...props}
    />
);

export default EnhancedBadge;