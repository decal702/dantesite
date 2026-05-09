import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";
import Link from "next/link";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";

export default function Team({
  data,
  lang,
}: {
  data: Content["about"]["team"];
  lang: Lang;
}) {
  if (data.length === 0) return null;

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="bg-brand-cream text-brand-black py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="font-heading text-brand-red tracking-widest uppercase text-sm">
            {ui.about.eyebrow[lang]}
          </p>
          <h2
            id="team-title"
            className="mt-2 font-sans text-3xl sm:text-5xl tracking-tight"
          >
            {ui.about.teamHeading[lang]}
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-brand-red" aria-hidden />
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-10 flex flex-wrap justify-center gap-6">
            {data.map((m) => (
              <li
                key={m.id}
                className="group relative bg-white text-brand-black border border-brand-black/15 overflow-hidden flex flex-col basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)] max-w-md"
              >
                <span
                  className="absolute top-0 left-0 z-10 w-3 h-3 bg-brand-red"
                  aria-hidden
                />
                <div className="relative aspect-square bg-brand-black/5 overflow-hidden">
                  <SafeImage
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    placeholderClassName="absolute inset-0"
                  />
                </div>
                <div className="p-5">
                  <p className="font-sans text-2xl tracking-wide">{m.name}</p>
                  <p className="text-sm text-brand-red font-semibold mt-1">
                    {m.role[lang]}
                  </p>
                  <p className="mt-3 text-base leading-relaxed">{m.bio[lang]}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="mt-10 text-center">
          <Link
            href={`/${lang}/about`}
            className="inline-flex items-center px-6 py-3 bg-brand-black text-brand-yellow font-semibold uppercase tracking-wider text-sm hover:bg-brand-red transition-colors"
          >
            {lang === "fr" ? "En savoir plus sur nous" : "More about us"}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
