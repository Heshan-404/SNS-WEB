import React from 'react';
import ProductImageViewer from '@/components/ProductImageViewer';
import { notFound } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

import { UploadedImageDto } from '@/types/image';
import { productService } from '@/services/productService';

// This is the definitive Props type that Next.js is expecting.
// Both params and searchParams are wrapped in a Promise.
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// The Page component MUST also be async and use the same Props type.
export default async function ProductDetailPage({ params }: Props) {
  // We MUST await the promise here as well.
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }
  const product = await productService.getProductById(productId);

  if (!product) {
    notFound();
  }

  const mappedImages: UploadedImageDto[] = product.images.map((img) => ({
    url: img.url,
    isMain: img.isMain,
    name: `image-${img.id}`, // Dummy name
    size: 0, // Dummy size
    type: 'image/jpeg', // Dummy type
  }));

  return (
    <div className="container mx-auto px-4 pt-6 pb-5">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

      <div className="flex flex-col gap-8">
        <div>
          <ProductImageViewer images={mappedImages} />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
          <div className="mb-6">
            <h3 className="text-base font-bold text-[#121417] mb-2 mt-4">Name</h3>
            <Separator className="mb-2" />
            <p className="text-gray-700 text-lg">{product.name}</p>
          </div>
          {/* ... Rest of your JSX ... */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-[#121417] mb-2 mt-4">Brand</h3>
            <Separator className="mb-2" />
            <p className="text-gray-700 text-lg">{product.brand.name}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-base font-bold text-[#121417] mb-2 mt-4">Description</h3>
            <Separator className="mb-2" />
            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
          </div>

          {product.availableSizes && product.availableSizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold text-[#121417] mb-2 mt-4">Available Sizes</h3>
              <Separator className="mb-2" />
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-md"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.voltages && product.voltages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold text-[#121417] mb-2 mt-4">Voltage</h3>
              <Separator className="mb-2" />
              <div className="flex flex-wrap gap-2">
                {product.voltages.map((voltage, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-md"
                  >
                    {voltage}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold text-[#121417] mb-2 mt-4">Color</h3>
              <Separator className="mb-2" />
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-md"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
