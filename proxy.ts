import { auth } from "@/lib/auth";
import type { ProxyConfig } from "next/server";

export const proxy = auth;

export const config: ProxyConfig = {
  matcher: ["/account/:path*", "/cabins/thankyou"],
};
