import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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

function smoothScrollTo(hash: string) {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar({ onRequestDemo }: { onRequestDemo: () => void }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#solutions", label: t("nav.solutions") },
    { href: "#how", label: t("nav.how") },
    { href: "#institutions", label: t("nav.institutions") },
    { href: "#security", label: t("nav.security") },
    { href: "#faq", label: t("nav.faq") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    smoothScrollTo(href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/70 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
          : "border-b border-transparent bg-background/95",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Wordmark />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              className="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-secondary after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher compact />
          <Button size="sm" className="hidden sm:inline-flex" onClick={onRequestDemo}>
            {t("cta.request_demo")}
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "grid overflow-hidden border-t border-border transition-[grid-template-rows] duration-200 ease-out lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <Container className="flex flex-col gap-1 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-surface"
              >
                {l.label}
              </a>
            ))}
            <Button
              size="sm"
              className="mt-2 sm:hidden"
              onClick={() => {
                setOpen(false);
                onRequestDemo();
              }}
            >
              {t("cta.request_demo")}
            </Button>
          </Container>
        </div>
      </div>
    </header>
  );
}
