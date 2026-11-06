import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Wordmark } from "@/components/brand/SunMark";
import { useI18n } from "@/lib/i18n";
import { BASE44 } from "@/lib/base44";
import { cn } from "@/lib/utils";

export function smoothScrollTo(hash: string) {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar({ onRequestDemo: _ }: { onRequestDemo: () => void }) {
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
    { href: "#problem", label: t("inv.nav.problem") },
    { href: "#solution", label: t("inv.nav.solution") },
    { href: "#vision-lab", label: t("inv.nav.lab") },
    { href: "#technology", label: t("inv.nav.tech") },
    { href: "#business", label: t("inv.nav.business") },
    { href: "#impact", label: t("inv.nav.impact") },
    { href: "#team", label: t("inv.nav.team") },
  ];

  const go = (e: React.MouseEvent, href: string) => {
    if (window.location.pathname !== "/") return; // let browser navigate to /#id
    e.preventDefault();
    setOpen(false);
    smoothScrollTo(href);
  };

  const demo = () => {
    setOpen(false);
    if (BASE44.demo) window.open(BASE44.demo, "_blank", "noopener,noreferrer");
    else if (window.location.pathname === "/") smoothScrollTo("#vision-lab");
    else window.location.href = "/#vision-lab";
  };
  const investor = () => {
    setOpen(false);
    if (window.location.pathname === "/") smoothScrollTo("#investors");
    else window.location.href = "/#investors";
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled ? "border-border bg-warm-white/85 shadow-sm backdrop-blur-md" : "border-transparent bg-warm-white",
      )}
    >
      <Container className="flex h-16 max-w-7xl items-center justify-between gap-4">
        <Wordmark />
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label={t("nav.primary")}>
          {links.map((l) => (
            <a
              key={l.href}
              href={`/${l.href}`}
              onClick={(e) => go(e, l.href)}
              className="relative px-2.5 py-2 text-[13px] font-semibold text-charcoal/75 transition-colors hover:text-burgundy after:absolute after:bottom-1 after:left-2.5 after:right-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher compact />
          <Button size="sm" variant="outline" className="hidden md:inline-flex" onClick={investor}>
            {t("inv.cta.investor")}
          </Button>
          <Button size="sm" className="hidden sm:inline-flex" onClick={demo}>
            {t("inv.cta.demo")}
          </Button>
          <button
            type="button"
            aria-label={open ? t("nav.close_menu") : t("nav.open_menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-charcoal xl:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>
      <div className={cn("grid overflow-hidden transition-[grid-template-rows] duration-200 xl:hidden", open ? "grid-rows-[1fr] border-t border-border" : "grid-rows-[0fr]")}>
        <div className="min-h-0">
          <Container className="flex flex-col gap-1 py-3">
            {links.map((l) => (
              <a key={l.href} href={`/${l.href}`} onClick={(e) => go(e, l.href)} className="rounded-md px-3 py-2 text-sm font-semibold text-charcoal hover:bg-ivory">
                {l.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" onClick={investor}>{t("inv.cta.investor")}</Button>
              <Button size="sm" onClick={demo}>{t("inv.cta.demo")}</Button>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
