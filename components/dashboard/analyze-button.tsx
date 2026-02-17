"use client";

import { useState, useCallback } from "react";
import { Sparkles, Loader2, Check, X } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function AnalyzeButton({
  chainId,
  tokenAddress,
}: {
  chainId: string;
  tokenAddress: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  const handleClick = useCallback(async () => {
    if (status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/telegram/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chainId, tokenAddress }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 2000);
  }, [chainId, tokenAddress, status]);

  const icon = {
    idle: <Sparkles className="size-3.5" />,
    loading: <Loader2 className="size-3.5 animate-spin" />,
    success: <Check className="size-3.5" />,
    error: <X className="size-3.5" />,
  }[status];

  const colors = {
    idle: "text-muted-foreground hover:text-primary hover:border-primary/30",
    loading: "text-muted-foreground cursor-wait",
    success: "text-primary border-primary/30",
    error: "text-destructive border-destructive/30",
  }[status];

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === "loading"}
      title="AI analyze → Telegram"
      className={`inline-flex items-center justify-center rounded-md border border-border p-1.5 transition-colors ${colors}`}
    >
      {icon}
    </button>
  );
}
