import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const PRODUCT_CATEGORIES = [
  'Eletrônicos',
  'Eletrodomésticos',
  'Móveis',
  'Roupas e acessórios',
  'Livros',
  'Ferramentas',
  'Esporte e lazer',
  'Brinquedos',
  'Veículos',
  'Outros produtos',
];

const SERVICE_CATEGORIES = [
  'Tecnologia e TI',
  'Design e marketing',
  'Aulas e consultoria',
  'Manutenção e reparos',
  'Serviços domésticos',
  'Contabilidade e jurídico',
  'Saúde e bem-estar',
  'Outros serviços',
];

async function main() {
  for (const name of PRODUCT_CATEGORIES) {
    await prisma.category.upsert({
      where: { id: `product-${slug(name)}` },
      update: {},
      create: { id: `product-${slug(name)}`, name, type: 'PRODUCT' },
    });
  }

  for (const name of SERVICE_CATEGORIES) {
    await prisma.category.upsert({
      where: { id: `service-${slug(name)}` },
      update: {},
      create: { id: `service-${slug(name)}`, name, type: 'SERVICE' },
    });
  }
}

function slug(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
