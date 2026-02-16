export function ChainBadge({ chainId }: { chainId: string }) {
  return (
    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
      {chainId}
    </span>
  );
}
