import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, LOCALE_LABELS, useI18n } from "@/lib/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();
  const current = LOCALE_LABELS[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change language"
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Globe className="h-4 w-4 text-muted-foreground" aria-hidden />
        <span className="tabular-nums">{compact ? current.short : current.native}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            onSelect={() => setLocale(l)}
            className="flex items-center justify-between gap-3"
          >
            <span>{LOCALE_LABELS[l].native}</span>
            {locale === l && <Check className="h-4 w-4 text-secondary" aria-hidden />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
