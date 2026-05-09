import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  src: string;
  placeholderClassName?: string;
  placeholderLabel?: string;
};

// Drop-in replacement for next/image that renders a placeholder div instead of
// crashing when src is empty. Use this for any image whose URL comes from
// admin-editable content (team photos, project images, store items, etc.) —
// admins can save items before uploading the image.
export default function SafeImage({
  src,
  alt,
  placeholderClassName,
  placeholderLabel = "No image",
  className,
  ...rest
}: Props) {
  if (!src) {
    return (
      <div
        aria-hidden
        className={`flex flex-col items-center justify-center gap-2 text-brand-black/40 ${
          placeholderClassName ?? className ?? ""
        }`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <path d="M21 15.5l-4.5-4.5L6 21" />
        </svg>
        <span className="font-heading text-[10px] uppercase tracking-widest">
          {placeholderLabel}
        </span>
      </div>
    );
  }
  return <Image src={src} alt={alt} className={className} {...rest} />;
}
