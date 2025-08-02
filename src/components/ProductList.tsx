import ProductCard from "./ProductCard";

import { ProductListDto } from "@/types/product";

interface ProductListProps {
  products: ProductListDto[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4 lg:p-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          imageUrl={product.mainImageUrl || ''} 
          title={product.name} 
          brand={product.brand.name} 
          category={product.category.name} 
          productId={product.id} 
        />
      ))}
    </div>
  );
};

export default ProductList;
