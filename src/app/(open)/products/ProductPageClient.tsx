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
        <MobileFilterDialog categories={categories} brands={brands} />
      </div>
      <div className="md:hidden mt-4">
        <SearchInput />
      </div>
      <div key={contentKey}>
        {' '}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-20 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>

            <p className="text-2xl font-semibold mb-2">No Products Found</p>
            <p className="text-lg text-center max-w-md">
              We couldn't find any products matching your search criteria. Please try adjusting your
              filters or search term.
            </p>
          </div>
        ) : (
          <ProductList products={products} />
        )}
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
