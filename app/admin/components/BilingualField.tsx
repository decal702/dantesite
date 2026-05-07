"use client";

import type { Bilingual } from "@/lib/content";

const inputCls =
  "mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none text-sm";

export default function BilingualField({
  label,
  value,
  onChange,
  multiline,
  rows,
}: {
  label: string;
  value: Bilingual;
  onChange: (v: Bilingual) => void;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="font-heading tracking-widest uppercase text-sm">
        {label}
      </legend>
      <div className="grid sm:grid-cols-2 gap-3 mt-1">
        {(["en", "fr"] as const).map((code) => (
          <label key={code} className="block">
            <span className="text-xs uppercase tracking-wider text-brand-black/60">
              {code.toUpperCase()}
            </span>
            {multiline ? (
              <textarea
                rows={rows ?? 3}
                value={value[code]}
                onChange={(e) => onChange({ ...value, [code]: e.target.value })}
                className={inputCls}
              />
            ) : (
              <input
                type="text"
                value={value[code]}
                onChange={(e) => onChange({ ...value, [code]: e.target.value })}
                className={inputCls}
              />
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
