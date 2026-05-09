import StoreCard from "./StoreCard";
import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Store({
  data,
  lang,
}: {
  data: Content["store"];
  lang: Lang;
}) {
  return (
    <section
      id="store"
      aria-labelledby="store-title"
      className="bg-brand-cream text-brand-black py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <h2
            id="store-title"
            className="font-sans text-3xl sm:text-5xl tracking-tight"
          >
            {ui.store.eyebrow[lang]}
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-brand-red" aria-hidden />
        </Reveal>

        {data.length > 0 && (
          <Reveal delay={100} className="mt-12">
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((p) => (
                <StoreCard
                  key={p.id}
                  name={p.name[lang]}
                  description={p.description[lang]}
                  price={p.price}
                  image={p.image}
                  buttonLabel={ui.store.contactToPurchase[lang]}
                  inquiryPrefix={ui.store.inquiryPrefix[lang]}
                />
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
