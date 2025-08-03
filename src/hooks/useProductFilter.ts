import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface UseProductFilterOptions {
  initialCategoryIds?: string[];
  initialBrandIds?: string[];
}

export const useProductFilter = (options?: UseProductFilterOptions) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<string>>(
    () => new Set(options?.initialCategoryIds || []),
  );
  const [selectedBrandIds, setSelectedBrandIds] = useState<Set<string>>(
    () => new Set(options?.initialBrandIds || []),
  );

  useEffect(() => {
    const categoryIdsParam = searchParams.get('categoryIds');
    if (categoryIdsParam) {
      setSelectedCategoryIds(new Set(categoryIdsParam.split(',')));
    } else {
      setSelectedCategoryIds(new Set());
    }

    const brandIdsParam = searchParams.get('brandIds');
    if (brandIdsParam) {
      setSelectedBrandIds(new Set(brandIdsParam.split(',')));
    } else {
      setSelectedBrandIds(new Set());
    }
  }, [searchParams]);

  const handleCategoryChange = useCallback((categoryId: string, checked: boolean) => {
    setSelectedCategoryIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(categoryId);
      } else {
        newSet.delete(categoryId);
      }
      return newSet;
    });
  }, []);

  const handleBrandChange = useCallback((brandId: string, checked: boolean) => {
    setSelectedBrandIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(brandId);
      } else {
        newSet.delete(brandId);
      }
      return newSet;
    });
  }, []);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategoryIds.size > 0) {
      params.set('categoryIds', Array.from(selectedCategoryIds).join(','));
    } else {
      params.delete('categoryIds');
    }

    if (selectedBrandIds.size > 0) {
      params.set('brandIds', Array.from(selectedBrandIds).join(','));
    } else {
      params.delete('brandIds');
    }

    params.set('page', '1'); // Reset to first page on filter change
    router.push(`${pathname}?${params.toString()}`);
  }, [selectedCategoryIds, selectedBrandIds, searchParams, router, pathname]);

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams();
    params.delete('search'); // Always delete search param
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname]);

  return {
    selectedCategoryIds,
    selectedBrandIds,
    handleCategoryChange,
    handleBrandChange,
    applyFilters,
    clearFilters,
  };
};
