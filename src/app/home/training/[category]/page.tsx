"use client"

import React from 'react'
import TrainingCategoryPage from '@/features/home/training/TrainingCategoryPage'

const TrainingCategoryPageWrapper = ({ params }: { params: { category: 'hot' | 'ice' | 'food' } }) => {
    return <TrainingCategoryPage category={params.category} />
}

export default TrainingCategoryPageWrapper