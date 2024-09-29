import { createTRPCRouter } from "./trpc";

import { authRouter } from "./router/auth";
import { userRouter } from "./router/user";
import { eventsRouter } from "./router/events";
import { generalRouter } from "./router/general";
import { locationRouter } from "./router/location";
import { accountsRouter } from "./router/accounts";
import { profileRouter } from "./router/profiles";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  general: generalRouter,
  location: locationRouter,
  events: eventsRouter,
  accounts: accountsRouter,
  profiles: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
