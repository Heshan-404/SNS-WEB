import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { productService } from '@/services/productService';
import { brandService } from '@/services/brandService';
import { categoryService } from '@/services/categoryService';
import { BrandDto } from '@/types/brand';
import { CategoryDto } from '@/types/category';
import { CreateProductDto } from '@/types/product';
import { UploadedImageDto } from '@/types/image';

export const useAddProductForm = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [description, setDescription] = useState('');
  const [brandId, setBrandId] = useState<string | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [voltages, setVoltages] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImageDto[]>([]); // This will store the DTOs after upload
  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBrands = await brandService.getBrands();
        const fetchedCategories = await categoryService.getCategories();
        setBrands(fetchedBrands);
        setCategories(fetchedCategories);
      } catch (err: unknown) {
        let errorMessage = 'Failed to fetch brands and categories.';
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (productData: CreateProductDto) => {
    setError(null);
    try {
      await productService.createProduct(productData);
      router.push('/admin/products');
    } catch (err: unknown) {
      let errorMessage = 'Failed to add product.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
  };

  return {
    name,
    setName,
    shortName,
    setShortName,
    description,
    setDescription,
    brandId,
    setBrandId,
    categoryId,
    setCategoryId,
    availableSizes,
    setAvailableSizes,
    voltages,
    setVoltages,
    colors,
    setColors,
    uploadedImages,
    setUploadedImages, // Expose for parent component to manage
    brands,
    categories,
    loading,
    error,
    handleSubmit,
  };
};
