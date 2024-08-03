"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/layout/Layout';
import { products } from '@/data/products';
import { CiImageOff } from 'react-icons/ci';

interface ProductDetailPageProps {
    params: { productID: string };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
    const router = useRouter();
    const { productID } = params;

    if (!productID) {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">エラー</h1>
                    <p className="mb-4">商品IDが見つかりません</p>
                    <Button onClick={() => router.back()}>戻る</Button>
                </div>
            </Layout>
        );
    }

    const decodedProductName = decodeURIComponent(productID);
    const product = products.find(p =>
        p.name === decodedProductName ||
        p.name.includes(decodedProductName) ||
        decodedProductName.includes(p.name)
    );

    if (!product) {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">商品が見つかりません</h1>
                    <p className="mb-4">検索した商品名: {decodedProductName}</p>
                    <Button onClick={() => router.back()}>戻る</Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center">{product.name}</h1>
                <div className="flex justify-center mt-1 mb-6">
                    <div className="w-16 h-1 bg-black rounded-lg"></div>
                </div>

                <div className="mb-8">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    ) : (
                        <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-lg shadow-md">
                            <CiImageOff size={64} className="text-gray-400" />
                        </div>
                    )}
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3 text-center">商品情報</h2>
                    <div className="space-y-2">
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

                <div className="mb-6 ">
                    <h2 className="text-xl font-semibold mb-3 text-center">作り方</h2>
                    <p>ここに{product.name}の作り方を記述します。</p>
                </div>

                <Button onClick={() => router.back()} className="w-full">商品リストに戻る</Button>
            </div>
        </Layout>
    );
};

export default ProductDetailPage;