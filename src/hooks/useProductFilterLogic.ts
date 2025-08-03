import { useState } from 'react';
import { useProductFilter } from '@/hooks/useProductFilter';

interface UseProductFilterLogicProps {
  initialCategoryIds?: string[];
  initialBrandIds?: string[];
}

export const useProductFilterLogic = (options?: UseProductFilterLogicProps) => {
  const [activeTab, setActiveTab] = useState('category');
  const productFilter = useProductFilter(options);

  const areFiltersActive =
    productFilter.selectedCategoryIds.size > 0 ||
    productFilter.selectedBrandIds.size > 0 ||
    (productFilter.searchTerm && productFilter.searchTerm.length > 0);

  return {
    activeTab,
    setActiveTab,
    areFiltersActive,
    ...productFilter,
  };
};
