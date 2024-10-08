import { NextResponse } from "next/server";
import { auth } from "@repo/auth";
import { UserRole } from "@repo/db/schema";

const marketingPages = ["/", "/about", "/pricing", "/features"];
const appPages = ["/manage", "/explore", "/me"];

export default auth(({ auth, nextUrl, cookies }) => {
  const { pathname } = nextUrl;
  const hasVisitedApp = cookies.get("visitedApp")?.value === "true";

  // NOT AUTHENTICATED
  if (!auth) {
    const signInPage = "/api/auth/signin";
    const signInUrl = nextUrl.clone();
    signInUrl.pathname = signInPage;
    signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);

    // Protect app pages
    if (pathname.startsWith("/manage") || pathname.startsWith("/me")) {
      return NextResponse.redirect(signInUrl);
    }
  } else {
    // AUTHENTICATED
    const adminUser = auth.user.role === "ADMIN";
    const redirectToPage = adminUser ? "/manage" : "/me";

    // Hide auth pages
    if (["/signin", "/signup", "/verify"].includes(pathname)) {
      return NextResponse.redirect(new URL(redirectToPage, nextUrl));
    }

    // Protect admin pages
    if (pathname.startsWith("/manage") && !adminUser) {
      return NextResponse.redirect(new URL(redirectToPage, nextUrl));
    }

    // Hide marketing pages
    if (marketingPages.includes(pathname)) {
      // Redirect authenticated users
      if (auth.user.role === UserRole.ADMIN) {
        return NextResponse.redirect(new URL("/manage", nextUrl));
      }
      return NextResponse.redirect(new URL("/explore", nextUrl));
    }
  }

  // Set visited cookie
  if (appPages.includes(pathname) && !hasVisitedApp) {
    const response = NextResponse.next();
    // TODO: Uncomment
    // response.cookies.set("visitedApp", "true");
    return response;
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|avatars).*)"],
};
