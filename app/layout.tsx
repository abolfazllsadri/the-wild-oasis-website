import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReservationProvider } from "@/components/ReservationContext";
import { DM_Serif_Display, Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
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
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "The Wild Oasis" },
    ],
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

        <Footer />

        <Toaster
          theme="dark"
          position="bottom-left"
          richColors
          closeButton
          style={
            {
              "--normal-bg": "#1B2631",
              "--normal-border": "#2C3D4F",
              "--normal-text": "#D4DEE7",

              "--success-bg": "#10261b",
              "--success-border": "#166534",
              "--success-text": "#86efac",

              "--error-bg": "#2b1316",
              "--error-border": "#991b1b",
              "--error-text": "#fca5a5",

              "--warning-bg": "#2b2110",
              "--warning-border": "#a16207",
              "--warning-text": "#fde047",

              "--info-bg": "#102233",
              "--info-border": "#1d4e89",
              "--info-text": "#93c5fd",
            } as React.CSSProperties
          }
        />
      </body>
    </html>
  );
}
