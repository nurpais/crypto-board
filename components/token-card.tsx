import { cn } from "@/lib/utils";
import { truncateAddress } from "@/lib/format";
import { TokenIcon } from "./token-icon";
import { ChainBadge } from "./chain-badge";

interface TokenCardProps {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon?: string;
  children?: React.ReactNode;
  className?: string;
}

export function TokenCard({
  url,
  chainId,
  tokenAddress,
  icon,
  children,
  className,
}: TokenCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/30",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <TokenIcon src={icon} alt={tokenAddress} />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate font-mono text-sm text-primary hover:underline"
        >
          {truncateAddress(tokenAddress)}
        </a>
        <ChainBadge chainId={chainId} />
      </div>
      {children}
    </div>
  );
}

export function TokenCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
