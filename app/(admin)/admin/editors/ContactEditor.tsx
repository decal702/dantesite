"use client";

import type { Content } from "@/lib/content";
import BilingualField from "../components/BilingualField";
import SectionPanel from "../components/SectionPanel";

export default function ContactEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: Content["contact"];
  onChange: (v: Content["contact"]) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  return (
    <SectionPanel
      title="Contact"
      description="Intro text on the contact section, plus the email address that receives messages from the form."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      <BilingualField
        label="Intro"
        value={data.intro}
        onChange={(intro) => onChange({ ...data, intro })}
        multiline
        rows={3}
      />
      <label className="block">
        <span className="font-heading tracking-widest uppercase text-sm">
          Recipient email
        </span>
        <input
          type="email"
          value={data.recipientEmail}
          onChange={(e) =>
            onChange({ ...data, recipientEmail: e.target.value })
          }
          className="mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none text-sm"
        />
        <span className="block mt-1 text-xs text-brand-black/60">
          Form submissions go here. Saving updates immediately for new
          submissions.
        </span>
      </label>
    </SectionPanel>
  );
}
