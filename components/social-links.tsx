import type { TokenLink } from "@/lib/dexscreener/types";
import { Globe, Twitter, MessageCircle, Send } from "lucide-react";

function getLinkIcon(link: TokenLink) {
  const type = link.type?.toLowerCase() ?? "";
  const label = link.label?.toLowerCase() ?? "";
  const url = link.url.toLowerCase();

  if (type === "twitter" || url.includes("twitter.com") || url.includes("x.com")) {
    return <Twitter className="h-3.5 w-3.5" />;
  }
  if (type === "telegram" || url.includes("t.me") || url.includes("telegram")) {
    return <Send className="h-3.5 w-3.5" />;
  }
  if (type === "discord" || url.includes("discord")) {
    return <MessageCircle className="h-3.5 w-3.5" />;
  }
  return <Globe className="h-3.5 w-3.5" />;
}

function getLinkLabel(link: TokenLink): string {
  if (link.label) return link.label;
  const type = link.type?.toLowerCase() ?? "";
  if (type) return type.charAt(0).toUpperCase() + type.slice(1);
  try {
    return new URL(link.url).hostname.replace("www.", "");
  } catch {
    return "Link";
  }
}

export function SocialLinks({ links }: { links: TokenLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {links.slice(0, 4).map((link, i) => (
        <a
          key={`${link.url}-${i}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:text-white"
        >
          {getLinkIcon(link)}
          {getLinkLabel(link)}
        </a>
      ))}
    </div>
  );
}
