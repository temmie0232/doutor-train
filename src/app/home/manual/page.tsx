"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { productData, Product } from '@/data/productData';
import { getQuizResults } from '@/lib/firebase';
import SearchBar from '@/features/home/manual/SearchBar';
import ProductGrid from '@/features/home/manual/ProductGrid';
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import { IoFilter } from "react-icons/io5";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ManualListPage: React.FC = () => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(productData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
    const [selectedUnderstanding, setSelectedUnderstanding] = useState<string>('すべて');
    const [selectedLimited, setSelectedLimited] = useState<string>('すべて');
    const [selectedSaleStatus, setSelectedSaleStatus] = useState<string>('すべて');
    const [quizResults, setQuizResults] = useState<{ [key: string]: { score: number; totalQuestions: number } }>({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const categoryOptions = ['すべて', 'ホット', 'アイス', 'フード'];
    const understandingOptions = ['すべて', '理解できた', '学習中', '未受験'];
    const limitedOptions = ['すべて', '期間限定', '通常商品'];
    const saleStatusOptions = ['すべて', '販売中', '販売終了'];

    useEffect(() => {
        const fetchQuizResults = async () => {
            if (user) {
                const results = await getQuizResults(user.uid);
                setQuizResults(results || {});
            }
        };
        fetchQuizResults();
    }, [user]);

    useEffect(() => {
        const filtered = productData.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'すべて' ||
                (selectedCategory === 'ホット' && product.category === 'hot') ||
                (selectedCategory === 'アイス' && product.category === 'ice') ||
                (selectedCategory === 'フード' && product.category === 'food');
            const quizResult = quizResults[product.name];
            let understanding = '未受験';
            if (quizResult) {
                understanding = quizResult.score === quizResult.totalQuestions ? '理解できた' : '学習中';
            }
            const matchesUnderstanding = selectedUnderstanding === 'すべて' || selectedUnderstanding === understanding;
            const matchesLimited = selectedLimited === 'すべて' ||
                (selectedLimited === '期間限定' && product.isLimited) ||
                (selectedLimited === '通常商品' && !product.isLimited);
            const matchesSaleStatus = selectedSaleStatus === 'すべて' ||
                (selectedSaleStatus === '販売中' && product.isOnSale) ||
                (selectedSaleStatus === '販売終了' && !product.isOnSale);

            return matchesSearch && matchesCategory && matchesUnderstanding && matchesLimited && matchesSaleStatus;
        });
        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, selectedUnderstanding, selectedLimited, selectedSaleStatus, quizResults]);

    const handleProductClick = (productName: string) => {
        const productID = encodeURIComponent(productName);
        router.push(`/home/manual/${productID}`);
    };

    const resetFilters = () => {
        setSelectedCategory('すべて');
        setSelectedUnderstanding('すべて');
        setSelectedLimited('すべて');
        setSelectedSaleStatus('すべて');
        setIsDialogOpen(false);
    };

    return (
        <Layout>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="my-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <IoFilter className="mr-2 h-4 w-4" />
                            フィルター
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>フィルター設定</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    カテゴリ
                                </Label>
                                <RadioGroup
                                    id="category"
                                    value={selectedCategory}
                                    onValueChange={setSelectedCategory}
                                    className="col-span-3"
                                >
                                    {categoryOptions.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`category-${option}`} />
                                            <Label htmlFor={`category-${option}`}>{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="understanding" className="text-right">
                                    理解度
                                </Label>
                                <RadioGroup
                                    id="understanding"
                                    value={selectedUnderstanding}
                                    onValueChange={setSelectedUnderstanding}
                                    className="col-span-3"
                                >
                                    {understandingOptions.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`understanding-${option}`} />
                                            <Label htmlFor={`understanding-${option}`}>{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="limited" className="text-right">
                                    期間限定
                                </Label>
                                <RadioGroup
                                    id="limited"
                                    value={selectedLimited}
                                    onValueChange={setSelectedLimited}
                                    className="col-span-3"
                                >
                                    {limitedOptions.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`limited-${option}`} />
                                            <Label htmlFor={`limited-${option}`}>{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="saleStatus" className="text-right">
                                    販売状況
                                </Label>
                                <RadioGroup
                                    id="saleStatus"
                                    value={selectedSaleStatus}
                                    onValueChange={setSelectedSaleStatus}
                                    className="col-span-3"
                                >
                                    {saleStatusOptions.map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`saleStatus-${option}`} />
                                            <Label htmlFor={`saleStatus-${option}`}>{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={resetFilters} variant="outline" className="mr-2">
                                リセット
                            </Button>
                            <Button onClick={() => setIsDialogOpen(false)}>
                                適用
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Separator className="my-4" />
            <ProductGrid
                products={filteredProducts}
                onProductClick={handleProductClick}
                quizResults={quizResults}
            />
        </Layout>
    );
};

export default ManualListPage;