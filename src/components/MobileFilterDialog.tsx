'use client';

import React from 'react';
import ProductFilter from '@/components/ProductFilter';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { useMobileFilterDialog } from '@/hooks/useMobileFilterDialog';
import { CategoryDto } from '@/types/category';
import { BrandDto } from '@/types/brand';

interface MobileFilterDialogProps {
  categories: CategoryDto[];
  brands: BrandDto[];
}

const MobileFilterDialog: React.FC<MobileFilterDialogProps> = ({ categories, brands }) => {
  const { isMobileFilterOpen, setIsMobileFilterOpen } = useMobileFilterDialog();

  return (
    <div className="md:hidden">
      <Dialog open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className="fixed inset-x-0 top-7 h-[calc(100vh-1rem)] p-0 bg-white z-40 flex flex-col pointer-events-auto"
        >
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>Filter Options</DialogTitle>
            </VisuallyHidden>
          </DialogHeader>
          <ProductFilter
            categories={categories}
            brands={brands}
            isMobile={true}
            onClose={() => setIsMobileFilterOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileFilterDialog;
