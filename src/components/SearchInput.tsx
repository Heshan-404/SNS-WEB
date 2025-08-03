import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useSearchInput } from '@/hooks/useSearchInput';

interface SearchInputProps {
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
  const { searchTerm, handleInputChange } = useSearchInput();

  return (
    <div className="mb-3">
      <Label htmlFor="search-products" className="sr-only">
        Search products
      </Label>
      <div className="relative">
        <Input
          id="search-products"
          type="text"
          placeholder="Search products"
          className={cn('pl-8 border rounded-md', className)}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <svg
          className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;
