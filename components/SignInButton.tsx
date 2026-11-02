"use client";

import SpinnerMini from "@/components/SpinnerMini";
import Image from "next/image";
import { useFormStatus } from "react-dom";

export default function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-4 rounded-xl border border-primary-300 px-6 py-4 text-lg font-medium transition duration-200 hover:bg-primary-900 hover:text-accent-100 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-primary-100 disabled:active:scale-100"
    >
      {pending && <SpinnerMini />}
      {!pending && (
        <>
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            priority
            height={24}
            width={24}
          />
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
}
