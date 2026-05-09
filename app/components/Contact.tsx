"use client";

import { useEffect, useRef, useState } from "react";
import type { Content, Lang } from "@/lib/content";
import { ui } from "@/lib/i18n";
import Reveal from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact({
  data,
  labels,
  lang,
}: {
  data: Content["contact"];
  labels: Content["labels"]["contact"];
  lang: Lang;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const subjectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handlePrefill(e: Event) {
      const detail = (e as CustomEvent<{ subject?: string }>).detail;
      if (detail?.subject && subjectRef.current) {
        subjectRef.current.value = detail.subject;
        subjectRef.current.focus({ preventScroll: true });
      }
    }
    window.addEventListener("g101:prefill-contact", handlePrefill);
    return () => window.removeEventListener("g101:prefill-contact", handlePrefill);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
      lang,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || ui.contact.error[lang]);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : ui.contact.error[lang]);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-brand-red text-brand-yellow py-20 sm:py-28"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="font-heading text-brand-yellow tracking-widest uppercase text-sm">
            {labels.eyebrow?.[lang] ?? ""}
          </p>
          <h2
            id="contact-title"
            className="mt-2 font-sans text-3xl sm:text-5xl tracking-tight"
          >
            {labels.title?.[lang] ?? ""}
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-brand-yellow" aria-hidden />
          <p className="mt-6 text-lg text-brand-yellow/90">{data.intro[lang]}</p>
        </Reveal>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-5" noValidate>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field
              label={ui.contact.fields.name[lang]}
              name="name"
              type="text"
              required
              autoComplete="name"
            />
            <Field
              label={ui.contact.fields.email[lang]}
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>
          <Field
            label={ui.contact.fields.phone[lang]}
            name="phone"
            type="tel"
            autoComplete="tel"
          />
          <Field
            label={ui.contact.fields.subject[lang]}
            name="subject"
            type="text"
            required
            inputRef={subjectRef}
          />
          <label className="block">
            <span className="font-sans tracking-widest uppercase text-sm">
              {ui.contact.fields.message[lang]}
            </span>
            <textarea
              name="message"
              required
              rows={6}
              className="mt-2 w-full bg-brand-yellow text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-black focus:outline-none"
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
              className="inline-flex items-center px-6 py-3 bg-brand-yellow text-brand-black font-semibold uppercase tracking-wider hover:bg-brand-orange transition-colors disabled:opacity-60"
            >
              {status === "submitting"
                ? ui.contact.submitting[lang]
                : ui.contact.submit[lang]}
            </button>
            {status === "success" && (
              <p role="status" className="font-semibold text-brand-yellow">
                {ui.contact.success[lang]}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="font-semibold text-brand-yellow">
                {errorMsg || ui.contact.error[lang]}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
  inputRef,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <label className="block">
      <span className="font-sans tracking-widest uppercase text-sm">
        {label}
      </span>
      <input
        ref={inputRef}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full bg-brand-beige text-brand-black px-3 py-2 border border-brand-beige focus:border-brand-yellow focus:outline-none"
      />
    </label>
  );
}
