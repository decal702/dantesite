"use client";

import type { FaqItem } from "@/lib/content";
import BilingualField from "../components/BilingualField";
import SectionPanel from "../components/SectionPanel";
import SortableList from "../components/SortableList";
import {
  AddButton,
  RemoveButton,
  newId,
} from "../components/AddRemoveControls";

export default function FaqEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: FaqItem[];
  onChange: (v: FaqItem[]) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  function patch(id: string, patch: Partial<FaqItem>) {
    onChange(data.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  }
  function add() {
    onChange([
      ...data,
      {
        id: newId("faq"),
        question: { en: "", fr: "" },
        answer: { en: "", fr: "" },
      },
    ]);
  }
  function remove(id: string) {
    onChange(data.filter((q) => q.id !== id));
  }

  return (
    <SectionPanel
      title="FAQ"
      description="Questions and answers shown on the homepage. Each entry is also published as Schema.org FAQPage data — Google can surface them in 'People also ask' boxes, and AI agents quote them when answering questions about workshops."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      <SortableList
        items={data}
        onChange={onChange}
        renderItem={(q) => (
          <div className="grid gap-3">
            <div className="flex justify-end">
              <RemoveButton onClick={() => remove(q.id)} />
            </div>
            <BilingualField
              label="Question"
              value={q.question}
              onChange={(question) => patch(q.id, { question })}
            />
            <BilingualField
              label="Answer"
              value={q.answer}
              onChange={(answer) => patch(q.id, { answer })}
              multiline
              rows={5}
            />
          </div>
        )}
      />
      <div className="mt-3">
        <AddButton label="Add question" onClick={add} />
      </div>
    </SectionPanel>
  );
}
