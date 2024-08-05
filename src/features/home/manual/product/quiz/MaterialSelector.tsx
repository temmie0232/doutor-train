import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { categories } from '@/data/materials';
import { Product } from '@/data/products';
import { QuizAnswerItem } from '@/data/quizAnswers';

interface MaterialSelectorProps {
    correctAnswer: QuizAnswerItem[];
    product: Product;
    onSubmit: (score: number) => void;
}

interface SelectedItem {
    item: string;
    attributes?: { [key: string]: string };
    size?: string;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
    correctAnswer,
    product,
    onSubmit
}) => {
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [jetSteamerFoam, setJetSteamerFoam] = useState<boolean>(false);

    const toggleItem = (item: string, size?: string) => {
        setSelectedItems(prev => {
            const itemIndex = prev.findIndex(i => i.item === item && i.size === size);
            if (itemIndex > -1) {
                return prev.filter((_, index) => index !== itemIndex);
            } else {
                const newItem: SelectedItem = { item };
                if (size) newItem.size = size;
                if (item === "ジェットスチーマー") {
                    newItem.attributes = { "泡立て": jetSteamerFoam ? "あり" : "なし" };
                }
                return [...prev, newItem];
            }
        });
    };

    const handleSubmit = () => {
        setSubmitted(true);
        const score = correctAnswer.filter(answer => {
            const selectedItem = selectedItems.find(item =>
                item.item === answer.item &&
                (!answer.sizeDependent || item.size === Object.keys(answer.sizeDependent)[0])
            );
            if (!selectedItem) return false;
            if (answer.attributes) {
                return Object.entries(answer.attributes).every(([key, value]) =>
                    selectedItem.attributes && selectedItem.attributes[key] === value
                );
            }
            if (answer.sizeDependent) {
                return selectedItem.size === Object.keys(answer.sizeDependent)[0];
            }
            return true;
        }).length;
        onSubmit(score);
    };

    const isCorrect = (item: string, size?: string): boolean => {
        const selectedItem = selectedItems.find(i => i.item === item && i.size === size);
        const correctItem = correctAnswer.find(answer =>
            answer.item === item &&
            (!answer.sizeDependent || size === Object.keys(answer.sizeDependent)[0])
        );
        if (!selectedItem || !correctItem) return false;
        if (correctItem.attributes) {
            return Object.entries(correctItem.attributes).every(([key, value]) =>
                selectedItem.attributes && selectedItem.attributes[key] === value
            );
        }
        if (correctItem.sizeDependent) {
            return selectedItem.size === Object.keys(correctItem.sizeDependent)[0];
        }
        return true;
    };

    const renderCategory = (category: string, items: string[]) => (
        <div key={category} className="mt-4 mb-2">
            <h3 className="font-bold mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map(item => {
                    const sizes = product.sizes.filter(size =>
                        correctAnswer.some(answer =>
                            answer.item === item &&
                            answer.sizeDependent &&
                            answer.sizeDependent[size]
                        )
                    );
                    return sizes.length > 0 ? (
                        sizes.map(size => (
                            <Button
                                key={`${item}-${size}`}
                                variant={selectedItems.some(i => i.item === item && i.size === size) ? "default" : "outline"}
                                onClick={() => !submitted && toggleItem(item, size)}
                                className={`
                                    ${submitted && isCorrect(item, size) ? "bg-green-500 hover:bg-green-600" : ""}
                                    ${submitted && selectedItems.some(i => i.item === item && i.size === size) && !isCorrect(item, size) ? "bg-red-500 hover:bg-red-600" : ""}
                                `}
                                disabled={submitted}
                            >
                                {`${item} (${size})`}
                            </Button>
                        ))
                    ) : (
                        <Button
                            key={item}
                            variant={selectedItems.some(i => i.item === item) ? "default" : "outline"}
                            onClick={() => !submitted && toggleItem(item)}
                            className={`
                                ${submitted && isCorrect(item) ? "bg-green-500 hover:bg-green-600" : ""}
                                ${submitted && selectedItems.some(i => i.item === item) && !isCorrect(item) ? "bg-red-500 hover:bg-red-600" : ""}
                            `}
                            disabled={submitted}
                        >
                            {item}
                        </Button>
                    );
                })}
            </div>
            {category === "機械/設備" && selectedItems.some(i => i.item === "ジェットスチーマー") && (
                <div className="mt-2 border p-2 rounded">
                    <h4 className="font-bold mb-2">(オプション) ジェットスチーマー</h4>
                    <div className="flex items-center justify-between text-sm">
                        <span>現在: {jetSteamerFoam ? "泡立てあり" : "泡だてなし"}</span>
                        <Switch
                            checked={jetSteamerFoam}
                            onCheckedChange={(checked) => {
                                setJetSteamerFoam(checked);
                                setSelectedItems(prev =>
                                    prev.map(item =>
                                        item.item === "ジェットスチーマー"
                                            ? { ...item, attributes: { "泡立て": checked ? "あり" : "なし" } }
                                            : item
                                    )
                                );
                            }}
                            disabled={submitted}
                        />
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            {Object.entries(categories).map(([category, items]) => renderCategory(category, items))}
            <Button
                onClick={handleSubmit}
                className="mt-4 w-full bg-black text-white hover:bg-gray-800"
                disabled={submitted}
            >
                回答する
            </Button>
        </>
    );
};

export default MaterialSelector;