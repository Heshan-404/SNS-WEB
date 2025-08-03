import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    'PP-R Pipes & Fittings',
    'CPVC Pipes & Fittings',
    'UPVC Pipes & Fittings',
    'Valve',
    'Plumbing Items',
    'Shower & Tap',
    'Locks & Hinges',
    'Light Fittings',
    'Other Items',
  ];

  const brands = [
    'IFAN',
    'ANTON',
    'PHOENIX',
    'PLUMB FAST',
    'Pegler',
    'FORDmix',
    'Watermax',
    'Everlatch',
    'LUMINUR',
  ];

  console.log('Start seeding...');

  for (const categoryName of categories) {
    await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });
    console.log(`Upserted category: ${categoryName}`);
  }

  for (const brandName of brands) {
    await prisma.brand.upsert({
      where: { name: brandName },
      update: {},
      create: { name: brandName },
    });
    console.log(`Upserted brand: ${brandName}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
