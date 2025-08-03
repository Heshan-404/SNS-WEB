import { useSearchParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const useProductPageClient = (total: number) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageParam = searchParams.get('page');
  const currentPage = useMemo(() => Number(pageParam || 1), [pageParam]);
  const productsPerPage = 10;

  const totalPages = Math.ceil(total / productsPerPage);

  const createPageURL = useMemo(
    () => (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname],
  );

  const contentKey = searchParams.toString();

  return {
    currentPage,
    totalPages,
    createPageURL,
    contentKey,
  };
};
