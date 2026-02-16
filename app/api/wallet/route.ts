import { NextRequest, NextResponse } from "next/server";
import { getWalletAssets } from "@/lib/helius/client";

const ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address")?.trim();

  if (!address || !ADDRESS_RE.test(address)) {
    return NextResponse.json(
      { error: "Invalid Solana address" },
      { status: 400 },
    );
  }

  try {
    const result = await getWalletAssets(address);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch wallet data" },
      { status: 500 },
    );
  }
}
