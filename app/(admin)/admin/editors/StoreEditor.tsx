"use client";

import type { StoreItem } from "@/lib/content";
import BilingualField from "../components/BilingualField";
import ImageField from "../components/ImageField";
import SectionPanel from "../components/SectionPanel";
import SortableList from "../components/SortableList";
import {
  AddButton,
  RemoveButton,
  newId,
} from "../components/AddRemoveControls";

export default function StoreEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: StoreItem[];
  onChange: (v: StoreItem[]) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  function patch(id: string, patch: Partial<StoreItem>) {
    onChange(data.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }
  function add() {
    onChange([
      ...data,
      {
        id: newId("store"),
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
      title="Store"
      description="Items for sale. Customers contact you to purchase."
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
                placeholder="$30"
                className="mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none text-sm"
              />
            </label>
            <ImageField
              label="Image"
              value={item.image}
              onChange={(image) => patch(item.id, { image })}
            />
          </div>
        )}
      />
      <div className="mt-3">
        <AddButton label="Add store item" onClick={add} />
      </div>
    </SectionPanel>
  );
}
