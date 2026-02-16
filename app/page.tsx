import {
  getLatestTokenProfiles,
  getLatestTokenBoosts,
  getTopTokenBoosts,
  getLatestAds,
  getLatestCommunityTakeovers,
} from "@/lib/dexscreener/client";
import { DashboardTabs } from "./dashboard-tabs";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profiles, latestBoosts, topBoosts, ads, ctos] = await Promise.all([
    getLatestTokenProfiles(),
    getLatestTokenBoosts(),
    getTopTokenBoosts(),
    getLatestAds(),
    getLatestCommunityTakeovers(),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Crypto <span className="text-primary">Board</span></h1>
      <DashboardTabs
        profiles={profiles}
        latestBoosts={latestBoosts}
        topBoosts={topBoosts}
        ads={ads}
        ctos={ctos}
      />
    </main>
  );
}
