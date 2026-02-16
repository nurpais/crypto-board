"use client";

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
  return (
    <Tabs defaultValue="profiles">
      <TabsList>
        <TabsTrigger value="profiles">Token Profiles</TabsTrigger>
        <TabsTrigger value="latest-boosts">Latest Boosts</TabsTrigger>
        <TabsTrigger value="top-boosts">Top Boosts</TabsTrigger>
        <TabsTrigger value="ads">Ads</TabsTrigger>
        <TabsTrigger value="cto">CTO</TabsTrigger>
      </TabsList>
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
