import { endpoints } from "./endpoints";
import type {
  Ad,
  CommunityTakeover,
  DexPair,
  DexPairsResponse,
  DexSearchResponse,
  OrdersResponse,
  TokenBoost,
  TokenProfile,
} from "./types";

class DexScreenerError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "DexScreenerError";
  }
}

async function fetchDexScreener<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new DexScreenerError(
      res.status,
      `DexScreener API error: ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
}

export async function searchPairs(query: string): Promise<DexPair[]> {
  const data = await fetchDexScreener<DexSearchResponse>(
    endpoints.searchPairs(query),
  );
  return data.pairs;
}

export async function getPairsByChainAndPair(
  chainId: string,
  pairId: string,
): Promise<DexPair[]> {
  const data = await fetchDexScreener<DexPairsResponse>(
    endpoints.getPairsByChainAndPair(chainId, pairId),
  );
  return data.pairs;
}

export async function getTokensByAddress(
  chainId: string,
  tokenAddresses: string[],
): Promise<DexPair[]> {
  return fetchDexScreener<DexPair[]>(
    endpoints.getTokensByAddress(chainId, tokenAddresses),
  );
}

export async function getTokenPairs(
  chainId: string,
  tokenAddress: string,
): Promise<DexPair[]> {
  return fetchDexScreener<DexPair[]>(
    endpoints.getTokenPairs(chainId, tokenAddress),
  );
}

export async function getLatestTokenProfiles(): Promise<TokenProfile[]> {
  return fetchDexScreener<TokenProfile[]>(endpoints.getLatestTokenProfiles());
}

export async function getLatestTokenBoosts(): Promise<TokenBoost[]> {
  return fetchDexScreener<TokenBoost[]>(endpoints.getLatestTokenBoosts());
}

export async function getTopTokenBoosts(): Promise<TokenBoost[]> {
  return fetchDexScreener<TokenBoost[]>(endpoints.getTopTokenBoosts());
}

export async function getOrders(
  chainId: string,
  tokenAddress: string,
): Promise<OrdersResponse> {
  return fetchDexScreener<OrdersResponse>(
    endpoints.getOrders(chainId, tokenAddress),
  );
}

export async function getLatestAds(): Promise<Ad[]> {
  return fetchDexScreener<Ad[]>(endpoints.getLatestAds());
}

export async function getLatestCommunityTakeovers(): Promise<
  CommunityTakeover[]
> {
  return fetchDexScreener<CommunityTakeover[]>(
    endpoints.getLatestCommunityTakeovers(),
  );
}

export { DexScreenerError };
