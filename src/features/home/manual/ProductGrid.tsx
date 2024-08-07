import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/data/productData';


interface ProductGridProps {
    products: Product[];
    onProductClick: (productName: string) => void;
    quizResults: { [key: string]: { score: number; totalQuestions: number } };
}

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