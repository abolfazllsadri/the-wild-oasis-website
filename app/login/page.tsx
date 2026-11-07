import Logo from "@/components/Logo";
import SignInButton from "@/components/SignInButton";
import { signInAction } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { getSafePath } from "@/lib/utils";
import { redirect } from "next/navigation";

export const metadata = { title: "Sign in", robots: { index: false } };

export default async function Page({ searchParams }: PageProps<"/login">) {
  const { next, error } = await searchParams;
  const redirectTo = getSafePath(next?.toString());

  if (error)
    redirect(`/login/error?error=${encodeURIComponent(error?.toString())}`);

  const session = await auth();
  if (session?.user) redirect(redirectTo);

  return (
    <div className="flex items-center justify-center py-8 sm:py-20">
      <div className="w-full max-w-md rounded-2xl border border-primary-800 bg-primary-900/50 p-6 text-center shadow-2xl shadow-black/30 sm:max-w-xl sm:p-10">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <h1 className="text-2xl font-bold text-balance text-primary-50 sm:text-3xl">
          Sign in to access your guest area
        </h1>

        <p className="mt-3 mb-8 text-primary-300">
          Manage your reservations and update your profile.
        </p>

        <form action={signInAction.bind(null, redirectTo)}>
          <SignInButton />
        </form>
      </div>
    </div>
  );
}
