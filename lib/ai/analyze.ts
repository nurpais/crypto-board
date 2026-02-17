import OpenAI from "openai";
import type { TokenBoost, DexPair } from "@/lib/dexscreener/types";
import { formatCompactNumber } from "@/lib/format";

const globalForOpenAI = globalThis as unknown as { _openai?: OpenAI };

function getClient(): OpenAI {
  if (!globalForOpenAI._openai) {
    globalForOpenAI._openai = new OpenAI();
  }
  return globalForOpenAI._openai;
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
            "You are a crypto analyst. Given token market data, provide a short verdict in this format:\n\n📈 Sentiment: <one line>\n⚠️ Risks: <one line>\n💎 Potential: <one line>\n\nUse emojis. Be concise and direct. No markdown. Plain text only.",
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
