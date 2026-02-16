import { NextResponse } from "next/server";
import { getTopTokenBoosts, getTokenPairs } from "@/lib/dexscreener/client";
import { sendMessage, formatTokenMessage } from "@/lib/telegram";
import { analyzeToken } from "@/lib/ai";
import type { DexPair } from "@/lib/dexscreener/types";

const MIN_VOLUME_24H = 50_000;
const MIN_LIQUIDITY = 30_000;

function isQualified(pair: DexPair): boolean {
  const volume = pair.volume?.h24 ?? 0;
  const liquidity = pair.liquidity?.usd ?? 0;
  const buys = pair.txns?.h24?.buys ?? 0;
  const sells = pair.txns?.h24?.sells ?? 0;

  return volume >= MIN_VOLUME_24H && liquidity >= MIN_LIQUIDITY && buys > sells;
}

export async function GET(request: Request) {
  // Verify Vercel cron secret in production
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const boosts = await getTopTokenBoosts();
  if (!boosts.length) {
    return NextResponse.json({ ok: true, skipped: "no boosts" });
  }

  // Check top boosted tokens until we find one that qualifies
  for (const boost of boosts.slice(0, 10)) {
    let pairs;
    try {
      pairs = await getTokenPairs(boost.chainId, boost.tokenAddress);
    } catch {
      continue;
    }

    const pair = pairs?.[0];
    if (!pair || !isQualified(pair)) continue;

    const analysis = await analyzeToken(boost, pair);
    const text = formatTokenMessage(boost, pair, analysis);
    await sendMessage(text);

    return NextResponse.json({
      ok: true,
      sent: pair.baseToken.symbol,
    });
  }

  return NextResponse.json({ ok: true, skipped: "no qualified tokens" });
}
