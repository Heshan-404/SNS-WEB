"use client";

import ProductList from "@/components/ProductList";
import MobileFilterDialog from "@/components/MobileFilterDialog";
import SearchInput from "@/components/SearchInput";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Suspense, useMemo } from "react";
import { ProductListDto } from "@/types/product";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function ProductPageClient({
  products,
  total,
  categories,
  brands,
}: {
  products: ProductListDto[];
  total: number;
  categories: any[];
  brands: any[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParam = searchParams.get('page');
  const currentPage = useMemo(() => Number(pageParam || 1), [pageParam]);
  const productsPerPage = 10;

  const totalPages = Math.ceil(total / productsPerPage);

  const createPageURL = useMemo(() => (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }, [searchParams, pathname]);

  const contentKey = searchParams.toString(); // Key for the content that should re-render

  return (
      <>
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <MobileFilterDialog categories={categories} brands={brands} />
        </div>
        <div className="md:hidden mt-4">
          <Suspense fallback={<div>Loading search...</div>}>
            <SearchInput />
          </Suspense>
        </div>
        <div key={contentKey}> {/* Apply key here */}
          <ProductList products={products} />

          {total > productsPerPage && (
              <Pagination className="mt-4 mb-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                        href={createPageURL(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
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
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
          )}
        </div>
      </>
  );
}