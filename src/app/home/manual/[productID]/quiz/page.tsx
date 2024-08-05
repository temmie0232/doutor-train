"use client"

import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductQuiz from '@/features/home/manual/product/quiz/ProductQuiz';

const ProductQuizPage: React.FC<{ params: { productID: string } }> = ({ params }) => {
    const productName = decodeURIComponent(params.productID);

    return (
        <Layout>
            <ProductQuiz productName={productName} />
        </Layout>
    );
};

export default ProductQuizPage;