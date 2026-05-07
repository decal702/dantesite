import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";

export default function Testimonials({
  data,
  lang,
}: {
  data: Content["testimonials"];
  lang: Lang;
}) {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-brand-black text-brand-yellow py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="font-heading text-brand-yellow tracking-widest uppercase text-sm">
          {ui.testimonials.eyebrow[lang]}
        </p>
        <h2
          id="testimonials-title"
          className="mt-2 font-heading text-4xl sm:text-6xl tracking-tight"
        >
          {ui.testimonials.title[lang]}
        </h2>

        {data.length === 0 ? (
          <p className="mt-6 text-lg text-brand-yellow/70">
            {ui.testimonials.empty[lang]}
          </p>
        ) : (
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((t) => (
              <li
                key={t.id}
                className="bg-brand-yellow text-brand-black border border-brand-black/10 p-6 flex flex-col"
              >
                <blockquote className="flex-1">
                  <p className="text-lg leading-relaxed">
                    <span aria-hidden className="text-brand-red font-heading text-2xl mr-1">
                      &ldquo;
                    </span>
                    {t.quote[lang]}
                    <span aria-hidden className="text-brand-red font-heading text-2xl ml-1">
                      &rdquo;
                    </span>
                  </p>
                </blockquote>
                <footer className="mt-4 border-t border-brand-black/10 pt-3">
                  <p className="font-heading text-lg tracking-wide">
                    {t.author}
                  </p>
                  {t.role && (
                    <p className="text-sm text-brand-black/60 uppercase tracking-wider mt-0.5">
                      {t.role[lang]}
                    </p>
                  )}
                </footer>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
