"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { productData, Product } from '@/data/productData';
import { getQuizResults } from '@/lib/firebase';
import SearchBar from '@/features/home/manual/SearchBar';
import ProductGrid from '@/features/home/manual/ProductGrid';
import SortDropdown from '@/features/home/manual/SortDropdown';
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";

const ManualListPage: React.FC = () => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(productData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['すべて']);
    const [selectedUnderstandings, setSelectedUnderstandings] = useState<string[]>(['すべて']);
    const [quizResults, setQuizResults] = useState<{ [key: string]: { score: number; totalQuestions: number } }>({});
    const router = useRouter();
    const { user } = useAuth();

    const typeOptions = ['すべて', 'アイス', 'ホット', 'フード'];
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
            const matchesType = selectedTypes.includes('すべて') || selectedTypes.includes(product.category);
            const quizResult = quizResults[product.name];
            const understanding = quizResult
                ? quizResult.score === quizResult.totalQuestions
                    ? '理解できた'
                    : '学習中'
                : '未受験';
            const matchesUnderstanding = selectedUnderstandings.includes('すべて') || selectedUnderstandings.includes(understanding);

            return matchesSearch && matchesType && matchesUnderstanding;
        });
        setFilteredProducts(filtered);
    }, [searchTerm, selectedTypes, selectedUnderstandings, quizResults]);

    const handleTypeToggle = (option: string) => {
        setSelectedTypes(prev => {
            if (option === 'すべて') {
                return ['すべて'];
            }
            const newSelection = prev.includes(option)
                ? prev.filter(t => t !== option)
                : [...prev.filter(t => t !== 'すべて'), option];
            return newSelection.length === 0 ? ['すべて'] : newSelection;
        });
    };

    const handleUnderstandingToggle = (option: string) => {
        setSelectedUnderstandings(prev => {
            if (option === 'すべて') {
                return ['すべて'];
            }
            const newSelection = prev.includes(option)
                ? prev.filter(u => u !== option)
                : [...prev.filter(u => u !== 'すべて'), option];
            return newSelection.length === 0 ? ['すべて'] : newSelection;
        });
    };

    const handleProductClick = (productName: string) => {
        const productID = encodeURIComponent(productName);
        router.push(`/home/manual/${productID}`);
    };

    const resetFilters = () => {
        setSelectedTypes(['すべて']);
        setSelectedUnderstandings(['すべて']);
    };

    return (
        <Layout>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="flex items-center space-x-4 my-4">
                <SortDropdown
                    title="種類"
                    options={typeOptions}
                    selectedOptions={selectedTypes}
                    onOptionToggle={handleTypeToggle}
                    allOption="すべて"
                />
                <SortDropdown
                    title="理解度"
                    options={understandingOptions}
                    selectedOptions={selectedUnderstandings}
                    onOptionToggle={handleUnderstandingToggle}
                    allOption="すべて"
                />
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