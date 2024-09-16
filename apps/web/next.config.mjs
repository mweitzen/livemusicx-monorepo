/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/event",
        destination: "/explore/events",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/explore/events",
        permanent: true,
      },
      {
        source: "/musician",
        destination: "/explore/musicians",
        permanent: true,
      },
      {
        source: "/musicians",
        destination: "/explore/musicians",
        permanent: true,
      },
      {
        source: "/band",
        destination: "/explore/bands",
        permanent: true,
      },
      {
        source: "/bands",
        destination: "/explore/bands",
        permanent: true,
      },
      {
        source: "/venue",
        destination: "/explore/venues",
        permanent: true,
      },
      {
        source: "/venues",
        destination: "/explore/venues",
        permanent: true,
      },
      {
        source: "/organizer",
        destination: "/explore/organizers",
        permanent: true,
      },
      {
        source: "/organizers",
        destination: "/explore/organizers",
        permanent: true,
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      // Google account imgaes
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      // Google places api images
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
      // Application storage images
      {
        protocol: "https",
        hostname: "powoppetcaklcixcjhlg.supabase.co",
      },
      // Webflow images
      {
        protocol: "https",
        hostname: "assets-global.website-files.com",
      },
    ],
  },
};

export default nextConfig;
