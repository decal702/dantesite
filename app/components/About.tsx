import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";

export default function About({
  data,
  lang,
}: {
  data: Content["about"];
  lang: Lang;
}) {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-brand-cream text-brand-black py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="font-heading text-brand-red tracking-widest uppercase text-sm">
            {ui.about.eyebrow[lang]}
          </p>
          <h2
            id="about-title"
            className="mt-2 font-heading text-3xl sm:text-5xl tracking-tight"
          >
            {ui.about.title[lang]}
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-brand-red" aria-hidden />
        </Reveal>

        <Reveal delay={100} className="mt-10 grid md:grid-cols-2 gap-6">
          <article className="bg-brand-black text-brand-yellow border border-brand-black/10 flex flex-col">
            <h3 className="bg-brand-yellow text-brand-black font-heading text-sm uppercase tracking-widest px-5 py-2 border-b border-brand-black">
              {ui.about.missionHeading[lang]}
            </h3>
            <p className="p-5 sm:p-6 text-lg leading-relaxed">
              {data.mission[lang]}
            </p>
          </article>
          <article className="bg-brand-black text-brand-yellow border border-brand-black/10 flex flex-col">
            <h3 className="bg-brand-yellow text-brand-black font-heading text-sm uppercase tracking-widest px-5 py-2 border-b border-brand-black">
              {ui.about.visionHeading[lang]}
            </h3>
            <p className="p-5 sm:p-6 text-lg leading-relaxed">
              {data.vision[lang]}
            </p>
          </article>
        </Reveal>

        {data.team.length > 0 && (
          <Reveal delay={150} className="mt-16">
            <h3 className="font-heading text-2xl sm:text-3xl tracking-tight">
              {ui.about.teamHeading[lang]}
            </h3>
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              {data.team.map((m) => (
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
                    <p className="font-heading text-2xl tracking-wide">{m.name}</p>
                    <p className="text-sm text-brand-red font-semibold mt-1">
                      {m.role[lang]}
                    </p>
                    <p className="mt-3 text-base leading-relaxed">{m.bio[lang]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {data.pastProjects.length > 0 && (
          <Reveal delay={150} className="mt-16">
            <h3 className="font-heading text-2xl sm:text-3xl tracking-tight">
              {ui.about.projectsHeading[lang]}
            </h3>
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.pastProjects.map((p) => (
                <li
                  key={p.id}
                  className="group relative bg-white text-brand-black border border-brand-black/15 overflow-hidden flex flex-col"
                >
                  <span
                    className="absolute top-0 left-0 z-10 w-3 h-3 bg-brand-red"
                    aria-hidden
                  />
                  <div className="relative aspect-[4/3] bg-brand-black/5 overflow-hidden">
                    <SafeImage
                      src={p.image}
                      alt={p.title[lang]}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      placeholderClassName="absolute inset-0"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-heading text-xl tracking-wide">
                      {p.title[lang]}
                    </p>
                    <p className="mt-2 text-base leading-relaxed">
                      {p.description[lang]}
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
