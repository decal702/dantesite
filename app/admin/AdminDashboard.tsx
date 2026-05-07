"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Content } from "@/lib/content";
import HeroEditor from "./editors/HeroEditor";
import AboutEditor from "./editors/AboutEditor";
import ServicesEditor from "./editors/ServicesEditor";
import StoreEditor from "./editors/StoreEditor";
import TestimonialsEditor from "./editors/TestimonialsEditor";
import ContactEditor from "./editors/ContactEditor";
import SocialsEditor from "./editors/SocialsEditor";
import FooterEditor from "./editors/FooterEditor";

type Toast = { type: "success" | "error"; msg: string } | null;

export default function AdminDashboard({
  initial,
  username,
}: {
  initial: Content;
  username: string;
}) {
  const router = useRouter();
  const [content, setContent] = useState<Content>(initial);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(t);
  }, [toast]);

  async function saveSection(section: string, latest: Content) {
    if (savingSection !== null) return;
    setSavingSection(section);
    setToast(null);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, content: latest }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Save failed");
      setToast({
        type: "success",
        msg: "Saved! Live in ~30 seconds after the redeploy completes.",
      });
    } catch (err) {
      setToast({
        type: "error",
        msg: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSavingSection(null);
    }
  }

  function update<K extends keyof Content>(key: K, value: Content[K]) {
    setContent((p) => ({ ...p, [key]: value }));
  }

  async function handleSignOut() {
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="font-heading text-brand-red tracking-widest uppercase text-sm">
            Graffiti 101 Admin
          </p>
          <h1 className="font-heading text-4xl tracking-tight mt-1">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-brand-black/70">
            Signed in as <span className="font-semibold">{username}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-brand-black/30 text-brand-black uppercase tracking-wider text-sm font-semibold hover:bg-brand-black/5"
          >
            View site
          </a>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="px-4 py-2 bg-brand-black text-brand-beige uppercase tracking-wider text-sm font-semibold hover:bg-brand-red transition-colors disabled:opacity-60"
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </header>

      {toast && (
        <div
          role={toast.type === "error" ? "alert" : "status"}
          className={`mt-6 p-4 border-l-4 ${
            toast.type === "success"
              ? "bg-brand-yellow/30 border-brand-black"
              : "bg-brand-red/15 border-brand-red text-brand-red"
          } text-sm font-medium`}
        >
          {toast.msg}
        </div>
      )}

      <div className="grid gap-6 mt-8">
        <HeroEditor
          data={content.hero}
          onChange={(hero) => update("hero", hero)}
          onSave={() => saveSection("hero", content)}
          saving={savingSection === "hero"}
          disabled={savingSection !== null}
        />
        <AboutEditor
          data={content.about}
          onChange={(about) => update("about", about)}
          onSave={() => saveSection("about", content)}
          saving={savingSection === "about"}
          disabled={savingSection !== null}
        />
        <ServicesEditor
          data={content.services}
          onChange={(services) => update("services", services)}
          onSave={() => saveSection("services", content)}
          saving={savingSection === "services"}
          disabled={savingSection !== null}
        />
        <StoreEditor
          data={content.store}
          onChange={(store) => update("store", store)}
          onSave={() => saveSection("store", content)}
          saving={savingSection === "store"}
          disabled={savingSection !== null}
        />
        <TestimonialsEditor
          data={content.testimonials}
          onChange={(testimonials) => update("testimonials", testimonials)}
          onSave={() => saveSection("testimonials", content)}
          saving={savingSection === "testimonials"}
          disabled={savingSection !== null}
        />
        <ContactEditor
          data={content.contact}
          onChange={(contact) => update("contact", contact)}
          onSave={() => saveSection("contact", content)}
          saving={savingSection === "contact"}
          disabled={savingSection !== null}
        />
        <SocialsEditor
          data={content.socials}
          onChange={(socials) => update("socials", socials)}
          onSave={() => saveSection("socials", content)}
          saving={savingSection === "socials"}
          disabled={savingSection !== null}
        />
        <FooterEditor
          data={content.footer}
          onChange={(footer) => update("footer", footer)}
          onSave={() => saveSection("footer", content)}
          saving={savingSection === "footer"}
          disabled={savingSection !== null}
        />
      </div>
    </main>
  );
}
