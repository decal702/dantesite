import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";

export default function Footer({
  data,
  lang,
}: {
  data: Content["footer"];
  lang: Lang;
}) {
  return (
    <footer className="bg-brand-black text-brand-yellow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="font-display text-3xl tracking-widest">
            GRAFFITI <span className="text-brand-red">101</span>
          </p>
          <p className="mt-2 text-brand-yellow/70">{data.tagline[lang]}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-sm text-brand-yellow/60">
            © {new Date().getFullYear()} Graffiti 101 · Montreal
          </p>
          <a
            href="/admin"
            className="mt-3 inline-block px-5 py-2 border border-brand-yellow/30 text-brand-yellow uppercase tracking-wider text-sm font-semibold hover:bg-brand-yellow hover:text-brand-black transition-colors"
          >
            {ui.footer.admin[lang]}
          </a>
        </div>
      </div>
    </footer>
  );
}
