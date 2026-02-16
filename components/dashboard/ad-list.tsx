import { TokenCard, TokenCardGrid } from "@/components/token-card";
import type { Ad } from "@/lib/dexscreener/types";

export function AdList({ items }: { items: Ad[] }) {
  return (
    <TokenCardGrid>
      {items.map((a, i) => (
        <TokenCard
          key={`ad-${a.url}-${i}`}
          url={a.url}
          chainId={a.chainId}
          tokenAddress={a.tokenAddress}
        >
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span>{new Date(a.date).toLocaleDateString()}</span>
            <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs text-primary">
              {a.type}
            </span>
            {a.impressions != null && (
              <span>
                <span className="font-medium text-primary">
                  {a.impressions.toLocaleString()}
                </span>{" "}
                imp
              </span>
            )}
            {a.durationHours != null && <span>{a.durationHours}h</span>}
          </div>
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}
