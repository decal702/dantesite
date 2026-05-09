import type { Content, Lang } from "@/lib/content";
import Reveal from "./Reveal";

export default function Testimonials({
  data,
  labels,
  lang,
}: {
  data: Content["testimonials"];
  labels: Content["labels"]["testimonials"];
  lang: Lang;
}) {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-brand-cream text-brand-black py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <h2
            id="testimonials-title"
            className="font-sans text-3xl sm:text-5xl tracking-tight"
          >
            {labels.title?.[lang] ?? ""}
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-brand-red" aria-hidden />
        </Reveal>

        {data.length === 0 ? (
          <p className="mt-6 text-lg text-brand-black/70">
            {labels.empty?.[lang] ?? ""}
          </p>
        ) : (
          <Reveal delay={100} className="mt-10">
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((t) => (
              <li
                key={t.id}
                className="relative bg-white text-brand-black border border-brand-black/15 p-6 flex flex-col"
              >
                <span
                  className="absolute top-0 left-0 z-10 w-3 h-3 bg-brand-red"
                  aria-hidden
                />
                <blockquote className="flex-1">
                  <p className="text-lg leading-relaxed">
                    <span aria-hidden className="text-brand-red font-sans text-2xl mr-1">
                      &ldquo;
                    </span>
                    {t.quote[lang]}
                    <span aria-hidden className="text-brand-red font-sans text-2xl ml-1">
                      &rdquo;
                    </span>
                  </p>
                </blockquote>
                <footer className="mt-4 border-t border-brand-black/10 pt-3">
                  <p className="font-sans text-lg tracking-wide">
                    {t.author}
                  </p>
                  {t.role && (
                    <p className="text-sm text-brand-black/60 mt-0.5">
                      {t.role[lang]}
                    </p>
                  )}
                </footer>
              </li>
            ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
