import type { DexPair } from "@/lib/dexscreener/types";
import { TokenCard, TokenCardGrid } from "@/components/token-card";
import { AnalyzeButton } from "@/components/dashboard/analyze-button";
import { formatPrice, formatCompactNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

function PairInfo({ pair }: { pair: DexPair }) {
  const change = pair.priceChange?.h24;

  return (
    <>
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-white">
          {pair.baseToken.symbol}
        </span>
        <span className="text-xs text-muted-foreground">
          {pair.baseToken.name}
        </span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="text-white">{formatPrice(pair.priceUsd)}</span>
        {change != null && (
          <span
            className={cn(
              "text-xs font-medium",
              change >= 0 ? "text-primary" : "text-destructive",
            )}
          >
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}%
          </span>
        )}
        <span className="text-xs text-muted-foreground">
          Vol {pair.volume?.h24 != null ? formatCompactNumber(pair.volume.h24) : "—"}
        </span>
      </div>
    </>
  );
}

export function SearchResults({ items }: { items: DexPair[] }) {
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No results found
      </p>
    );
  }

  return (
    <TokenCardGrid>
      {items.map((pair) => (
        <TokenCard
          key={pair.pairAddress}
          url={pair.url}
          chainId={pair.chainId}
          tokenAddress={pair.baseToken.address}
          icon={pair.info?.imageUrl}
        >
          <PairInfo pair={pair} />
          <div className="flex justify-end">
            <AnalyzeButton chainId={pair.chainId} tokenAddress={pair.baseToken.address} />
          </div>
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}
