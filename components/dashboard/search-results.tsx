import type { DexPair } from "@/lib/dexscreener/types";
import { TokenCard, TokenCardGrid } from "@/components/token-card";
import { formatPrice, formatCompactNumber, formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

function Metric({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
        {label}
      </span>
      <span className={cn("text-xs font-medium text-white", className)}>
        {value}
      </span>
    </div>
  );
}

function ChangeChip({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums",
        positive
          ? "bg-primary/10 text-primary"
          : "bg-destructive/10 text-destructive",
      )}
    >
      {positive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}

function BuySellBar({ buys, sells }: { buys: number; sells: number }) {
  const total = buys + sells;
  if (total === 0) return null;
  const buyPct = Math.round((buys / total) * 100);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
          Txns 24h
        </span>
        <div className="flex items-center gap-2 text-[10px] tabular-nums">
          <span className="text-primary">{formatCount(buys)} buys</span>
          <span className="text-destructive">{formatCount(sells)} sells</span>
        </div>
      </div>
      <div className="flex h-1.5 overflow-hidden rounded-full">
        <div
          className="rounded-l-full bg-primary transition-all"
          style={{ width: `${buyPct}%` }}
        />
        <div
          className="rounded-r-full bg-destructive transition-all"
          style={{ width: `${100 - buyPct}%` }}
        />
      </div>
    </div>
  );
}

function formatAge(createdAt: number): string {
  const diff = Date.now() - createdAt;
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(hours / 24);

  if (days > 365) return `${Math.floor(days / 365)}y`;
  if (days > 30) return `${Math.floor(days / 30)}mo`;
  if (days > 0) return `${days}d`;
  return `${hours}h`;
}

function PairInfo({ pair }: { pair: DexPair }) {
  const change24h = pair.priceChange?.h24;
  const txns = pair.txns?.h24;

  return (
    <>
      {/* Token name + change badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="truncate font-medium text-white">
            {pair.baseToken.symbol}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {pair.baseToken.name}
          </span>
        </div>
        {change24h != null && <ChangeChip value={change24h} />}
      </div>

      {/* Price + age */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold tabular-nums text-white">
          {formatPrice(pair.priceUsd)}
        </span>
        {pair.pairCreatedAt && (
          <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] tabular-nums text-muted-foreground">
            {formatAge(pair.pairCreatedAt)} old
          </span>
        )}
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-3 gap-3 rounded-md bg-secondary/50 px-2.5 py-2">
        <Metric
          label="Vol 24h"
          value={
            pair.volume?.h24 != null
              ? formatCompactNumber(pair.volume.h24)
              : "—"
          }
        />
        <Metric
          label="Liquidity"
          value={
            pair.liquidity?.usd != null
              ? formatCompactNumber(pair.liquidity.usd)
              : "—"
          }
        />
        <Metric
          label={pair.marketCap != null ? "MCap" : "FDV"}
          value={
            pair.marketCap != null
              ? formatCompactNumber(pair.marketCap)
              : pair.fdv != null
                ? formatCompactNumber(pair.fdv)
                : "—"
          }
        />
      </div>

      {/* Buy/Sell bar */}
      {txns && <BuySellBar buys={txns.buys} sells={txns.sells} />}
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
