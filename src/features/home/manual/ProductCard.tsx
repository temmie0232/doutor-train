import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CiImageOff } from 'react-icons/ci';
import EnhancedBadge from './EnhancedBadge';
import { Product } from '@/data/products';

interface ProductCardProps {
    product: Product;
    onClick: (productName: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onClick(product.name)}>
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
                <h2 className="text-base font-semibold truncate max-w-[90%]">{product.name}</h2>
                {!product.isOnSale && (
                    <EnhancedBadge variant="outline" className="mt-2">販売終了</EnhancedBadge>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductCard;