import { createTRPCRouter } from "./trpc";

import { authRouter } from "./router/auth";
import { userRouter } from "./router/user";
import { eventsRouter } from "./router/events";
import { generalRouter } from "./router/general";
import { locationsRouter } from "./router/locations";
import { accountsRouter } from "./router/accounts";
import { profilesRouter } from "./router/profiles";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  general: generalRouter,
  location: locationsRouter,
  events: eventsRouter,
  accounts: accountsRouter,
  profiles: profilesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
