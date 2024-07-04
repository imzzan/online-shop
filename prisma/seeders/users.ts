import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.create({
    data: {
      Name: 'Admin',
      Email: 'admin@gmail.com',
      Phone: '+6283823185546',
      Password: await bcrypt.hash('Admin123', 10),
      Role: 'ADMIN',
      Photo: 'this phone',
      Is_Active: true,
      Age: 21,
      Alamat: 'Jl. Syekh Nurjati No. 041',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log({ admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
