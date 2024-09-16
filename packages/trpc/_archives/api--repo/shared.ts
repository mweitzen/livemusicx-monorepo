import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "./router";

export const transformer = superjson;

function getBaseUrl() {
  if (typeof window !== "undefined") return "";

  if (process.env.VERCEL_ENV === "production")
    return `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + "/api/internal";
}

/**
 * Inference helper for inputs/outputs
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
