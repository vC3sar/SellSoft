import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as any)?.role || "USER";
  const { pathname } = req.nextUrl;

  // Protect Admin routes
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (role !== "ADMIN") {
      // Redirect unauthorized users to their dashboard
      return NextResponse.redirect(new URL("/account", req.url));
    }
  }

  // Protect Account routes
  if (pathname.startsWith("/account")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect Checkout Route
  if (pathname.startsWith("/checkout")) {
    if (!isLoggedIn) {
      // Pass callbackUrl so they return to checkout after login
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url));
    }
  }

  return NextResponse.next();
});

// Configure middleware to only run on certain paths to save performance
export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*"]
};
