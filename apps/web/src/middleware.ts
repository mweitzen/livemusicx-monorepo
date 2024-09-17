import { NextResponse } from "next/server";
import { auth } from "@repo/auth";
import { UserRole } from "@/auth";

const marketingPages = ["/", "/about", "/pricing", "/features"];
const appPages = ["/manage", "/explore", "/me"];

export default auth(({ auth, nextUrl, cookies }) => {
  const { pathname } = nextUrl;
  const hasVisitedApp = cookies.get("visitedApp")?.value === "true";

  if (!auth && pathname === "/manage") {
    return NextResponse.redirect(new URL("/explore", nextUrl));
  }
  // Control who sees marketing pages
  if (marketingPages.includes(pathname)) {
    // Redirect authenticated users
    if (!!auth) {
      if (auth.user.role === UserRole.ADMIN) {
        return NextResponse.redirect(new URL("/manage", nextUrl));
      }
      return NextResponse.redirect(new URL("/explore", nextUrl));
    }
    // Redirect unauthenticated users already visited to app
    if (hasVisitedApp) {
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
