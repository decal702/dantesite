import { ImageResponse } from "next/og";
import type { Lang } from "@/lib/content";

export const alt = "Graffiti 101 — Workshops in Montreal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY: Record<
  Lang,
  { eyebrow: string; title: string; tagline: string }
> = {
  en: {
    eyebrow: "MONTREAL · BILINGUAL",
    title: "Graffiti 101",
    tagline: "Hands-on graffiti workshops, taught by working artists.",
  },
  fr: {
    eyebrow: "MONTRÉAL · BILINGUE",
    title: "Graffiti 101",
    tagline: "Ateliers de graffiti, animés par des artistes professionnels.",
  },
};

export default async function Image({
  params,
}: {
  params: { lang: string };
}) {
  const lang: Lang = params.lang === "fr" ? "fr" : "en";
  const copy = COPY[lang];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1a1a1a",
          backgroundImage:
            "linear-gradient(135deg, #1a1a1a 0%, #1a1a1a 60%, #c93232 100%)",
          color: "#f5e9b8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 64,
            width: 24,
            height: 24,
            background: "#c93232",
          }}
        />
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            color: "#c93232",
            marginBottom: 24,
          }}
        >
          {copy.eyebrow}
        </div>
        <div
          style={{
            fontSize: 160,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: -4,
            color: "#f5e9b8",
          }}
        >
          {copy.title}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 40,
            lineHeight: 1.25,
            maxWidth: 900,
            color: "#f5e9b8",
            opacity: 0.92,
          }}
        >
          {copy.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
