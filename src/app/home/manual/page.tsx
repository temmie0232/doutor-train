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
import { IoReload } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const ManualListPage: React.FC = () => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(productData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
    const [selectedUnderstandings, setSelectedUnderstandings] = useState<string[]>(['すべて']);
    const [quizResults, setQuizResults] = useState<{ [key: string]: { score: number; totalQuestions: number } }>({});
    const router = useRouter();
    const { user } = useAuth();

    const categoryOptions = ['すべて', 'ホット', 'アイス', 'フード'];
    const understandingOptions = ['すべて', '理解できた', '学習中', '未受験'];

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
            const matchesUnderstanding = selectedUnderstandings.includes('すべて') || selectedUnderstandings.includes(understanding);

            return matchesSearch && matchesCategory && matchesUnderstanding;
        });
        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, selectedUnderstandings, quizResults]);

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    const handleUnderstandingChange = (value: string) => {
        if (value === 'すべて') {
            setSelectedUnderstandings(['すべて']);
        } else {
            const newSelection = selectedUnderstandings.includes('すべて')
                ? [value]
                : selectedUnderstandings.includes(value)
                    ? selectedUnderstandings.filter(u => u !== value)
                    : [...selectedUnderstandings, value];
            setSelectedUnderstandings(newSelection.length === 0 ? ['すべて'] : newSelection);
        }
    };

    const handleProductClick = (productName: string) => {
        const productID = encodeURIComponent(productName);
        router.push(`/home/manual/${productID}`);
    };

    const resetFilters = () => {
        setSelectedCategory('すべて');
        setSelectedUnderstandings(['すべて']);
    };

    return (
        <Layout>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="flex items-center space-x-4 my-4">
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="カテゴリ" />
                    </SelectTrigger>
                    <SelectContent>
                        {categoryOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    value={selectedUnderstandings[0]}
                    onValueChange={handleUnderstandingChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="理解度" />
                    </SelectTrigger>
                    <SelectContent>
                        {understandingOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={resetFilters} variant="outline" size="icon">
                    <IoReload />
                </Button>
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