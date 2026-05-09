"use client";

import type { BusinessInfo } from "@/lib/content";
import SectionPanel from "../components/SectionPanel";
import {
  AddButton,
  RemoveButton,
} from "../components/AddRemoveControls";

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="font-heading tracking-widest uppercase text-sm">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none text-sm"
      />
      {hint && (
        <span className="block mt-1 text-xs text-brand-black/60">{hint}</span>
      )}
    </label>
  );
}

export default function BusinessInfoEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: BusinessInfo;
  onChange: (v: BusinessInfo) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  function patch(p: Partial<BusinessInfo>) {
    onChange({ ...data, ...p });
  }

  function setHour(idx: number, value: string) {
    const next = data.openingHours.slice();
    next[idx] = value;
    patch({ openingHours: next });
  }
  function addHour() {
    patch({ openingHours: [...data.openingHours, ""] });
  }
  function removeHour(idx: number) {
    patch({ openingHours: data.openingHours.filter((_, i) => i !== idx) });
  }

  return (
    <SectionPanel
      title="Business info (SEO)"
      description="Powers the LocalBusiness data Google uses for Maps, 'near me' searches, and AI agent results. Filling this out completely is one of the highest-leverage SEO moves."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <TextInput
          label="Legal name"
          value={data.legalName}
          onChange={(legalName) => patch({ legalName })}
          placeholder="Graffiti 101"
        />
        <TextInput
          label="Telephone"
          value={data.telephone}
          onChange={(telephone) => patch({ telephone })}
          placeholder="+1-514-555-1234"
          hint="International format (with +country code) gets parsed correctly by Google."
          type="tel"
        />
        <TextInput
          label="Street address"
          value={data.streetAddress}
          onChange={(streetAddress) => patch({ streetAddress })}
          placeholder="123 Rue Saint-Laurent"
        />
        <TextInput
          label="City"
          value={data.addressLocality}
          onChange={(addressLocality) => patch({ addressLocality })}
          placeholder="Montreal"
        />
        <TextInput
          label="Province / region"
          value={data.addressRegion}
          onChange={(addressRegion) => patch({ addressRegion })}
          placeholder="QC"
        />
        <TextInput
          label="Postal code"
          value={data.postalCode}
          onChange={(postalCode) => patch({ postalCode })}
          placeholder="H2J 1A1"
        />
        <TextInput
          label="Country code"
          value={data.addressCountry}
          onChange={(addressCountry) => patch({ addressCountry })}
          placeholder="CA"
          hint="ISO country code (CA, US, FR…)."
        />
        <TextInput
          label="Price range"
          value={data.priceRange}
          onChange={(priceRange) => patch({ priceRange })}
          placeholder="$$"
          hint="Use $, $$, $$$, or $$$$ — same shorthand as Google Maps."
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <TextInput
          label="Latitude"
          value={String(data.geo.lat)}
          onChange={(v) =>
            patch({ geo: { ...data.geo, lat: Number(v) || 0 } })
          }
          placeholder="45.5231"
          hint="Get from Google Maps: right-click the location pin → click coords to copy."
        />
        <TextInput
          label="Longitude"
          value={String(data.geo.lng)}
          onChange={(v) =>
            patch({ geo: { ...data.geo, lng: Number(v) || 0 } })
          }
          placeholder="-73.5817"
        />
      </div>

      <div className="mt-6">
        <p className="font-heading tracking-widest uppercase text-sm">
          Opening hours
        </p>
        <p className="text-xs text-brand-black/60 mt-1">
          Schema.org format. Examples:{" "}
          <code className="bg-brand-black/5 px-1">Mo-Fr 09:00-18:00</code>,{" "}
          <code className="bg-brand-black/5 px-1">Sa 11:00-17:00</code>,{" "}
          <code className="bg-brand-black/5 px-1">Su closed</code>.
        </p>
        <ul className="mt-3 grid gap-2">
          {data.openingHours.map((h, i) => (
            <li key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={h}
                onChange={(e) => setHour(i, e.target.value)}
                placeholder="Mo-Fr 10:00-18:00"
                className="flex-1 bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none text-sm"
              />
              <RemoveButton onClick={() => removeHour(i)} />
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <AddButton label="Add hours line" onClick={addHour} />
        </div>
      </div>
    </SectionPanel>
  );
}
