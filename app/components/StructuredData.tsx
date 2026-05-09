import type { Content, Lang } from "@/lib/content";
import { SITE_URL, localeUrl, safeJsonLd } from "@/lib/seo";

type Page = "home" | "about" | "store" | "faq";

type Props = {
  content: Content;
  lang: Lang;
  page?: Page;
};

export default function StructuredData({
  content,
  lang,
  page = "home",
}: Props) {
  const business = content.business;
  const sameAs = content.socials.map((s) => s.url).filter(Boolean);
  const phone = business.telephone || undefined;

  // Site-wide identity — emitted on every page so search engines / LLMs
  // see consistent business info regardless of entry point.
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: business.legalName,
    url: SITE_URL,
    logo: content.hero.backgroundImage || undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: business.legalName,
    inLanguage: lang === "fr" ? "fr-CA" : "en-CA",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const businessOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#business`,
    name: business.legalName,
    description: content.hero.tagline[lang],
    url: localeUrl(lang),
    telephone: phone,
    email: content.contact.recipientEmail,
    image: content.hero.backgroundImage || undefined,
    areaServed: { "@type": "City", name: "Montreal" },
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    knowsLanguage: ["en", "fr"],
  };

  const all: unknown[] = [organization, website, businessOrg];

  if (page === "home") {
    for (const s of content.services.filter((s) => !s.comingSoon)) {
      all.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${SITE_URL}/#service-${s.id}`,
        name: s.name[lang],
        description: s.description[lang],
        image: s.image || undefined,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: { "@type": "City", name: "Montreal" },
        offers: {
          "@type": "Offer",
          price: s.price,
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
          url: localeUrl(lang, "#contact"),
        },
      });
    }

    for (const w of content.upcomingWorkshops) {
      const service = content.services.find((s) => s.id === w.serviceId);
      const name = service ? service.name[lang] : w.id;
      const description = service ? service.description[lang] : undefined;
      const startDate =
        w.time && /^\d{2}:\d{2}/.test(w.time) ? `${w.date}T${w.time}` : w.date;
      all.push({
        "@context": "https://schema.org",
        "@type": "Event",
        name,
        description,
        startDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: w.location[lang],
          address: {
            "@type": "PostalAddress",
            addressLocality: business.addressLocality,
            addressRegion: business.addressRegion,
            addressCountry: business.addressCountry,
          },
        },
        organizer: { "@id": `${SITE_URL}/#business` },
        image: service?.image || undefined,
        offers: service
          ? {
              "@type": "Offer",
              price: service.price,
              priceCurrency: "CAD",
              url: localeUrl(lang, "#contact"),
              availability: "https://schema.org/InStock",
            }
          : undefined,
      });
    }
  }

  if (page === "about") {
    for (const m of content.about.team) {
      all.push({
        "@context": "https://schema.org",
        "@type": "Person",
        name: m.name,
        jobTitle: m.role[lang],
        image: m.photo || undefined,
        worksFor: { "@id": `${SITE_URL}/#organization` },
      });
    }
  }

  if (page === "store") {
    for (const p of content.store) {
      all.push({
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name[lang],
        description: p.description[lang],
        image: p.image || undefined,
        brand: { "@id": `${SITE_URL}/#organization` },
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
          url: localeUrl(lang, "#contact"),
          seller: { "@id": `${SITE_URL}/#business` },
        },
      });
    }
  }

  if (page === "faq") {
    if (content.faq.length > 0) {
      all.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.map((q) => ({
          "@type": "Question",
          name: q.question[lang],
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer[lang],
          },
        })),
      });
    }

    for (const t of content.testimonials) {
      all.push({
        "@context": "https://schema.org",
        "@type": "Review",
        reviewBody: t.quote[lang],
        author: { "@type": "Person", name: t.author },
        itemReviewed: { "@id": `${SITE_URL}/#business` },
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
      });
    }

    if (content.testimonials.length > 0) {
      all.push({
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        itemReviewed: { "@id": `${SITE_URL}/#business` },
        ratingValue: 5,
        reviewCount: content.testimonials.length,
        bestRating: 5,
        worstRating: 1,
      });
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(all) }}
    />
  );
}
