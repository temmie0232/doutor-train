"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Product, products } from '@/data/products';
import { getQuizResults } from '@/lib/firebase';
import SearchBar from '@/features/home/manual/SearchBar';
import ProductGrid from '@/features/home/manual/ProductGrid';

const ManualListPage: React.FC = () => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'ice' | 'hot' | 'food' | 'all'>('all');
    const [quizResults, setQuizResults] = useState<{ [key: string]: { score: number; totalQuestions: number } }>({});
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (sortBy === 'all' || product.category === sortBy)
        );
        setFilteredProducts(filtered);
    }, [searchTerm, sortBy]);

    useEffect(() => {
        const fetchQuizResults = async () => {
            if (user) {
                const results = await getQuizResults(user.uid);
                setQuizResults(results || {});
            }
        };
        fetchQuizResults();
    }, [user]);

    const handleProductClick = (productName: string) => {
        const productID = encodeURIComponent(productName);
        console.log("Encoded productID:", productID);
        router.push(`/home/manual/${productID}`);
    };

    return (
        <Layout>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <ProductGrid
                products={filteredProducts}
                onProductClick={handleProductClick}
                quizResults={quizResults}
            />
        </Layout>
    );
};

export default ManualListPage;