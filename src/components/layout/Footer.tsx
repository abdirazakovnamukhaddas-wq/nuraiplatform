import { Linkedin, Mail } from "lucide-react";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-base font-semibold tracking-tight text-foreground">
              NUR<span className="text-secondary">.AI</span>
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t("footer.mission")}
          </p>
          <p className="mt-4 text-xs font-medium text-foreground">{t("footer.tagline")}</p>
        </div>

        <div className="text-sm">
          <p className="mb-3 text-xs font-semibold tracking-wide text-foreground uppercase">
            {t("nav.contact")}
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href={`mailto:${t("contact.email_value")}`}
                className="inline-flex items-center gap-2 break-all hover:text-foreground"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {t("contact.email_value")}
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/nur-ai-platform"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Linkedin className="h-4 w-4 shrink-0" aria-hidden />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-3 text-xs font-semibold tracking-wide text-foreground uppercase">
            {t("footer.legal")}
          </p>

          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground">
                {t("footer.privacy")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                {t("footer.terms")}
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {year} NUR.AI. {t("footer.rights")}
          </p>
          <p>{t("hero.badge_hitl")}</p>
        </Container>
      </div>
    </footer>
  );
}
