import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { productService } from '@/services/productService';
import { brandService } from '@/services/brandService';
import { categoryService } from '@/services/categoryService';
import { BrandDto } from '@/types/brand';
import { CategoryDto } from '@/types/category';
import { UpdateProductDto } from '@/types/product';
import { UploadedImageDto } from '@/types/image';
import { toast } from 'sonner';

export const useEditProductForm = (id: string) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [description, setDescription] = useState('');
  const [brandId, setBrandId] = useState<string | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [voltages, setVoltages] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImageDto[]>([]);
  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Moved from page
  const [newlyAddedFiles, setNewlyAddedFiles] = useState<File[]>([]); // For actual new File objects
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]); // URLs of images to delete from Blob/DB

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedProduct = await productService.getProductById(parseInt(id));
      setName(fetchedProduct.name);
      setShortName(fetchedProduct.shortName);
      setDescription(fetchedProduct.description);
      setBrandId(fetchedProduct.brandId.toString());
      setCategoryId(fetchedProduct.categoryId.toString());
      setAvailableSizes(fetchedProduct.availableSizes || []);
      setVoltages(fetchedProduct.voltages || []);
      setColors(fetchedProduct.colors || []);
      setUploadedImages(
        fetchedProduct.images.map((img) => ({
          url: img.url,
          isMain: img.isMain,
          name: img.url.substring(img.url.lastIndexOf('/') + 1), // Use filename from URL as a placeholder
          size: 0, // Placeholder, actual size not available from backend
          type: '', // Placeholder, actual type not available from backend
        })),
      );
    } catch (err: unknown) {
      let errorMessage = 'Failed to fetch product.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBrands = await brandService.getBrands();
        const fetchedCategories = await categoryService.getCategories();
        setBrands(fetchedBrands);
        setCategories(fetchedCategories);
        if (id) {
          await fetchProduct();
        }
      } catch (err: unknown) {
        let errorMessage = 'Failed to fetch data.';
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, fetchProduct]);

  const handleImageUpload = (newFiles: File[]) => {
    setNewlyAddedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setUploadedImages((prevImages) => [
      ...prevImages,
      ...newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        isMain: false, // Will be determined on submit
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    ]);
  }; // Moved from page

  const handleRemoveImage = (imageToRemove: UploadedImageDto) => {
    setUploadedImages((prevImages) => {
      const updatedImages = prevImages.filter((img) => img.url !== imageToRemove.url);

      // If it's an existing image (not a blob URL), mark for deletion
      if (!imageToRemove.url.startsWith('blob:')) {
        setImagesToDelete((prevUrls) => [...prevUrls, imageToRemove.url]);
      } else {
        // If it's a newly added file, remove it from newlyAddedFiles
        setNewlyAddedFiles((prevFiles) =>
          prevFiles.filter((file) => URL.createObjectURL(file) !== imageToRemove.url),
        );
      }
      return updatedImages;
    });
  }; // Moved from page

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !name ||
      !shortName ||
      !description ||
      !categoryId ||
      !brandId ||
      uploadedImages.length === 0
    ) {
      toast.error('Please fill in all required fields and upload at least one image.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Delete images marked for deletion
      await Promise.all(imagesToDelete.map((url) => productService.deleteImage(url)));

      // 2. Upload newly added files
      const uploadedBlobs =
        newlyAddedFiles.length > 0 ? await productService.uploadImages(newlyAddedFiles) : [];

      // 3. Combine existing (non-deleted) images with newly uploaded images
      const existingNonDeletedImages = uploadedImages.filter(
        (img) => !img.url.startsWith('blob:') && !imagesToDelete.includes(img.url),
      );

      const finalImages: UploadedImageDto[] = [
        ...existingNonDeletedImages,
        ...uploadedBlobs.map((blob, index) => ({
          url: blob.url,
          isMain: false, // Will be set below
          name: newlyAddedFiles[index]?.name || '',
          size: newlyAddedFiles[index]?.size || 0,
          type: newlyAddedFiles[index]?.type || '',
        })),
      ];

      // Ensure the first image is main
      if (finalImages.length > 0) {
        finalImages[0].isMain = true;
      }

      const productData: UpdateProductDto = {
        name,
        shortName,
        description,
        categoryId: parseInt(categoryId as string),
        brandId: parseInt(brandId as string),
        images: finalImages,
        availableSizes,
        voltages,
        colors,
      };

      await productService.updateProduct(parseInt(id), productData);
      toast.success('Product updated successfully!');

      // Crucial cleanup: Revoke all blob: URLs from the uploadedImages state
      uploadedImages.forEach((image) => {
        if (image.url.startsWith('blob:')) {
          URL.revokeObjectURL(image.url);
        }
      });

      router.push('/admin/products'); // Redirect after successful update
    } catch (err: unknown) {
      console.error('Error updating product:', err);
      let errorMessage = 'Failed to update product.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }; // Modified to include image handling and form submission

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
    setUploadedImages,
    brands,
    categories,
    loading,
    error,
    isSubmitting,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
  };
};
