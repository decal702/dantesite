import type { Metadata } from "next";
import { notFound } from "next/navigation";
import About from "../../components/About";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Nav from "../../components/Nav";
import Services from "../../components/Services";
import Socials from "../../components/Socials";
import StructuredData from "../../components/StructuredData";
import UpcomingWorkshops from "../../components/UpcomingWorkshops";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/content";
import { alternateLanguages, localeUrl } from "@/lib/seo";

const SUPPORTED = ["en", "fr"] as const;

const SEO: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Graffiti workshops in Montreal — beginner to private sessions",
    description:
      "Hands-on graffiti workshops in Montreal, taught by working artists. Beginner classes, private 1-on-1 sessions, and group events for birthdays, bachelor parties, and corporate offsites. Bilingual (EN/FR).",
  },
  fr: {
    title: "Ateliers de graffiti à Montréal — du débutant aux sessions privées",
    description:
      "Ateliers de graffiti à Montréal, animés par des artistes professionnels. Cours débutants, sessions privées et événements de groupe pour anniversaires, enterrements de vie de garçon et sorties d'entreprise. Bilingue (FR/EN).",
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
    keywords: [
      "graffiti workshop Montreal",
      "atelier graffiti Montréal",
      "street art workshop",
      "graffiti class",
      "spray paint class Montreal",
      "team building Montreal",
      "private graffiti lesson",
      "Mile End graffiti",
      "Plateau graffiti",
    ],
    alternates: {
      canonical: localeUrl(lang),
      languages: alternateLanguages(),
    },
    openGraph: {
      type: "website",
      url: localeUrl(lang),
      title: seo.title,
      description: seo.description,
      siteName: "Graffiti 101",
      locale: lang === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: lang === "fr" ? "en_CA" : "fr_CA",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!SUPPORTED.includes(raw as Lang)) notFound();
  const lang = raw as Lang;

  return (
    <>
      <StructuredData content={content} lang={lang} page="home" />
      <Nav lang={lang} />
      <main className="flex-1">
        <Hero data={content.hero} lang={lang} />
        <About data={content.about} lang={lang} />
        <Services data={content.services} lang={lang} />
        <UpcomingWorkshops
          data={content.upcomingWorkshops}
          services={content.services}
          lang={lang}
        />
        <Contact data={content.contact} lang={lang} />
        <Socials data={content.socials} lang={lang} />
      </main>
      <Footer data={content.footer} lang={lang} />
    </>
  );
}
