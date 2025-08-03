'use client';

import ProductList from '@/components/ProductList';
import MobileFilterDialog from '@/components/MobileFilterDialog';
import SearchInput from '@/components/SearchInput';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Suspense } from 'react';
import { ProductListDto } from '@/types/product';
import { useProductPageClient } from '@/hooks/useProductPageClient';
import { CategoryDto } from '@/types/category';
import { BrandDto } from '@/types/brand';

export default function ProductPageClient({
  products,
  total,
  categories,
  brands,
}: {
  products: ProductListDto[];
  total: number;
  categories: CategoryDto[];
  brands: BrandDto[];
}) {
  const { currentPage, totalPages, createPageURL, contentKey } = useProductPageClient(total);

  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Suspense fallback={<MobileFilterDialog categories={[]} brands={[]} loading={true} />}>
          <MobileFilterDialog categories={categories} brands={brands} />
        </Suspense>
      </div>
      <div className="md:hidden mt-4">
        <Suspense fallback={<SearchInput loading={true} />}>
          <SearchInput />
        </Suspense>
      </div>
      <div key={contentKey}>
        {' '}
        {/* Apply key here */}
        <ProductList products={products} />
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
      </div>
    </>
  );
}
