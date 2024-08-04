"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/layout/Layout';
import { Product, products } from '@/data/products';
import { CiImageOff } from 'react-icons/ci';

// カスタムバッジコンポーネント
const EnhancedBadge: React.FC<React.ComponentProps<typeof Badge>> = ({ className, ...props }) => (
    <Badge
        className={`border-2 border-white shadow-md ${className}`}
        {...props}
    />
);

const ManualListPage = () => {
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
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="商品を検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2"
                />
                <div className="flex justify-center space-x-2 mb-2">
                    <Button size="sm" onClick={() => setSortBy('all')} variant={sortBy === 'all' ? 'default' : 'outline'}>すべて</Button>
                    <Button size="sm" onClick={() => setSortBy('ice')} variant={sortBy === 'ice' ? 'default' : 'outline'}>アイス</Button>
                    <Button size="sm" onClick={() => setSortBy('hot')} variant={sortBy === 'hot' ? 'default' : 'outline'}>ホット</Button>
                    <Button size="sm" onClick={() => setSortBy('food')} variant={sortBy === 'food' ? 'default' : 'outline'}>フード</Button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <Card key={product.name} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleProductClick(product.name)}>
                        <CardContent className="p-2">
                            <div className="relative w-full h-48 mb-2">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover rounded"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            const target = e.currentTarget;
                                            target.style.display = 'none';
                                            const nextSibling = target.nextElementSibling as HTMLElement;
                                            if (nextSibling) {
                                                nextSibling.style.display = 'flex';
                                            }
                                        }}
                                    />
                                ) : null}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded" style={{ display: 'none' }}>
                                    <CiImageOff size={48} className="text-gray-400" />
                                </div>
                                {product.isLimited && (
                                    <EnhancedBadge variant="destructive" className="absolute top-2 left-2">
                                        期間限定
                                    </EnhancedBadge>
                                )}
                                <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                                    {product.sizes.map(size => (
                                        <EnhancedBadge key={size} variant="secondary">
                                            {size}
                                        </EnhancedBadge>
                                    ))}
                                </div>
                            </div>
                            <h2 className="text-base font-semibold">{product.name}</h2>
                            {!product.isOnSale && (
                                <EnhancedBadge variant="outline" className="mt-2">販売終了</EnhancedBadge>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Layout>
    );
};

export default ManualListPage;