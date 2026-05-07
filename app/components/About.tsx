import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";

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
      className="bg-brand-red text-brand-yellow py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="font-heading text-brand-black tracking-widest uppercase text-sm">
          {ui.about.eyebrow[lang]}
        </p>
        <h2
          id="about-title"
          className="mt-2 font-heading text-4xl sm:text-6xl tracking-tight"
        >
          {ui.about.title[lang]}
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-heading text-2xl uppercase tracking-wider text-brand-black">
              {ui.about.missionHeading[lang]}
            </h3>
            <p className="mt-3 text-lg leading-relaxed">{data.mission[lang]}</p>
          </div>
          <div>
            <h3 className="font-heading text-2xl uppercase tracking-wider text-brand-black">
              {ui.about.visionHeading[lang]}
            </h3>
            <p className="mt-3 text-lg leading-relaxed">{data.vision[lang]}</p>
          </div>
        </div>

        {data.team.length > 0 && (
          <div className="mt-16 text-center">
            <h3 className="font-heading text-3xl uppercase tracking-wider">
              {ui.about.teamHeading[lang]}
            </h3>
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              {data.team.map((m) => (
                <li
                  key={m.id}
                  className="bg-brand-yellow text-brand-black border border-brand-black/10 overflow-hidden text-left basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)] max-w-md"
                >
                  <div
                    className="relative aspect-square bg-brand-black/10 flex items-center justify-center"
                    aria-hidden
                  >
                    <span className="font-heading text-xs uppercase tracking-widest text-brand-black/40">
                      Image
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="font-heading text-2xl tracking-wide">{m.name}</p>
                    <p className="text-sm text-brand-red font-semibold uppercase tracking-wider mt-1">
                      {m.role[lang]}
                    </p>
                    <p className="mt-3 text-base leading-relaxed">{m.bio[lang]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.pastProjects.length > 0 && (
          <div className="mt-16">
            <h3 className="font-heading text-3xl uppercase tracking-wider">
              {ui.about.projectsHeading[lang]}
            </h3>
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.pastProjects.map((p) => (
                <li
                  key={p.id}
                  className="bg-brand-yellow text-brand-black border border-brand-black/10 overflow-hidden"
                >
                  <div
                    className="relative aspect-[4/3] bg-brand-black/10 flex items-center justify-center"
                    aria-hidden
                  >
                    <span className="font-heading text-xs uppercase tracking-widest text-brand-black/40">
                      Image
                    </span>
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
          </div>
        )}
      </div>
    </section>
  );
}
