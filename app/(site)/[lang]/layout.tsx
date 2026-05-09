import type { Metadata } from "next";
import { Nabla, Rock_Salt, Noto_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/seo";
import "../../globals.css";

const display = Nabla({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const heading = Rock_Salt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SUPPORTED = ["en", "fr"] as const;
type Locale = (typeof SUPPORTED)[number];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Graffiti 101 — Workshops in Montreal",
    template: "%s | Graffiti 101",
  },
  applicationName: "Graffiti 101",
  authors: [{ name: "Graffiti 101" }],
  creator: "Graffiti 101",
  publisher: "Graffiti 101",
  formatDetection: { email: false, address: false, telephone: false },
};

export function generateStaticParams() {
  return SUPPORTED.map((lang) => ({ lang }));
}

export default async function SiteRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED.includes(lang as Locale)) notFound();

  return (
    <html
      lang={lang}
      className={`${display.variable} ${heading.variable} ${inter.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased bg-brand-black text-brand-yellow">
        {children}
      </body>
    </html>
  );
}
