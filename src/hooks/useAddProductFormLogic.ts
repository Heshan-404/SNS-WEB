'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CategoryDto } from '@/types/category';
import { BrandDto } from '@/types/brand';
import { UploadedImageDto } from '@/types/image';
import { CreateProductDto } from '@/types/product';
import { categoryService } from '@/services/categoryService';
import { brandService } from '@/services/brandService';
import { productService } from '@/services/productService';

export const useAddProductFormLogic = () => {
  const [productName, setProductName] = useState('');
  const [shortName, setShortName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [uploadedImages, setUploadedImages] = useState<UploadedImageDto[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [voltages, setVoltages] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchedCategories, setFetchedCategories] = useState<CategoryDto[]>([]);
  const [fetchedBrands, setFetchedBrands] = useState<BrandDto[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await categoryService.getCategories();
        const brandsData = await brandService.getBrands();
        setFetchedCategories(categoriesData);
        setFetchedBrands(brandsData);
      } catch (error: unknown) {
        toast.error('Failed to load categories or brands.');
        console.error('Error loading categories/brands:', error);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, []);

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

      const productData: CreateProductDto = {
        name: productName,
        shortName: shortName,
        description: description,
        categoryId: parseInt(category),
        brandId: parseInt(brand),
        images: finalImages,
        availableSizes: sizes,
        voltages: voltages,
        colors: colors,
      };

      await productService.createProduct(productData);
      toast.success('Product added successfully!');

      // Crucial cleanup: Revoke all blob: URLs from the uploadedImages state
      uploadedImages.forEach((image) => {
        if (image.url.startsWith('blob:')) {
          URL.revokeObjectURL(image.url);
        }
      });

      // Clear form
      setProductName('');
      setShortName('');
      setDescription('');
      setCategory('');
      setBrand('');
      setUploadedImages([]);
      setSizes([]);
      setVoltages([]);
      setColors([]);
    } catch (error: unknown) {
      console.error('Error adding product:', error);
      let errorMessage = 'Failed to add product.';
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
