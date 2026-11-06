import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef, useState } from "react";
import {
  ArrowRight, BarChart3, Camera, Check, CheckCircle2, Cpu, Eye, Flag, Gauge, HeartHandshake,
  Layers, LineChart, Mail, Linkedin, ScanEye, ShieldCheck, Sprout, Target, UserCheck, Users, Video, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { smoothScrollTo } from "@/components/layout/Navbar";
import { useDemo } from "@/lib/demo-context";
import { useI18n } from "@/lib/i18n";
import { BASE44, IS_DEV } from "@/lib/base44";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/kindergarten_classroom_hero.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "NUR.AI — AI Safety Intelligence for Kindergartens" },
      { name: "description", content: "NUR.AI is building an intelligent safety assistant that helps kindergarten educators notice important moments and review potential risks. AI Assists. Humans Decide." },
      { property: "og:title", content: "NUR.AI — Upgrading Kindergarten Safety with AI" },
      { property: "og:description", content: "From passive cameras to proactive safety intelligence — with educators always in control." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 } }),
};
const inView = { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } } as const;

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={cn("inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase", light ? "text-gold" : "text-burgundy")}>
      <span className="h-px w-8 bg-gold" aria-hidden />
      {children}
    </p>
  );
}

function SectionNumber({ n, light }: { n: string; light?: boolean }) {
  return (
    <span aria-hidden className={cn("font-display text-[7rem] leading-none font-bold sm:text-[10rem]", light ? "text-gold" : "text-burgundy/10")}>
      {n}
    </span>
  );
}

function Simulated() {
  const { t } = useI18n();
  return (
    <span className="rounded-sm border border-gold/60 bg-burgundy-deep/80 px-1.5 py-0.5 text-[9px] font-bold tracking-[0.18em] text-gold uppercase">
      {t("inv.event.simulated")}
    </span>
  );
}

/* Launches the Base44 MVP if configured; otherwise a safe fallback. */
function LaunchLab({ className, size = "lg" }: { className?: string; size?: "lg" | "default" }) {
  const { t } = useI18n();
  const { openDemo } = useDemo();
  if (BASE44.demo) {
    return (
      <div className={className}>
        <Button asChild size={size} className="bg-gold text-burgundy-deep hover:bg-gold/90">
          <a href={BASE44.demo} target="_blank" rel="noopener noreferrer">
            {t("inv.lab.launch")} <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
        <p className="mt-2 text-xs text-ivory/70">{t("inv.lab.leaving")}</p>
      </div>
    );
  }
  return (
    <div className={className}>
      <Button size={size} onClick={openDemo} className="bg-gold text-burgundy-deep hover:bg-gold/90">
        {t("inv.lab.launch")} <ArrowRight className="h-4 w-4" />
      </Button>
      <p className="mt-2 text-xs text-ivory/70">{t("inv.lab.unavailable")}</p>
      {IS_DEV && (
        <p className="mt-2 rounded border border-dashed border-gold/60 px-2 py-1 font-mono text-[11px] text-gold">{t("inv.lab.dev")}</p>
      )}
    </div>
  );
}

function usePilot() {
  const { openDemo } = useDemo();
  return () => (BASE44.pilot ? window.open(BASE44.pilot, "_blank", "noopener,noreferrer") : openDemo());
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  const { t } = useI18n();
  const pilot = usePilot();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory">
      <div className="mx-auto grid max-w-[1440px] lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center px-5 py-14 sm:px-10 lg:py-20 lg:pr-12 lg:pl-16">
          <motion.div variants={reveal} initial="hidden" animate="visible" custom={0}>
            <Eyebrow>{t("inv.hero.eyebrow")}</Eyebrow>
          </motion.div>
          <motion.h1 variants={reveal} initial="hidden" animate="visible" custom={1}
            className="mt-6 text-[2.5rem] leading-[1.02] font-bold tracking-tight text-charcoal uppercase sm:text-6xl xl:text-[4.75rem]">
            {t("inv.hero.h1a")} <span className="text-burgundy">{t("inv.hero.h1b")}</span>{" "}
            <span className="relative inline-block italic text-gold [text-shadow:0_1px_0_var(--burgundy)]">{t("inv.hero.h1c")}</span>
          </motion.h1>
          <motion.p variants={reveal} initial="hidden" animate="visible" custom={2} className="mt-6 font-display text-xl text-burgundy italic sm:text-2xl">
            {t("inv.hero.sub")}
          </motion.p>
          <motion.p variants={reveal} initial="hidden" animate="visible" custom={3} className="mt-4 max-w-xl text-base leading-relaxed text-charcoal/75">
            {t("inv.hero.desc")}
          </motion.p>
          <motion.div variants={reveal} initial="hidden" animate="visible" custom={4} className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => smoothScrollTo("#vision-lab")}>
              {t("inv.hero.cta1")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-olive-deep text-olive-deep hover:bg-olive-deep hover:text-warm-white" onClick={pilot}>
              {t("inv.hero.cta2")}
            </Button>
          </motion.div>
          <motion.p variants={reveal} initial="hidden" animate="visible" custom={5} className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-olive-deep">
            <HeartHandshake className="h-4 w-4" aria-hidden /> {t("inv.hero.tagline")}
          </motion.p>
        </div>

        {/* RIGHT — camera visualisation */}
        <div className="relative min-h-[460px] overflow-hidden bg-burgundy-deep sm:min-h-[560px]">
          <motion.img style={{ y }} src={heroImg} width={1280} height={1536} alt={t("inv.hero.concept")}
            initial={{ scale: 1.08, filter: "blur(6px)" }} animate={{ scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute inset-0 h-[110%] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/85 via-transparent to-burgundy-deep/30" aria-hidden />

          {/* viewfinder corners */}
          <div aria-hidden className="pointer-events-none absolute inset-5 sm:inset-8">
            {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
              <span key={c} className={cn("absolute h-7 w-7 border-gold/80", c)} />
            ))}
          </div>
          <div className="absolute top-8 left-8 flex items-center gap-2 sm:top-11 sm:left-11">
            <span className="rounded-sm bg-burgundy-deep/80 px-2 py-1 font-mono text-[10px] tracking-wider text-ivory">{t("inv.hero.cam")}</span>
            <Simulated />
          </div>

          {/* bounding boxes */}
          <motion.div aria-hidden className="absolute top-[42%] left-[22%] h-[30%] w-[50%] rounded-sm border border-gold/80"
            animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>
            <span className="absolute -top-5 left-0 bg-gold px-1.5 text-[10px] font-bold text-burgundy-deep">{t("inv.hero.box1")}</span>
          </motion.div>
          <motion.div aria-hidden className="absolute top-[20%] left-[38%] h-[26%] w-[28%] rounded-sm border border-dashed border-ivory/70"
            animate={reduce ? undefined : { scale: [1, 1.03, 1] }} transition={{ duration: 4, repeat: Infinity }}>
            <span className="absolute -top-5 left-0 bg-ivory/90 px-1.5 text-[10px] font-bold text-burgundy-deep">{t("inv.hero.box2")}</span>
          </motion.div>

          {/* floating event card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
            className="absolute right-5 bottom-14 left-5 rounded-lg border border-gold/40 bg-burgundy-deep/90 p-4 text-ivory shadow-xl backdrop-blur sm:right-10 sm:left-auto sm:w-80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">{t("inv.event.sample")}</span>
              <Simulated />
            </div>
            <p className="mt-2 font-display text-2xl font-semibold">{t("inv.event.title")}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-ivory/80"><UserCheck className="h-3.5 w-3.5 text-gold" /> {t("inv.event.review")}</p>
            <div className="mt-3 grid grid-cols-2 gap-2" aria-hidden>
              <span className="rounded bg-gold py-1.5 text-center text-xs font-bold text-burgundy-deep">{t("inv.event.confirm")}</span>
              <span className="rounded border border-ivory/30 py-1.5 text-center text-xs font-semibold">{t("inv.event.dismiss")}</span>
            </div>
          </motion.div>
          <p className="absolute bottom-4 left-5 text-[10px] tracking-wide text-ivory/70 sm:left-10">{t("inv.hero.concept")}</p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 01 INVISIBLE SHIELD ─────────────── */
function Shield() {
  const { t } = useI18n();
  return (
    <section id="problem" className="scroll-mt-16 bg-burgundy-deep py-24 text-ivory">
      <Container className="max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-end">
          <motion.div variants={reveal} {...inView}><SectionNumber n="01" light /></motion.div>
          <motion.div variants={reveal} {...inView} custom={1} className="pb-4">
            <h2 className="text-4xl font-bold sm:text-6xl">{t("inv.shield.title")}</h2>
            <p className="mt-4 max-w-xl font-display text-xl text-ivory/80 italic">{t("inv.shield.copy")}</p>
          </motion.div>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <motion.div variants={reveal} {...inView} className="rounded-xl border border-ivory/10 bg-ivory/[0.03] p-8">
            <p className="text-xs font-bold tracking-[0.2em] text-ivory/50 uppercase">{t("inv.shield.a.label")}</p>
            <p className="mt-2 font-display text-3xl text-ivory/70">{t("inv.shield.a.result")}</p>
            <ul className="mt-6 space-y-3 text-sm text-ivory/60">
              {[1, 2, 3].map((n) => <li key={n} className="flex gap-3"><X className="mt-0.5 h-4 w-4 shrink-0" />{t(`inv.shield.a.${n}`)}</li>)}
            </ul>
          </motion.div>
          <motion.div variants={reveal} {...inView} custom={1} className="rounded-xl border border-gold/40 bg-burgundy p-8 shadow-xl">
            <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase">{t("inv.shield.b.label")}</p>
            <p className="mt-2 font-display text-3xl">{t("inv.shield.b.result")}</p>
            <ul className="mt-6 space-y-3 text-sm text-ivory/90">
              {[1, 2, 3].map((n) => <li key={n} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{t(`inv.shield.b.${n}`)}</li>)}
            </ul>
          </motion.div>
        </div>
        <p className="mt-8 text-sm text-ivory/60">{t("inv.shield.note")}</p>
      </Container>
    </section>
  );
}

/* ─────────────── 02 HOW IT WORKS ─────────────── */
function How() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const steps = [Camera, ScanEye, Flag, UserCheck];
  return (
    <section id="solution" className="scroll-mt-16 bg-warm-white py-24">
      <Container className="max-w-7xl">
        <div className="flex flex-wrap items-end gap-8">
          <SectionNumber n="02" />
          <div className="pb-4">
            <h2 className="text-4xl font-bold text-charcoal sm:text-5xl">{t("inv.how.title")}</h2>
            <p className="mt-3 max-w-xl text-charcoal/70">{t("inv.how.sub")}</p>
          </div>
        </div>
        <div className="relative mt-14 grid gap-4 md:grid-cols-4">
          <div aria-hidden className="absolute top-10 right-[12%] left-[12%] hidden h-px bg-border md:block">
            <motion.div className="h-px bg-gold" animate={{ width: `${(active / 3) * 100}%` }} transition={{ duration: 0.5 }} />
          </div>
          {steps.map((Icon, i) => (
            <button key={i} type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={cn("relative rounded-xl border p-6 text-left transition-all duration-300", active >= i ? "border-burgundy/30 bg-ivory shadow-md" : "border-border bg-card")}>
              <span className={cn("relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors", active >= i ? "border-gold bg-burgundy text-gold" : "border-border bg-card text-charcoal/50")}>
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-5 font-mono text-xs text-burgundy">0{i + 1}</p>
              <p className="mt-1 font-display text-xl font-semibold text-charcoal">{t(`inv.how.${i + 1}.t`)}</p>
              <p className="mt-2 text-sm text-charcoal/70">{t(`inv.how.${i + 1}.d`)}</p>
            </button>
          ))}
        </div>
        <p className="mt-8 rounded-lg border border-olive/30 bg-olive/10 px-4 py-3 text-sm text-olive-deep">{t("inv.how.status")}</p>
      </Container>
    </section>
  );
}

/* ─────────────── 03 VISION LAB ─────────────── */
function VisionLab() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"pending" | "confirmed" | "dismissed">("pending");
  const events = [
    { time: "09:42", label: t("inv.lab.ev1"), tone: "bg-olive" },
    { time: "10:15", label: t("inv.lab.ev2"), tone: "bg-gold" },
    { time: "11:03", label: t("inv.lab.ev3"), tone: "bg-ivory/40" },
  ];
  return (
    <section id="vision-lab" className="scroll-mt-16 bg-burgundy py-24 text-ivory">
      <Container className="max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow light>{t("inv.lab.eyebrow")}</Eyebrow>
            <h2 className="mt-5 text-5xl font-bold uppercase sm:text-7xl">{t("inv.lab.title")}</h2>
            <p className="mt-4 max-w-xl text-lg text-ivory/80">{t("inv.lab.desc")}</p>
          </div>
          <LaunchLab />
        </div>

        <motion.div variants={reveal} {...inView} className="mt-14 overflow-hidden rounded-2xl border border-gold/30 bg-burgundy-deep shadow-2xl">
          <div className="flex items-center justify-between border-b border-ivory/10 px-5 py-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold"><Eye className="h-4 w-4 text-gold" /> NUR.AI Vision Lab</span>
            <Simulated />
          </div>
          <div className="grid lg:grid-cols-[1.6fr_1fr]">
            <div className="relative aspect-video overflow-hidden">
              <img src={heroImg} alt={t("inv.lab.preview")} loading="lazy" width={1280} height={1536} className="h-full w-full object-cover opacity-70 grayscale-[30%]" />
              <div className="absolute top-[45%] left-[24%] h-[32%] w-[46%] border-2 border-gold" aria-hidden />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded bg-burgundy-deep/85 px-2 py-1 text-[11px]"><Video className="h-3.5 w-3.5 text-gold" />{t("inv.lab.preview")}</span>
            </div>
            <div className="space-y-5 p-6">
              <dl className="grid grid-cols-1 gap-3 text-sm">
                {[["inv.lab.type", "inv.lab.type.v"], ["inv.lab.source", "inv.lab.source.v"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-ivory/10 pb-2"><dt className="text-ivory/60">{t(k)}</dt><dd className="font-semibold">{t(v)}</dd></div>
                ))}
                <div className="flex justify-between gap-4 border-b border-ivory/10 pb-2">
                  <dt className="text-ivory/60">{t("inv.lab.status")}</dt>
                  <dd className="font-semibold text-gold" aria-live="polite">
                    {status === "pending" ? t("inv.lab.status.v") : status === "confirmed" ? t("inv.event.confirm") : t("inv.event.dismiss")}
                  </dd>
                </div>
              </dl>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => setStatus("confirmed")} className="bg-gold text-burgundy-deep hover:bg-gold/90"><CheckCircle2 className="h-4 w-4" />{t("inv.event.confirm")}</Button>
                <Button variant="outline" onClick={() => setStatus("dismissed")} className="border-ivory/30 bg-transparent text-ivory hover:bg-ivory/10 hover:text-ivory"><X className="h-4 w-4" />{t("inv.event.dismiss")}</Button>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-ivory/60 uppercase">{t("inv.lab.timeline")}</p>
                <ol className="mt-3 space-y-2">
                  {events.map((e) => (
                    <li key={e.time} className="flex items-center gap-3 text-sm"><span className={cn("h-2 w-2 rounded-full", e.tone)} /><span className="font-mono text-xs text-ivory/60">{e.time}</span>{e.label}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-ivory/60">
          <span>{t("inv.lab.illustrative")}</span>
          {BASE44.app && <a href={BASE44.app} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline-offset-4 hover:underline">{t("inv.lab.dashboard")} →</a>}
        </div>
      </Container>
    </section>
  );
}

/* ─────────────── 04 TECHNOLOGY ─────────────── */
function Technology() {
  const { t } = useI18n();
  const flow = [Video, Cpu, Layers, Gauge, UserCheck];
  const status = [
    { k: "s1", tone: "bg-olive-deep text-warm-white", done: true },
    { k: "s2", tone: "bg-gold text-burgundy-deep", done: false },
    { k: "s3", tone: "border border-burgundy text-burgundy", done: false },
  ];
  return (
    <section id="technology" className="scroll-mt-16 bg-ivory py-24">
      <Container className="max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionNumber n="04" />
            <h2 className="-mt-6 text-4xl font-bold text-charcoal uppercase sm:text-5xl">{t("inv.tech.title")}</h2>
            <p className="mt-4 text-charcoal/70">{t("inv.tech.sub")}</p>
            <div className="mt-8 space-y-3">
              {status.map((s) => (
                <div key={s.k} className="flex items-start gap-4 rounded-lg bg-warm-white p-4 shadow-sm">
                  <span className={cn("shrink-0 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase", s.tone)}>{t(`inv.tech.${s.k}`)}</span>
                  <p className="text-sm text-charcoal/75">{t(`inv.tech.${s.k}d`)}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-charcoal/60">{t("inv.tech.honest")}</p>
          </div>
          <ol className="relative space-y-3">
            {flow.map((Icon, i) => (
              <motion.li key={i} variants={reveal} {...inView} custom={i}
                className={cn("flex items-center gap-5 rounded-xl p-5", i === 4 ? "bg-olive-deep text-warm-white" : "bg-burgundy text-ivory")}>
                <span className="font-display text-3xl text-gold">0{i + 1}</span>
                <Icon className="h-5 w-5 text-gold" aria-hidden />
                <span className="font-semibold">{t(`inv.tech.${i + 1}`)}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────── 05 BUSINESS ─────────────── */
function Business() {
  const { t } = useI18n();
  const cards = [Target, ShieldCheck, LineChart, Sprout];
  const road = ["r1", "r2", "r3", "r4"];
  return (
    <section id="business" className="scroll-mt-16 bg-warm-white py-24">
      <Container className="max-w-7xl">
        <Eyebrow>{t("inv.biz.eyebrow")}</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl font-bold text-charcoal uppercase sm:text-5xl">{t("inv.biz.title")}</h2>
        <p className="mt-3 text-charcoal/70">{t("inv.biz.sub")}</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((Icon, i) => (
            <motion.div key={i} variants={reveal} {...inView} custom={i}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg">
              <Icon className="h-6 w-6 text-burgundy transition-transform group-hover:scale-110" />
              <p className="mt-5 font-display text-xl font-semibold text-charcoal">{t(`inv.biz.c${i + 1}.t`)}</p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{t(`inv.biz.c${i + 1}.d`)}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-14 rounded-2xl bg-olive-deep p-8 text-warm-white">
          <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase">{t("inv.biz.road")}</p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-4">
            {road.map((r, i) => (
              <li key={r} className={cn("rounded-lg p-4", i === 0 ? "bg-gold text-burgundy-deep" : "border border-dashed border-warm-white/30")}>
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-80">{i === 0 ? t("inv.biz.now") : t("inv.biz.future")}</p>
                <p className="mt-1 font-display text-lg font-semibold">{t(`inv.biz.${r}`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────── 06 IMPACT ─────────────── */
function Impact() {
  const { t } = useI18n();
  const icons = [HeartHandshake, Eye, BarChart3, CheckCircle2];
  return (
    <section id="impact" className="scroll-mt-16 bg-burgundy-deep py-24 text-ivory">
      <Container className="max-w-7xl">
        <Eyebrow light>{t("inv.impact.eyebrow")}</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl font-bold uppercase sm:text-5xl">{t("inv.impact.title")}</h2>
        <p className="mt-3 text-ivory/70">{t("inv.impact.sub")}</p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {icons.map((Icon, i) => (
            <div key={i} className="bg-burgundy-deep p-7 transition-colors hover:bg-burgundy">
              <Icon className="h-6 w-6 text-gold" />
              <p className="mt-5 font-display text-xl font-semibold">{t(`inv.impact.${i + 1}.t`)}</p>
              <p className="mt-2 text-sm text-ivory/70">{t(`inv.impact.${i + 1}.d`)}</p>
            </div>
          ))}
        </div>
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {["m1", "m2"].map((m) => (
            <li key={m} className="flex items-start gap-3 rounded-lg border border-gold/30 p-4 text-sm">
              <span className="shrink-0 rounded bg-olive px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">{t("inv.impact.milestone")}</span>
              {t(`inv.impact.${m}`)}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ─────────────── 07 TEAM ─────────────── */
/* Edit this list once team information is verified. */
const TEAM: { name?: string; roleKey: string; bio?: string }[] = [
  { roleKey: "inv.team.founder" },
  { roleKey: "inv.team.member" },
  { roleKey: "inv.team.member" },
];

function Team() {
  const { t } = useI18n();
  return (
    <section id="team" className="scroll-mt-16 bg-ivory py-24">
      <Container className="grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Eyebrow>{t("inv.team.eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold text-charcoal uppercase sm:text-5xl">{t("inv.team.title")}</h2>
          <p className="mt-6 font-display text-xl leading-relaxed text-burgundy italic">{t("inv.team.mission")}</p>
        </div>
        <div>
          <div className="grid gap-4 sm:grid-cols-3">
            {TEAM.map((m, i) => (
              <div key={i} className="rounded-xl border border-border bg-warm-white p-5">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-surface-muted"><Users className="h-8 w-8 text-olive" aria-hidden /></div>
                <p className="mt-4 font-display text-lg font-semibold text-charcoal">{m.name ?? t("inv.team.pending")}</p>
                <p className="text-xs font-semibold tracking-wide text-burgundy uppercase">{t(m.roleKey)}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-charcoal/60">{t("inv.team.note")}</p>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────── INVESTORS + PILOT ─────────────── */
function Investors() {
  const { t } = useI18n();
  const { openDemo } = useDemo();
  const pilot = usePilot();
  return (
    <section id="investors" className="scroll-mt-16 bg-burgundy py-24 text-ivory">
      <Container className="max-w-7xl">
        <Eyebrow light>{t("inv.inv.eyebrow")}</Eyebrow>
        <h2 className="mt-5 max-w-4xl text-4xl font-bold uppercase sm:text-6xl">{t("inv.inv.title")}</h2>
        <p className="mt-4 max-w-2xl text-lg text-ivory/80">{t("inv.inv.sub")}</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="rounded-xl border border-ivory/10 bg-burgundy-deep/60 p-6 transition-colors hover:border-gold/60">
              <p className="font-display text-sm text-gold">0{n}</p>
              <p className="mt-2 font-display text-xl font-semibold">{t(`inv.inv.${n}.t`)}</p>
              <p className="mt-2 text-sm text-ivory/70">{t(`inv.inv.${n}.d`)}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button size="lg" onClick={openDemo} className="bg-gold text-burgundy-deep hover:bg-gold/90">{t("inv.inv.cta")} <ArrowRight className="h-4 w-4" /></Button>
        </div>

        <div className="mt-20 grid gap-8 rounded-2xl bg-ivory p-8 text-charcoal sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h3 className="text-3xl font-bold sm:text-4xl">{t("inv.pilot.title")}</h3>
            <p className="mt-3 text-charcoal/70">{t("inv.pilot.sub")}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <a href={`mailto:${t("contact.email_value")}`} className="inline-flex items-center gap-2 font-semibold text-burgundy hover:underline"><Mail className="h-4 w-4" />{t("contact.email_value")}</a>
              <a href="https://www.linkedin.com/company/nur-ai-platform" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-burgundy hover:underline"><Linkedin className="h-4 w-4" />LinkedIn</a>
            </div>
          </div>
          <Button size="lg" onClick={pilot} className="justify-self-start lg:justify-self-end">{t("inv.pilot.cta")} <ArrowRight className="h-4 w-4" /></Button>
        </div>
        <p className="mt-16 text-center font-display text-2xl text-gold italic sm:text-3xl">{t("inv.closing")}</p>
        <p className="mt-2 text-center text-sm font-semibold tracking-[0.2em] text-ivory/70 uppercase">{t("inv.hero.tagline")}</p>
      </Container>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Shield />
      <How />
      <VisionLab />
      <Technology />
      <Business />
      <Impact />
      <Team />
      <Investors />
    </>
  );
}
