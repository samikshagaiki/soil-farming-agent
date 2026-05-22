export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/soil/:path*",
    "/admin/:path*"
  ]
};