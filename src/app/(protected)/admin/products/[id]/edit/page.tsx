'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ManageableImagePreview from '@/components/ManageableImagePreview';
import ImageUploadArea from '@/components/ImageUploadArea';
import TagInput from '@/components/TagInput';
import { Button } from '@/components/ui/button';
import { useEditProductForm } from '@/hooks/useEditProductForm';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const { id } = useParams() as { id: string };

  const {
    name,
    setName,
    shortName,
    setShortName,
    description,
    setDescription,
    categoryId,
    setCategoryId,
    brandId,
    setBrandId,
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
  } = useEditProductForm(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-left">Edit Product</h1>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 w-full md:w-1/2">
                <Label htmlFor="brand">Brand</Label>
                <Select value={brandId} onValueChange={setBrandId}>
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((b) => (
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
            {uploadedImages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Uploaded Images Preview</h3>
                <ManageableImagePreview images={uploadedImages} onRemoveImage={handleRemoveImage} />
              </div>
            )}
            <ImageUploadArea
              onImageUpload={handleImageUpload}
              currentImageCount={uploadedImages.length}
            />
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
                tags={availableSizes}
                setTags={setAvailableSizes}
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
          <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting || loading}>
            {isSubmitting ? 'Updating Product...' : 'Update Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
