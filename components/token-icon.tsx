"use client";

import { useState } from "react";

function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function Fallback({ alt }: { alt: string }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground ring-1 ring-primary/25">
      {alt.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function TokenIcon({ src, alt }: { src?: string; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error || !isValidUrl(src)) {
    return <Fallback alt={alt} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={32}
      height={32}
      className="h-8 w-8 shrink-0 rounded-full ring-1 ring-primary/25"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}
