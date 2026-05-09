"use client";

export type SectionKey =
  | "hero"
  | "about"
  | "business"
  | "services"
  | "upcomingWorkshops"
  | "store"
  | "testimonials"
  | "faq"
  | "contact"
  | "socials"
  | "organizations"
  | "labels"
  | "footer";

type Group = {
  label: string;
  items: { key: SectionKey; label: string }[];
};

export const GROUPS: Group[] = [
  {
    label: "Identity",
    items: [
      { key: "hero", label: "Hero" },
      { key: "about", label: "About" },
      { key: "business", label: "Business info" },
    ],
  },
  {
    label: "Offerings",
    items: [
      { key: "services", label: "Services" },
      { key: "upcomingWorkshops", label: "Upcoming workshops" },
      { key: "store", label: "Store" },
    ],
  },
  {
    label: "Trust",
    items: [
      { key: "testimonials", label: "Testimonials" },
      { key: "faq", label: "FAQ" },
    ],
  },
  {
    label: "Reach",
    items: [
      { key: "contact", label: "Contact" },
      { key: "socials", label: "Socials" },
      { key: "organizations", label: "Organizations" },
      { key: "footer", label: "Footer" },
    ],
  },
  {
    label: "Site text",
    items: [{ key: "labels", label: "Section labels" }],
  },
];

export default function AdminSidebar({
  active,
  dirty,
  onSelect,
}: {
  active: SectionKey;
  dirty: Record<SectionKey, boolean>;
  onSelect: (key: SectionKey) => void;
}) {
  return (
    <>
      <nav
        aria-label="Admin sections"
        className="hidden lg:block sticky top-6 self-start w-60 shrink-0"
      >
        {GROUPS.map((group) => (
          <div key={group.label} className="mb-6 last:mb-0">
            <p className="font-heading text-xs uppercase tracking-widest text-brand-black/50 px-2">
              {group.label}
            </p>
            <ul className="mt-2">
              {group.items.map(({ key, label }) => {
                const isActive = active === key;
                const isDirty = dirty[key];
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => onSelect(key)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm border-l-2 transition-colors ${
                        isActive
                          ? "border-brand-red text-brand-black bg-brand-yellow/40 font-semibold"
                          : "border-transparent text-brand-black/70 hover:text-brand-black hover:bg-brand-black/5"
                      }`}
                    >
                      <span>{label}</span>
                      {isDirty && (
                        <span
                          aria-label="Unsaved changes"
                          title="Unsaved changes"
                          className="w-2 h-2 rounded-full bg-brand-red shrink-0"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="lg:hidden">
        <label className="block">
          <span className="font-heading tracking-widest uppercase text-xs text-brand-black/60">
            Section
          </span>
          <select
            value={active}
            onChange={(e) => onSelect(e.target.value as SectionKey)}
            className="mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none"
          >
            {GROUPS.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.items.map(({ key, label }) => (
                  <option key={key} value={key}>
                    {dirty[key] ? `• ${label}` : label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>
    </>
  );
}
