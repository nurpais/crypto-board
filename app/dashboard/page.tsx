import {
  getLatestTokenProfiles,
  getLatestTokenBoosts,
  getTopTokenBoosts,
  getLatestAds,
  getLatestCommunityTakeovers,
} from "@/lib/dexscreener/client";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import Link from "next/link";
import { Search, Eye } from "lucide-react";
import { WalletConnectButton } from "@/components/solana/wallet-connect-button";

export const revalidate = 60;

async function fetchDashboardData() {
  const [profiles, latestBoosts, topBoosts, ads, ctos] = await Promise.all([
    getLatestTokenProfiles().catch(() => []),
    getLatestTokenBoosts().catch(() => []),
    getTopTokenBoosts().catch(() => []),
    getLatestAds().catch(() => []),
    getLatestCommunityTakeovers().catch(() => []),
  ]);

  return { profiles, latestBoosts, topBoosts, ads, ctos };
}

export default async function Dashboard() {
  const data = await fetchDashboardData();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold">
          Crypto <span className="text-primary">Board</span>
        </Link>
        <div className="flex items-center gap-2">
          <WalletConnectButton />
          <Link
            href="/wallet"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-white"
          >
            <Eye className="h-4 w-4" />
            Lookup
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-white"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
        </div>
      </div>
      <DashboardTabs {...data} />
    </main>
  );
}
