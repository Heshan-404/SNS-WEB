'use client';

import SearchInput from '@/components/SearchInput';
import { CategoryDto } from '@/types/category';
import { BrandDto } from '@/types/brand';

interface MobileFilterSearchClientProps {
  categories: CategoryDto[];
  brands: BrandDto[];
}

const MobileFilterSearchClient: React.FC<MobileFilterSearchClientProps> = ({
  categories,
  brands,
}) => {
  return (
    <>
      <div className="md:hidden mt-4">
        <SearchInput />
      </div>
    </>
  );
};

export default MobileFilterSearchClient;
