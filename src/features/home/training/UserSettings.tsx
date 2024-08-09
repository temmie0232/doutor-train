import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserSettingsProps {
    currentConfig: {
        maxNewCardsPerDay: number;
        maxReviewCardsPerDay: number;
    };
    onSaveSettings: (settings: { maxNewCardsPerDay: number; maxReviewCardsPerDay: number }) => void;
}

const UserSettings: React.FC<UserSettingsProps> = ({ currentConfig, onSaveSettings }) => {
    const [maxNewCards, setMaxNewCards] = useState(currentConfig.maxNewCardsPerDay);
    const [maxReviewCards, setMaxReviewCards] = useState(currentConfig.maxReviewCardsPerDay);
    const { user } = useAuth();

    const handleSave = () => {
        onSaveSettings({
            maxNewCardsPerDay: maxNewCards,
            maxReviewCardsPerDay: maxReviewCards
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>学習設定</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="maxNewCards">1日の新規カード学習数上限</Label>
                        <Input
                            id="maxNewCards"
                            type="number"
                            value={maxNewCards}
                            onChange={(e) => setMaxNewCards(Number(e.target.value))}
                            min={1}
                        />
                    </div>
                    <div>
                        <Label htmlFor="maxReviewCards">1日の復習カード学習数上限</Label>
                        <Input
                            id="maxReviewCards"
                            type="number"
                            value={maxReviewCards}
                            onChange={(e) => setMaxReviewCards(Number(e.target.value))}
                            min={1}
                        />
                    </div>
                    <Button onClick={handleSave}>設定を保存</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserSettings;