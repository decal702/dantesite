"use client";

import type { ReactNode } from "react";

export default function SectionPanel({
  title,
  description,
  saving,
  disabled,
  onSave,
  children,
}: {
  title: string;
  description?: string;
  saving?: boolean;
  disabled?: boolean;
  onSave: () => void;
  children: ReactNode;
}) {
  return (
    <section className="bg-brand-beige border border-brand-black/10 p-6 sm:p-8">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-heading text-2xl tracking-wider uppercase">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-brand-black/60 mt-1">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={saving || disabled}
          className="px-4 py-2 bg-brand-red text-brand-beige uppercase tracking-wider text-sm font-semibold hover:bg-brand-orange transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </header>
      <div className="mt-6 grid gap-6">{children}</div>
    </section>
  );
}
