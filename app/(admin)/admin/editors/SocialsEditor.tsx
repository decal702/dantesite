"use client";

import { useState } from "react";
import type { SocialLink } from "@/lib/content";
import SectionPanel from "../components/SectionPanel";
import SortableList from "../components/SortableList";
import {
  AddButton,
  RemoveButton,
} from "../components/AddRemoveControls";

type IdSocialLink = SocialLink & { id: string };

let counter = 0;
function nextId() {
  counter += 1;
  return `social-${Date.now().toString(36)}-${counter}`;
}

export default function SocialsEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: SocialLink[];
  onChange: (v: SocialLink[]) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  // Stable IDs are kept in component state, not derived from index, so
  // dnd-kit tracking and React keys remain consistent across reorders.
  const [items, setItems] = useState<IdSocialLink[]>(() =>
    data.map((s) => ({ ...s, id: nextId() }))
  );

  function syncOut(next: IdSocialLink[]) {
    setItems(next);
    onChange(next.map(({ id: _id, ...rest }) => rest));
  }

  function patch(id: string, p: Partial<IdSocialLink>) {
    syncOut(items.map((i) => (i.id === id ? { ...i, ...p } : i)));
  }
  function add() {
    syncOut([...items, { id: nextId(), platform: "", url: "" }]);
  }
  function remove(id: string) {
    syncOut(items.filter((i) => i.id !== id));
  }

  return (
    <SectionPanel
      title="Socials"
      description="Links to social media accounts shown in the Follow Us section."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      <SortableList
        items={items}
        onChange={syncOut}
        renderItem={(s) => (
          <div className="grid gap-3 sm:grid-cols-[1fr_2fr_auto] items-end">
            <label className="block">
              <span className="font-heading tracking-widest uppercase text-sm">
                Platform
              </span>
              <input
                type="text"
                value={s.platform}
                onChange={(e) => patch(s.id, { platform: e.target.value })}
                placeholder="instagram"
                className="mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none text-sm"
              />
            </label>
            <label className="block">
              <span className="font-heading tracking-widest uppercase text-sm">
                URL
              </span>
              <input
                type="url"
                value={s.url}
                onChange={(e) => patch(s.id, { url: e.target.value })}
                placeholder="https://instagram.com/graffiti101"
                className="mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none text-sm"
              />
            </label>
            <div className="sm:pb-2">
              <RemoveButton onClick={() => remove(s.id)} />
            </div>
          </div>
        )}
      />
      <div className="mt-3">
        <AddButton label="Add social link" onClick={add} />
      </div>
    </SectionPanel>
  );
}
