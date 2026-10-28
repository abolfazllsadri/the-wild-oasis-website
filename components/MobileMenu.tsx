"use client";

import { cn } from "@/lib/utils";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/cabins", label: "Cabins" },
  { href: "/about", label: "About" },
  { href: "/account", label: "Guest area" },
];

type MobileMenuProps = {
  image?: string | null;
  guestName?: string | null;
};

export default function MobileMenu({ image, guestName }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((open) => !open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="rounded-lg p-2 transition hover:bg-primary-900"
      >
        {open ? (
          <XMarkIcon className="h-7 w-7" />
        ) : (
          <Bars3Icon className="h-7 w-7" />
        )}
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 bottom-0 top-16 z-30 animate-fade-in bg-primary-950/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          <nav
            id="mobile-menu"
            aria-label="Main"
            className="fixed inset-x-3 top-[4.5rem] z-40 animate-fade-in rounded-2xl border border-primary-700/60 bg-primary-900/90 p-2 shadow-2xl shadow-black/60"
          >
            <ul>
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3.5 text-lg font-medium transition-colors hover:bg-primary-800",
                      isActive(href) && "text-accent-300",
                    )}
                  >
                    {href === "/account" && image && (
                      <Image
                        src={image}
                        width={80}
                        height={80}
                        referrerPolicy="no-referrer"
                        alt={`${guestName ?? "Guest"} avatar`}
                        className="h-8 w-8 rounded-full border border-primary-700"
                      />
                    )}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
