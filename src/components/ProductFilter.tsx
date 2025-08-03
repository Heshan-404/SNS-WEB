'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchInput from '@/components/SearchInput';
import { useProductFilterLogic } from '@/hooks/useProductFilterLogic';
import { CategoryDto } from '@/types/category';
import { BrandDto } from '@/types/brand';

interface ProductFilterProps {
  categories: CategoryDto[];
  brands: BrandDto[];
  isMobile?: boolean; // New prop for mobile view
  onClose?: () => void; // New prop for closing the mobile filter
}

const ProductFilter: React.FC<ProductFilterProps> = ({ categories, brands, isMobile, onClose }) => {
  const {
    activeTab,
    setActiveTab,
    selectedCategoryIds,
    selectedBrandIds,
    handleCategoryChange,
    handleBrandChange,
    applyFilters,
    clearFilters,
  } = useProductFilterLogic();

  const handleApplyFilters = () => {
    applyFilters();
    onClose?.(); // Close mobile filter after applying
  };

  const handleClearFilters = () => {
    clearFilters();
    onClose?.(); // Close mobile filter after clearing
  };

  return (
    <section className={`p-4 bg-white ${isMobile ? 'w-full h-full flex flex-col' : 'w-[330px]'}`}>
      {!isMobile && (
        <>
          <div className="mb-3">
            <SearchInput />
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <Button
              className="w-full rounded-xl bg-[#0A78ED] text-white"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-xl bg-[#F0F2F5] text-black"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </>
      )}

      {isMobile && (
        <div className="flex space-x-2 mb-4">
          <Button
            variant="ghost"
            className={cn(
              'flex-1 rounded-xl',
              activeTab === 'category' ? 'bg-black text-white' : 'bg-[#F0F2F5] text-black',
            )}
            onClick={() => setActiveTab('category')}
          >
            Category
          </Button>
          <Button
            variant="ghost"
            className={cn(
              'flex-1 rounded-xl',
              activeTab === 'brand' ? 'bg-black text-white' : 'bg-[#F0F2F5] text-black',
            )}
            onClick={() => setActiveTab('brand')}
          >
            Brand
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {(!isMobile || activeTab === 'category') && (
          <div className={cn('mb-6', !isMobile && 'mt-5')}>
            <Label className="text-lg font-semibold mb-3 block">Category</Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2 mb-5 cursor-pointer">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategoryIds.has(category.id.toString())}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id.toString(), checked as boolean)
                    }
                  />
                  <Label
                    style={{ fontSize: 16, fontWeight: 'normal' }}
                    htmlFor={`category-${category.id}`}
                    onClick={() =>
                      handleCategoryChange(
                        category.id.toString(),
                        !selectedCategoryIds.has(category.id.toString()),
                      )
                    }
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!isMobile || activeTab === 'brand') && (
          <div className="mb-6">
            <Label className="text-lg font-semibold mb-3 block">Brand</Label>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2 mb-5 cursor-pointer">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrandIds.has(brand.id.toString())}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand.id.toString(), checked as boolean)
                    }
                  />
                  <Label
                    style={{ fontSize: 16, fontWeight: 'normal' }}
                    htmlFor={`brand-${brand.id}`}
                    onClick={() =>
                      handleBrandChange(
                        brand.id.toString(),
                        !selectedBrandIds.has(brand.id.toString()),
                      )
                    }
                  >
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isMobile && (
        <div className="flex-shrink-0 p-4 border-t border-gray-200 flex flex-col space-y-2">
          <Button
            variant="outline"
            className="w-full rounded-xl bg-[#F0F2F5] text-black"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
          <div className="flex justify-between space-x-2">
            <Button className="flex-1 rounded-xl bg-[#0A78ED] text-white" onClick={applyFilters}>
              Apply Filters
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl bg-[#F0F2F5] text-black"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductFilter;
