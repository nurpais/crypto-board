import { TokenCard, TokenCardGrid } from "@/components/token-card";
import { SocialLinks } from "@/components/social-links";
import type { TokenBoost } from "@/lib/dexscreener/types";
import { Zap } from "lucide-react";

export function BoostList({
  items,
  showTotal,
}: {
  items: TokenBoost[];
  showTotal?: boolean;
}) {
  return (
    <TokenCardGrid>
      {items.map((b, i) => {
        const value = showTotal ? b.totalAmount : b.amount;
        const label = showTotal ? "Total Boost" : "Boost";

        return (
          <TokenCard
            key={`${b.chainId}-${b.tokenAddress}-${i}`}
            url={b.url}
            chainId={b.chainId}
            tokenAddress={b.tokenAddress}
            icon={b.icon}
          >
            {value != null && (
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-primary">
                  {value}
                </span>
              </div>
            )}
            {b.description && (
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {b.description}
              </p>
            )}
            {b.links && b.links.length > 0 && <SocialLinks links={b.links} />}
          </TokenCard>
        );
      })}
    </TokenCardGrid>
  );
}
