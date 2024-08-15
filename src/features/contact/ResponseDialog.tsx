import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ResponseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    response: string;
}

const ResponseDialog: React.FC<ResponseDialogProps> = ({ isOpen, onClose, response }) => {
    const [displayedResponse, setDisplayedResponse] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (isOpen && currentIndex < response.length) {
            const timer = setTimeout(() => {
                setDisplayedResponse(prev => prev + response[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 20);
            return () => clearTimeout(timer);
        }
    }, [isOpen, currentIndex, response]);

    useEffect(() => {
        if (isOpen) {
            setDisplayedResponse('');
            setCurrentIndex(0);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>回答</DialogTitle>
                </DialogHeader>
                <div className="mt-4 mb-4">
                    <p>{displayedResponse}</p>
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>ホームへ戻る</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ResponseDialog;