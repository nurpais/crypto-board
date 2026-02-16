import { NextRequest, NextResponse } from "next/server";
import { searchPairs } from "@/lib/dexscreener/client";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ pairs: [] });
  }

  try {
    const pairs = await searchPairs(q);
    return NextResponse.json({ pairs });
  } catch {
    return NextResponse.json({ pairs: [] }, { status: 500 });
  }
}
