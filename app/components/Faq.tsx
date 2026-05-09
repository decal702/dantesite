import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";

export default function Faq({
  data,
  lang,
}: {
  data: Content["faq"];
  lang: Lang;
}) {
  if (data.length === 0) return null;

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-brand-cream text-brand-black py-20 sm:py-28"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="font-heading text-brand-red tracking-widest uppercase text-sm">
          {ui.faq.eyebrow[lang]}
        </p>
        <h2
          id="faq-title"
          className="mt-2 font-sans text-3xl sm:text-5xl tracking-tight"
        >
          {ui.faq.title[lang]}
        </h2>
        <div className="mt-4 h-0.5 w-12 bg-brand-red" aria-hidden />
        <p className="mt-6 text-lg text-brand-black/80">{ui.faq.intro[lang]}</p>

        <ul className="mt-10 grid gap-3">
          {data.map((q) => (
            <li
              key={q.id}
              className="bg-white border border-brand-black/15 overflow-hidden"
            >
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 sm:p-6 font-sans text-lg sm:text-xl tracking-wide hover:bg-brand-black/5 transition-colors">
                  <span>{q.question[lang]}</span>
                  <span
                    className="text-brand-red text-2xl leading-none transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-base leading-relaxed text-brand-black/85">
                  {q.answer[lang]}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
