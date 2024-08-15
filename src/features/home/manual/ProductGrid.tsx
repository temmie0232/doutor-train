import React from 'react';
import ProductCard from './ProductCard';
import { ProductGridProps } from '@/types/types';


const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, quizResults }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard
                    key={product.name}
                    product={product}
                    onClick={onProductClick}
                    quizResult={quizResults[product.name] || null}
                />
            ))}
        </div>
    );
};

export default ProductGrid;