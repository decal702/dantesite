import type { Metadata } from "next";
import { Nabla, Rock_Salt, Noto_Serif } from "next/font/google";
import "../globals.css";

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

export const metadata: Metadata = {
  title: "Admin — Graffiti 101",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${heading.variable} ${inter.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased bg-brand-cream text-brand-black">
        {children}
      </body>
    </html>
  );
}
