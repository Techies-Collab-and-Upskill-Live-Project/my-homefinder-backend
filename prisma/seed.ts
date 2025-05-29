import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const roles = ['renter', 'landlord', 'admin'];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  console.log('Roles seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
