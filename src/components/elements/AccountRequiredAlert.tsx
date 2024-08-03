import React from 'react';
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AccountRequiredAlertProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AccountRequiredAlert: React.FC<AccountRequiredAlertProps> = ({ open, onOpenChange }) => {
    const router = useRouter();

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>アカウントが必要です</AlertDialogTitle>
                    <AlertDialogDescription>
                        この機能を利用するにはアカウントを作成してログインしてください。
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>後で</AlertDialogCancel>
                    <AlertDialogAction onClick={() => router.push('/auth')}>
                        アカウント作成
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AccountRequiredAlert;