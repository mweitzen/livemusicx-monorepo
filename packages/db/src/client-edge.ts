import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma =
  global.prismaEdge ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL_EDGE,
      },
    },
  }).$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") global.prismaEdge = prisma;

export default prisma;
