import { PrismaClient } from "@prisma/client";
import prismaClient from "./client";
import prismaEdgeClient from "./client-edge";

export const prisma: PrismaClient =
  process.env.NODE_ENV !== "production" ? prismaClient : prismaEdgeClient;

export * from "@prisma/client";
