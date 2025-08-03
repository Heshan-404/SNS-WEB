import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ManageableImagePreview from '@/components/ManageableImagePreview';
import ImageUploadArea from '@/components/ImageUploadArea';
import TagInput from '@/components/TagInput';
import { UploadedImageDto } from '@/types/image';
import { CreateProductDto } from '@/types/product';
import { toast } from 'sonner';
import { CategoryDto } from '@/types/category';
import { BrandDto } from '@/types/brand';
import { categoryService } from '@/services/categoryService';
import { brandService } from '@/services/brandService';
import {productService} from "@/services/productService";

interface AddProductFormProps {
  onProductAdded: () => void;
  onCloseDialog: () => void;
}

export default function AddProductForm({ onProductAdded, onCloseDialog }: AddProductFormProps) {
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
      } catch (error) {
        toast.error('Failed to load categories or brands.');
        console.error('Error loading categories/brands:', error);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, []);

  const handleImageUpload = (newFiles: File[]) => {
    setUploadedImages(prevImages => {
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
    setUploadedImages(prevImages => {
      if (imageToRemove.url.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prevImages.filter(image => image !== imageToRemove);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!productName || !shortName || !description || !category || !brand || uploadedImages.length === 0) {
      toast.error('Please fill in all required fields and upload at least one image.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Identify files to upload (only those with a 'file' property)
      const filesToUpload = uploadedImages
        .filter(image => image.file instanceof File)
        .map(image => image.file as File);

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
      onProductAdded();
      onCloseDialog();

      // Crucial cleanup: Revoke all blob: URLs from the uploadedImages state
      uploadedImages.forEach(image => {
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
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error(error.message || 'Failed to add product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prepare images for ManageableImagePreview
  const imagesForPreview: UploadedImageDto[] = uploadedImages;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product Information */}
      <Card className="mb-6 border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2 w-full md:w-1/2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter full product name"
              />
            </div>
            <div className="grid gap-2 w-full md:w-1/2">
              <Label htmlFor="shortName">Short Name</Label>
              <Input
                id="shortName"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                placeholder="Enter short name for showcase pages"
                maxLength={45}
              />
            </div>
            <div className="grid gap-2 w-full md:w-1/2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                rows={10}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categorization */}
      <Card className="mb-6 border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Categorization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2 w-full md:w-1/2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} disabled={isLoadingData}>
                <SelectTrigger id="category">
                  {isLoadingData ? <SelectValue>Loading categories...</SelectValue> : <SelectValue placeholder="Select a category" />}
                </SelectTrigger>
                <SelectContent>
                  {fetchedCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 w-full md:w-1/2">
              <Label htmlFor="brand">Brand</Label>
              <Select value={brand} onValueChange={setBrand} disabled={isLoadingData}>
                <SelectTrigger id="brand">
                  {isLoadingData ? <SelectValue>Loading brands...</SelectValue> : <SelectValue placeholder="Select a brand" />}
                </SelectTrigger>
                <SelectContent>
                  {fetchedBrands.map((b) => (
                    <SelectItem key={b.id} value={b.id.toString()}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Imagery */}
      <Card className="mb-6 border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Product Imagery</CardTitle>
        </CardHeader>
        <CardContent>
          {imagesForPreview.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-2">Uploaded Images Preview</h3>
              <ManageableImagePreview images={imagesForPreview} onRemoveImage={handleRemoveImage} />
            </div>
          )}
          <ImageUploadArea onImageUpload={handleImageUpload} currentImageCount={uploadedImages.length} />
        </CardContent>
      </Card>

      {/* Specifications */}
      <Card className="mb-6 border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <TagInput
              label="Available Sizes"
              placeholder="Enter sizes (e.g., Small, Medium, XL)"
              tags={sizes}
              setTags={setSizes}
            />
            <TagInput
              label="Voltages"
              placeholder="Enter voltages (e.g., 110V, 220V)"
              tags={voltages}
              setTags={setVoltages}
            />
            <TagInput
              label="Colors"
              placeholder="Enter colors (e.g., Red, Blue, Green)"
              tags={colors}
              setTags={setColors}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting || isLoadingData}>
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
}
