import Header from "@/components/Header";
import { DM_Serif_Display, Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { ReservationProvider } from "@/components/ReservationContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome - The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
  openGraph: {
    siteName: "The Wild Oasis",
    type: "website",
    images: ["/bg.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#141C24",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      dir="ltr"
      lang="en"
      className={`${inter.variable} ${serif.variable} antialiased`}
    >
      <body className="relative flex min-h-dvh flex-col overflow-x-clip bg-primary-950 font-sans text-primary-100">
        <Header />

        <div className="grid flex-1 px-4 py-8 sm:px-8 sm:py-12">
          <main className="mx-auto w-full min-w-0 max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
