import ProductList from '@/components/ProductList';
import { ProductListDto } from '@/types/product';
import { CategoryDto } from '@/types/category';
import { BrandDto } from '@/types/brand';
import ProductPaginationClient from '@/components/ProductPaginationClient';

export default function ProductPageClient({
  products,
  total,
  categories,
  brands,
}: {
  products: ProductListDto[];
  total: number;
  categories: CategoryDto[];
  brands: BrandDto[];
}) {
  return (
    <>
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
              We couldn't find any products matching your search criteria. Please try adjusting your
              filters or search term.
            </p>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
      <ProductPaginationClient total={total} categories={categories} brands={brands} />
    </>
  );
}
