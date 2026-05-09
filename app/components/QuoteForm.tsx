"use client";

import { useState } from "react";
import type { Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "mt-2 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-black focus:outline-none";

export default function QuoteForm({ lang }: { lang: Lang }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      organizationName: String(fd.get("organizationName") || ""),
      contactName: String(fd.get("contactName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      groupSize: String(fd.get("groupSize") || ""),
      ageRange: String(fd.get("ageRange") || ""),
      preferredDates: String(fd.get("preferredDates") || ""),
      venue: String(fd.get("venue") || ""),
      budgetRange: String(fd.get("budgetRange") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
      lang,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || ui.quote.error[lang]);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : ui.quote.error[lang]);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label={ui.quote.fields.organizationName[lang]}
          name="organizationName"
          type="text"
          required
          autoComplete="organization"
        />
        <Field
          label={ui.quote.fields.contactName[lang]}
          name="contactName"
          type="text"
          required
          autoComplete="name"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label={ui.quote.fields.email[lang]}
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        <Field
          label={ui.quote.fields.phone[lang]}
          name="phone"
          type="tel"
          autoComplete="tel"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label={ui.quote.fields.groupSize[lang]}
          name="groupSize"
          type="text"
          required
        />
        <Field
          label={ui.quote.fields.ageRange[lang]}
          name="ageRange"
          type="text"
          required
        />
      </div>

      <Field
        label={ui.quote.fields.preferredDates[lang]}
        name="preferredDates"
        type="text"
      />

      <label className="block">
        <span className="font-sans tracking-widest uppercase text-sm">
          {ui.quote.fields.venue[lang]}
        </span>
        <select name="venue" required className={inputCls} defaultValue="">
          <option value="" disabled>
            —
          </option>
          <option value="our-studio">
            {ui.quote.venueOptions.ourStudio[lang]}
          </option>
          <option value="our-site">
            {ui.quote.venueOptions.ourSite[lang]}
          </option>
          <option value="either">{ui.quote.venueOptions.either[lang]}</option>
        </select>
      </label>

      <label className="block">
        <span className="font-sans tracking-widest uppercase text-sm">
          {ui.quote.fields.budgetRange[lang]}
        </span>
        <select name="budgetRange" className={inputCls} defaultValue="">
          <option value="">—</option>
          <option value="under-500">
            {ui.quote.budgetOptions.under500[lang]}
          </option>
          <option value="500-1000">
            {ui.quote.budgetOptions.r500_1000[lang]}
          </option>
          <option value="1000-2500">
            {ui.quote.budgetOptions.r1000_2500[lang]}
          </option>
          <option value="over-2500">
            {ui.quote.budgetOptions.over2500[lang]}
          </option>
          <option value="open">{ui.quote.budgetOptions.open[lang]}</option>
        </select>
      </label>

      <label className="block">
        <span className="font-sans tracking-widest uppercase text-sm">
          {ui.quote.fields.message[lang]}
        </span>
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-black focus:outline-none"
        />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center px-6 py-3 bg-brand-black text-brand-yellow font-semibold uppercase tracking-wider hover:bg-brand-red transition-colors disabled:opacity-60"
        >
          {status === "submitting"
            ? ui.quote.submitting[lang]
            : ui.quote.submit[lang]}
        </button>
        {status === "success" && (
          <p role="status" className="font-semibold text-brand-red">
            {ui.quote.success[lang]}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="font-semibold text-brand-red">
            {errorMsg || ui.quote.error[lang]}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="font-sans tracking-widest uppercase text-sm">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className={inputCls}
      />
    </label>
  );
}
