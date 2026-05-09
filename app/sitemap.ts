import type { MetadataRoute } from "next";
import { alternateLanguages, localeUrl } from "@/lib/seo";

type RoutePriority = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const ROUTES: RoutePriority[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "faq", priority: 0.9, changeFrequency: "monthly" },
  { path: "store", priority: 0.8, changeFrequency: "monthly" },
  { path: "for-organizations", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const r of ROUTES) {
    for (const lang of ["en", "fr"] as const) {
      entries.push({
        url: localeUrl(lang, r.path),
        lastModified,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
        alternates: { languages: alternateLanguages(r.path) },
      });
    }
  }
  return entries;
}
