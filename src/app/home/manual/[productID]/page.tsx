"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';
import { products, Product } from '@/data/products';
import { productInstructions, Instruction } from '@/data/productInstructions';
import ProductInfo from '@/features/home/manual/product/ProductInfo';
import InstructionSteps from '@/features/home/manual/product/InstructionSteps';
import ProductActions from '@/features/home/manual/product/ProductActions';

interface ProductDetailPageProps {
    params: { productID: string };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
    const router = useRouter();
    const { productID } = params;
    const [product, setProduct] = useState<Product | null>(null);
    const [instructions, setInstructions] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const decodedProductName = decodeURIComponent(productID);
        const foundProduct = products.find(p => p.name === decodedProductName);

        if (foundProduct) {
            setProduct(foundProduct);
            const productSteps = productInstructions[foundProduct.name] || [];
            setInstructions(productSteps);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [productID]);

    const handleQuizClick = () => {
        router.push(`/home/manual/${productID}/quiz`);
    };

    if (loading) {
        return (
            <Layout>
                <div className="text-center">
                    <p>Loading...</p>
                </div>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">商品が見つかりません</h1>
                    <p className="mb-4">検索した商品名: {decodeURIComponent(productID)}</p>
                    <Button onClick={() => router.back()}>戻る</Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center">{product.name}</h1>
                <div className="flex justify-center mt-1 mb-8">
                    <div className="w-16 h-1 bg-black rounded-lg"></div>
                </div>

                <ProductInfo product={product} />
                <InstructionSteps product={product} instructions={instructions} />
                <ProductActions onQuizClick={handleQuizClick} onBackClick={() => router.back()} />
            </div>
        </Layout>
    );
};

export default ProductDetailPage;