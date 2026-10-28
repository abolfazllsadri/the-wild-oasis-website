import { auth } from "@/lib/auth";
import type { MiddlewareConfig } from "next/server";

export const middleware = auth;

export const config: MiddlewareConfig = {
  matcher: ["/account/:path*"],
};
