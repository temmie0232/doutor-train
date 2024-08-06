"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';
import { products, Product } from '@/data/products';
import { productInstructions, Instruction } from '@/data/productInstructions';
import { getQuizResults } from '@/lib/firebase';
import ProductInfo from '@/features/home/manual/product/ProductInfo';
import InstructionSteps from '@/features/home/manual/product/InstructionSteps';
import ProductActions from '@/features/home/manual/product/ProductActions';
import UnderstandingBadge from '@/features/home/manual/UnderstandingBadge';

interface ProductDetailPageProps {
    params: { productID: string };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
    const router = useRouter();
    const { user } = useAuth();
    const { productID } = params;
    const [product, setProduct] = useState<Product | null>(null);
    const [instructions, setInstructions] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);
    const [quizResult, setQuizResult] = useState<{ score: number; totalQuestions: number } | null>(null);

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

        const fetchQuizResult = async () => {
            if (user && foundProduct) {
                const results = await getQuizResults(user.uid);
                setQuizResult(results[foundProduct.name] || null);
            }
        };
        fetchQuizResult();
    }, [productID, user]);

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
            <div className="max-w-2xl mx-auto px-8 sm:px-8 lg:px-10"> {/* この行を変更 */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    {quizResult && (
                        <UnderstandingBadge
                            score={quizResult.score}
                            totalQuestions={quizResult.totalQuestions}
                            showPercentage={true}
                        />
                    )}
                </div>
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