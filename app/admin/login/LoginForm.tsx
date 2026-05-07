"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: fd.get("username"),
          password: fd.get("password"),
        }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
        return;
      }
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Login failed");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <label className="block">
        <span className="font-heading tracking-widest uppercase text-sm">
          Username
        </span>
        <input
          type="text"
          name="username"
          required
          autoComplete="username"
          autoFocus
          className="mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="font-heading tracking-widest uppercase text-sm">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="px-4 py-3 bg-brand-red text-brand-beige font-semibold uppercase tracking-wider hover:bg-brand-orange transition-colors disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
      {error && (
        <p role="alert" className="text-sm text-brand-red font-semibold">
          {error}
        </p>
      )}
      <a
        href="/"
        className="mt-2 text-xs text-brand-black/60 hover:text-brand-black underline-offset-2 hover:underline"
      >
        ← Back to site
      </a>
    </form>
  );
}
