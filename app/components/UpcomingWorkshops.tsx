"use client";

import type { Content, Lang, ServiceItem } from "@/lib/content";
import Reveal from "./Reveal";

const ui = {
  eyebrow: { en: "Schedule", fr: "Calendrier" },
  title: { en: "Upcoming workshops", fr: "Ateliers à venir" },
  empty: {
    en: "No dates posted right now — message us to be notified when the next round opens.",
    fr: "Aucune date pour l'instant — écrivez-nous pour être avisé de la prochaine ronde.",
  },
  reserve: { en: "Reserve a spot", fr: "Réserver une place" },
  inquiryPrefix: { en: "Workshop reservation", fr: "Réservation atelier" },
} as const;

function formatDate(iso: string, lang: Lang): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function todayIsoLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function UpcomingWorkshops({
  data,
  services,
  lang,
}: {
  data: Content["upcomingWorkshops"];
  services: ServiceItem[];
  lang: Lang;
}) {
  if (!data) return null;

  const today = todayIsoLocal();
  const upcoming = data
    .filter((w) => w.date >= today)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  if (upcoming.length === 0) return null;

  function handleReserve(serviceId: string, date: string) {
    const svc = services.find((s) => s.id === serviceId);
    const name = svc ? svc.name[lang] : "";
    const formatted = formatDate(date, lang);
    const subject = name
      ? `${ui.inquiryPrefix[lang]}: ${name} · ${formatted}`
      : `${ui.inquiryPrefix[lang]}: ${formatted}`;
    window.dispatchEvent(
      new CustomEvent("g101:prefill-contact", { detail: { subject } })
    );
    const target = document.getElementById("contact");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-title"
      className="bg-brand-cream text-brand-black py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="font-heading text-brand-red tracking-widest uppercase text-sm">
            {ui.eyebrow[lang]}
          </p>
          <h2
            id="schedule-title"
            className="mt-2 font-heading text-3xl sm:text-5xl tracking-tight"
          >
            {ui.title[lang]}
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-brand-red" aria-hidden />
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((w) => {
              const svc = services.find((s) => s.id === w.serviceId);
              const serviceName = svc ? svc.name[lang] : "";
              return (
                <li
                  key={w.id}
                  className="relative bg-white text-brand-black border border-brand-black/15 p-6 flex flex-col"
                >
                  <span
                    className="absolute top-0 left-0 z-10 w-3 h-3 bg-brand-red"
                    aria-hidden
                  />
                  <p className="font-heading text-2xl tracking-wide text-brand-red">
                    {formatDate(w.date, lang)}
                  </p>
                  {w.time && (
                    <p className="text-sm text-brand-black/70 mt-1">{w.time}</p>
                  )}
                  {serviceName && (
                    <p className="font-heading text-lg tracking-wide mt-3">
                      {serviceName}
                    </p>
                  )}
                  <p className="text-sm text-brand-black/70 mt-1">
                    {w.location[lang]}
                  </p>
                  {w.note && (w.note.en || w.note.fr) && (
                    <p className="text-sm text-brand-red font-semibold mt-2">
                      {w.note[lang]}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => handleReserve(w.serviceId, w.date)}
                    className="mt-5 inline-flex items-center justify-center px-4 py-2 bg-brand-black text-brand-yellow font-semibold uppercase tracking-wider text-sm hover:bg-brand-red transition-colors"
                  >
                    {ui.reserve[lang]}
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
