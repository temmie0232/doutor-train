import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Product } from '@/data/products';
import { CiImageOff } from 'react-icons/ci';

interface ProductInfoProps {
    product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    return (
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
    );
};

export default ProductInfo;