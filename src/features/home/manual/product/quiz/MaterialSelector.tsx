import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
    quantity?: { [size: string]: number };
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
    correctAnswer,
    product,
    onSubmit
}) => {
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [jetSteamerFoam, setJetSteamerFoam] = useState<boolean>(false);
    const [whippedCreamCount, setWhippedCreamCount] = useState<{ [size: string]: number }>(
        product.sizes.reduce((acc, size) => ({ ...acc, [size]: 0 }), {})
    );
    const [espressoSize, setEspressoSize] = useState<{ [size: string]: string }>(
        product.sizes.reduce((acc, size) => ({ ...acc, [size]: 'S' }), {})
    );
    const [selectedCup, setSelectedCup] = useState<'hot' | 'ice' | null>(null);
    const [hotCupTypes, setHotCupTypes] = useState<{ [size: string]: string }>(
        product.sizes.reduce((acc, size) => ({ ...acc, [size]: '' }), {})
    );

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
                } else if (item === "ホイップクリーム") {
                    newItem.quantity = whippedCreamCount;
                } else if (item === "エスプレッソ") {
                    newItem.attributes = product.sizes.reduce((acc, size) => ({
                        ...acc,
                        [size]: espressoSize[size]
                    }), {});
                }
                return [...prev, newItem];
            }
        });
    };

    const handleCupSelection = (cupType: 'hot' | 'ice') => {
        setSelectedCup(cupType);
        if (cupType === 'ice') {
            setSelectedItems(prev => [...prev.filter(item => item.item !== 'カップ'), { item: 'カップ', attributes: { type: 'ice' } }]);
        } else {
            setSelectedItems(prev => prev.filter(item => item.item !== 'カップ'));
        }
    };

    const handleHotCupTypeSelection = (size: string, type: string) => {
        setHotCupTypes(prev => ({ ...prev, [size]: type }));
        setSelectedItems(prev => {
            const newItems = prev.filter(item => item.item !== 'カップ' || item.size !== size);
            return [...newItems, { item: 'カップ', size, attributes: { type: 'hot', subType: type } }];
        });
    };

    const isCorrect = (item: string): boolean => {
        const selectedItem = selectedItems.find(i => i.item === item);
        const correctItem = correctAnswer.find(answer => answer.item === item);

        if (!selectedItem || !correctItem) return false;

        if (item === 'カップ') {
            const selectedType = selectedItem.attributes?.type;
            const correctType = correctItem.attributes?.type;

            if (selectedType === correctType) {
                if (correctType === 'hot' && correctItem.sizeDependent) {
                    return Object.entries(correctItem.sizeDependent).every(([size, value]) => {
                        const selectedCupForSize = selectedItems.find(i => i.item === 'カップ' && i.size === size);
                        return selectedCupForSize?.attributes?.subType === value;
                    });
                }
                return true;
            }
            return false;
        }

        if (item === "エスプレッソ" && correctItem.sizeDependent) {
            return Object.entries(correctItem.sizeDependent).every(([size, value]) =>
                selectedItem.attributes && selectedItem.attributes[size] === value
            );
        }

        if (correctItem.attributes) {
            return Object.entries(correctItem.attributes).every(([key, value]) =>
                selectedItem.attributes && selectedItem.attributes[key] === value
            );
        }
        if (correctItem.sizeDependent) {
            return Object.entries(correctItem.sizeDependent).every(([size, value]) =>
                selectedItem.size === size && value === selectedItem.attributes?.[size]
            );
        }
        if (correctItem.quantity !== undefined) {
            if (typeof correctItem.quantity === 'object') {
                return Object.entries(correctItem.quantity).every(([itemSize, count]) =>
                    selectedItem.quantity && selectedItem.quantity[itemSize] === count
                );
            } else if (typeof correctItem.quantity === 'number') {
                const selectedTotal = selectedItem.quantity ?
                    Object.values(selectedItem.quantity).reduce((sum, count) => sum + count, 0) : 0;
                return selectedTotal === correctItem.quantity;
            }
        }
        return true;
    };

    const handleSubmit = () => {
        setSubmitted(true);
        const score = correctAnswer.filter(answer => isCorrect(answer.item)).length;
        onSubmit(score);
    };

    const renderCategory = (category: string, items: string[]) => (
        <div key={category} className="mt-4 mb-2">
            <h3 className="font-bold mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
                {category === "カップ/容器" ? (
                    <>
                        <Button
                            variant={selectedCup === 'hot' ? "default" : "outline"}
                            onClick={() => !submitted && handleCupSelection('hot')}
                            className={`
                                ${submitted && isCorrect('カップ') && selectedCup === 'hot' ? "bg-green-500 hover:bg-green-600" : ""}
                                ${submitted && selectedCup === 'hot' && !isCorrect('カップ') ? "bg-red-500 hover:bg-red-600" : ""}
                            `}
                            disabled={submitted}
                        >
                            ホットカップ
                        </Button>
                        <Button
                            variant={selectedCup === 'ice' ? "default" : "outline"}
                            onClick={() => !submitted && handleCupSelection('ice')}
                            className={`
                                ${submitted && isCorrect('カップ') && selectedCup === 'ice' ? "bg-green-500 hover:bg-green-600" : ""}
                                ${submitted && selectedCup === 'ice' && !isCorrect('カップ') ? "bg-red-500 hover:bg-red-600" : ""}
                            `}
                            disabled={submitted}
                        >
                            アイスカップ
                        </Button>
                    </>
                ) : (
                    items.map(item => {
                        if (category === "5000s(ボタン)" && item === "エスプレッソ") {
                            return (
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
                        }
                        if (category === "飲料原料" && item === "エスプレッソ") {
                            return null;
                        }
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
                                        ${submitted && isCorrect(item) ? "bg-green-500 hover:bg-green-600" : ""}
                                        ${submitted && selectedItems.some(i => i.item === item && i.size === size) && !isCorrect(item) ? "bg-red-500 hover:bg-red-600" : ""}
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
                    })
                )}
            </div>
            {category === "カップ/容器" && selectedCup === 'hot' && (
                <div className="mt-2 border p-2 rounded">
                    <h4 className="font-bold mb-2">ホットカップの種類</h4>
                    <div className="flex">
                        {product.sizes.map(size => (
                            <div key={size} className="flex-1 px-2">
                                <h5 className="font-semibold mb-1">{size}サイズ</h5>
                                <RadioGroup
                                    value={hotCupTypes[size]}
                                    onValueChange={(value) => handleHotCupTypeSelection(size, value)}
                                >
                                    {['デミタスカップ', 'アメリカンカップ', 'Mホットカップ', 'Lホットカップ'].map((cupType) => (
                                        <div key={`${size}-${cupType}`} className="flex items-center space-x-2">
                                            <RadioGroupItem value={cupType} id={`${size}-${cupType}`} />
                                            <Label htmlFor={`${size}-${cupType}`}>{cupType}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        ))}
                    </div>
                </div>
            )}
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
            {category === "トッピング/ソース" && selectedItems.some(i => i.item === "ホイップクリーム") && (
                <div className="mt-2 border p-2 rounded">
                    <h4 className="font-bold mb-2">(オプション) ホイップクリームの個数</h4>
                    <Separator className="my-2" />
                    <div className="flex">
                        {product.sizes.map(size => (
                            <div key={size} className="flex-1 px-2">
                                <h5 className="font-semibold mb-1">{size}サイズ</h5>
                                <RadioGroup
                                    value={whippedCreamCount[size].toString()}
                                    onValueChange={(value) => {
                                        setWhippedCreamCount(prev => ({ ...prev, [size]: parseInt(value) }));
                                        setSelectedItems(prev =>
                                            prev.map(item =>
                                                item.item === "ホイップクリーム"
                                                    ? { ...item, quantity: { ...item.quantity, [size]: parseInt(value) } }
                                                    : item
                                            )
                                        );
                                    }}
                                >
                                    {[0, 1, 2, 3].map((count) => (
                                        <div key={`${size}-${count}`} className="flex items-center space-x-2">
                                            <RadioGroupItem value={count.toString()} id={`${size}-${count}`} />
                                            <Label htmlFor={`${size}-${count}`}>{count}個</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {category === "5000s(ボタン)" && selectedItems.some(i => i.item === "エスプレッソ") && (
                <div className="mt-2 border p-2 rounded">
                    <h4 className="font-bold mb-2">(オプション) エスプレッソのサイズ</h4>
                    <Separator className="my-2" />
                    <div className="flex">
                        {product.sizes.map(size => (
                            <div key={size} className="flex-1 px-2">
                                <h5 className="font-semibold mb-1">{size}サイズ</h5>
                                <RadioGroup
                                    value={espressoSize[size]}
                                    onValueChange={(value) => {
                                        setEspressoSize(prev => ({ ...prev, [size]: value }));
                                        setSelectedItems(prev =>
                                            prev.map(item =>
                                                item.item === "エスプレッソ"
                                                    ? { ...item, attributes: { ...item.attributes, [size]: value } }
                                                    : item
                                            )
                                        );
                                    }}
                                >
                                    {['S', 'M', 'L'].map((espSize) => (
                                        <div key={`${size}-${espSize}`} className="flex items-center space-x-2">
                                            <RadioGroupItem value={espSize} id={`${size}-${espSize}`} />
                                            <Label htmlFor={`${size}-${espSize}`}>{espSize}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        ))}
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