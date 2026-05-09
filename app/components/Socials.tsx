import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Socials({
  data,
  lang,
}: {
  data: Content["socials"];
  lang: Lang;
}) {
  if (data.length === 0) return null;

  return (
    <section
      id="socials"
      aria-labelledby="socials-title"
      className="py-16 sm:py-20"
    >
      <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-heading text-brand-red tracking-widest uppercase text-sm">
          {ui.socials.eyebrow[lang]}
        </p>
        <h2
          id="socials-title"
          className="mt-2 font-heading text-2xl sm:text-4xl tracking-tight"
        >
          {ui.socials.title[lang]}
        </h2>
        <div className="mt-4 h-0.5 w-12 bg-brand-red mx-auto" aria-hidden />
        <p className="mt-6 max-w-xl mx-auto text-base">
          {ui.socials.intro[lang]}
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {data.map((s) => (
            <li key={`${s.platform}-${s.url}`}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 bg-brand-black text-brand-beige font-semibold uppercase tracking-wider hover:bg-brand-red transition-colors capitalize"
              >
                {s.platform}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
