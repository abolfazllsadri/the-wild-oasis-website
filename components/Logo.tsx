import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3 sm:gap-4">
      <Image
        src={logo}
        height={80}
        width={80}
        priority
        alt="The Wild Oasis logo"
        className="h-9 w-9 rounded-full object-center sm:h-10 sm:w-10"
      />

      <span className="text-md font-medium tracking-wide text-primary-100 sm:text-lg">
        The Wild Oasis
      </span>
    </Link>
  );
}
