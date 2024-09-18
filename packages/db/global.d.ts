import { PrismaClient } from "@prisma/client";
import { PrismaClient as PrismaEdgeClient } from "@prisma/client/edge";

declare global {
  var prisma: PrismaClient;
  var prismaEdge: PrismaEdgeClient;
}
