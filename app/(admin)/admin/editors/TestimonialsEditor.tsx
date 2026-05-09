"use client";

import type { Testimonial } from "@/lib/content";
import BilingualField from "../components/BilingualField";
import SectionPanel from "../components/SectionPanel";
import SortableList from "../components/SortableList";
import {
  AddButton,
  RemoveButton,
  newId,
} from "../components/AddRemoveControls";

export default function TestimonialsEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: Testimonial[];
  onChange: (v: Testimonial[]) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  function patch(id: string, patch: Partial<Testimonial>) {
    onChange(data.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }
  function add() {
    onChange([
      ...data,
      {
        id: newId("rev"),
        quote: { en: "", fr: "" },
        author: "",
        role: { en: "", fr: "" },
      },
    ]);
  }
  function remove(id: string) {
    onChange(data.filter((t) => t.id !== id));
  }

  return (
    <SectionPanel
      title="Reviews"
      description="What past participants and clients have said. Add, remove, or reorder."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      <SortableList
        items={data}
        onChange={onChange}
        renderItem={(t) => (
          <div className="grid gap-3">
            <div className="flex justify-end">
              <RemoveButton onClick={() => remove(t.id)} />
            </div>
            <BilingualField
              label="Quote"
              value={t.quote}
              onChange={(quote) => patch(t.id, { quote })}
              multiline
              rows={4}
            />
            <label className="block">
              <span className="font-heading tracking-widest uppercase text-sm">
                Author
              </span>
              <input
                type="text"
                value={t.author}
                onChange={(e) => patch(t.id, { author: e.target.value })}
                placeholder="Sam L."
                className="mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none text-sm"
              />
            </label>
            <BilingualField
              label="Role / context (optional)"
              value={t.role ?? { en: "", fr: "" }}
              onChange={(role) => patch(t.id, { role })}
            />
          </div>
        )}
      />
      <div className="mt-3">
        <AddButton label="Add review" onClick={add} />
      </div>
    </SectionPanel>
  );
}
