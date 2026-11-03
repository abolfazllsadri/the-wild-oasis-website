"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItemProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function NavItem({ href, children, className }: NavItemProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "inline-block text-lg font-medium tracking-wide transition-all duration-300 ease-in-out hover:text-accent-200",
        pathname === href && "scale-[1.03] text-accent-200 drop-shadow-lg",
        className,
      )}
    >
      {children}
    </Link>
  );
}
