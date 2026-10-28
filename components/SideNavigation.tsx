"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import type { ReactNode } from "react";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLink = {
  name: string;
  href: string;
  icon: ReactNode;
};

const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-current" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-current" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-current" />,
  },
];

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Account"
      className="md:border-r md:border-primary-900 md:pr-3"
    >
      <ul className="flex gap-2 overflow-x-auto py-1 text-base [scrollbar-width:none] md:h-full md:flex-col md:overflow-visible md:py-0 md:text-lg [&::-webkit-scrollbar]:hidden">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.name} className="shrink-0">
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-2.5 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 md:gap-4 md:px-5 md:py-3",
                  isActive && "bg-primary-900",
                )}
              >
                <span
                  className={cn(
                    "text-primary-600",
                    isActive && "text-accent-200",
                  )}
                >
                  {link.icon}
                </span>

                <span className={isActive ? "text-accent-200" : ""}>
                  {link.name}
                </span>
              </Link>
            </li>
          );
        })}

        <li className="shrink-0 md:mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
