'use client';

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { CategoryDto } from '@/types/category';
import { BrandDto } from '@/types/brand';
import { UploadedImageDto } from '@/types/image';
import { CreateProductDto, ProductDto, UpdateProductDto } from '@/types/product';
import { categoryService } from '@/services/categoryService';
import { brandService } from '@/services/brandService';
import { productService } from '@/services/productService';

export const useAddProductFormLogic = (
  initialData?: ProductDto,
  initialCategories: CategoryDto[] = [],
  initialBrands: BrandDto[] = [],
) => {
  const [productName, setProductName] = useState(initialData?.name || '');
  const [shortName, setShortName] = useState(initialData?.shortName || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.categoryId?.toString() || '');
  const [brand, setBrand] = useState(initialData?.brandId?.toString() || '');
  const [uploadedImages, setUploadedImages] = useState<UploadedImageDto[]>(
    initialData?.images.map((img) => ({
      url: img.url,
      isMain: img.isMain,
      name: img.url.substring(img.url.lastIndexOf('/') + 1), // Extract name from URL
      size: 0, // Default or fetch if available
      type: '', // Default or fetch if available
    })) || [],
  );
  const [sizes, setSizes] = useState<string[]>(initialData?.availableSizes || []);
  const [voltages, setVoltages] = useState<string[]>(initialData?.voltages || []);
  const [colors, setColors] = useState<string[]>(initialData?.colors || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchedCategories, setFetchedCategories] = useState<CategoryDto[]>(initialCategories);
  const [fetchedBrands, setFetchedBrands] = useState<BrandDto[]>(initialBrands);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const hasFetchedData = useRef(false);

  useEffect(() => {
    if ((initialCategories.length === 0 || initialBrands.length === 0) && !hasFetchedData.current) {
      const loadData = async () => {
        setIsLoadingData(true);
        try {
          const categoriesData = await categoryService.getCategories();
          const brandsData = await brandService.getBrands();
          setFetchedCategories(categoriesData);
          setFetchedBrands(brandsData);
          hasFetchedData.current = true; // Mark data as fetched
        } catch (error: unknown) {
          toast.error('Failed to load categories or brands.');
          console.error('Error loading categories/brands:', error);
        } finally {
          setIsLoadingData(false);
        }
      };
      loadData();
    }
  }, [initialCategories, initialBrands]);

  const handleImageUpload = (newFiles: File[]) => {
    setUploadedImages((prevImages) => {
      const combinedImages = [...prevImages];
      let newImageCount = 0;

      for (const file of newFiles) {
        if (combinedImages.length >= 4) {
          // If limit reached, revoke URL for any new files that won't be added
          URL.revokeObjectURL(URL.createObjectURL(file));
          continue;
        }
        combinedImages.push({
          file: file,
          url: URL.createObjectURL(file),
          isMain: false,
          name: file.name,
          size: file.size,
          type: file.type,
        });
        newImageCount++;
      }

      // If more than 4 images were already present, revoke URLs for those that are dropped
      while (combinedImages.length > 4) {
        const removedImage = combinedImages.pop(); // Remove from the end
        if (removedImage && removedImage.url.startsWith('blob:')) {
          URL.revokeObjectURL(removedImage.url);
        }
      }
      return combinedImages;
    });
  };

  const handleRemoveImage = (imageToRemove: UploadedImageDto) => {
    setUploadedImages((prevImages) => {
      if (imageToRemove.url.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prevImages.filter((image) => image !== imageToRemove);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !productName ||
      !shortName ||
      !description ||
      !category ||
      !brand ||
      uploadedImages.length === 0
    ) {
      toast.error('Please fill in all required fields and upload at least one image.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Identify files to upload (only those with a 'file' property)
      const filesToUpload = uploadedImages
        .filter((image) => image.file instanceof File)
        .map((image) => image.file as File);

      let finalImages: UploadedImageDto[] = [];

      if (filesToUpload.length > 0) {
        // Upload images first
        const uploadedBlobs = await productService.uploadImages(filesToUpload);

        // Map uploaded blobs to UploadedImageDto, setting the first as main
        finalImages = uploadedBlobs.map((blob, index) => ({
          url: blob.url,
          isMain: index === 0, // Set the first uploaded image as main
          name: filesToUpload[index]?.name || '',
          size: filesToUpload[index]?.size || 0,
          type: filesToUpload[index]?.type || '',
        }));
      }

      // Combine existing images (if editing) with newly uploaded ones
      const existingImages = uploadedImages.filter((image) => !(image.file instanceof File));
      const allImages = [...existingImages, ...finalImages];

      const productData: CreateProductDto | UpdateProductDto = {
        name: productName,
        shortName: shortName,
        description: description,
        categoryId: parseInt(category),
        brandId: parseInt(brand),
        images: allImages,
        availableSizes: sizes,
        voltages: voltages,
        colors: colors,
      };

      if (initialData) {
        await productService.updateProduct(initialData.id, productData as UpdateProductDto);
        toast.success('Product updated successfully!');
      } else {
        await productService.createProduct(productData as CreateProductDto);
        toast.success('Product added successfully!');
      }

      // Crucial cleanup: Revoke all blob: URLs from the uploadedImages state
      uploadedImages.forEach((image) => {
        if (image.url.startsWith('blob:')) {
          URL.revokeObjectURL(image.url);
        }
      });

      // Clear form if adding new product
      if (!initialData) {
        setProductName('');
        setShortName('');
        setDescription('');
        setCategory('');
        setBrand('');
        setUploadedImages([]);
        setSizes([]);
        setVoltages([]);
        setColors([]);
      }
    } catch (error: unknown) {
      console.error('Error adding/updating product:', error);
      let errorMessage = 'Failed to add/update product.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prepare images for ManageableImagePreview
  const imagesForPreview: UploadedImageDto[] = uploadedImages;

  return {
    productName,
    setProductName,
    shortName,
    setShortName,
    description,
    setDescription,
    category,
    setCategory,
    brand,
    setBrand,
    uploadedImages,
    setUploadedImages,
    sizes,
    setSizes,
    voltages,
    setVoltages,
    colors,
    setColors,
    isSubmitting,
    fetchedCategories,
    fetchedBrands,
    isLoadingData,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    imagesForPreview,
  };
};
