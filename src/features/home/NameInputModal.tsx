import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NameInputModalProps } from '@/types/types';


const NameInputModal: React.FC<NameInputModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onClose(name.trim());
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>あなたの名前を教えてください</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="例 : たろう"
                        className="mb-4"
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={!name.trim()}>
                            保存
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NameInputModal;