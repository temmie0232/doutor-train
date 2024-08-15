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
import { InstructionCarouselProps } from '@/types/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const InstructionCarousel: React.FC<InstructionCarouselProps> = ({ productName, instructions }) => {
    const totalPages = instructions.length;

    return (
        <Carousel className="w-full">
            <CarouselContent>
                {instructions.map((step, index) => (
                    <CarouselItem key={index}>
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center p-4 relative">
                                <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-full text-sm z-10">
                                    {index + 1}/{totalPages}
                                </div>
                                <div className="relative w-full aspect-video mb-4">
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
                                <div className="text-center max-h-40 overflow-y-auto w-full text-sm">
                                    {step.map((line, lineIndex) => (
                                        <p key={lineIndex} className={lineIndex > 0 ? "mt-1" : ""}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

// TrainingCategoryPage コンポーネント内で使用するダイアログ部分
const InstructionDialog: React.FC<{ productName: string, instructions: string[][], isOpen: boolean, onClose: () => void }> = ({ productName, instructions, isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg">{productName}の作り方</DialogTitle>
                </DialogHeader>
                <InstructionCarousel productName={productName} instructions={instructions} />
                <div className="mt-4 text-sm text-gray-400 flex items-center justify-center">
                    <span>横にスワイプでページ移動</span>
                    <FaRegHandPointRight className="ml-2" />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { InstructionCarousel, InstructionDialog };