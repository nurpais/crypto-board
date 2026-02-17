"use client";

import { useState, type FormEvent } from "react";
import { Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WalletHoldings } from "@/components/wallet/wallet-holdings";
import type { HeliusAssetList } from "@/lib/helius/types";
import Link from "next/link";

export default function WalletPage() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState<HeliusAssetList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = address.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(
        `/api/wallet?address=${encodeURIComponent(trimmed)}`,
      );
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Failed to fetch wallet data");
        return;
      }

      setData(json as HeliusAssetList);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/dashboard"
          className="text-muted-foreground transition-colors hover:text-white"
        >
          &larr;
        </Link>
        <h1 className="text-2xl font-semibold">
          Wallet <span className="text-primary">Explorer</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Wallet className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Enter Solana wallet address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="pl-9"
            autoFocus
          />
        </div>
        <Button type="submit" disabled={loading || !address.trim()}>
          {loading ? "Loading..." : "Explore"}
        </Button>
      </form>

      {error && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          <div className="h-24 animate-pulse rounded-lg border border-border bg-card" />
          <div className="h-12 animate-pulse rounded-lg border border-border bg-card" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-lg border border-border bg-card"
            />
          ))}
        </div>
      )}

      {!loading && data && (
        <WalletHoldings
          assets={data.items}
          nativeBalance={data.nativeBalance}
        />
      )}
    </main>
  );
}
