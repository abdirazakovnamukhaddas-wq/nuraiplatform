import { Container } from "@/components/layout/Container";
import { useI18n } from "@/lib/i18n";

export function LegalNotice({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useI18n();
  const sections = kind === "privacy" ? ["data", "services", "rights"] : ["demo", "planned", "contact"];
  return (
    <Container className="max-w-3xl py-16">
      <h1 className="text-4xl font-bold text-foreground">{t(`footer.${kind}`)}</h1>
      <p className="mt-4 border-l-2 border-gold pl-4 text-sm text-muted-foreground">{t("legal.draft")}</p>
      <p className="mt-8 leading-relaxed">{t(`legal.${kind}.intro`)}</p>
      {sections.map((section) => (
        <section key={section} className="mt-8">
          <h2 className="text-2xl font-semibold">{t(`legal.${kind}.${section}.t`)}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{t(`legal.${kind}.${section}.d`)}</p>
        </section>
      ))}
    </Container>
  );
}