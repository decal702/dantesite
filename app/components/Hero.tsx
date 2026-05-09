import type { Content, Lang } from "@/lib/content";
import SafeImage from "./SafeImage";

function highlightCity(text: string) {
  const parts = text.split(/(Montréal|Montreal)/);
  return parts.map((p, i) =>
    p === "Montréal" || p === "Montreal" ? (
      <span key={i} className="text-brand-red">
        {p}
      </span>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

export default function Hero({
  data,
  lang,
}: {
  data: Content["hero"];
  lang: Lang;
}) {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[calc(100dvh-4rem)] flex items-center"
    >
      <div className="absolute inset-0 -z-10 bg-brand-black">
        {data.backgroundImage && (
          <>
            <SafeImage
              src={data.backgroundImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-brand-black/85 via-brand-black/65 to-brand-black/35"
              aria-hidden
            />
          </>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
        <div className="max-w-3xl">
          <h1
            id="hero-title"
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-wider text-brand-yellow"
          >
            {highlightCity(data.title[lang])}
          </h1>
          <p className="mt-6 max-w-xl text-lg sm:text-xl text-brand-yellow/90">
            {data.tagline[lang]}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-brand-red text-brand-yellow font-semibold uppercase tracking-wider hover:bg-brand-orange transition-colors"
            >
              {data.ctaLabel[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
