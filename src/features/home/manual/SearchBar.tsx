import React from 'react';
import { Input } from "@/components/ui/input";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="mb-4">
            <Input
                type="text"
                placeholder="商品を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
            />
        </div>
    );
};

export default SearchBar;