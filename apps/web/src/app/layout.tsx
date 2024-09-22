import "@repo/ui/ui.css";
import "@repo/ui/styles.css";
import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import { content } from "~/content/NEW/app";
import { ThemeProvider } from "@repo/ui/theme";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
export const metadata: Metadata = {
  title: content.title,
  description: content.description,
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='overflow-x-clip'
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {auth}
        </ThemeProvider>
      </body>
    </html>
  );
}
