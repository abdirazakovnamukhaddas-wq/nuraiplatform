import { Container } from "./Container";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-surface" id="contact">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
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
          <p className="mt-2 max-w-md text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          © {year} NUR.AI. {t("footer.rights")}
        </p>
      </Container>
    </footer>
  );
}
