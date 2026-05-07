import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";

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
        <p className="font-heading text-brand-yellow tracking-widest uppercase text-sm">
          {ui.services.eyebrow[lang]}
        </p>
        <h2
          id="services-title"
          className="mt-2 font-heading text-4xl sm:text-6xl tracking-tight"
        >
          {ui.services.title[lang]}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-brand-yellow/80">
          {ui.services.intro[lang]}
        </p>

        {data.length > 0 && (
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((s) => (
              <li
                key={s.id}
                className="bg-brand-yellow text-brand-black p-6 flex flex-col"
              >
                <p className="font-heading text-2xl tracking-wide">
                  {s.name[lang]}
                </p>
                <p className="mt-3 text-base leading-relaxed">
                  {s.description[lang]}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
