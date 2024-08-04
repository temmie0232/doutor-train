import React from 'react';
import { Badge } from "@/components/ui/badge";

const EnhancedBadge: React.FC<React.ComponentProps<typeof Badge>> = ({ className, ...props }) => (
    <Badge
        className={`border-2 border-white shadow-md ${className}`}
        {...props}
    />
);

export default EnhancedBadge;