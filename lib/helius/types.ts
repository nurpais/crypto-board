export interface HeliusPriceInfo {
  price_per_token: number;
  currency: string;
  total_price?: number;
}

export interface HeliusTokenInfo {
  balance: number;
  supply?: number;
  decimals: number;
  token_program?: string;
  symbol?: string;
  price_info?: HeliusPriceInfo;
}

export interface HeliusAssetContent {
  json_uri?: string;
  metadata?: {
    name?: string;
    symbol?: string;
    description?: string;
  };
  links?: {
    image?: string;
    external_url?: string;
  };
}

export interface HeliusAsset {
  id: string;
  interface: string;
  content?: HeliusAssetContent;
  token_info?: HeliusTokenInfo;
  ownership?: {
    owner: string;
  };
}

export interface HeliusNativeBalance {
  lamports: number;
  price_per_sol: number;
  total_price: number;
}

export interface HeliusAssetList {
  total: number;
  limit: number;
  items: HeliusAsset[];
  nativeBalance?: HeliusNativeBalance;
}
