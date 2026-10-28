import Logo from "@/components/Logo";
import SignInButton from "@/components/SignInButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Sign in" };

export default async function Page() {
  const session = await auth();
  if (session?.user) redirect("/account");

  return (
    <div className="flex items-center justify-center py-8 sm:py-20">
      <div className="w-full max-w-md rounded-2xl border border-primary-800 bg-primary-900/50 p-6 text-center shadow-2xl shadow-black/30 sm:max-w-xl sm:p-10">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <h1 className="text-balance text-2xl font-bold text-primary-50 sm:text-3xl">
          Sign in to access your guest area
        </h1>

        <p className="mb-8 mt-3 text-primary-300">
          Manage your reservations and update your profile.
        </p>

        <SignInButton />
      </div>
    </div>
  );
}
