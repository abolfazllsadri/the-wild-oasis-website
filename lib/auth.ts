import { createGuest, getGuest } from "@/lib/data-service";
import NextAuth, { type DefaultSession, type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      guestId?: string | number;
    } & DefaultSession["user"];
  }
}

const authConfig: NextAuthConfig = {
  providers: [Google],
  callbacks: {
    authorized({ auth }) {
      return Boolean(auth?.user);
    },

    async signIn({ user }) {
      try {
        if (!user.email) return false;

        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name ?? "Guest",
          });

        return true;
      } catch {
        return false;
      }
    },

    async session({ session }) {
      const email = session.user.email;

      if (!email) return session;

      const guest = await getGuest(email);

      session.user.guestId = guest?.id;

      return session;
    },
  },
  pages: { signIn: "/login" },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
