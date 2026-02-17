import { NextResponse } from "next/server";
import { getTokenPairs } from "@/lib/dexscreener/client";
import { sendMessage, formatTokenMessage } from "@/lib/telegram";
import { analyzeToken } from "@/lib/ai";
import { fetchTwitterContent } from "@/lib/twitter/scrape";
import type { TokenBoost } from "@/lib/dexscreener/types";

// Simple in-memory rate limiting (per-IP, 5 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 },
    );
  }

  let body: { chainId?: string; tokenAddress?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { chainId, tokenAddress } = body;
  if (!chainId || !tokenAddress) {
    return NextResponse.json(
      { error: "chainId and tokenAddress are required" },
      { status: 400 },
    );
  }

  // Fetch pair data
  let pairs;
  try {
    pairs = await getTokenPairs(chainId, tokenAddress);
  } catch {
    // proceed without pair data
  }

  const pair = pairs?.[0];

  // Build a minimal TokenBoost from the request
  const boost: TokenBoost = {
    url: `https://dexscreener.com/${chainId}/${tokenAddress}`,
    chainId,
    tokenAddress,
  };

  // Try to fetch Twitter content from socials
  let twitterContent: string | null = null;
  const socials = pair?.info?.socials ?? [];
  const twitterUrl = socials.find(
    (s) => s.type?.toLowerCase() === "twitter",
  )?.url;
  if (twitterUrl) {
    twitterContent = await fetchTwitterContent(twitterUrl);
  }

  const analysis = await analyzeToken(boost, pair, twitterContent ?? undefined);
  const text = formatTokenMessage(boost, pair, analysis);

  try {
    await sendMessage(text);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to send message: ${message}` },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    symbol: pair?.baseToken.symbol,
  });
}
