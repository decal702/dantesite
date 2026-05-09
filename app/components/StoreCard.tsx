"use client";

import SafeImage from "./SafeImage";

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
  image,
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
    <li className="group relative bg-white text-brand-black border border-brand-black/15 overflow-hidden flex flex-col">
      <span
        className="absolute top-0 left-0 z-10 w-3 h-3 bg-brand-red"
        aria-hidden
      />
      <div className="relative aspect-square bg-brand-black/5 overflow-hidden">
        <SafeImage
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          placeholderClassName="absolute inset-0"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="font-heading text-xl tracking-wide">{name}</p>
        <p className="mt-2 text-base leading-relaxed flex-1">{description}</p>
        <p className="mt-3 font-heading text-lg text-brand-red">{price}</p>
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
