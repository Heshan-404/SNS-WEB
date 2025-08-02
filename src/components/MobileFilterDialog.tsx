"use client";

import React, { useState } from "react";
import ProductFilter from "@/components/ProductFilter";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface MobileFilterDialogProps {
  categories: any[];
  brands: any[];
}

const MobileFilterDialog: React.FC<MobileFilterDialogProps> = ({ categories, brands }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Dialog open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="fixed inset-x-0 top-16 h-[calc(100vh-4rem)] p-0 bg-white z-50 flex flex-col pointer-events-auto">
          <DialogHeader className="flex flex-row items-center justify-between px-4 py-4 border-b">
            <DialogTitle>Filter Products</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
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
