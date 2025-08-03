import React from 'react';

export const dynamic = 'force-dynamic';
import { categoryService } from '@/services/categoryService';
import { brandService } from '@/services/brandService';
import ManageBrandsCategoriesClient from '@/components/ManageBrandsCategoriesClient';

export default async function ManageBrandsCategoriesPage() {
  const [categories, brands] = await Promise.all([
    categoryService.getCategories(),
    brandService.getBrands(),
  ]);

  return <ManageBrandsCategoriesClient initialCategories={categories} initialBrands={brands} />;
}
