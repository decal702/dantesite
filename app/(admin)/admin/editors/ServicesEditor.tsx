"use client";

import type { ServiceItem } from "@/lib/content";
import BilingualField from "../components/BilingualField";
import ImageField from "../components/ImageField";
import SectionPanel from "../components/SectionPanel";
import SortableList from "../components/SortableList";
import {
  AddButton,
  RemoveButton,
  newId,
} from "../components/AddRemoveControls";

export default function ServicesEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: ServiceItem[];
  onChange: (v: ServiceItem[]) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  function patch(id: string, patch: Partial<ServiceItem>) {
    onChange(data.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }
  function add() {
    onChange([
      ...data,
      {
        id: newId("svc"),
        name: { en: "", fr: "" },
        description: { en: "", fr: "" },
        price: "",
        image: "",
      },
    ]);
  }
  function remove(id: string) {
    onChange(data.filter((i) => i.id !== id));
  }

  return (
    <SectionPanel
      title="Services"
      description="Workshops and classes offered, with pricing."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      <SortableList
        items={data}
        onChange={onChange}
        renderItem={(item) => (
          <div className="grid gap-3">
            <div className="flex justify-end">
              <RemoveButton onClick={() => remove(item.id)} />
            </div>
            <BilingualField
              label="Name"
              value={item.name}
              onChange={(name) => patch(item.id, { name })}
            />
            <BilingualField
              label="Description"
              value={item.description}
              onChange={(description) => patch(item.id, { description })}
              multiline
            />
            <label className="block">
              <span className="font-heading tracking-widest uppercase text-sm">
                Price
              </span>
              <input
                type="text"
                value={item.price}
                onChange={(e) => patch(item.id, { price: e.target.value })}
                placeholder="$85 / person"
                className="mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none text-sm"
              />
            </label>
            <ImageField
              label="Image"
              hint="800 × 600px (4:3 landscape)"
              value={item.image}
              onChange={(image) => patch(item.id, { image })}
            />
            <label className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                checked={item.comingSoon ?? false}
                onChange={(e) =>
                  patch(item.id, { comingSoon: e.target.checked })
                }
                className="h-4 w-4 accent-brand-red"
              />
              <span className="font-heading tracking-widest uppercase text-sm">
                Coming soon
              </span>
              <span className="text-xs text-brand-black/60 normal-case tracking-normal ml-1">
                — shows a &ldquo;Coming soon&rdquo; badge on the public site and dims the card
              </span>
            </label>
          </div>
        )}
      />
      <div className="mt-3">
        <AddButton label="Add service" onClick={add} />
      </div>
    </SectionPanel>
  );
}
