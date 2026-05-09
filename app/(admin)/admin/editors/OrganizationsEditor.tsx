"use client";

import type { OrganizationsContent } from "@/lib/content";
import BilingualField from "../components/BilingualField";
import SectionPanel from "../components/SectionPanel";
import SortableList from "../components/SortableList";
import {
  AddButton,
  RemoveButton,
  newId,
} from "../components/AddRemoveControls";

const inputCls =
  "mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none text-sm";

type OutcomeItem = OrganizationsContent["outcomes"][number];
type PracticalItem = OrganizationsContent["practicalItems"][number];

export default function OrganizationsEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: OrganizationsContent;
  onChange: (v: OrganizationsContent) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  function setOutcomes(outcomes: OutcomeItem[]) {
    onChange({ ...data, outcomes });
  }
  function patchOutcome(id: string, patch: Partial<OutcomeItem>) {
    setOutcomes(
      data.outcomes.map((o) => (o.id === id ? { ...o, ...patch } : o))
    );
  }
  function addOutcome() {
    setOutcomes([
      ...data.outcomes,
      { id: newId("outcome"), text: { en: "", fr: "" } },
    ]);
  }
  function removeOutcome(id: string) {
    setOutcomes(data.outcomes.filter((o) => o.id !== id));
  }

  function setPractical(practicalItems: PracticalItem[]) {
    onChange({ ...data, practicalItems });
  }
  function patchPractical(id: string, patch: Partial<PracticalItem>) {
    setPractical(
      data.practicalItems.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  }
  function addPractical() {
    setPractical([
      ...data.practicalItems,
      { id: newId("practical"), text: { en: "", fr: "" } },
    ]);
  }
  function removePractical(id: string) {
    setPractical(data.practicalItems.filter((p) => p.id !== id));
  }

  return (
    <SectionPanel
      title="For organizations"
      description="Content for the /for-organizations landing page used to pitch schools, community centres, and youth groups."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      <BilingualField
        label="Intro paragraph"
        value={data.intro}
        onChange={(intro) => onChange({ ...data, intro })}
        multiline
        rows={4}
      />

      <div>
        <h3 className="font-heading text-xl uppercase tracking-wider mb-3">
          Participant outcomes
        </h3>
        <SortableList
          items={data.outcomes}
          onChange={setOutcomes}
          renderItem={(o) => (
            <div className="grid gap-3">
              <div className="flex justify-end">
                <RemoveButton onClick={() => removeOutcome(o.id)} />
              </div>
              <BilingualField
                label="Outcome"
                value={o.text}
                onChange={(text) => patchOutcome(o.id, { text })}
              />
            </div>
          )}
        />
        <div className="mt-3">
          <AddButton label="Add outcome" onClick={addOutcome} />
        </div>
      </div>

      <div>
        <h3 className="font-heading text-xl uppercase tracking-wider mb-3">
          How it works
        </h3>
        <SortableList
          items={data.practicalItems}
          onChange={setPractical}
          renderItem={(p) => (
            <div className="grid gap-3">
              <div className="flex justify-end">
                <RemoveButton onClick={() => removePractical(p.id)} />
              </div>
              <BilingualField
                label="Item"
                value={p.text}
                onChange={(text) => patchPractical(p.id, { text })}
              />
            </div>
          )}
        />
        <div className="mt-3">
          <AddButton label="Add item" onClick={addPractical} />
        </div>
      </div>

      <div>
        <h3 className="font-heading text-xl uppercase tracking-wider mb-3">
          Program-sheet PDF
        </h3>
        <p className="text-sm text-brand-black/60 mb-3">
          Paste a public URL for the program-sheet PDF in each language. Upload the
          PDFs to Cloudinary, Drive, Dropbox, or anywhere with a direct download link.
          Leave blank if not yet ready — the public page will say &ldquo;coming soon.&rdquo;
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="font-heading tracking-widest uppercase text-sm">
              English PDF URL
            </span>
            <input
              type="url"
              value={data.pdfUrl.en}
              onChange={(e) =>
                onChange({
                  ...data,
                  pdfUrl: { ...data.pdfUrl, en: e.target.value },
                })
              }
              placeholder="https://..."
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="font-heading tracking-widest uppercase text-sm">
              French PDF URL
            </span>
            <input
              type="url"
              value={data.pdfUrl.fr}
              onChange={(e) =>
                onChange({
                  ...data,
                  pdfUrl: { ...data.pdfUrl, fr: e.target.value },
                })
              }
              placeholder="https://..."
              className={inputCls}
            />
          </label>
        </div>
      </div>
    </SectionPanel>
  );
}
