"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Product, products } from '@/data/products';
import { getQuizResults } from '@/lib/firebase';
import SearchBar from '@/features/home/manual/SearchBar';
import ProductGrid from '@/features/home/manual/ProductGrid';
import SortDropdown from '@/features/home/manual/SortDropdown';
import { Separator } from '@/components/ui/separator';

const ManualListPage: React.FC = () => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
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
        const filtered = products.filter(product => {
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
        setSelectedTypes(prev =>
            option === 'すべて'
                ? ['すべて']
                : prev.includes(option)
                    ? prev.filter(t => t !== option && t !== 'すべて')
                    : [...prev.filter(t => t !== 'すべて'), option]
        );
    };

    const handleUnderstandingToggle = (option: string) => {
        setSelectedUnderstandings(prev =>
            option === 'すべて'
                ? ['すべて']
                : prev.includes(option)
                    ? prev.filter(u => u !== option && u !== 'すべて')
                    : [...prev.filter(u => u !== 'すべて'), option]
        );
    };

    const handleProductClick = (productName: string) => {
        const productID = encodeURIComponent(productName);
        router.push(`/home/manual/${productID}`);
    };

    return (
        <Layout>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="flex space-x-4 my-4">
                <SortDropdown
                    title="種類"
                    options={typeOptions}
                    selectedOptions={selectedTypes}
                    onOptionToggle={handleTypeToggle}
                />
                <SortDropdown
                    title="理解度"
                    options={understandingOptions}
                    selectedOptions={selectedUnderstandings}
                    onOptionToggle={handleUnderstandingToggle}
                />
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