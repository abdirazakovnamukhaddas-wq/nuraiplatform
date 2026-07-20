import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden">
      {/* calm gradient wash — GPU-friendly, no layout impact */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.accent/25),transparent_60%)]"
      />
      <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.span
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase"
            >
              <Sparkles className="h-3.5 w-3.5 text-secondary" aria-hidden />
              {t("hero.eyebrow")}
            </motion.span>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="mt-5 text-4xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg">
                <a href="#contact">
                  {t("cta.request_demo")}
                  <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#trust">{t("cta.talk_to_team")}</a>
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <ShieldCheck className="h-4 w-4 text-success" aria-hidden />
              {t("hero.badge_hitl")}
            </motion.div>
          </div>

          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}

/** Abstract, non-alarming visual: soft "signal" card representing an assistive suggestion.
 *  Deliberately not a camera feed — NUR.AI is assistive, not surveillance. */
function HeroVisual() {
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative"
    >
      <div className="rounded-3xl border border-border bg-card p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="inline-flex h-2 w-2 rounded-full bg-success" aria-hidden />
            Assistive signal
          </div>
          <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            Human review required
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {[
            { icon: Activity, label: "Attention pattern shift", tone: "text-secondary" },
            { icon: Users, label: "Group dynamic — check-in suggested", tone: "text-secondary" },
            { icon: UserRound, label: "Individual well-being cue", tone: "text-secondary" },
          ].map((row, i) => (
            <div
              key={row.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                <row.icon className={`h-4 w-4 ${row.tone}`} aria-hidden />
              </span>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{row.label}</p>
                <p className="text-xs text-muted-foreground">Suggestion · reviewable · non-diagnostic</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-primary p-3 text-primary-foreground">
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-accent" aria-hidden />
            <span className="font-medium">{t("hero.badge_hitl")}</span>
          </div>
          <span className="text-xs opacity-80">AI assists · humans decide</span>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,theme(colors.secondary/15),transparent_60%)]"
      />
    </motion.div>
  );
}

function Principles() {
  const { t } = useI18n();
  const items = [
    { icon: UserRound, key: "assist" as const },
    { icon: ShieldCheck, key: "privacy" as const },
    { icon: Activity, key: "calm" as const },
  ];
  return (
    <section id="trust" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("nav.trust")}
          title={t("principles.title")}
          subtitle={t("principles.subtitle")}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="h-full border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                    <item.icon className="h-5 w-5 text-secondary" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {t(`principle.${item.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`principle.${item.key}.body`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Audiences() {
  const { t } = useI18n();
  const audiences = [
    { icon: HeartPulse, key: "audiences.rehab" },
    { icon: GraduationCap, key: "audiences.schools" },
    { icon: Activity, key: "audiences.health" },
    { icon: Users, key: "audiences.ngo" },
    { icon: Landmark, key: "audiences.gov" },
    { icon: Building2, key: "audiences.enterprise" },
  ];
  return (
    <section id="solutions" className="border-t border-border bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t("nav.solutions")} title={t("audiences.title")} />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <motion.div
              key={a.key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-secondary/40"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                <a.icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-sm font-medium text-foreground">{t(a.key)}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <div id="platform" />
      <Principles />
      <Audiences />
    </>
  );
}
