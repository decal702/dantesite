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
        className={`bg-brand-black/10 flex items-center justify-center text-xs uppercase tracking-widest text-brand-black/40 ${
          placeholderClassName ?? className ?? ""
        }`}
      >
        {placeholderLabel}
      </div>
    );
  }
  return <Image src={src} alt={alt} className={className} {...rest} />;
}
