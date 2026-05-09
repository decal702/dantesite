"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";

type AnchorItem = { kind: "anchor"; id: string; labelKey: keyof typeof ui.nav };
type PageItem = { kind: "page"; path: string; labelKey: keyof typeof ui.nav };
type Item = AnchorItem | PageItem;

const ITEMS: Item[] = [
  { kind: "anchor", id: "home", labelKey: "home" },
  { kind: "anchor", id: "about", labelKey: "about" },
  { kind: "anchor", id: "services", labelKey: "services" },
  { kind: "page", path: "store", labelKey: "store" },
  { kind: "page", path: "faq", labelKey: "faq" },
  { kind: "page", path: "for-organizations", labelKey: "forOrganizations" },
  { kind: "anchor", id: "contact", labelKey: "contact" },
];

const ANCHOR_IDS = ITEMS.flatMap((i) => (i.kind === "anchor" ? [i.id] : []));

export default function Nav({
  lang,
  labels,
}: {
  lang: Lang;
  labels?: Content["labels"]["nav"];
}) {
  function navLabel(key: keyof typeof ui.nav): string {
    return labels?.[key]?.[lang] ?? ui.nav[key][lang];
  }
  const pathname = usePathname();
  const [activeAnchor, setActiveAnchor] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Strip locale prefix to detect subpage (about / store / faq / for-organizations).
  const subpath = pathname.replace(/^\/(en|fr)/, "").replace(/^\//, "");
  const isHome = subpath === "";

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveAnchor(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ANCHOR_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  // Persist language choice so the proxy keeps returning users to their
  // preferred locale when they next hit `/`.
  useEffect(() => {
    document.cookie = `g101_lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }, [lang]);

  function hrefFor(item: Item): string {
    if (item.kind === "page") return `/${lang}/${item.path}`;
    // anchor: #id when on home, /lang#id when elsewhere (so it navigates back).
    return isHome ? `#${item.id}` : `/${lang}#${item.id}`;
  }

  function isActive(item: Item): boolean {
    if (item.kind === "page") return subpath === item.path;
    if (!isHome) return false;
    return activeAnchor === item.id;
  }

  const homeLogoHref = isHome ? "#home" : `/${lang}`;
  const enHref = `/en${subpath ? `/${subpath}` : ""}`;
  const frHref = `/fr${subpath ? `/${subpath}` : ""}`;

  return (
    <header className="sticky top-0 z-50 bg-brand-red/90 backdrop-blur border-b border-brand-yellow/10">
      <nav
        aria-label="Primary"
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4"
      >
        <Link
          href={homeLogoHref}
          className="font-display text-2xl tracking-widest text-brand-yellow hover:text-brand-black transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          GRAFFITI <span className="text-brand-black">101</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {ITEMS.map((item) => {
            const active = isActive(item);
            const key = item.kind === "page" ? `p-${item.path}` : `a-${item.id}`;
            return (
              <li key={key}>
                <Link
                  href={hrefFor(item)}
                  aria-current={active ? "true" : undefined}
                  className={`px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                    active
                      ? "text-brand-black"
                      : "text-brand-yellow/70 hover:text-brand-yellow"
                  }`}
                >
                  {navLabel(item.labelKey)}
                  <span
                    className={`block h-0.5 mt-0.5 transition-all ${
                      active ? "bg-brand-black" : "bg-transparent"
                    }`}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div
            className="hidden sm:flex items-center text-xs font-semibold uppercase tracking-wider"
            role="group"
            aria-label={ui.language.label[lang]}
          >
            <Link
              href={enHref}
              hrefLang="en"
              prefetch={false}
              className={`px-2 py-1 ${
                lang === "en" ? "text-brand-yellow" : "text-brand-yellow/40 hover:text-brand-yellow"
              }`}
              aria-current={lang === "en" ? "true" : undefined}
            >
              EN
            </Link>
            <span className="text-brand-yellow/30" aria-hidden>
              /
            </span>
            <Link
              href={frHref}
              hrefLang="fr"
              prefetch={false}
              className={`px-2 py-1 ${
                lang === "fr" ? "text-brand-yellow" : "text-brand-yellow/40 hover:text-brand-yellow"
              }`}
              aria-current={lang === "fr" ? "true" : undefined}
            >
              FR
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-brand-yellow"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              aria-hidden
            >
              {mobileOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-brand-yellow/10 bg-brand-red"
        >
          <ul className="px-4 py-2">
            {ITEMS.map((item) => {
              const active = isActive(item);
              const key = item.kind === "page" ? `p-${item.path}` : `a-${item.id}`;
              return (
                <li key={key}>
                  <Link
                    href={hrefFor(item)}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-2 py-3 text-base font-medium uppercase tracking-wider border-b border-brand-yellow/10 last:border-0 ${
                      active ? "text-brand-black" : "text-brand-yellow"
                    }`}
                  >
                    {navLabel(item.labelKey)}
                  </Link>
                </li>
              );
            })}
            <li className="flex gap-3 px-2 py-3 text-sm font-semibold uppercase tracking-wider">
              <Link
                href={enHref}
                hrefLang="en"
                prefetch={false}
                onClick={() => setMobileOpen(false)}
                className={lang === "en" ? "text-brand-yellow" : "text-brand-yellow/40"}
                aria-current={lang === "en" ? "true" : undefined}
              >
                EN
              </Link>
              <Link
                href={frHref}
                hrefLang="fr"
                prefetch={false}
                onClick={() => setMobileOpen(false)}
                className={lang === "fr" ? "text-brand-yellow" : "text-brand-yellow/40"}
                aria-current={lang === "fr" ? "true" : undefined}
              >
                FR
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
