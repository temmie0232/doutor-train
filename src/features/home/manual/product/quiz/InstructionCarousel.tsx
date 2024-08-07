import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { CiImageOff } from 'react-icons/ci';
import { FaRegHandPointRight } from 'react-icons/fa';

interface InstructionCarouselProps {
    productName: string;
    instructions: string[][];
}

const InstructionCarousel: React.FC<InstructionCarouselProps> = ({ productName, instructions }) => {
    const totalPages = instructions.length;

    return (
        <Carousel className="w-full">
            <CarouselContent>
                {instructions.map((step, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center p-6 relative">
                                    <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-full text-sm z-10">
                                        {index + 1}/{totalPages}
                                    </div>
                                    <div className="relative w-full h-64 mb-4">
                                        <Image
                                            src={`/manual/${encodeURIComponent(productName)}/${index + 1}.png`}
                                            alt={`${productName}の作り方 ${index + 1}/${totalPages}`}
                                            layout="fill"
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
                                    <div className="text-center max-h-40 overflow-y-auto w-full">
                                        {step.map((line, lineIndex) => (
                                            <p key={lineIndex} className={lineIndex > 0 ? "mt-1" : ""}>
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="mt-6 text-sm text-gray-400 flex items-center">
                                        <span>横にスライドでページ移動</span>
                                        <FaRegHandPointRight className="ml-2" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default InstructionCarousel;