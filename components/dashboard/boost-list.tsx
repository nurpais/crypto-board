import { TokenCard, TokenCardGrid } from "@/components/token-card";
import { SocialLinks } from "@/components/social-links";
import type { TokenBoost } from "@/lib/dexscreener/types";

export function BoostList({
  items,
  showTotal,
}: {
  items: TokenBoost[];
  showTotal?: boolean;
}) {
  return (
    <TokenCardGrid>
      {items.map((b, i) => (
        <TokenCard
          key={`boost-${b.url}-${i}`}
          url={b.url}
          chainId={b.chainId}
          tokenAddress={b.tokenAddress}
          icon={b.icon}
        >
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {showTotal && b.totalAmount != null && (
              <span>
                Total:{" "}
                <span className="font-medium text-primary">{b.totalAmount}</span>
              </span>
            )}
            {!showTotal && b.amount != null && (
              <span>
                Amount:{" "}
                <span className="font-medium text-primary">{b.amount}</span>
              </span>
            )}
          </div>
          {b.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {b.description}
            </p>
          )}
          {b.links && b.links.length > 0 && <SocialLinks links={b.links} />}
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}
