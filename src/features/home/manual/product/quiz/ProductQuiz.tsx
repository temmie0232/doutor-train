import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiQuestionnaireLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Product, products } from '@/data/products';
import { categories, allMaterials } from '@/data/materials';
import { CiImageOff } from 'react-icons/ci';

interface ProductQuizProps {
    productName: string;
}

const ProductQuiz: React.FC<ProductQuizProps> = ({ productName }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [correctAnswer, setCorrectAnswer] = useState<string[]>([]);
    const [score, setScore] = useState<number>(0);
    const product: Product | undefined = products.find(p => p.name === productName);
    const router = useRouter();

    useEffect(() => {
        // TODO: 実際の製品データに基づいて正解を設定
        setCorrectAnswer(["コーヒーマシン", "Mホットカップ", "ブレンドコーヒー"]);
    }, [productName]);

    const toggleItem = (item: string) => {
        setSelectedItems(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const handleSubmit = () => {
        setSubmitted(true);
        const correctItems = selectedItems.filter(item => correctAnswer.includes(item));
        const incorrectItems = selectedItems.filter(item => !correctAnswer.includes(item));
        const missedItems = correctAnswer.filter(item => !selectedItems.includes(item));

        const totalScore = correctItems.length - (incorrectItems.length + missedItems.length);
        setScore(Math.max(0, totalScore));
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        {productName}を作るために必要なものを選択してみよう
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full mb-16" style={{ maxWidth: '350px', margin: '0 auto' }}>
                        <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
                            {product?.image ? (
                                <Image
                                    src={product.image}
                                    alt={productName}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-lg shadow-lg"
                                    style={{ borderRadius: '0.5rem' }}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg shadow-lg">
                                    <CiImageOff size={48} className="text-gray-400" />
                                </div>
                            )}
                        </div>
                    </div>

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

                    <Button
                        onClick={handleSubmit}
                        className="mt-4 w-full bg-black text-white hover:bg-gray-800"
                        disabled={submitted}
                    >
                        回答する
                    </Button>

                    {submitted && (
                        <div className="mt-4 text-center">
                            <p className="text-xl font-bold">スコア: {score} / {correctAnswer.length}</p>
                            <p className="mt-2">正解: {correctAnswer.join(", ")}</p>
                            <p>あなたの回答: {selectedItems.join(", ")}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    onClick={() => router.push(`/home/manual/${encodeURIComponent(productName)}`)}
                    className="flex-1 bg-white text-black border border-black hover:bg-gray-100"
                    variant="outline"
                >
                    作り方に戻る
                </Button>
                <Button
                    onClick={() => router.push('/home/manual')}
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                >
                    商品マニュアルリストに戻る
                </Button>
            </div>
        </div>
    );
};

export default ProductQuiz;