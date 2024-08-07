import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { categories } from '@/data/materials';
import {
    MaterialSelectorProps,
    QuizState,
    SelectedItem,
    QuizContextType
} from '@/types/types';
import {
    Category,
    CupSelector,
    HotCupTypeSelector,
    JetSteamerOption,
    WhippedCreamOption,
    EspressoOption,
    QuizContext
} from './QuizComponents';


const MaterialSelector: React.FC<MaterialSelectorProps> = ({
    correctAnswer,
    product,
    onSubmit
}) => {
    const [state, setState] = useState<QuizState>({
        selectedItems: [],
        jetSteamerFoam: false,
        whippedCreamCount: product.sizes.reduce((acc, size) => ({ ...acc, [size]: 0 }), {}),
        espressoSize: product.sizes.reduce((acc, size) => ({ ...acc, [size]: 'S' }), {}),
        selectedCup: null,
        hotCupTypes: product.sizes.reduce((acc, size) => ({ ...acc, [size]: '' }), {})
    });

    const [submitted, setSubmitted] = useState<boolean>(false);

    const toggleItem = useCallback((item: string, size?: string) => {
        setState(prev => {
            const newItems = prev.selectedItems.filter(i => !(i.item === item && i.size === size));
            if (newItems.length === prev.selectedItems.length) {
                const newItem: SelectedItem = { item };
                if (size) newItem.size = size;
                if (item === "ジェットスチーマー") {
                    newItem.attributes = { "泡立て": prev.jetSteamerFoam ? "あり" : "なし" };
                } else if (item === "ホイップクリーム") {
                    newItem.quantity = prev.whippedCreamCount;
                } else if (item === "エスプレッソ") {
                    newItem.attributes = product.sizes.reduce((acc, size) => ({
                        ...acc,
                        [size]: prev.espressoSize[size]
                    }), {});
                }
                newItems.push(newItem);
            }
            return { ...prev, selectedItems: newItems };
        });
    }, [product.sizes]);

    const setJetSteamerFoam = useCallback((value: boolean) => {
        setState(prev => ({
            ...prev,
            jetSteamerFoam: value,
            selectedItems: prev.selectedItems.map(item =>
                item.item === "ジェットスチーマー"
                    ? { ...item, attributes: { "泡立て": value ? "あり" : "なし" } }
                    : item
            )
        }));
    }, []);

    const setWhippedCreamCount = useCallback((size: string, count: number) => {
        setState(prev => ({
            ...prev,
            whippedCreamCount: { ...prev.whippedCreamCount, [size]: count },
            selectedItems: prev.selectedItems.map(item =>
                item.item === "ホイップクリーム"
                    ? { ...item, quantity: { ...item.quantity, [size]: count } }
                    : item
            )
        }));
    }, []);

    const setEspressoSize = useCallback((size: string, espressoSize: string) => {
        setState(prev => ({
            ...prev,
            espressoSize: { ...prev.espressoSize, [size]: espressoSize },
            selectedItems: prev.selectedItems.map(item =>
                item.item === "エスプレッソ"
                    ? { ...item, attributes: { ...item.attributes, [size]: espressoSize } }
                    : item
            )
        }));
    }, []);

    const handleCupSelection = useCallback((cupType: 'hot' | 'ice') => {
        setState(prev => ({
            ...prev,
            selectedCup: cupType,
            selectedItems: prev.selectedItems.filter(item => item.item !== 'カップ').concat({
                item: 'カップ',
                attributes: { type: cupType }
            })
        }));
    }, []);

    const handleHotCupTypeSelection = useCallback((size: string, type: string) => {
        setState(prev => ({
            ...prev,
            hotCupTypes: { ...prev.hotCupTypes, [size]: type },
            selectedItems: prev.selectedItems.filter(item => item.item !== 'カップ' || item.size !== size).concat({
                item: 'カップ',
                size,
                attributes: { type: 'hot', subType: type }
            })
        }));
    }, []);

    const isCorrect = useCallback((item: string): boolean => {
        const selectedItem = state.selectedItems.find(i => i.item === item);
        const correctItem = correctAnswer.find(answer => answer.item === item);

        if (!selectedItem || !correctItem) return false;

        if (item === 'カップ') {
            const selectedType = selectedItem.attributes?.type;
            const correctType = correctItem.attributes?.type;

            if (selectedType === correctType) {
                if (correctType === 'hot' && correctItem.sizeDependent) {
                    return Object.entries(correctItem.sizeDependent).every(([size, value]) => {
                        const selectedCupForSize = state.selectedItems.find(i => i.item === 'カップ' && i.size === size);
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
    }, [state.selectedItems, correctAnswer]);

    const handleSubmit = useCallback(() => {
        setSubmitted(true);
        const score = correctAnswer.filter(answer => isCorrect(answer.item)).length;
        onSubmit(score);
    }, [correctAnswer, isCorrect, onSubmit]);

    const quizContextValue: QuizContextType = {
        ...state,
        submitted,
        isCorrect,
        toggleItem,
        setJetSteamerFoam,
        setWhippedCreamCount,
        setEspressoSize,
        handleCupSelection,
        handleHotCupTypeSelection,
    };

    return (
        <QuizContext.Provider value={quizContextValue}>
            {Object.entries(categories).map(([category, items]) => (
                <React.Fragment key={category}>
                    {category === "カップ/容器" ? (
                        <>
                            <h3 className="font-bold mb-2">{category}</h3>
                            <CupSelector
                                selectedCup={state.selectedCup}
                                handleCupSelection={handleCupSelection}
                                submitted={submitted}
                                isCorrect={isCorrect}
                            />
                            {state.selectedCup === 'hot' && (
                                <HotCupTypeSelector
                                    product={product}
                                    hotCupTypes={state.hotCupTypes}
                                    handleHotCupTypeSelection={handleHotCupTypeSelection}
                                />
                            )}
                        </>
                    ) : (
                        <Category
                            category={category}
                            items={items}
                            selectedItems={state.selectedItems}
                            toggleItem={toggleItem}
                            submitted={submitted}
                            isCorrect={isCorrect}
                            product={product}
                        />
                    )}
                    {category === "機械/設備" && state.selectedItems.some(i => i.item === "ジェットスチーマー") && (
                        <JetSteamerOption />
                    )}
                    {category === "トッピング/ソース" && state.selectedItems.some(i => i.item === "ホイップクリーム") && (
                        <WhippedCreamOption product={product} />
                    )}
                    {category === "5000s(ボタン)" && state.selectedItems.some(i => i.item === "エスプレッソ") && (
                        <EspressoOption product={product} />
                    )}
                </React.Fragment>
            ))}
            <Button
                onClick={handleSubmit}
                className="mt-4 w-full bg-black text-white hover:bg-gray-800"
                disabled={submitted}
            >
                回答する
            </Button>
        </QuizContext.Provider>
    );
};

export default MaterialSelector;