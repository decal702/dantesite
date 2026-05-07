"use client";

import type { Content } from "@/lib/content";
import BilingualField from "../components/BilingualField";
import SectionPanel from "../components/SectionPanel";

export default function FooterEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: Content["footer"];
  onChange: (v: Content["footer"]) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  return (
    <SectionPanel
      title="Footer"
      description="Text shown in the footer at the bottom of every page."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      <BilingualField
        label="Tagline"
        value={data.tagline}
        onChange={(tagline) => onChange({ ...data, tagline })}
      />
    </SectionPanel>
  );
}
