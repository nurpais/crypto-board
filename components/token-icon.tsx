export function TokenIcon({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className="h-8 w-8 shrink-0 rounded-full ring-1 ring-primary/25"
      loading="lazy"
    />
  );
}
