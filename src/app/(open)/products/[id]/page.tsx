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
import WhatsAppButton from '@/components/WhatsppButton';

// ✅ For dynamic metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const product = await productService.getProductById(productId);

  if (!product) {
    return {};
  }

  const mainImage = product.images.find((img) => img.isMain)?.url || product.images[0]?.url;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: mainImage,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      url: `https://yourdomain.com/products/${product.id}`,
      type: 'website',
    },
  };
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
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
    name: `image-${img.id}`,
    size: 0,
    type: 'image/jpeg',
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
            <h3 className="text-base font-bold mb-2">Name</h3>
            <Separator className="mb-2" />
            <p className="text-gray-700 text-lg">{product.name}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-base font-bold mb-2">Brand</h3>
            <Separator className="mb-2" />
            <p className="text-gray-700 text-lg">{product.brand.name}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-base font-bold mb-2">Description</h3>
            <Separator className="mb-2" />
            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
          </div>

          {product.availableSizes?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold mb-2">Available Sizes</h3>
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

          {product.voltages?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold mb-2">Voltage</h3>
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

          {product.colors?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold mb-2">Color</h3>
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

          {/* ✅ WhatsApp Button */}
          <WhatsAppButton
            phoneNumber="94752623523"
            productUrl={`https://snspipes.com/products/${product.id}`}
            productName={product.name}
            description={product.description}
            brandName={product.brand.name}
          />
        </div>
      </div>
    </div>
  );
}
