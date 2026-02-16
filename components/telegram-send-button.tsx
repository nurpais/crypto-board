"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function TelegramSendButton() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSend() {
    setStatus("sending");
    try {
      const res = await fetch("/api/telegram/send", {
        method: "POST",
        headers: { "x-api-key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY! },
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  return (
    <button
      onClick={handleSend}
      disabled={status === "sending"}
      className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-white disabled:opacity-50"
    >
      <Send className="h-4 w-4" />
      {status === "sending"
        ? "Sending..."
        : status === "sent"
          ? "Sent!"
          : status === "error"
            ? "Error"
            : "Send to TG"}
    </button>
  );
}
