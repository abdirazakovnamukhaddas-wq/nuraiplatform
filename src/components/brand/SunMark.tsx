import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoIcon from "@/assets/nurai-logo-icon.png.asset.json";
import logoName from "@/assets/nurai-logo-name.png.asset.json";

export function SunMark({ className }: { className?: string }) {
  return (
    <img src={logoIcon.url} alt="" aria-hidden width={433} height={419} className={cn("h-8 w-8 object-contain", className)} />
  );
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="NUR.AI">
      <SunMark />
      <img src={logoName.url} alt="" aria-hidden width={865} height={157} className={cn("h-auto w-24 object-contain", light && "rounded-sm bg-ivory px-1 py-0.5")} />
    </Link>
  );
}
