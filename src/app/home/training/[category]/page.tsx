"use client"

import TrainingCategoryPage from '@/features/home/training/category/TrainingCategoryPage'
import React from 'react'

const TrainingCategoryPageWrapper = ({ params }: { params: { category: 'hot' | 'ice' | 'food' } }) => {
    return <TrainingCategoryPage category={params.category} />
}

export default TrainingCategoryPageWrapper