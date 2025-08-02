"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlSearchTerm = searchParams.get('search') || '';
  const lastCommittedSearchTerm = useRef(urlSearchTerm);
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(urlSearchTerm);

  // Effect to synchronize internal searchTerm with URL search param
  useEffect(() => {
    setSearchTerm(urlSearchTerm);
    setDebouncedSearchTerm(urlSearchTerm);
  }, [urlSearchTerm]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Effect to update URL when debouncedSearchTerm changes
  useEffect(() => {
    // Only update URL if debouncedSearchTerm is different from the last committed search term
    if (debouncedSearchTerm !== lastCommittedSearchTerm.current) {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedSearchTerm) {
        params.set("search", debouncedSearchTerm);
      } else {
        params.delete("search");
      }
      params.set('page', '1'); // Reset to first page on search change
      router.replace(`${pathname}?${params.toString()}`);
      lastCommittedSearchTerm.current = debouncedSearchTerm; // Update the ref after committing
    }
  }, [debouncedSearchTerm, searchParams, router, pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
              className={cn("pl-8 border rounded-md", className)}
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