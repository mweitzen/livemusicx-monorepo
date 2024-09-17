import { authRouter } from "./router/auth";
import { createTRPCRouter } from "./trpc";

// import { accountsRouter } from "./router/accounts";
// import { eventsRouter } from "./router/events";
// import { usersRouter } from "./router/users";
// import { bulletinsRouter } from "./router/bulletins";
// import { locationsRouter } from "./router/locations";
// import { generalRouter } from "./router/general";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  // general: generalRouter,
  // locations: locationsRouter,
  // accounts: accountsRouter,
  // events: eventsRouter,
  // users: usersRouter,
  // bulletins: bulletinsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
