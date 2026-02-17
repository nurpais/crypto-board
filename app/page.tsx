import Link from "next/link";
import { BarChart3, Sparkles, Wallet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BarChart3,
    title: "Token Tracking",
    description:
      "Monitor latest token profiles, boosts, and community takeovers from DexScreener in real time.",
  },
  {
    icon: Sparkles,
    title: "AI Analysis",
    description:
      "Get AI-powered verdicts on any token — risk assessment, sentiment, and key metrics at a glance.",
  },
  {
    icon: Wallet,
    title: "Wallet Explorer",
    description:
      "Inspect any Solana wallet: token balances, portfolio value, and holdings breakdown.",
  },
];

const techStack = ["Next.js", "React", "TypeScript", "OpenAI", "Telegram"];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
        <span className="text-lg font-semibold">
          Crypto <span className="text-primary">Board</span>
        </span>
        <Button asChild size="sm">
          <Link href="/dashboard">Open Dashboard</Link>
        </Button>
      </nav>

      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-4 py-24 text-center">
        {/* Gradient glow */}
        <div className="pointer-events-none absolute inset-0 -top-20 mx-auto h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />

        <h1 className="relative text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Real-time Crypto
          <br />
          <span className="text-primary">Intelligence</span>
        </h1>
        <p className="relative mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          AI-powered token analysis, live DexScreener data, and instant Telegram
          alerts — all in one dashboard.
        </p>
        <Button asChild size="lg" className="relative mt-8 gap-2">
          <Link href="/dashboard">
            Launch Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <f.icon className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-5xl px-4 py-12 text-center">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Built with
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {techStack.map((name) => (
            <span
              key={name}
              className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-4 py-12 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Crypto Board. All rights reserved.
      </footer>
    </main>
  );
}
