import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";

export default function Services({
  data,
  lang,
}: {
  data: Content["services"];
  lang: Lang;
}) {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-brand-black text-brand-yellow py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="font-heading text-brand-yellow tracking-widest uppercase text-sm">
            {ui.services.eyebrow[lang]}
          </p>
          <h2
            id="services-title"
            className="mt-2 font-sans text-3xl sm:text-5xl tracking-tight"
          >
            {ui.services.title[lang]}
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-brand-red" aria-hidden />
          <p className="mt-6 max-w-2xl text-lg text-brand-yellow/80">
            {ui.services.intro[lang]}
          </p>
        </Reveal>

        {data.length > 0 && (
          <Reveal delay={100} className="mt-12">
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((s) => (
              <li
                key={s.id}
                className={`group relative bg-brand-yellow text-brand-black flex flex-col overflow-hidden ${
                  s.comingSoon ? "opacity-75" : ""
                }`}
              >
                {s.comingSoon && (
                  <span className="absolute top-3 right-3 z-10 bg-brand-red text-brand-yellow font-sans text-xs uppercase tracking-widest px-3 py-1">
                    {ui.services.comingSoon[lang]}
                  </span>
                )}
                <div className="relative aspect-[4/3] bg-brand-black/10 overflow-hidden">
                  <SafeImage
                    src={s.image}
                    alt={s.name[lang]}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    placeholderClassName="absolute inset-0"
                  />
                </div>
                <div className="p-6 flex flex-col">
                  <p className="font-sans text-2xl tracking-wide">
                    {s.name[lang]}
                  </p>
                  <p className="mt-3 text-base leading-relaxed">
                    {s.description[lang]}
                  </p>
                </div>
              </li>
            ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
