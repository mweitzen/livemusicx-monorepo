import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Live Music X",
    short_name: "Live Music X",
    description: "Next.js App",
    start_url: "/",
    display: "standalone",
    background_color: "#020817",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    shortcuts: [
      {
        name: "Home",
        short_name: "Home",
        description: "Public Homepage",
        url: "/",
      },
      {
        name: "Admin Dashboard",
        short_name: "Admin",
        description: "Go to Admin Dashboard",
        url: "/manage",
      },
      {
        name: "Create Event",
        short_name: "Create Event",
        description: "Quick Start: Create an Event",
        url: "/manage/events/create",
      },
    ],
  };
}
