import { MetadataRoute } from 'next';
import { productService } from '@/services/productService';

const baseUrl = 'https://snspipes.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await productService.getProductsAtBuildTime(); // Fetch all products for sitemap

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt, // Use product.updatedAt for last modification date
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...productRoutes,
  ];
}
