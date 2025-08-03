import React, { Suspense } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { categoryService } from '@/services/categoryService';
import { brandService } from '@/services/brandService';
import { productService } from '@/services/productService';
import ProductList from '@/components/ProductList';
import ProductPaginationClient from '@/components/ProductPaginationClient';
import MobileFilterSearchClient from '@/components/MobileFilterSearchClient';
import MobileFilterDialog from '@/components/MobileFilterDialog';

export const dynamic = 'force-dynamic';

interface ProductShowcaseProps {
  searchParams: Promise<{
    page?: string;
    categoryIds?: string;
    brandIds?: string;
    search?: string;
  }>;
}

const ProductShowcase = async ({ searchParams: searchParamsPromise }: ProductShowcaseProps) => {
  const searchParams = await searchParamsPromise;
  const page = searchParams.page;
  const categoryIds = searchParams.categoryIds;
  const brandIds = searchParams.brandIds;
  const search = searchParams.search;
  const currentPage = Number(page) || 1;
  const productsPerPage = 10; // Or whatever your default is

  const getIdsFromSearchParams = (param: string | undefined): number[] => {
    if (param) {
      return param
        .split(',')
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id));
    }
    return [];
  };

  const selectedCategoryIds = getIdsFromSearchParams(categoryIds);
  const selectedBrandIds = getIdsFromSearchParams(brandIds);
  const searchTerm = search;

  const [categories, brands, { products, total }] = await Promise.all([
    categoryService.getCategories(),
    brandService.getBrands(),
    productService.getProducts(
      currentPage,
      productsPerPage,
      selectedCategoryIds,
      selectedBrandIds,
      searchTerm,
    ),
  ]);

  return (
    <div className="flex">
      <main className="flex-1">
        <div className="flex justify-between items-center mt-4 mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <MobileFilterDialog categories={categories} brands={brands} />
        </div>
        <Suspense fallback={null}>
          <MobileFilterSearchClient categories={categories} brands={brands} />
          <div key={products.length > 0 ? products[0].id : 'no-products'}>
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
                  We couldn't find any products matching your search criteria. Please try adjusting
                  your filters or search term.
                </p>
              </div>
            ) : (
              <ProductList products={products} />
            )}
          </div>
          <ProductPaginationClient total={total} categories={categories} brands={brands} />
        </Suspense>
      </main>
    </div>
  );
};

export default ProductShowcase;
