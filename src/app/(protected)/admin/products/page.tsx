import React from 'react';

export const dynamic = 'force-dynamic';
import { productService } from '@/services/productService';
import { categoryService } from '@/services/categoryService';
import { brandService } from '@/services/brandService';
import ManageProductsClient from '@/components/ManageProductsClient';

export default async function ManageProductsPage() {
  const [products, categories, brands] = await Promise.all([
    productService.getProducts(1, 1000), // Fetch all products for admin view
    categoryService.getCategories(),
    brandService.getBrands(),
  ]);

  return (
    <ManageProductsClient
      initialProducts={products.products}
      initialCategories={categories}
      initialBrands={brands}
    />
  );
}
