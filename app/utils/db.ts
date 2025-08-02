// db.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Avoids conflict in development when hot reloading
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
