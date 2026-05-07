import StoreCard from "./StoreCard";
import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";

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
      className="bg-brand-red text-brand-yellow py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="font-heading text-brand-black tracking-widest uppercase text-sm">
          {ui.store.eyebrow[lang]}
        </p>
        <h2
          id="store-title"
          className="mt-2 font-heading text-4xl sm:text-6xl tracking-tight"
        >
          {ui.store.title[lang]}
        </h2>
        <p className="mt-4 max-w-2xl text-lg">{ui.store.intro[lang]}</p>

        {data.length > 0 && (
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        )}
      </div>
    </section>
  );
}
