"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  TokenProfile,
  TokenBoost,
  Ad,
  CommunityTakeover,
} from "@/lib/dexscreener/types";
import { ProfileList } from "./profile-list";
import { BoostList } from "./boost-list";
import { AdList } from "./ad-list";
import { CTOList } from "./cto-list";

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="ml-1.5 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary">
      {count}
    </span>
  );
}

type TabValue = "profiles" | "latest-boosts" | "top-boosts" | "ads" | "cto";

const tabDescriptions: Record<TabValue, string> = {
  profiles: "Tokens with updated profiles — icons, descriptions, and social links.",
  "latest-boosts": "Recently boosted tokens sorted by time.",
  "top-boosts": "Tokens with the most active boosts right now.",
  ads: "Tokens currently running paid advertisements on DexScreener.",
  cto: "Tokens where the community has taken over the token page.",
};

export interface DashboardTabsProps {
  profiles: TokenProfile[];
  latestBoosts: TokenBoost[];
  topBoosts: TokenBoost[];
  ads: Ad[];
  ctos: CommunityTakeover[];
}

export function DashboardTabs({
  profiles,
  latestBoosts,
  topBoosts,
  ads,
  ctos,
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<TabValue>("profiles");

  return (
    <Tabs defaultValue="profiles" onValueChange={(v) => setActiveTab(v as TabValue)}>
      <TabsList>
        <TabsTrigger value="profiles">Profiles<CountBadge count={profiles.length} /></TabsTrigger>
        <TabsTrigger value="latest-boosts">Latest Boosts<CountBadge count={latestBoosts.length} /></TabsTrigger>
        <TabsTrigger value="top-boosts">Top Boosts<CountBadge count={topBoosts.length} /></TabsTrigger>
        <TabsTrigger value="ads">Ads<CountBadge count={ads.length} /></TabsTrigger>
        <TabsTrigger value="cto">CTO<CountBadge count={ctos.length} /></TabsTrigger>
      </TabsList>
      <p className="mt-3 text-sm text-muted-foreground">
        {tabDescriptions[activeTab]}
      </p>
      <div className="mt-4">
        <TabsContent value="profiles">
          <ProfileList items={profiles} />
        </TabsContent>
        <TabsContent value="latest-boosts">
          <BoostList items={latestBoosts} />
        </TabsContent>
        <TabsContent value="top-boosts">
          <BoostList items={topBoosts} showTotal />
        </TabsContent>
        <TabsContent value="ads">
          <AdList items={ads} />
        </TabsContent>
        <TabsContent value="cto">
          <CTOList items={ctos} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
