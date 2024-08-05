import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from '@/data/products';
import { CiImageOff } from 'react-icons/ci';

interface InstructionStepsProps {
    product: Product;
    instructions: string[][];
}

const InstructionSteps: React.FC<InstructionStepsProps> = ({ product, instructions }) => {
    return (
        <>
            <Separator className="my-8" />
            <h2 className="text-2xl font-semibold mb-4">作り方</h2>
            <div className="space-y-6">
                {instructions.map((step, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>ステップ {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative w-full">
                                <Image
                                    src={`/manual/${encodeURIComponent(product.name)}/${index + 1}.png`}
                                    alt={`${product.name}の作り方 ステップ${index + 1}`}
                                    width={500}
                                    height={300}
                                    layout="responsive"
                                    objectFit="contain"
                                    className="rounded-lg"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling as HTMLDivElement;
                                        if (fallback) fallback.style.display = 'flex';
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg" style={{ display: 'none' }}>
                                    <CiImageOff size={48} className="text-gray-400" />
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                                {step.map((line, lineIndex) => (
                                    <p key={lineIndex} className={lineIndex > 0 ? "mt-1" : ""}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default InstructionSteps;