import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BellRing,
  Bot,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Eye,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  HeartPulse,
  Landmark,
  Layers,
  Lock,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserRound,
  Users,
  Waves,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useDemo } from "@/lib/demo-context";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.06 },
  }),
};

/* ────────────────────────────  HERO  ──────────────────────────── */

function Hero({ onDemo }: { onDemo: () => void }) {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.accent/25),transparent_60%)]"
      />
      {/* ambient pulses */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
          animate={{ y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
          animate={{ y: [0, -25, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

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
              <Button size="lg" onClick={onDemo}>
                {t("cta.request_demo")}
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document.querySelector("#how")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t("cta.see_how")}
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

function HeroVisual() {
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
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
            { icon: Activity, label: "Attention pattern shift" },
            { icon: Users, label: "Group dynamic — check-in suggested" },
            { icon: UserRound, label: "Individual well-being cue" },
          ].map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                <row.icon className="h-4 w-4 text-secondary" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{row.label}</p>
                <p className="text-xs text-muted-foreground">
                  Suggestion · reviewable · non-diagnostic
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
            </motion.div>
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

/* ────────────────────────────  PROBLEM  ──────────────────────────── */

function Problem() {
  const { t } = useI18n();
  const a = [t("problem.a.1"), t("problem.a.2"), t("problem.a.3"), t("problem.a.4")];
  const b = [t("problem.b.1"), t("problem.b.2"), t("problem.b.3"), t("problem.b.4")];
  return (
    <section id="problem" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("problem.eyebrow")}
          title={t("problem.title")}
          subtitle={t("problem.subtitle")}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <Card className="h-full border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <XCircle className="h-4 w-4" aria-hidden />
                  {t("problem.a.title")}
                </div>
                <ul className="mt-4 space-y-3">
                  {a.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={1}
          >
            <Card className="h-full border-secondary/30 bg-card shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                  {t("problem.b.title")}
                </div>
                <ul className="mt-4 space-y-3">
                  {b.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ────────────────────────────  SOLUTION  ──────────────────────────── */

function Solution() {
  const { t } = useI18n();
  return (
    <section id="solutions" className="border-y border-border bg-surface py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow={t("solution.eyebrow")}
              title={t("solution.title")}
              subtitle={t("solution.subtitle")}
            />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden />
              {t("solution.tag")}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl border border-border bg-background p-5 shadow-sm"
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Camera, label: "Existing camera" },
                { icon: Bot, label: "Assistive AI" },
                { icon: BellRing, label: "Quiet alert" },
                { icon: UserCheck, label: "Human decision" },
              ].map((n) => (
                <div
                  key={n.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background text-secondary">
                    <n.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-foreground">{n.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ────────────────────────────  HOW IT WORKS  ──────────────────────────── */

function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { icon: Camera, key: "s1" },
    { icon: Bot, key: "s2" },
    { icon: AlertTriangle, key: "s3" },
    { icon: BellRing, key: "s4" },
    { icon: ClipboardCheck, key: "s5" },
    { icon: UserCheck, key: "s6" },
  ] as const;
  return (
    <section id="how" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("how.eyebrow")}
          title={t("how.title")}
          subtitle={t("how.subtitle")}
        />
        <div className="relative mt-12">
          <div
            aria-hidden
            className="absolute top-6 left-6 hidden h-[calc(100%-3rem)] w-px bg-border md:block"
          />
          <ol className="space-y-4 md:space-y-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className="relative flex gap-4 md:gap-6"
              >
                <div className="relative">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-secondary shadow-sm">
                    <s.icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <Card className="flex-1 border-border">
                  <CardContent className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Step {i + 1}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-foreground">
                        {t(`how.${s.key}.title`)}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t(`how.${s.key}.body`)}
                      </p>
                    </div>
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:inline" />
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ────────────────────────────  WHO WE SERVE  ──────────────────────────── */

function WhoWeServe() {
  const { t } = useI18n();
  const items = [
    { icon: GraduationCap, key: "schools" },
    { icon: HeartPulse, key: "rehab" },
    { icon: Activity, key: "health" },
    { icon: Landmark, key: "gov" },
    { icon: HandHeart, key: "social" },
    { icon: Users, key: "ngo" },
  ] as const;
  return (
    <section id="institutions" className="border-t border-border bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t("serve.eyebrow")} title={t("serve.title")} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <motion.div
              key={a.key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i}
              className="group rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-muted text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                <a.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {t(`serve.${a.key}.title`)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(`serve.${a.key}.body`)}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ────────────────────────────  AI CAPABILITIES  ──────────────────────────── */

function Capabilities() {
  const { t } = useI18n();
  const items = [
    { icon: Waves, key: "fall" },
    { icon: Lock, key: "area" },
    { icon: Compass, key: "wander" },
    { icon: AlertTriangle, key: "emergency" },
    { icon: Eye, key: "behaviour" },
    { icon: Activity, key: "activity" },
  ] as const;
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("caps.eyebrow")}
          title={t("caps.title")}
          subtitle={t("caps.subtitle")}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <motion.div
              key={c.key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="h-full border-border transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-secondary">
                    <c.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {t(`caps.${c.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`caps.${c.key}.body`)}
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

/* ────────────────────────────  WHY NUR.AI  ──────────────────────────── */

function Why() {
  const { t } = useI18n();
  const items = [
    { icon: Camera, k: "1" },
    { icon: UserCheck, k: "2" },
    { icon: ShieldCheck, k: "3" },
    { icon: Zap, k: "4" },
    { icon: Rocket, k: "5" },
    { icon: Lock, k: "6" },
    { icon: Layers, k: "7" },
    { icon: MonitorSmartphone, k: "8" },
  ];
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t("why.eyebrow")} title={t("why.title")} />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.k}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i}
              className="rounded-2xl border border-border bg-background p-5"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted text-secondary">
                <it.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {t(`why.${it.k}.title`)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(`why.${it.k}.body`)}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ────────────────────────────  SECURITY  ──────────────────────────── */

function Security() {
  const { t } = useI18n();
  const items = [
    { icon: Layers, k: "1" },
    { icon: Lock, k: "2" },
    { icon: UserCheck, k: "3" },
    { icon: HeartHandshake, k: "4" },
    { icon: ShieldCheck, k: "5" },
    { icon: Eye, k: "6" },
  ];
  return (
    <section id="security" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("sec.eyebrow")}
          title={t("sec.title")}
          subtitle={t("sec.subtitle")}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.k}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary">
                <it.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {t(`sec.${it.k}.title`)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(`sec.${it.k}.body`)}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ────────────────────────────  FAQ  ──────────────────────────── */

function FAQ() {
  const { t } = useI18n();
  const qs = [1, 2, 3, 4, 5] as const;
  return (
    <section id="faq" className="border-t border-border bg-surface py-20 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
        <Accordion type="single" collapsible className="mt-8 w-full">
          {qs.map((n) => (
            <AccordionItem key={n} value={`q${n}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {t(`faq.q${n}`)}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {t(`faq.a${n}`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

/* ────────────────────────────  DEMO CTA  ──────────────────────────── */

function DemoCTA({ onDemo }: { onDemo: () => void }) {
  const { t } = useI18n();
  return (
    <section id="contact" className="py-20 sm:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-border bg-primary p-10 text-primary-foreground sm:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,theme(colors.accent/25),transparent_50%)]"
          />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium tracking-wide uppercase">
                {t("demo.eyebrow")}
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("demo.title")}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
                {t("demo.subtitle")}
              </p>
            </div>
            <div className="flex md:justify-end">
              <Button size="lg" variant="secondary" onClick={onDemo}>
                {t("cta.request_demo")}
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ────────────────────────────  PAGE  ──────────────────────────── */

function HomePage() {
  const { openDemo } = useDemo();
  return (
    <>
      <Hero onDemo={openDemo} />
      <Problem />
      <Solution />
      <HowItWorks />
      <WhoWeServe />
      <Capabilities />
      <Why />
      <Security />
      <FAQ />
      <DemoCTA onDemo={openDemo} />
    </>
  );
}
