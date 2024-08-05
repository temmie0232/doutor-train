import React from 'react';
import Image from 'next/image';
import { CiImageOff } from 'react-icons/ci';
import { Product } from '@/data/products';

interface ProductImageProps {
    product: Product | undefined;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
    return (
        <div className="w-full mb-16" style={{ maxWidth: '350px', margin: '0 auto' }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
                {product?.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg shadow-lg"
                        style={{ borderRadius: '0.5rem' }}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg shadow-lg">
                        <CiImageOff size={48} className="text-gray-400" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductImage;