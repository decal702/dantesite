"use client";

import type {
  Bilingual,
  Labels,
  SectionLabelKey,
} from "@/lib/content";
import BilingualField from "../components/BilingualField";
import SectionPanel from "../components/SectionPanel";

type LabelKey =
  | "eyebrow"
  | "title"
  | "intro"
  | "missionHeading"
  | "visionHeading"
  | "teamHeading"
  | "projectsHeading"
  | "empty";

const SECTION_DESCRIPTORS: Array<{
  key: SectionLabelKey;
  label: string;
  fields: LabelKey[];
}> = [
  {
    key: "about",
    label: "About section",
    fields: [
      "eyebrow",
      "title",
      "missionHeading",
      "visionHeading",
      "teamHeading",
      "projectsHeading",
    ],
  },
  {
    key: "services",
    label: "Services section",
    fields: ["eyebrow", "title", "intro"],
  },
  { key: "store", label: "Store section", fields: ["title"] },
  {
    key: "testimonials",
    label: "Reviews section",
    fields: ["title", "empty"],
  },
  {
    key: "faq",
    label: "FAQ section",
    fields: ["eyebrow", "title", "intro"],
  },
  {
    key: "socials",
    label: "Socials section",
    fields: ["eyebrow", "title", "intro"],
  },
  { key: "contact", label: "Contact section", fields: ["eyebrow", "title"] },
  {
    key: "organizations",
    label: "For-organizations page",
    fields: ["eyebrow", "title"],
  },
];

const FIELD_LABELS: Record<LabelKey, string> = {
  eyebrow: "Eyebrow (small caps above the title)",
  title: "Section title",
  intro: "Intro paragraph",
  missionHeading: "Mission heading",
  visionHeading: "Vision heading",
  teamHeading: "Team heading",
  projectsHeading: "Past projects heading",
  empty: "Empty-state message (shown when no entries exist)",
};

const EMPTY_BILINGUAL: Bilingual = { en: "", fr: "" };

export default function LabelsEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: Labels;
  onChange: (v: Labels) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  function patchField(
    sectionKey: SectionLabelKey,
    field: LabelKey,
    value: Bilingual
  ) {
    const next = { ...data[sectionKey], [field]: value };
    onChange({ ...data, [sectionKey]: next } as Labels);
  }

  return (
    <SectionPanel
      title="Section labels"
      description="Eyebrow, title, and intro text shown above each section's content. Empty fields render nothing on the public site."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      <div className="grid gap-8">
        {SECTION_DESCRIPTORS.map((descriptor) => (
          <div
            key={descriptor.key}
            className="grid gap-3 border-l-2 border-brand-black/10 pl-5"
          >
            <h3 className="font-heading text-lg uppercase tracking-widest">
              {descriptor.label}
            </h3>
            {descriptor.fields.map((field) => {
              const sectionData = data[descriptor.key] as Record<
                LabelKey,
                Bilingual | undefined
              >;
              return (
                <BilingualField
                  key={field}
                  label={FIELD_LABELS[field]}
                  value={sectionData[field] ?? EMPTY_BILINGUAL}
                  onChange={(value) =>
                    patchField(descriptor.key, field, value)
                  }
                  multiline={field === "intro"}
                  rows={field === "intro" ? 3 : undefined}
                />
              );
            })}
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}
