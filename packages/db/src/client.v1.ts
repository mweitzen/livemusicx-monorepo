import { PrismaClient } from "../dist/v1-edge/edge.js";
import { withAccelerate } from "@prisma/extension-accelerate";

export const prisma =
  global.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export * from "../dist/v1-edge";
