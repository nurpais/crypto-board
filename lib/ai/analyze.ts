import OpenAI from "openai";
import type { TokenBoost, DexPair } from "@/lib/dexscreener/types";
import { formatCompactNumber } from "@/lib/format";

let _openai: OpenAI | null = null;

function getClient(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI();
  }
  return _openai;
}

export async function analyzeToken(
  boost: TokenBoost,
  pair?: DexPair,
): Promise<string> {
  try {
    const parts: string[] = [];

    const symbol = pair?.baseToken.symbol ?? "UNKNOWN";
    parts.push(`Token: $${symbol} on ${boost.chainId}`);

    if (pair?.priceUsd) {
      parts.push(`Price: $${pair.priceUsd}`);
    }
    if (pair?.priceChange?.h24 != null) {
      parts.push(`24h change: ${pair.priceChange.h24.toFixed(1)}%`);
    }
    if (pair?.volume?.h24 != null) {
      parts.push(`24h volume: ${formatCompactNumber(pair.volume.h24)}`);
    }
    if (pair?.liquidity?.usd != null) {
      parts.push(`Liquidity: ${formatCompactNumber(pair.liquidity.usd)}`);
    }
    if (pair?.txns?.h24) {
      parts.push(
        `24h buys: ${pair.txns.h24.buys}, sells: ${pair.txns.h24.sells}`,
      );
    }
    if (pair?.marketCap != null) {
      parts.push(`Market cap: ${formatCompactNumber(pair.marketCap)}`);
    }
    if (boost.description) {
      parts.push(`Description: ${boost.description.slice(0, 200)}`);
    }

    const completion = await getClient().chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 200,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are a crypto analyst. Given token market data, provide a 2-3 sentence verdict: sentiment, key risks, potential. Be concise and direct. No markdown formatting.",
        },
        {
          role: "user",
          content: parts.join("\n"),
        },
      ],
    });

    return completion.choices[0]?.message?.content?.trim() ?? "";
  } catch {
    return "";
  }
}
