import ProductFilter from "@/components/ProductFilter";
import React from "react";
import MainContent from './MainContent';
import { categoryService } from "@/services/categoryService";
import { brandService } from "@/services/brandService";

export default async function ProductsLayout({
  children,
}: { children: React.ReactNode }) {
  const categories = await categoryService.getCategories();
  const brands = await brandService.getBrands();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] min-h-screen">
      {/* Desktop Filter */}
      <div className="hidden md:block md:sticky md:top-0 md:overflow-y-auto">
        <ProductFilter
          categories={categories}
          brands={brands}
        />
      </div>
      <MainContent>
        {children}
      </MainContent>
    </div>
  );
}