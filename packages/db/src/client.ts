import { PrismaClient } from "./generated/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Set prisma to existing client or new instance
export const db = globalThis.prismaGlobal ?? prismaClientSingleton();

// Ensure Singleton Client in Development
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
