import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-primary-900 bg-primary-950/15">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-primary-300 sm:flex-row sm:px-8 sm:py-8 sm:text-sm">
        <p>
          &copy; {new Date().getFullYear()} The Wild Oasis. All rights reserved.
        </p>

        <ul className="flex gap-6">
          <li>
            <Link
              href="/cabins"
              className="transition-colors hover:text-accent-300"
            >
              Cabins
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="transition-colors hover:text-accent-300"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/account"
              className="transition-colors hover:text-accent-300"
            >
              Guest area
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
