import type { DexPair } from "@/lib/dexscreener/types";
import { TokenCard, TokenCardGrid } from "@/components/token-card";
import { cn } from "@/lib/utils";

function formatPrice(price?: string) {
  if (!price) return "—";
  const n = parseFloat(price);
  if (n >= 1) return `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  return `$${n.toPrecision(4)}`;
}

function formatVolume(vol?: number) {
  if (!vol) return "—";
  if (vol >= 1_000_000) return `$${(vol / 1_000_000).toFixed(1)}M`;
  if (vol >= 1_000) return `$${(vol / 1_000).toFixed(1)}K`;
  return `$${vol.toFixed(0)}`;
}

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
          Vol {formatVolume(pair.volume?.h24)}
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
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}
