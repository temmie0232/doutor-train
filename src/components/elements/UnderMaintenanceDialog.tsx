import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UnderMaintenanceDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const UnderMaintenanceDialog: React.FC<UnderMaintenanceDialogProps> = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>調整中</DialogTitle>
                    <DialogDescription>
                        ...
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onClose}>閉じる</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UnderMaintenanceDialog;