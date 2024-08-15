import React from 'react';
import Image from 'next/image';
import { CiImageOff } from 'react-icons/ci';
import { ProductImageProps } from '@/types/types';

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
    return (
        <div className="w-full max-w-[350px] mx-auto mb-8">
            <div className="relative aspect-square">
                {product?.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg shadow-lg"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg shadow-lg">
                        <CiImageOff className="text-gray-400 w-1/3 h-1/3" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductImage;