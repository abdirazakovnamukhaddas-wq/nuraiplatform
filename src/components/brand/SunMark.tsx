import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function SunMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("h-8 w-8", className)}>
      <g stroke="var(--gold)" strokeWidth="2" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return (
            <line key={i} x1={20 + Math.cos(a) * 12} y1={20 + Math.sin(a) * 12} x2={20 + Math.cos(a) * 17.5} y2={20 + Math.sin(a) * 17.5} />
          );
        })}
      </g>
      <circle cx="20" cy="20" r="9" fill="var(--burgundy)" stroke="var(--gold)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="3.2" fill="var(--gold)" />
    </svg>
  );
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="NUR.AI">
      <SunMark />
      <span className={cn("font-display text-xl font-bold tracking-tight", light ? "text-ivory" : "text-charcoal")}>
        NUR<span className="text-gold">.AI</span>
      </span>
    </Link>
  );
}
