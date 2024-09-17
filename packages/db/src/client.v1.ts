import { PrismaClient } from "../dist/v1";

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export * from "../dist/v1";
