import Image from "next/image";
import { auth } from "@/lib/auth";
import NavItem from "@/components/NavItem";
import MobileMenu from "@/components/MobileMenu";

export default async function Navigation() {
  const session = await auth();
  const image = session?.user?.image;

  return (
    <>
      <ul className="hidden items-center gap-10 md:flex">
        <li>
          <NavItem href="/cabins">Cabins</NavItem>
        </li>

        <li>
          <NavItem href="/about">About</NavItem>
        </li>

        <li>
          <NavItem
            href="/account"
            className="flex items-center gap-3 text-lg font-medium tracking-wide transition-all duration-300 ease-in-out hover:text-accent-200"
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
          </NavItem>
        </li>
      </ul>

      {/* Mobile Nav */}
      <MobileMenu guestName={session?.user?.name} image={image} />
    </>
  );
}
