import { createTRPCRouter } from "@/server/api/trpc";

import { internalRouter } from "./internal";
import { publicRouter } from "./public";
import { authorizedRouter } from "./authorized";

export const userRouter = createTRPCRouter({
  internal: internalRouter,
  public: publicRouter,
  authorized: authorizedRouter,
});
