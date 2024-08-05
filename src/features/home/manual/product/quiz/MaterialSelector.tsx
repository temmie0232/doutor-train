import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { categories, allMaterials } from '@/data/materials';
import { Product } from '@/data/products';

interface MaterialSelectorProps {
    correctAnswer: string[];
    product: Product;
    onSubmit: (score: number) => void;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
    correctAnswer,
    product,
    onSubmit
}) => {
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [submitted, setSubmitted] = useState<boolean>(false);

    const toggleItem = (item: string) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(item)) {
                newSet.delete(item);
            } else {
                newSet.add(item);
            }
            return newSet;
        });
    };

    const handleSubmit = () => {
        setSubmitted(true);
        const correctItems = Array.from(selectedItems).filter(item => correctAnswer.includes(item));
        const score = correctItems.length;
        onSubmit(score);
    };

    const renderCategory = (category: string, items: string[]) => (
        <div key={category} className="mt-4 mb-2">
            <h3 className="font-bold mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map(item => (
                    <Button
                        key={item}
                        variant={selectedItems.has(item) ? "default" : "outline"}
                        onClick={() => !submitted && toggleItem(item)}
                        className={`
                            ${submitted && correctAnswer.includes(item) ? "bg-green-500 hover:bg-green-600" : ""}
                            ${submitted && selectedItems.has(item) && !correctAnswer.includes(item) ? "bg-red-500 hover:bg-red-600" : ""}
                        `}
                        disabled={submitted}
                    >
                        {item}
                    </Button>
                ))}
            </div>
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