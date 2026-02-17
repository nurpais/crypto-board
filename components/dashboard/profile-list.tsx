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
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {p.description}
            </p>
          )}
          {p.cto && (
            <span className="inline-block w-fit rounded bg-primary/15 px-1.5 py-0.5 text-xs font-medium text-primary">
              CTO
            </span>
          )}
          {p.links && p.links.length > 0 && <SocialLinks links={p.links} />}
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}
