import type { Metadata } from "next";
import { Nabla, Contrail_One, Noto_Serif } from "next/font/google";
import "./globals.css";

const display = Nabla({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const heading = Contrail_One({
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
  title: {
    default: "Graffiti 101 — Workshops in Montreal",
    template: "%s | Graffiti 101",
  },
  description:
    "Graffiti 101 teaches the art of street painting through hands-on workshops, private sessions, and group events in Montreal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${heading.variable} ${inter.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">{children}</body>
    </html>
  );
}
