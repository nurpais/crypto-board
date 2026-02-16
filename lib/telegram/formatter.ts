import type { TokenBoost, DexPair } from "@/lib/dexscreener/types";
import { formatCompactNumber } from "@/lib/format";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatChainName(chainId: string): string {
  const names: Record<string, string> = {
    solana: "Solana",
    ethereum: "Ethereum",
    bsc: "BSC",
    base: "Base",
    arbitrum: "Arbitrum",
    polygon: "Polygon",
    avalanche: "Avalanche",
    optimism: "Optimism",
  };
  return names[chainId] ?? chainId;
}

export function formatTokenMessage(boost: TokenBoost, pair?: DexPair, analysis?: string): string {
  const lines: string[] = [];

  const symbol = pair?.baseToken.symbol ?? "???";
  const chain = formatChainName(boost.chainId);

  lines.push(`🔥 <b>Top Boosted Token</b>`);
  lines.push("");
  lines.push(`<b>$${escapeHtml(symbol)}</b> · ${chain}`);

  if (pair) {
    const price = pair.priceUsd ?? "N/A";
    const change24h = pair.priceChange?.h24;
    const changeStr =
      change24h != null
        ? `${change24h >= 0 ? "+" : ""}${change24h.toFixed(1)}%`
        : "N/A";

    lines.push(`💰 $${price} · ${changeStr} (24h)`);
    lines.push("");

    const volume = pair.volume?.h24;
    const liquidity = pair.liquidity?.usd;
    const volStr = volume != null ? formatCompactNumber(volume) : "N/A";
    const liqStr = liquidity != null ? formatCompactNumber(liquidity) : "N/A";
    lines.push(`📊 Volume: ${volStr} · Liq: ${liqStr}`);

    const txns = pair.txns?.h24;
    if (txns) {
      const buys =
        txns.buys >= 1000
          ? `${(txns.buys / 1000).toFixed(1)}K`
          : String(txns.buys);
      const sells =
        txns.sells >= 1000
          ? `${(txns.sells / 1000).toFixed(1)}K`
          : String(txns.sells);
      lines.push(`🔄 Buys: ${buys} · Sells: ${sells}`);
    }
  }

  if (boost.description) {
    lines.push("");
    const desc = escapeHtml(boost.description);
    const trimmed = desc.length > 200 ? desc.slice(0, 200) + "..." : desc;
    lines.push(`📝 ${trimmed}`);
  }

  if (analysis) {
    lines.push("");
    lines.push(`🤖 ${escapeHtml(analysis)}`);
  }

  // Links
  const linkParts: string[] = [];
  linkParts.push(`<a href="${boost.url}">DexScreener</a>`);

  const socials = [
    ...(pair?.info?.socials ?? []),
    ...(boost.links ?? []),
  ];
  for (const social of socials) {
    const type = ("type" in social ? social.type : undefined) ??
      ("label" in social ? social.label : undefined) ?? "";
    if (type.toLowerCase() === "twitter") {
      linkParts.push(`<a href="${social.url}">Twitter</a>`);
    } else if (type.toLowerCase() === "telegram") {
      linkParts.push(`<a href="${social.url}">Telegram</a>`);
    }
  }

  lines.push("");
  lines.push(`🔗 ${linkParts.join(" · ")}`);

  return lines.join("\n");
}
