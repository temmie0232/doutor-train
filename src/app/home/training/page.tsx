"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TrainingScreen from '@/features/home/training/TrainingPage';
import UnderMaintenanceDialog from '@/components/elements/UnderMaintenanceDialog';

export default function TrainingPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsDialogOpen(true);
    }, []);

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        router.push('/home'); // ダイアログを閉じたらホームページにリダイレクト
    };

    return (
        <>
            <TrainingScreen />
            <UnderMaintenanceDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
        </>
    );
}