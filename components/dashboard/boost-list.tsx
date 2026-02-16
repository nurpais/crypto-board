import { TokenCard, TokenCardGrid } from "@/components/token-card";
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
          <div className="text-sm text-muted-foreground">
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
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}
