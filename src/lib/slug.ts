import prisma from './prisma'; // Assuming prisma is accessible from lib

export function generateSlug(name: string): string {
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  // Remove leading/trailing dashes
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}

export async function generateUniqueSlug(name: string, initialSlug?: string): Promise<string> {
  const slug = initialSlug || generateSlug(name);
  let counter = 1;
  let uniqueSlug = slug;

  while (true) {
    const existingProduct = await prisma.product.findUnique({
      where: { slug: uniqueSlug },
    });

    if (!existingProduct) {
      return uniqueSlug;
    }

    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
}
