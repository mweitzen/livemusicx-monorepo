import { createTRPCRouter } from "./trpc";
import { v1Router } from "./router/v1";
import { v2Router } from "./router/v2";
import { authRouter } from "./router/auth";

export const appRouter = createTRPCRouter({
  v1: v1Router,
  v2: v2Router,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
