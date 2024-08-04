"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Layout from '@/components/layout/Layout';
import { products, Product } from '@/data/products';
import { productInstructions, Instruction } from '@/data/productInstructions';
import { CiImageOff } from 'react-icons/ci';
import UnderDevelopmentDialog from '@/components/elements/UnderDevelopmentDialog';

interface ProductDetailPageProps {
    params: { productID: string };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
    const router = useRouter();
    const { productID } = params;
    const [product, setProduct] = useState<Product | null>(null);
    const [instructions, setInstructions] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const decodedProductName = decodeURIComponent(productID);
        // 完全一致で商品を検索
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

                {/* 商品情報 */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">商品情報</h2>
                    <div className="mb-4">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-h-64 object-contain rounded-lg shadow-md"
                            />
                        ) : (
                            <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-lg shadow-md">
                                <CiImageOff size={64} className="text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        {/* 商品説明を追加 */}
                        <div className="mb-4">
                            <span className="font-medium">商品説明:</span>
                            <p className="mt-1 text-gray-600">{product.description}</p>
                        </div>
                        <div className="flex items-center">
                            <span className="w-24 font-medium">サイズ:</span>
                            <div>
                                {product.sizes.map(size => (
                                    <Badge key={size} variant="outline" className="mr-1">{size}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="w-24 font-medium">販売タイプ:</span>
                            <Badge variant="outline">
                                {product.isLimited ? '期間限定' : '一般販売'}
                            </Badge>
                        </div>
                        <div className="flex items-center">
                            <span className="w-24 font-medium">販売状況:</span>
                            <Badge variant="outline">
                                {product.isOnSale ? '販売中' : '販売終了'}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* セパレータ */}
                <Separator className="my-8" />

                {/* 作り方セクション */}
                <h2 className="text-2xl font-semibold mb-4">作り方</h2>
                <div className="space-y-6">
                    {instructions.map((step, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>ステップ {index + 1}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative w-full">
                                    <Image
                                        src={`/manual/${encodeURIComponent(product!.name)}/${index + 1}.png`}
                                        alt={`${product!.name}の作り方 ステップ${index + 1}`}
                                        width={500}
                                        height={300}
                                        layout="responsive"
                                        objectFit="contain"
                                        className="rounded-lg"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const fallback = target.nextElementSibling as HTMLDivElement;
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg" style={{ display: 'none' }}>
                                        <CiImageOff size={48} className="text-gray-400" />
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                    {step.map((line, lineIndex) => (
                                        <p key={lineIndex} className={lineIndex > 0 ? "mt-1" : ""}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-8">
                    <Button onClick={() => setShowDialog(true)} className="w-full mb-4">
                        クイズに挑戦
                    </Button>
                    <Button onClick={() => router.back()} className="w-full">商品リストに戻る</Button>
                </div>
            </div>
            <UnderDevelopmentDialog open={showDialog} onOpenChange={setShowDialog} />
        </Layout>
    );
};

export default ProductDetailPage;