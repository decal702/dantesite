"use client";

export function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs text-brand-red font-semibold uppercase tracking-wider hover:underline"
    >
      Remove
    </button>
  );
}

export function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 border-2 border-dashed border-brand-black/30 text-brand-black/70 uppercase tracking-wider text-xs font-semibold hover:border-brand-black hover:text-brand-black w-full"
    >
      + {label}
    </button>
  );
}

export function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(
    36
  )}`;
}
