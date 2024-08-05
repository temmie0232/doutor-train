import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    sortBy: 'ice' | 'hot' | 'food' | 'all';
    setSortBy: (category: 'ice' | 'hot' | 'food' | 'all') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
    return (
        <div className="mb-4">
            <Input
                type="text"
                placeholder="商品を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
            />
            <div className="flex justify-center space-x-2 mb-2">
                <Button size="sm" onClick={() => setSortBy('all')} variant={sortBy === 'all' ? 'default' : 'outline'}>すべて</Button>
                <Button size="sm" onClick={() => setSortBy('ice')} variant={sortBy === 'ice' ? 'default' : 'outline'}>アイス</Button>
                <Button size="sm" onClick={() => setSortBy('hot')} variant={sortBy === 'hot' ? 'default' : 'outline'}>ホット</Button>
                <Button size="sm" onClick={() => setSortBy('food')} variant={sortBy === 'food' ? 'default' : 'outline'}>フード</Button>
            </div>
        </div>
    );
};

export default SearchBar;