import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Faq from "../../../components/Faq";
import Footer from "../../../components/Footer";
import Nav from "../../../components/Nav";
import StructuredData from "../../../components/StructuredData";
import Testimonials from "../../../components/Testimonials";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/content";
import { alternateLanguages, localeUrl } from "@/lib/seo";

const SUPPORTED = ["en", "fr"] as const;

const SEO: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "FAQ & reviews — Graffiti 101 Montreal",
    description:
      "Common questions about Graffiti 101 workshops in Montreal — what to bring, age requirements, group sizes, language, legality. Plus reviews from past participants.",
  },
  fr: {
    title: "FAQ et avis — Graffiti 101 Montréal",
    description:
      "Questions fréquentes sur les ateliers Graffiti 101 à Montréal — que faut-il apporter, âge minimum, taille de groupe, langue, légalité. Plus les avis de participants passés.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!SUPPORTED.includes(raw as Lang)) return {};
  const lang = raw as Lang;
  const seo = SEO[lang];
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: localeUrl(lang, "faq"),
      languages: alternateLanguages("faq"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(lang, "faq"),
      title: seo.title,
      description: seo.description,
      siteName: "Graffiti 101",
      locale: lang === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: lang === "fr" ? "en_CA" : "fr_CA",
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!SUPPORTED.includes(raw as Lang)) notFound();
  const lang = raw as Lang;

  return (
    <>
      <StructuredData content={content} lang={lang} page="faq" />
      <Nav lang={lang} labels={content.labels.nav} />
      <main className="flex-1">
        <Faq
          data={content.faq}
          labels={content.labels.faq}
          lang={lang}
        />
        <Testimonials
          data={content.testimonials}
          labels={content.labels.testimonials}
          lang={lang}
        />
      </main>
      <Footer data={content.footer} lang={lang} />
    </>
  );
}
