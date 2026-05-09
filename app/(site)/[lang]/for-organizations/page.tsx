import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../../components/Footer";
import Nav from "../../../components/Nav";
import QuoteForm from "../../../components/QuoteForm";
import Reveal from "../../../components/Reveal";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { alternateLanguages, localeUrl } from "@/lib/seo";

const SUPPORTED = ["en", "fr"] as const;

const SEO: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "For schools & youth organizations",
    description:
      "Bilingual graffiti workshops for schools, community centres, and youth groups in Montreal. Structured, safe, grant-fundable creative arts programming.",
  },
  fr: {
    title: "Pour les écoles et les organismes jeunesse",
    description:
      "Ateliers de graffiti bilingues pour écoles, centres communautaires et groupes de jeunes à Montréal. Programmation artistique structurée, sécuritaire et admissible aux subventions.",
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
      canonical: localeUrl(lang, "for-organizations"),
      languages: alternateLanguages("for-organizations"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(lang, "for-organizations"),
      title: seo.title,
      description: seo.description,
      siteName: "Graffiti 101",
      locale: lang === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: lang === "fr" ? "en_CA" : "fr_CA",
    },
  };
}

export default async function ForOrganizationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!SUPPORTED.includes(raw as Lang)) notFound();
  const lang = raw as Lang;
  const org = content.organizations;
  const services = content.services;
  const labels = content.labels.organizations;

  return (
    <>
      <Nav lang={lang} />
      <main className="flex-1">
        <section className="bg-brand-cream text-brand-black py-20 sm:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Reveal>
              <p className="font-heading text-brand-red tracking-widest uppercase text-sm">
                {labels.eyebrow?.[lang] ?? ""}
              </p>
              <h1 className="mt-2 font-heading text-3xl sm:text-5xl tracking-tight">
                {labels.title?.[lang] ?? ""}
              </h1>
              <div className="mt-4 h-0.5 w-12 bg-brand-red" aria-hidden />
              <p className="mt-6 max-w-2xl text-lg leading-relaxed">
                {org.intro[lang]}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-brand-black text-brand-yellow py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Reveal>
              <h2 className="font-heading text-2xl sm:text-4xl tracking-tight">
                {ui.organizations.outcomesHeading[lang]}
              </h2>
              <div className="mt-4 h-0.5 w-12 bg-brand-red" aria-hidden />
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {org.outcomes.map((o) => (
                  <li
                    key={o.id}
                    className="flex gap-3 text-base sm:text-lg leading-relaxed"
                  >
                    <span
                      aria-hidden
                      className="mt-2 flex-none w-2.5 h-2.5 bg-brand-red"
                    />
                    <span>{o.text[lang]}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="bg-brand-cream text-brand-black py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Reveal>
              <h2 className="font-heading text-2xl sm:text-4xl tracking-tight">
                {ui.organizations.formatsHeading[lang]}
              </h2>
              <div className="mt-4 h-0.5 w-12 bg-brand-red" aria-hidden />
            </Reveal>
            {services.length > 0 && (
              <Reveal delay={100} className="mt-8">
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((s) => (
                    <li
                      key={s.id}
                      className="relative bg-white text-brand-black border border-brand-black/15 p-6 flex flex-col"
                    >
                      <span
                        className="absolute top-0 left-0 z-10 w-3 h-3 bg-brand-red"
                        aria-hidden
                      />
                      <p className="font-heading text-xl tracking-wide">
                        {s.name[lang]}
                      </p>
                      <p className="mt-3 text-base leading-relaxed flex-1">
                        {s.description[lang]}
                      </p>
                      <p className="mt-4 font-heading text-lg text-brand-red">
                        {s.price}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>

        <section className="bg-brand-cream text-brand-black py-16 sm:py-20 border-t border-brand-black/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Reveal>
              <h2 className="font-heading text-2xl sm:text-4xl tracking-tight">
                {ui.organizations.practicalHeading[lang]}
              </h2>
              <div className="mt-4 h-0.5 w-12 bg-brand-red" aria-hidden />
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {org.practicalItems.map((it) => (
                  <li
                    key={it.id}
                    className="flex gap-3 text-base sm:text-lg leading-relaxed"
                  >
                    <span
                      aria-hidden
                      className="mt-2 flex-none w-2.5 h-2.5 bg-brand-red"
                    />
                    <span>{it.text[lang]}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section
          id="quote"
          aria-labelledby="quote-title"
          className="bg-brand-red text-brand-yellow py-20 sm:py-28"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Reveal>
              <h2
                id="quote-title"
                className="font-heading text-3xl sm:text-5xl tracking-tight"
              >
                {ui.organizations.quoteHeading[lang]}
              </h2>
              <div className="mt-4 h-0.5 w-12 bg-brand-yellow" aria-hidden />
              <p className="mt-6 text-lg text-brand-yellow/90 leading-relaxed">
                {ui.organizations.quoteIntro[lang]}
              </p>
            </Reveal>
            <QuoteForm lang={lang} />
            <p className="mt-8 text-sm text-brand-yellow/80">
              <Link href={`/${lang}`} className="underline underline-offset-4 hover:text-brand-yellow">
                ←{" "}
                {lang === "fr" ? "Retour à l'accueil" : "Back to home"}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer data={content.footer} lang={lang} />
    </>
  );
}
