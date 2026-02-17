"use client";

import { useState } from "react";
import { Sparkles, Loader2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AnalyzeStatus = "idle" | "loading" | "success" | "error";

interface AnalyzeButtonProps {
  chainId: string;
  tokenAddress: string;
}

const statusIcons: Record<AnalyzeStatus, React.ReactNode> = {
  idle: <Sparkles className="size-3.5" />,
  loading: <Loader2 className="size-3.5 animate-spin" />,
  success: <Check className="size-3.5" />,
  error: <X className="size-3.5" />,
};

const statusStyles: Record<AnalyzeStatus, string> = {
  idle: "text-muted-foreground hover:text-primary hover:border-primary/30",
  loading: "text-muted-foreground cursor-wait",
  success: "text-primary border-primary/30",
  error: "text-destructive border-destructive/30",
};

export function AnalyzeButton({ chainId, tokenAddress }: AnalyzeButtonProps) {
  const [status, setStatus] = useState<AnalyzeStatus>("idle");

  async function handleClick() {
    if (status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/telegram/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chainId, tokenAddress }),
      });

      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === "loading"}
      title="AI analyze → Telegram"
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-border p-1.5 transition-colors",
        statusStyles[status],
      )}
    >
      {statusIcons[status]}
    </button>
  );
}
