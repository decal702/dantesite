"use client";

import type { Content } from "@/lib/content";
import BilingualField from "../components/BilingualField";
import ImageField from "../components/ImageField";
import SectionPanel from "../components/SectionPanel";

export default function HeroEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: Content["hero"];
  onChange: (v: Content["hero"]) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  return (
    <SectionPanel
      title="Hero"
      description="Top of the homepage — site title, tagline, and primary call-to-action."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      <BilingualField
        label="Title"
        value={data.title}
        onChange={(title) => onChange({ ...data, title })}
      />
      <BilingualField
        label="Tagline"
        value={data.tagline}
        onChange={(tagline) => onChange({ ...data, tagline })}
        multiline
        rows={3}
      />
      <BilingualField
        label="CTA button label"
        value={data.ctaLabel}
        onChange={(ctaLabel) => onChange({ ...data, ctaLabel })}
      />
      <ImageField
        label="Background image"
        hint="1920 × 1080px (16:9 landscape) — full-bleed behind the hero text"
        value={data.backgroundImage}
        onChange={(backgroundImage) => onChange({ ...data, backgroundImage })}
      />
    </SectionPanel>
  );
}
