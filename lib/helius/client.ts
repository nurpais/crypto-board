import type { HeliusAssetList } from "./types";

class HeliusError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "HeliusError";
  }
}

export async function getWalletAssets(
  address: string,
): Promise<HeliusAssetList> {
  const apiKey = process.env.HELIUS_API_KEY;
  if (!apiKey) {
    throw new HeliusError(500, "HELIUS_API_KEY is not configured");
  }

  const res = await fetch(
    `https://mainnet.helius-rpc.com/?api-key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "wallet-assets",
        method: "getAssetsByOwner",
        params: {
          ownerAddress: address,
          displayOptions: {
            showFungible: true,
            showNativeBalance: true,
          },
        },
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new HeliusError(
      res.status,
      `Helius API error: ${res.status} ${res.statusText}`,
    );
  }

  const json = await res.json();

  if (json.error) {
    throw new HeliusError(400, json.error.message ?? "Unknown Helius error");
  }

  return json.result as HeliusAssetList;
}

export { HeliusError };
