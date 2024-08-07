import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Product } from '@/data/productData';
import { QuizState, SelectedItem } from '@/types/types';



export interface QuizActions {
    toggleItem: (item: string, size?: string) => void;
    setJetSteamerFoam: (value: boolean) => void;
    setWhippedCreamCount: (size: string, count: number) => void;
    setEspressoSize: (size: string, espressoSize: string) => void;
    handleCupSelection: (cupType: 'hot' | 'ice') => void;
    handleHotCupTypeSelection: (size: string, type: string) => void;
}

export interface QuizContextType extends QuizState, QuizActions {
    submitted: boolean;
    isCorrect: (item: string) => boolean;
}

export const QuizContext = React.createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
    const context = React.useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};

interface CategoryProps {
    category: string;
    items: string[];
    selectedItems: SelectedItem[];
    toggleItem: (item: string, size?: string) => void;
    submitted: boolean;
    isCorrect: (item: string) => boolean;
    product: Product;
}

export const Category: React.FC<CategoryProps> = ({
    category,
    items,
    selectedItems,
    toggleItem,
    submitted,
    isCorrect,
    product
}) => {
    return (
        <div key={category} className="mt-4 mb-2">
            <h3 className="font-bold mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map(item => {
                    // エスプレッソは5000s(ボタン)カテゴリーでのみ表示
                    if (item === "エスプレッソ" && category !== "5000s(ボタン)") {
                        return null;
                    }

                    const sizes = product.sizes.filter(size =>
                        selectedItems.some(answer =>
                            answer.item === item &&
                            answer.size === size
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
                })}
            </div>
        </div>
    );
};

interface CupSelectorProps {
    selectedCup: 'hot' | 'ice' | null;
    handleCupSelection: (cupType: 'hot' | 'ice') => void;
    submitted: boolean;
    isCorrect: (item: string) => boolean;
}

export const CupSelector: React.FC<CupSelectorProps> = ({
    selectedCup,
    handleCupSelection,
    submitted,
    isCorrect
}) => {
    return (
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
    );
};

interface HotCupTypeSelectorProps {
    product: Product;
    hotCupTypes: { [size: string]: string };
    handleHotCupTypeSelection: (size: string, type: string) => void;
}

export const HotCupTypeSelector: React.FC<HotCupTypeSelectorProps> = ({
    product,
    hotCupTypes,
    handleHotCupTypeSelection
}) => {
    return (
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
    );
};

export const JetSteamerOption: React.FC = () => {
    const { jetSteamerFoam, setJetSteamerFoam, submitted } = useQuiz();

    return (
        <div className="mt-2 border p-2 rounded">
            <h4 className="font-bold mb-2">(オプション) ジェットスチーマー</h4>
            <div className="flex items-center justify-between text-sm">
                <span>現在: {jetSteamerFoam ? "泡立てあり" : "泡だてなし"}</span>
                <Switch
                    checked={jetSteamerFoam}
                    onCheckedChange={setJetSteamerFoam}
                    disabled={submitted}
                />
            </div>
        </div>
    );
};

interface WhippedCreamOptionProps {
    product: Product;
}

export const WhippedCreamOption: React.FC<WhippedCreamOptionProps> = ({ product }) => {
    const { whippedCreamCount, setWhippedCreamCount, submitted } = useQuiz();

    return (
        <div className="mt-2 border p-2 rounded">
            <h4 className="font-bold mb-2">(オプション) ホイップクリームの個数</h4>
            <Separator className="my-2" />
            <div className="flex">
                {product.sizes.map(size => (
                    <div key={size} className="flex-1 px-2">
                        <h5 className="font-semibold mb-1">{size}サイズ</h5>
                        <RadioGroup
                            value={whippedCreamCount[size].toString()}
                            onValueChange={(value) => setWhippedCreamCount(size, parseInt(value))}
                            disabled={submitted}
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
    );
};

interface EspressoOptionProps {
    product: Product;
}

export const EspressoOption: React.FC<EspressoOptionProps> = ({ product }) => {
    const { espressoSize, setEspressoSize, submitted } = useQuiz();

    return (
        <div className="mt-2 border p-2 rounded">
            <h4 className="font-bold mb-2">(オプション) エスプレッソのサイズ</h4>
            <Separator className="my-2" />
            <div className="flex">
                {product.sizes.map(size => (
                    <div key={size} className="flex-1 px-2">
                        <h5 className="font-semibold mb-1">{size}サイズ</h5>
                        <RadioGroup
                            value={espressoSize[size]}
                            onValueChange={(value) => setEspressoSize(size, value)}
                            disabled={submitted}
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
    );
};