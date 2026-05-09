"use client";

import type { ServiceItem, UpcomingWorkshop } from "@/lib/content";
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

export default function UpcomingWorkshopsEditor({
  data,
  services,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: UpcomingWorkshop[];
  services: ServiceItem[];
  onChange: (v: UpcomingWorkshop[]) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  function patch(id: string, p: Partial<UpcomingWorkshop>) {
    onChange(data.map((i) => (i.id === id ? { ...i, ...p } : i)));
  }
  function add() {
    onChange([
      ...data,
      {
        id: newId("ws"),
        serviceId: services[0]?.id ?? "",
        date: "",
        time: "",
        location: { en: "", fr: "" },
        note: { en: "", fr: "" },
      },
    ]);
  }
  function remove(id: string) {
    onChange(data.filter((i) => i.id !== id));
  }

  return (
    <SectionPanel
      title="Upcoming workshops"
      description="Specific dates for a service. Past dates are auto-hidden on the public site."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      {services.length === 0 && (
        <p className="text-sm text-brand-red">
          Add at least one entry under Services first — workshops link to a service.
        </p>
      )}
      <SortableList
        items={data}
        onChange={onChange}
        renderItem={(item) => (
          <div className="grid gap-3">
            <div className="flex justify-end">
              <RemoveButton onClick={() => remove(item.id)} />
            </div>

            <label className="block">
              <span className="font-heading tracking-widest uppercase text-sm">
                Service
              </span>
              <select
                value={item.serviceId}
                onChange={(e) => patch(item.id, { serviceId: e.target.value })}
                className={inputCls}
              >
                <option value="">— select a service —</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name.en || s.id}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="font-heading tracking-widest uppercase text-sm">
                  Date
                </span>
                <input
                  type="date"
                  value={item.date}
                  onChange={(e) => patch(item.id, { date: e.target.value })}
                  className={inputCls}
                />
              </label>
              <label className="block">
                <span className="font-heading tracking-widest uppercase text-sm">
                  Time (optional)
                </span>
                <input
                  type="text"
                  value={item.time ?? ""}
                  placeholder="7:00 PM"
                  onChange={(e) => patch(item.id, { time: e.target.value })}
                  className={inputCls}
                />
              </label>
            </div>

            <BilingualField
              label="Location"
              value={item.location}
              onChange={(location) => patch(item.id, { location })}
            />
            <BilingualField
              label="Note (optional, e.g. 'Few spots left')"
              value={item.note ?? { en: "", fr: "" }}
              onChange={(note) => patch(item.id, { note })}
            />
          </div>
        )}
      />
      <div className="mt-3">
        <AddButton label="Add workshop date" onClick={add} />
      </div>
    </SectionPanel>
  );
}
