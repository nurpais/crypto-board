import { TokenCard, TokenCardGrid } from "@/components/token-card";
import { SocialLinks } from "@/components/social-links";
import type { TokenProfile } from "@/lib/dexscreener/types";

export function ProfileList({ items }: { items: TokenProfile[] }) {
  return (
    <TokenCardGrid>
      {items.map((p, i) => (
        <TokenCard
          key={`${p.chainId}-${p.tokenAddress}-${i}`}
          url={p.url}
          chainId={p.chainId}
          tokenAddress={p.tokenAddress}
          icon={p.icon}
        >
          {p.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
          )}
          {p.cto && (
            <span className="inline-flex w-fit items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              CTO
            </span>
          )}
          {p.links && p.links.length > 0 && <SocialLinks links={p.links} />}
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}
