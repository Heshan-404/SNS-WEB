import React, { Suspense } from 'react';
import ProductPageClient from "./ProductPageClient";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { categoryService } from "@/services/categoryService";
import { brandService } from "@/services/brandService";
import { productService } from "@/services/productService";

export const dynamic = 'force-dynamic';

const ProductShowcase = async ({ searchParams }: any) => {
  const page = searchParams.page;
  const categoryIds = searchParams.categoryIds;
  const brandIds = searchParams.brandIds;
  const search = searchParams.search;
  const currentPage = Number(page) || 1;
  const productsPerPage = 10; // Or whatever your default is

  const getIdsFromSearchParams = (param: string | undefined): number[] => {
    if (param) {
      return param
          .split(",")
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
        searchTerm
    ),
  ]);

  return (
    <div className="flex min-h-screen">
      <main className="flex-1">
        <Suspense fallback={<div>Loading Products...</div>}>
          <ProductPageClient
            products={products}
            total={total}
            categories={categories}
            brands={brands}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default ProductShowcase;