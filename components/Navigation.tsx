import MobileMenu from "@/components/MobileMenu";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

const linkClass =
  "text-lg font-medium tracking-wide transition-colors hover:text-accent-200";

export default async function Navigation() {
  const session = await auth();
  const image = session?.user?.image;

  return (
    <>
      <ul className="hidden items-center gap-10 md:flex">
        <li>
          <Link href="/cabins" className={linkClass}>
            Cabins
          </Link>
        </li>

        <li>
          <Link href="/about" className={linkClass}>
            About
          </Link>
        </li>

        <li>
          <Link
            href="/account"
            className={`${linkClass} flex items-center gap-3`}
          >
            {image && (
              <Image
                src={image}
                width={80}
                height={80}
                referrerPolicy="no-referrer"
                alt={`${session?.user?.name ?? "Guest"} avatar`}
                className="h-8 w-8 rounded-full border border-primary-700"
              />
            )}
            Guest area
          </Link>
        </li>
      </ul>

      {/* Mobile Nav */}
      <MobileMenu guestName={session?.user?.name} image={image} />
    </>
  );
}
