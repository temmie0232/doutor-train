import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RiQuestionnaireLine } from "react-icons/ri";
import { categories } from '@/data/materials';

interface MaterialSelectorProps {
    selectedItems: string[];
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
    submitted: boolean;
    correctAnswer: string[];
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
    selectedItems,
    setSelectedItems,
    submitted,
    correctAnswer
}) => {
    const toggleItem = (item: string) => {
        setSelectedItems(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    return (
        <>
            {Object.entries(categories).map(([category, items]) => (
                <div key={category} className="mt-10 mb-4">
                    <div className="flex items-center mb-2">
                        <h3 className="font-bold">{category}</h3>
                        {category === "カップ/容器" && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm" className="p-0 h-auto ml-2">
                                        <RiQuestionnaireLine className="h-5 w-5 text-gray-500" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <p className="text-sm">
                                        ※例: R: アメリカンカップ, L: Lホットカップ の商品は アメリカンカップ、Lホットカップをクリック
                                    </p>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {items.map(item => (
                            <Button
                                key={item}
                                variant={selectedItems.includes(item) ? "default" : "outline"}
                                onClick={() => !submitted && toggleItem(item)}
                                className={`
                                    ${submitted && correctAnswer.includes(item) ? "bg-green-500 hover:bg-green-600" : ""}
                                    ${submitted && selectedItems.includes(item) && !correctAnswer.includes(item) ? "bg-red-500 hover:bg-red-600" : ""}
                                `}
                                disabled={submitted}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default MaterialSelector;