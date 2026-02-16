"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenCard, TokenCardGrid } from "@/components/token-card";
import type {
  TokenProfile,
  TokenBoost,
  Ad,
  CommunityTakeover,
} from "@/lib/dexscreener/types";

function ProfileList({ items }: { items: TokenProfile[] }) {
  return (
    <TokenCardGrid>
      {items.map((p, i) => (
        <TokenCard
          key={`${p.url}-${i}`}
          url={p.url}
          chainId={p.chainId}
          tokenAddress={p.tokenAddress}
          icon={p.icon}
        >
          {p.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {p.description}
            </p>
          )}
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}

function BoostList({
  items,
  showTotal,
}: {
  items: TokenBoost[];
  showTotal?: boolean;
}) {
  return (
    <TokenCardGrid>
      {items.map((b, i) => (
        <TokenCard
          key={`boost-${b.url}-${i}`}
          url={b.url}
          chainId={b.chainId}
          tokenAddress={b.tokenAddress}
          icon={b.icon}
        >
          <div className="text-sm text-muted-foreground">
            {showTotal && b.totalAmount != null && (
              <span>
                Total:{" "}
                <span className="font-medium text-primary">{b.totalAmount}</span>
              </span>
            )}
            {!showTotal && b.amount != null && (
              <span>
                Amount:{" "}
                <span className="font-medium text-primary">{b.amount}</span>
              </span>
            )}
          </div>
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}

function AdList({ items }: { items: Ad[] }) {
  return (
    <TokenCardGrid>
      {items.map((a, i) => (
        <TokenCard
          key={`ad-${a.url}-${i}`}
          url={a.url}
          chainId={a.chainId}
          tokenAddress={a.tokenAddress}
        >
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span>{new Date(a.date).toLocaleDateString()}</span>
            <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs text-primary">
              {a.type}
            </span>
            {a.impressions != null && (
              <span>
                <span className="font-medium text-primary">
                  {a.impressions.toLocaleString()}
                </span>{" "}
                imp
              </span>
            )}
            {a.durationHours != null && <span>{a.durationHours}h</span>}
          </div>
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}

function CTOList({ items }: { items: CommunityTakeover[] }) {
  return (
    <TokenCardGrid>
      {items.map((c, i) => (
        <TokenCard
          key={`cto-${c.url}-${i}`}
          url={c.url}
          chainId={c.chainId}
          tokenAddress={c.tokenAddress}
          icon={c.icon}
        >
          <div className="text-sm text-muted-foreground">
            {new Date(c.claimDate).toLocaleDateString()}
          </div>
          {c.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {c.description}
            </p>
          )}
        </TokenCard>
      ))}
    </TokenCardGrid>
  );
}

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
