import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UnderDevelopmentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const UnderDevelopmentDialog: React.FC<UnderDevelopmentDialogProps> = ({ open, onOpenChange }) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>作成中</AlertDialogTitle>
                    <AlertDialogDescription>
                        この機能は作成中です。
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => onOpenChange(false)}>
                        閉じる
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default UnderDevelopmentDialog;