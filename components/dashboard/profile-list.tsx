import { TokenCard, TokenCardGrid } from "@/components/token-card";
import type { TokenProfile } from "@/lib/dexscreener/types";

export function ProfileList({ items }: { items: TokenProfile[] }) {
  return (
    <TokenCardGrid>
      {items.map((p, i) => (
        <TokenCard
          key={`${p.url}-${i}`}
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
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}
