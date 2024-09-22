import { Loader } from "@googlemaps/js-api-loader";

export const loader = new Loader({
  apiKey: process.env.GOOGLE_MAPS_API_KEY ?? "unauthorized",
  version: "weekly",
});
