import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { Metadata, Viewport } from "next";

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { description, siteName, slogan, title } from "@/lib/content/global";
import { appleImages } from "@/lib/assets/apple-images";

import { Providers } from "@/app/providers";
import { Navigation, navigationSpacerClass } from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${title} - ${slogan}`,
    default: `${title} - ${slogan}`,
  },
  description: description,
  generator: "Next.js",
  applicationName: title,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL
      ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
      : "http://localhost:3000"
  ),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    startupImage: appleImages,
    title: "Live Music X",
  },
  openGraph: {
    url: "/",
    title: `${title} - ${slogan}`,
    description: description,
    siteName: siteName,
    locale: "en_US",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, navigationSpacerClass, "antialiased")}>
        <Providers>
          <Navigation />
          {children}
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
