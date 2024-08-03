"use client"
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/layout/Layout';
import { Product, products } from '@/data/products';
import { CiImageOff } from 'react-icons/ci';

const ManualListPage = () => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'ice' | 'hot' | 'food' | 'all'>('all');

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (sortBy === 'all' || product.category === sortBy)
        );
        setFilteredProducts(filtered);
    }, [searchTerm, sortBy]);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-center">商品マニュアル</h1>
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
                    <Card key={product.name} className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardContent className="p-2">
                            <div className="relative w-full pb-[100%] mb-2">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="absolute inset-0 w-full h-full object-cover rounded"
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
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded" style={{ display: product.image ? 'none' : 'flex' }}>
                                    <CiImageOff size={48} className="text-gray-400" />
                                </div>
                            </div>
                            <h2 className="text-base font-semibold">{product.name}</h2>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {product.sizes.map(size => (
                                    <Badge key={size} variant="secondary">{size}</Badge>
                                ))}
                            </div>
                            {product.isLimited && (
                                <Badge variant="destructive" className="mt-2">期間限定</Badge>
                            )}
                            {!product.isOnSale && (
                                <Badge variant="outline" className="mt-2">販売終了</Badge>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Layout>
    );
};

export default ManualListPage;