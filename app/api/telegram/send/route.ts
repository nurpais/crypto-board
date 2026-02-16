import { NextResponse } from "next/server";
import { getTopTokenBoosts, getTokenPairs } from "@/lib/dexscreener/client";
import { sendMessage, formatTokenMessage } from "@/lib/telegram";
import { analyzeToken } from "@/lib/ai";

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const boosts = await getTopTokenBoosts();
  if (!boosts.length) {
    return NextResponse.json(
      { error: "No boosted tokens found" },
      { status: 404 },
    );
  }

  const top = boosts[0];

  let pairs;
  try {
    pairs = await getTokenPairs(top.chainId, top.tokenAddress);
  } catch {
    // proceed without pair data
  }

  const pair = pairs?.[0];
  const analysis = await analyzeToken(top, pair);
  const text = formatTokenMessage(top, pair, analysis);

  await sendMessage(text);

  return NextResponse.json({ ok: true, symbol: pair?.baseToken.symbol });
}
