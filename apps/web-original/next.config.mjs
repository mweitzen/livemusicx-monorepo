/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  images: {
    remotePatterns: [
      // Google account imgaes
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      // internal storage images
      {
        protocol: "https",
        hostname: "powoppetcaklcixcjhlg.supabase.co",
      },
      // venue images return from google places api
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
      // vernons images from webflow
      {
        protocol: "https",
        hostname: "assets-global.website-files.com",
      },
      // hold-my-ticket amp concerts
      {
        protocol: "https",
        hostname: "holdmyticket-res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
