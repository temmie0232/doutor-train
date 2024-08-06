import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SortDropdownProps {
    title: string;
    options: string[];
    selectedOptions: string[];
    onOptionToggle: (option: string) => void;
    allOption: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
    title,
    options,
    selectedOptions,
    onOptionToggle,
    allOption,
}) => {
    const isAllSelected = selectedOptions.includes(allOption);
    const otherOptions = options.filter(option => option !== allOption);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full max-w-[300px] justify-between">
                    {title}
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <div className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                        <Checkbox
                            id={allOption}
                            checked={isAllSelected}
                            onCheckedChange={() => onOptionToggle(allOption)}
                        />
                        <Label htmlFor={allOption} className="text-sm">{allOption}</Label>
                    </div>
                    <Separator className="my-2" />
                    {otherOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-3 mb-2">
                            <Checkbox
                                id={option}
                                checked={selectedOptions.includes(option)}
                                onCheckedChange={() => onOptionToggle(option)}
                            />
                            <Label htmlFor={option} className="text-sm">{option}</Label>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default SortDropdown;