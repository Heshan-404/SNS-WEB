import { useState } from 'react';

export const useMobileFilterDialog = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return {
    isMobileFilterOpen,
    setIsMobileFilterOpen,
  };
};
