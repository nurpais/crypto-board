# Crypto Board

Real-time crypto dashboard powered by [DexScreener API](https://docs.dexscreener.com). Aggregates live token data across 5 views with a dark trading-terminal UI.

## Features

- **Token Profiles** — latest token listings with icons, chain, and descriptions
- **Latest Boosts** — recently boosted tokens with amounts
- **Top Boosts** — highest total boost amounts
- **Ads** — active token advertisements with impressions and duration
- **Community Takeovers** — latest CTO events with claim dates

All data is fetched server-side in parallel via React Server Components. Tab switching is instant on the client.

## Tech Stack

- [Next.js 16](https://nextjs.org) — App Router, React Server Components
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org) — strict mode
- [Tailwind CSS v4](https://tailwindcss.com) — PostCSS plugin
- [shadcn/ui](https://ui.shadcn.com) — Tabs component
- [DexScreener API](https://docs.dexscreener.com) — no API key required

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start dev server         |
| `pnpm build` | Production build         |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

## Project Structure

```
app/
  layout.tsx            # Root layout (dark theme, fonts)
  page.tsx              # Server component — parallel API fetching
  dashboard-tabs.tsx    # Client component — tab UI with 5 lists
components/
  token-card.tsx        # Reusable card + grid layout
  token-icon.tsx        # Token avatar with fallback
  chain-badge.tsx       # Chain ID badge
  ui/                   # shadcn/ui primitives (tabs, button)
lib/
  dexscreener/
    client.ts           # API client functions
    endpoints.ts        # URL builders
    types.ts            # TypeScript interfaces
  format.ts             # Address truncation utility
  utils.ts              # cn() helper
```

## Color Palette

| Token        | Color   | Hex       |
| ------------ | ------- | --------- |
| Background   | Navy    | `#0b0f19` |
| Card         | Navy    | `#131a2b` |
| Primary      | Teal    | `#0ecb81` |
| Destructive  | Pink    | `#e84672` |
| Muted        | Gray    | `#6b7280` |
| Secondary    | Surface | `#1a2236` |

## License

MIT
