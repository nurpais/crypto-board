const BASE_URL = "https://api.dexscreener.com";

export const endpoints = {
  searchPairs: (query: string) =>
    `${BASE_URL}/latest/dex/search?q=${encodeURIComponent(query)}`,

  getPairsByChainAndPair: (chainId: string, pairId: string) =>
    `${BASE_URL}/latest/dex/pairs/${chainId}/${pairId}`,

  getTokensByAddress: (chainId: string, tokenAddresses: string[]) =>
    `${BASE_URL}/tokens/v1/${chainId}/${tokenAddresses.join(",")}`,

  getTokenPairs: (chainId: string, tokenAddress: string) =>
    `${BASE_URL}/token-pairs/v1/${chainId}/${tokenAddress}`,

  getLatestTokenProfiles: () => `${BASE_URL}/token-profiles/latest/v1`,

  getLatestTokenBoosts: () => `${BASE_URL}/token-boosts/latest/v1`,

  getTopTokenBoosts: () => `${BASE_URL}/token-boosts/top/v1`,

  getOrders: (chainId: string, tokenAddress: string) =>
    `${BASE_URL}/orders/v1/${chainId}/${tokenAddress}`,

  getLatestAds: () => `${BASE_URL}/ads/latest/v1`,

  getLatestCommunityTakeovers: () =>
    `${BASE_URL}/community-takeovers/latest/v1`,
} as const;
