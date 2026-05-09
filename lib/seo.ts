import type { Lang } from "./content";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://graffiti101.ca"
).replace(/\/$/, "");

export const SUPPORTED_LOCALES: readonly Lang[] = ["en", "fr"] as const;
export const DEFAULT_LOCALE: Lang = "en";

export function localeUrl(lang: Lang, path = ""): string {
  const cleanPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${SITE_URL}/${lang}${cleanPath}`;
}

export function alternateLanguages(
  path = ""
): Record<string, string> & { "x-default": string } {
  return {
    en: localeUrl("en", path),
    fr: localeUrl("fr", path),
    "x-default": localeUrl(DEFAULT_LOCALE, path),
  };
}

// Strip html-like characters that break out of <script type="application/ld+json">.
// See https://nextjs.org/docs/app/guides/json-ld
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
