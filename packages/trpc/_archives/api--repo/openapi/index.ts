import { generateOpenApiDocument } from "trpc-openapi";
import { openApiRouter } from "./router";

// Generate OpenAPI schema document
// @ts-ignore
export const openApiDocument = generateOpenApiDocument(openApiRouter, {
  title: "Live Music X API",
  description: "OpenAPI compliant REST API built using tRPC with Next.js",
  version: "1.0.0",
  baseUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/v1"
      : "https://www.livemusicx.com/api/v1",
  tags: ["general", "locations", "events", "accounts", "bulletins"],
  docsUrl: "https://www.livemusicx.com/api/v1/docs",
});
