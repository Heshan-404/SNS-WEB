import { useState } from 'react';
import { useProductFilter } from '@/hooks/useProductFilter';

interface UseProductFilterLogicProps {
  initialCategoryIds?: string[];
  initialBrandIds?: string[];
}

export const useProductFilterLogic = (options?: UseProductFilterLogicProps) => {
  const [activeTab, setActiveTab] = useState('category');
  const productFilter = useProductFilter(options);

  return {
    activeTab,
    setActiveTab,
    ...productFilter,
  };
};
