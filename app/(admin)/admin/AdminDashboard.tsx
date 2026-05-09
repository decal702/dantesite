"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Content } from "@/lib/content";
import HeroEditor from "./editors/HeroEditor";
import AboutEditor from "./editors/AboutEditor";
import ServicesEditor from "./editors/ServicesEditor";
import UpcomingWorkshopsEditor from "./editors/UpcomingWorkshopsEditor";
import StoreEditor from "./editors/StoreEditor";
import TestimonialsEditor from "./editors/TestimonialsEditor";
import ContactEditor from "./editors/ContactEditor";
import SocialsEditor from "./editors/SocialsEditor";
import OrganizationsEditor from "./editors/OrganizationsEditor";
import FaqEditor from "./editors/FaqEditor";
import BusinessInfoEditor from "./editors/BusinessInfoEditor";
import FooterEditor from "./editors/FooterEditor";
import AdminSidebar, {
  GROUPS,
  type SectionKey,
} from "./components/AdminSidebar";

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
  const [baseline, setBaseline] = useState<Content>(initial);
  const [active, setActive] = useState<SectionKey>("hero");
  const [savingSection, setSavingSection] = useState<SectionKey | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(t);
  }, [toast]);

  const dirty = useMemo(() => {
    const result = {} as Record<SectionKey, boolean>;
    for (const group of GROUPS) {
      for (const { key } of group.items) {
        result[key] =
          JSON.stringify(content[key]) !== JSON.stringify(baseline[key]);
      }
    }
    return result;
  }, [content, baseline]);

  async function saveSection(section: SectionKey, latest: Content) {
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
      setBaseline((prev) => ({ ...prev, [section]: latest[section] }));
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

  function renderEditor() {
    const common = (key: SectionKey) => ({
      onSave: () => saveSection(key, content),
      saving: savingSection === key,
      disabled: savingSection !== null,
    });
    switch (active) {
      case "hero":
        return (
          <HeroEditor
            data={content.hero}
            onChange={(v) => update("hero", v)}
            {...common("hero")}
          />
        );
      case "about":
        return (
          <AboutEditor
            data={content.about}
            onChange={(v) => update("about", v)}
            {...common("about")}
          />
        );
      case "business":
        return (
          <BusinessInfoEditor
            data={content.business}
            onChange={(v) => update("business", v)}
            {...common("business")}
          />
        );
      case "services":
        return (
          <ServicesEditor
            data={content.services}
            onChange={(v) => update("services", v)}
            {...common("services")}
          />
        );
      case "upcomingWorkshops":
        return (
          <UpcomingWorkshopsEditor
            data={content.upcomingWorkshops}
            services={content.services}
            onChange={(v) => update("upcomingWorkshops", v)}
            {...common("upcomingWorkshops")}
          />
        );
      case "store":
        return (
          <StoreEditor
            data={content.store}
            onChange={(v) => update("store", v)}
            {...common("store")}
          />
        );
      case "testimonials":
        return (
          <TestimonialsEditor
            data={content.testimonials}
            onChange={(v) => update("testimonials", v)}
            {...common("testimonials")}
          />
        );
      case "faq":
        return (
          <FaqEditor
            data={content.faq}
            onChange={(v) => update("faq", v)}
            {...common("faq")}
          />
        );
      case "contact":
        return (
          <ContactEditor
            data={content.contact}
            onChange={(v) => update("contact", v)}
            {...common("contact")}
          />
        );
      case "socials":
        return (
          <SocialsEditor
            data={content.socials}
            onChange={(v) => update("socials", v)}
            {...common("socials")}
          />
        );
      case "organizations":
        return (
          <OrganizationsEditor
            data={content.organizations}
            onChange={(v) => update("organizations", v)}
            {...common("organizations")}
          />
        );
      case "footer":
        return (
          <FooterEditor
            data={content.footer}
            onChange={(v) => update("footer", v)}
            {...common("footer")}
          />
        );
    }
  }

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
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

      <div className="mt-8 flex flex-col lg:flex-row lg:gap-8">
        <AdminSidebar active={active} dirty={dirty} onSelect={setActive} />
        <div className="flex-1 mt-6 lg:mt-0 min-w-0">{renderEditor()}</div>
      </div>
    </main>
  );
}
