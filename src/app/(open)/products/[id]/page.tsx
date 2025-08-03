import { productService } from '@/services/productService';
import ProductImageViewer from '@/components/ProductImageViewer';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from "@/components/ui/separator";
import type { Metadata } from 'next';
import { UploadedImageDto } from '@/types/image';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const productId = parseInt(params.id, 10);
  const product = await productService.getProductById(productId);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const mappedImages: UploadedImageDto[] = product.images.map(img => ({
    url: img.url,
    isMain: img.isMain,
    name: `image-${img.id}`, // Dummy name, as Prisma Image model doesn't have it
    size: 0, // Dummy size
    type: 'image/jpeg', // Dummy type
  }));

  return {
    title: `${product.name} - SNS Pipes & Fittings`,
    description: product.description,
    keywords: `${product.name}, ${product.brand.name}, ${product.category.name}, pipes, fittings, plumbing`,
    openGraph: {
      title: `${product.name} - SNS Pipes & Fittings`,
      description: product.description,
      images: mappedImages.filter(img => img.isMain).map(img => ({
        url: img.url,
        width: 800, // Placeholder width
        height: 600, // Placeholder height
        alt: product.name,
      })),
      url: `https://yourwebsite.com/products/${product.id}`, // Replace with your actual website URL
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - SNS Pipes & Fittings`,
      description: product.description,
      images: mappedImages.filter(img => img.isMain).map(img => ({
        url: img.url,
        alt: product.name,
      })),
    },
  };
}

const ProductDetailPage: React.FC<any> = async ({ params }) => {
  const productId = parseInt(params.id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await productService.getProductById(productId);

  if (!product) {
    notFound();
  }

  const mappedImages: UploadedImageDto[] = product.images.map(img => ({
    url: img.url,
    isMain: img.isMain,
    name: `image-${img.id}`, // Dummy name
    size: 0, // Dummy size
    type: 'image/jpeg', // Dummy type
  }));

  return (
    <div className="container mx-auto py-8 px-4">
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
        {/* Product Image Gallery */}
        <div>
          <ProductImageViewer images={mappedImages} />
        </div>

        {/* Product Details */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>

          <div className="mb-6">
            <h3 className="text-base font-bold text-[#121417] mb-2 mt-4">Name</h3>
            <Separator className="mb-2" />
            <p className="text-gray-700 text-lg">{product.name}</p>
          </div>

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
              <p className="text-gray-700 text-lg">{product.availableSizes.join(', ')}</p>
            </div>
          )}

          {product.voltages && product.voltages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold text-[#121417] mb-2 mt-4">Voltage</h3>
              <Separator className="mb-2" />
              <p className="text-gray-700 text-lg">{product.voltages.join(', ')}</p>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold text-[#121417] mb-2 mt-4">Color</h3>
              <Separator className="mb-2" />
              <p className="text-gray-700 text-lg">{product.colors.join(', ')}</p>
            </div>
          )}


        </div>
      </div>

      {/* Need Assistance Section */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-[#121417] mb-4">Need Assistance?</h2>
        <p className="text-lg text-gray-700 mb-6">Looking to place an order, get pricing, or have any other questions?</p>
        <button className="bg-[#1285E8] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out shadow-lg">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;