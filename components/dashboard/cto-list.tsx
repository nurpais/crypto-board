import { TokenCard, TokenCardGrid } from "@/components/token-card";
import type { CommunityTakeover } from "@/lib/dexscreener/types";

export function CTOList({ items }: { items: CommunityTakeover[] }) {
  return (
    <TokenCardGrid>
      {items.map((c, i) => (
        <TokenCard
          key={`cto-${c.url}-${i}`}
          url={c.url}
          chainId={c.chainId}
          tokenAddress={c.tokenAddress}
          icon={c.icon}
        >
          <div className="text-sm text-muted-foreground">
            {new Date(c.claimDate).toLocaleDateString()}
          </div>
          {c.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {c.description}
            </p>
          )}
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}
