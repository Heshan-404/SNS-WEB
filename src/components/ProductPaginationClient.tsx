'use client';

import { useProductPageClient } from '@/hooks/useProductPageClient';
import { ProductListDto } from '@/types/product';
import { CategoryDto } from '@/types/category';
import { BrandDto } from '@/types/brand';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import MobileFilterDialog from '@/components/MobileFilterDialog';
import SearchInput from '@/components/SearchInput';

interface ProductPaginationClientProps {
  total: number;
  categories: CategoryDto[];
  brands: BrandDto[];
}

const ProductPaginationClient: React.FC<ProductPaginationClientProps> = ({
  total,
  categories,
  brands,
}) => {
  const { currentPage, totalPages, createPageURL, contentKey } = useProductPageClient(total);

  return (
    <>
      {total > 10 && (
        <Pagination className="mt-4 mb-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={createPageURL(currentPage - 1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={createPageURL(index + 1)}
                  isActive={index + 1 === currentPage}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={createPageURL(currentPage + 1)}
                className={
                  currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default ProductPaginationClient;
