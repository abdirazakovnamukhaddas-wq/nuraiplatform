import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2 focus-visible:outline-none">
      <span
        aria-hidden
        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
      >
        <span className="h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="text-base font-semibold tracking-tight text-foreground">
        NUR<span className="text-secondary">.AI</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#platform", label: t("nav.platform") },
    { href: "#solutions", label: t("nav.solutions") },
    { href: "#trust", label: t("nav.trust") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Wordmark />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher compact />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact">{t("cta.request_demo")}</a>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "grid overflow-hidden border-t border-border transition-[grid-template-rows] duration-200 ease-out md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <Container className="flex flex-col gap-1 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-surface"
              >
                {l.label}
              </a>
            ))}
            <Button asChild size="sm" className="mt-2 sm:hidden">
              <a href="#contact" onClick={() => setOpen(false)}>
                {t("cta.request_demo")}
              </a>
            </Button>
          </Container>
        </div>
      </div>
    </header>
  );
}
