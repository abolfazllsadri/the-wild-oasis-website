import { signInAction } from "@/lib/actions";
import Image from "next/image";

export default function SignInButton() {
  return (
    <form action={signInAction}>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-4 rounded-xl border border-primary-300 px-6 py-4 text-lg font-medium transition duration-200 hover:bg-primary-900 hover:text-accent-100 active:scale-[0.99]"
      >
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          loading="eager"
          height={24}
          width={24}
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}
