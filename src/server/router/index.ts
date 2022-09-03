// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { scheduleRouter } from "./schedule";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("schedule.", scheduleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
