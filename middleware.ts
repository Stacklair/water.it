import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest, response: NextResponse) {
  const apiKey = request.headers.get("apiKey");
  const url = request.nextUrl;

  // Allow requests with a valid API key
  if (apiKey === process.env.API_KEY) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // If the user is logged in and tries to access login/signup, redirect to home page
  if (token && (url.pathname === "/login" || url.pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Create a response that includes the email header if the user is logged in
  if (token) {
    const response = NextResponse.next();
    response.headers.set("x-email", token.email as string);
    return response;
  }

  // If the user is not logged in and tries to access a protected route, redirect to login page
  if (
    !token &&
    !(
      (
        url.pathname.startsWith("/api/auth") || // Allow authentication APIs
        url.pathname === "/login" || // Allow login page
        url.pathname === "/signup"
      ) // Allow signup page
    )
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/api/:path*", // Protect all API routes
    "/login", // Protect login page
  ],
};
