import React from 'react';
import { Product } from '@/data/products';
import { CiImageOff } from 'react-icons/ci';
import EnhancedBadge from '@/features/home/manual/EnhancedBadge';

interface ProductInfoProps {
    product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    return (
        <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">商品情報</h2>
            <div className="relative mb-4">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full object-cover rounded-lg shadow-md"
                    />
                ) : (
                    <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-lg shadow-md">
                        <CiImageOff size={64} className="text-gray-400" />
                    </div>
                )}
                {product.isLimited && (
                    <EnhancedBadge large variant="destructive" className="absolute top-4 left-4">
                        期間限定
                    </EnhancedBadge>
                )}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                        <EnhancedBadge large key={size} variant="secondary">
                            {size}
                        </EnhancedBadge>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <div className="mb-4">
                    <span className="font-medium">商品説明:</span>
                    <p className="mt-1 text-gray-600">{product.description}</p>
                </div>
                {!product.isOnSale && (
                    <EnhancedBadge large variant="outline" className="mt-2">販売終了</EnhancedBadge>
                )}
            </div>
        </div>
    );
};

export default ProductInfo;