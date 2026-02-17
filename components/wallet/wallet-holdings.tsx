"use client";

import { TokenIcon } from "@/components/token-icon";
import { formatUsd, formatBalance } from "@/lib/format";
import type { HeliusAsset, HeliusNativeBalance } from "@/lib/helius/types";

interface WalletHoldingsProps {
  assets: HeliusAsset[];
  nativeBalance?: HeliusNativeBalance;
}

interface TokenRow {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  balance: number;
  pricePerToken: number;
  value: number;
}

function getTokenRows(assets: HeliusAsset[]): TokenRow[] {
  const fungibles = assets.filter(
    (a) =>
      (a.interface === "FungibleToken" || a.interface === "FungibleAsset") &&
      a.token_info,
  );

  return fungibles
    .filter((a): a is HeliusAsset & { token_info: NonNullable<HeliusAsset["token_info"]> } => !!a.token_info)
    .map((a) => {
      const { token_info: tokenInfo } = a;
      const decimals = tokenInfo.decimals;
      const balance = tokenInfo.balance / 10 ** decimals;
      const pricePerToken = tokenInfo.price_info?.price_per_token ?? 0;
      const value = balance * pricePerToken;

      return {
        id: a.id,
        symbol: tokenInfo.symbol ?? a.content?.metadata?.symbol ?? "???",
        name: a.content?.metadata?.name ?? "Unknown",
        image: a.content?.links?.image,
        balance,
        pricePerToken,
        value,
      };
    })
    .sort((a, b) => b.value - a.value);
}

interface NftRow {
  id: string;
  name: string;
  image?: string;
}

function getNftRows(assets: HeliusAsset[]): NftRow[] {
  return assets
    .filter(
      (a) =>
        a.interface !== "FungibleToken" &&
        a.interface !== "FungibleAsset" &&
        a.content?.metadata?.name,
    )
    .map((a) => ({
      id: a.id,
      name: a.content!.metadata!.name!,
      image: a.content?.links?.image,
    }));
}

export function WalletHoldings({ assets, nativeBalance }: WalletHoldingsProps) {
  const tokens = getTokenRows(assets);
  const nfts = getNftRows(assets);
  const solBalance = nativeBalance ? nativeBalance.lamports / 1e9 : 0;
  const solValue = nativeBalance?.total_price ?? 0;
  const solPrice = nativeBalance?.price_per_sol ?? 0;

  const totalValue =
    solValue + tokens.reduce((sum, t) => sum + t.value, 0);

  return (
    <div className="space-y-6">
      {/* SOL balance card */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary">
              ◎
            </div>
            <div>
              <p className="text-sm text-muted-foreground">SOL Balance</p>
              <p className="text-2xl font-semibold">{solBalance.toFixed(4)} SOL</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              @ {formatUsd(solPrice)} / SOL
            </p>
            <p className="text-xl font-semibold">{formatUsd(solValue)}</p>
          </div>
        </div>
      </div>

      {/* Total portfolio value */}
      <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-5 py-3">
        <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
        <span className="text-lg font-semibold text-primary">
          {formatUsd(totalValue)}
        </span>
      </div>

      {/* Fungible tokens */}
      {tokens.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">
            Tokens <span className="text-sm font-normal text-muted-foreground">({tokens.length})</span>
          </h2>
          <div className="divide-y divide-border rounded-lg border border-border bg-card">
            {tokens.map((t) => (
              <div key={t.id} className="flex items-center gap-3 px-4 py-3">
                <TokenIcon src={t.image} alt={t.symbol} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{t.symbol}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{formatBalance(t.balance)}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.pricePerToken > 0
                      ? formatUsd(t.pricePerToken)
                      : "—"}
                  </p>
                </div>
                <div className="w-24 text-right">
                  <p className="font-medium">
                    {t.value > 0 ? formatUsd(t.value) : "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NFTs */}
      {nfts.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">
            NFTs <span className="text-sm font-normal text-muted-foreground">({nfts.length})</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {nfts.map((n) => (
              <div
                key={n.id}
                className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3"
              >
                <TokenIcon src={n.image} alt={n.name} />
                <p className="w-full truncate text-center text-xs">
                  {n.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tokens.length === 0 && nfts.length === 0 && !nativeBalance && (
        <p className="text-center text-muted-foreground">No assets found</p>
      )}
    </div>
  );
}
