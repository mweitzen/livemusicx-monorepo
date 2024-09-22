import { createTRPCRouter } from "~/server/trpc";

import { internalRouter } from "./internal";
import { publicRouter } from "./public";
import { authorizedRouter } from "./authorized";

export const usersRouter = createTRPCRouter({
  internal: internalRouter,
  public: publicRouter,
  authorized: authorizedRouter,
});
