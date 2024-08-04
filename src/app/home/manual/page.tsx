"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { Product, products } from '@/data/products';
import SearchBar from '@/features/home/manual/SearchBar';
import ProductGrid from '@/features/home/manual/ProductGrid';

const ManualListPage: React.FC = () => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'ice' | 'hot' | 'food' | 'all'>('all');
    const router = useRouter();

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (sortBy === 'all' || product.category === sortBy)
        );
        setFilteredProducts(filtered);
    }, [searchTerm, sortBy]);

    const handleProductClick = (productName: string) => {
        const productID = encodeURIComponent(productName);
        console.log("Encoded productID:", productID); // デバッグ用ログ
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
            <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
        </Layout>
    );
};

export default ManualListPage;