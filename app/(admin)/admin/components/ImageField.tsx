"use client";

import { useState } from "react";

export default function ImageField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <p className="font-heading tracking-widest uppercase text-sm">{label}</p>
      {hint && (
        <p className="mt-1 text-xs text-brand-black/60">
          Recommended: {hint}
        </p>
      )}
      <div className="mt-2 flex items-start gap-3 flex-wrap">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="w-32 h-32 object-cover bg-brand-black/5 border border-brand-black/10"
          />
        ) : (
          <div className="w-32 h-32 bg-brand-black/5 border border-brand-black/10 flex items-center justify-center text-xs text-brand-black/40 text-center px-2">
            No image
          </div>
        )}
        <div className="flex-1 min-w-[180px]">
          <label className="inline-block px-3 py-2 bg-brand-black text-brand-beige text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-brand-red transition-colors">
            {uploading ? "Uploading…" : value ? "Replace" : "Upload"}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
                e.target.value = "";
              }}
            />
          </label>
          {value && (
            <p className="mt-2 text-xs text-brand-black/40 break-all">
              {value}
            </p>
          )}
          {error && (
            <p className="mt-1 text-xs text-brand-red">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
