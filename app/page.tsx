import {
  getLatestTokenProfiles,
  getLatestTokenBoosts,
  getTopTokenBoosts,
  getLatestAds,
  getLatestCommunityTakeovers,
} from "@/lib/dexscreener/client";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";

export const dynamic = "force-dynamic";

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

export default async function Home() {
  const data = await fetchDashboardData();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">
        Crypto <span className="text-primary">Board</span>
      </h1>
      <DashboardTabs {...data} />
    </main>
  );
}
