import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "../../../components/Footer";
import Nav from "../../../components/Nav";
import Store from "../../../components/Store";
import StructuredData from "../../../components/StructuredData";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/content";
import { alternateLanguages, localeUrl } from "@/lib/seo";

const SUPPORTED = ["en", "fr"] as const;

const SEO: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Store — Graffiti 101 Montreal",
    description:
      "Take some Graffiti 101 home — beginner spray cap kits, original prints, and branded merch from our Montreal team. Inquire by message for shipping and payment.",
  },
  fr: {
    title: "Boutique — Graffiti 101 Montréal",
    description:
      "Rapportez un bout de Graffiti 101 chez vous — kits de capuchons pour débutants, estampes originales et articles promotionnels de notre équipe montréalaise. Contactez-nous pour l'expédition et le paiement.",
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
      canonical: localeUrl(lang, "store"),
      languages: alternateLanguages("store"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(lang, "store"),
      title: seo.title,
      description: seo.description,
      siteName: "Graffiti 101",
      locale: lang === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: lang === "fr" ? "en_CA" : "fr_CA",
    },
  };
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!SUPPORTED.includes(raw as Lang)) notFound();
  const lang = raw as Lang;

  return (
    <>
      <StructuredData content={content} lang={lang} page="store" />
      <Nav lang={lang} labels={content.labels.nav} />
      <main className="flex-1">
        <Store
          data={content.store}
          labels={content.labels.store}
          lang={lang}
        />
      </main>
      <Footer data={content.footer} lang={lang} />
    </>
  );
}
