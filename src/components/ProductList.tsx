import ProductCard from './ProductCard';
import { ProductListDto } from '@/types/product';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductListProps {
  products: ProductListDto[];
  loading?: boolean; // Add loading prop
}

const ProductList = ({ products, loading }: ProductListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4 lg:p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="py-4 lg:p-4 text-center text-gray-500">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4 lg:p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          imageUrl={product.mainImageUrl || ''}
          title={product.name}
          brand={product.brand.name}
          category={product.category.name}
          slug={product.slug}
        />
      ))}
    </div>
  );
};

export default ProductList;
