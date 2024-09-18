async authorized({ request, auth }) {
  // console.log("AUTHORIZING", auth);
  const { pathname } = request.nextUrl;
  // protected routes
  if (pathname.startsWith("/account")) return !!auth;
  if (pathname.startsWith("/tickets")) return !!auth;
  if (pathname.startsWith("/favorites")) return !!auth;
  //authorized routes
  if (pathname.startsWith("/admin")) {
    if (!auth || !auth.user) return false;
    if (auth.user.accountType === "PUBLIC")
      return NextResponse.redirect(new URL(`/account`, request.url));
    return true;
  }
  // public routes
  return true;
},