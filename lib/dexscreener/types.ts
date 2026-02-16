// Token within a pair
export interface DexToken {
  address: string;
  name: string;
  symbol: string;
}

// Transaction counts for a time period
export interface DexTxnCount {
  buys: number;
  sells: number;
}

// DEX pair data
export interface DexPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  labels?: string[];
  baseToken: DexToken;
  quoteToken: DexToken;
  priceNative?: string;
  priceUsd?: string;
  txns?: {
    m5: DexTxnCount;
    h1: DexTxnCount;
    h6: DexTxnCount;
    h24: DexTxnCount;
  };
  volume?: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  priceChange?: {
    m5?: number;
    h1?: number;
    h6?: number;
    h24?: number;
  };
  liquidity?: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv?: number;
  marketCap?: number;
  pairCreatedAt?: number;
  info?: {
    imageUrl?: string;
    header?: string;
    openGraph?: string;
    websites?: Array<{ url: string; label: string }>;
    socials?: Array<{ url: string; type: string }>;
  };
}

// Search response
export interface DexSearchResponse {
  schemaVersion: string;
  pairs: DexPair[];
}

// Pairs response (same shape as search)
export interface DexPairsResponse {
  schemaVersion: string;
  pairs: DexPair[];
}

// Social/website link
export interface TokenLink {
  type?: string;
  label?: string;
  url: string;
}

// Token profile from /token-profiles/latest/v1
export interface TokenProfile {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon: string;
  header: string;
  openGraph: string;
  description?: string;
  links: TokenLink[];
  cto: boolean;
}

// Token boost from /token-boosts
export interface TokenBoost {
  url: string;
  chainId: string;
  tokenAddress: string;
  description?: string;
  icon?: string;
  header?: string;
  openGraph?: string;
  links?: TokenLink[];
  totalAmount?: number;
  amount?: number;
}

// Order from /orders/v1
export interface Order {
  chainId: string;
  tokenAddress: string;
  type: "tokenAd" | "tokenProfile" | "communityTakeover";
  status: "on-hold" | "cancelled" | "approved";
  paymentTimestamp: number;
}

// Boost entry within orders response
export interface OrderBoost {
  chainId: string;
  tokenAddress: string;
  id: string;
  amount: number;
  paymentTimestamp: number;
}

// Orders response
export interface OrdersResponse {
  orders: Order[];
  boosts: OrderBoost[];
}

// Ad from /ads/latest/v1
export interface Ad {
  url: string;
  chainId: string;
  tokenAddress: string;
  date: string;
  type: string;
  durationHours: number | null;
  impressions: number | null;
}

// Community takeover from /community-takeovers/latest/v1
export interface CommunityTakeover {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon: string;
  header: string | null;
  description: string | null;
  links: TokenLink[] | null;
  claimDate: string;
}
