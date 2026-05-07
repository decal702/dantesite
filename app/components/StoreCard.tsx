"use client";

type Props = {
  name: string;
  description: string;
  price: string;
  image: string;
  buttonLabel: string;
  inquiryPrefix: string;
};

export default function StoreCard({
  name,
  description,
  price,
  buttonLabel,
  inquiryPrefix,
}: Props) {
  function handleInquire() {
    const subject = `${inquiryPrefix}: ${name}`;
    window.dispatchEvent(
      new CustomEvent("g101:prefill-contact", { detail: { subject } })
    );
    const target = document.getElementById("contact");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <li className="bg-brand-yellow text-brand-black border border-brand-black/10 overflow-hidden flex flex-col">
      <div
        className="relative aspect-square bg-brand-black/10 flex items-center justify-center"
        aria-hidden
      >
        <span className="font-heading text-xs uppercase tracking-widest text-brand-black/40">
          Image
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="font-heading text-2xl tracking-wide">{name}</p>
        <p className="mt-2 text-base leading-relaxed flex-1">{description}</p>
        <p className="mt-3 font-heading text-xl text-brand-red">{price}</p>
        <button
          type="button"
          onClick={handleInquire}
          className="mt-4 inline-flex items-center justify-center px-4 py-3 bg-brand-black text-brand-yellow font-semibold uppercase tracking-wider hover:bg-brand-red transition-colors"
        >
          {buttonLabel}
        </button>
      </div>
    </li>
  );
}
