import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export const useSearchInput = () => {
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
    }, 1500); // 1500ms debounce delay

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
        params.set('search', debouncedSearchTerm);
      } else {
        params.delete('search');
      }
      params.set('page', '1'); // Reset to first page on search change
      router.replace(`${pathname}?${params.toString()}`);
      lastCommittedSearchTerm.current = debouncedSearchTerm; // Update the ref after committing
    }
  }, [debouncedSearchTerm, searchParams, router, pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return {
    searchTerm,
    handleInputChange,
  };
};
