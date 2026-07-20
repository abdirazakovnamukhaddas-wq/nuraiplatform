import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const LOCALES = ["uz", "en", "ru", "kk"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, { native: string; short: string }> = {
  uz: { native: "O‘zbekcha", short: "UZ" },
  en: { native: "English", short: "EN" },
  ru: { native: "Русский", short: "RU" },
  kk: { native: "Qaraqalpaqsha", short: "KK" },
};

type Dict = Record<string, string>;

const en: Dict = {
  // Nav
  "nav.solutions": "Solutions",
  "nav.how": "How it works",
  "nav.institutions": "Institutions",
  "nav.security": "Security",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "cta.request_demo": "Request Demo",
  "cta.see_how": "See How It Works",

  // Hero
  "hero.eyebrow": "AI Camera Intelligence Platform",
  "hero.title": "Transform existing cameras into intelligent assistants.",
  "hero.subtitle":
    "NUR.AI helps professionals notice potential situations earlier and respond faster — while humans always remain in control.",
  "hero.badge_hitl": "Human-in-the-Loop by design",

  // Problem
  "problem.eyebrow": "The problem",
  "problem.title": "Institutions already have cameras. But cameras alone are not enough.",
  "problem.subtitle":
    "Traditional systems record footage but leave interpretation to overloaded staff. Important moments can pass unnoticed.",
  "problem.a.title": "Traditional cameras",
  "problem.a.1": "Only record footage",
  "problem.a.2": "Cannot interpret situations",
  "problem.a.3": "Cannot prioritize events",
  "problem.a.4": "No intelligent notifications",
  "problem.b.title": "With NUR.AI",
  "problem.b.1": "Live assistive analysis",
  "problem.b.2": "Context-aware suggestions",
  "problem.b.3": "Prioritized attention cues",
  "problem.b.4": "Quiet, targeted alerts",

  // Solution
  "solution.eyebrow": "The solution",
  "solution.title": "An intelligent assistant for the professionals who care for people.",
  "solution.subtitle":
    "NUR.AI analyses live streams from your existing cameras. When a potential situation is detected, the right staff member is quietly notified. A qualified professional reviews the moment and makes the final decision.",
  "solution.tag": "AI Assists. Humans Decide.",

  // How it works
  "how.eyebrow": "How it works",
  "how.title": "A calm, six-step assistive workflow.",
  "how.subtitle":
    "Every alert is a suggestion for a qualified professional — never an automated action.",
  "how.s1.title": "Existing cameras",
  "how.s1.body": "Works with the cameras your institution already operates.",
  "how.s2.title": "AI analysis",
  "how.s2.body": "Live video is analysed on your infrastructure.",
  "how.s3.title": "Potential situation detected",
  "how.s3.body": "The system highlights a moment that may deserve attention.",
  "how.s4.title": "Instant alert",
  "how.s4.body": "A quiet, contextual notification reaches the responsible staff.",
  "how.s5.title": "Professional review",
  "how.s5.body": "A qualified specialist reviews the context and evidence.",
  "how.s6.title": "Human decision",
  "how.s6.body": "The specialist decides the appropriate response. Always.",

  // Who we serve
  "serve.eyebrow": "Who we serve",
  "serve.title": "Built for institutions that carry real responsibility.",
  "serve.rehab.title": "Rehabilitation centers",
  "serve.rehab.body": "Support specialists caring for individuals in recovery.",
  "serve.schools.title": "Inclusive schools",
  "serve.schools.body": "Help teachers stay attentive to every child.",
  "serve.health.title": "Healthcare institutions",
  "serve.health.body": "Assist staff in high-responsibility environments.",
  "serve.gov.title": "Government organizations",
  "serve.gov.body": "Modernize public facilities responsibly.",
  "serve.social.title": "Social care institutions",
  "serve.social.body": "Extend the attention of dedicated caregivers.",
  "serve.ngo.title": "NGOs",
  "serve.ngo.body": "Amplify limited resources with responsible technology.",

  // AI Capabilities
  "caps.eyebrow": "AI capabilities",
  "caps.title": "Realistic, responsible detection.",
  "caps.subtitle":
    "NUR.AI does not diagnose and does not identify people. It surfaces patterns worth a human review.",
  "caps.fall.title": "Potential fall detection",
  "caps.fall.body": "Highlights movements that resemble a possible fall.",
  "caps.area.title": "Restricted area monitoring",
  "caps.area.body": "Notes presence in zones defined by your institution.",
  "caps.wander.title": "Wandering detection",
  "caps.wander.body": "Flags prolonged, unusual movement patterns.",
  "caps.emergency.title": "Emergency pattern recognition",
  "caps.emergency.body": "Recognises patterns that may indicate urgency.",
  "caps.behaviour.title": "Unusual behaviour cues",
  "caps.behaviour.body": "Surfaces deviations from routine activity.",
  "caps.activity.title": "Activity monitoring",
  "caps.activity.body": "Summarises general activity levels over time.",

  // Why
  "why.eyebrow": "Why NUR.AI",
  "why.title": "Practical advantages, without exaggeration.",
  "why.1.title": "Works with existing cameras",
  "why.1.body": "No hardware replacement required.",
  "why.2.title": "Human-in-the-loop",
  "why.2.body": "People always make the final call.",
  "why.3.title": "Responsible AI",
  "why.3.body": "Careful, non-diagnostic language.",
  "why.4.title": "Fast notifications",
  "why.4.body": "Quiet alerts reach the right person quickly.",
  "why.5.title": "Easy deployment",
  "why.5.body": "Integrates with your current infrastructure.",
  "why.6.title": "Privacy-first",
  "why.6.body": "No biometric identification.",
  "why.7.title": "Scalable architecture",
  "why.7.body": "Grows from a single site to many.",
  "why.8.title": "Modern dashboard",
  "why.8.body": "Clear review, transparent context.",

  // Security
  "sec.eyebrow": "Security & privacy",
  "sec.title": "Designed with responsibility at the center.",
  "sec.subtitle":
    "NUR.AI is built to be deployed inside institutions that already work with sensitive contexts.",
  "sec.1.title": "Existing infrastructure",
  "sec.1.body": "Runs alongside the systems you already trust.",
  "sec.2.title": "Privacy-first design",
  "sec.2.body": "No facial recognition, no biometric identification.",
  "sec.3.title": "Human review",
  "sec.3.body": "Every decision that matters is made by a person.",
  "sec.4.title": "Responsible AI",
  "sec.4.body": "No medical diagnosis, no absolute claims.",
  "sec.5.title": "Secure deployment",
  "sec.5.body": "Deployable within your institution's environment.",
  "sec.6.title": "Transparent decision support",
  "sec.6.body": "Context is provided so professionals can review calmly.",

  // FAQ
  "faq.eyebrow": "FAQ",
  "faq.title": "Questions institutions ask us most.",
  "faq.q1": "Can it work with existing cameras?",
  "faq.a1": "Yes. NUR.AI is designed to integrate with cameras already installed in your institution.",
  "faq.q2": "Does AI replace teachers or specialists?",
  "faq.a2": "No. NUR.AI is assistive. It supports the professionals who are already doing the work.",
  "faq.q3": "Does AI make final decisions?",
  "faq.a3": "Never. Every meaningful decision is made by a qualified human on the ground.",
  "faq.q4": "Can institutions control notifications?",
  "faq.a4": "Yes. Alert rules, zones and recipients are configurable to fit your workflow.",
  "faq.q5": "How is privacy protected?",
  "faq.a5":
    "NUR.AI avoids biometric identification and medical diagnosis, and can be deployed inside your infrastructure.",

  // Demo
  "demo.eyebrow": "Request a demo",
  "demo.title": "Explore a pilot with your institution.",
  "demo.subtitle":
    "Tell us a little about your context. Our team will reach out to arrange a tailored walkthrough.",
  "demo.form.title": "Request a demo",
  "demo.form.subtitle": "We reply within two business days.",
  "demo.f.institution": "Institution name",
  "demo.f.rep": "Representative name",
  "demo.f.role": "Job title",
  "demo.f.email": "Email",
  "demo.f.phone": "Phone",
  "demo.f.type": "Institution type",
  "demo.f.cameras": "Current camera system (optional)",
  "demo.f.children": "Number of children (optional)",
  "demo.f.message": "Message",
  "demo.f.consent": "I agree to the Privacy Policy.",
  "demo.f.submit": "Request Demo",
  "demo.f.sending": "Sending…",
  "demo.f.success.title": "Thank you.",
  "demo.f.success.body":
    "Your request has been received. Our team will contact you shortly to arrange a tailored walkthrough.",
  "demo.f.close": "Close",
  "demo.f.type.rehab": "Rehabilitation center",
  "demo.f.type.school": "Inclusive school",
  "demo.f.type.health": "Healthcare institution",
  "demo.f.type.gov": "Government organization",
  "demo.f.type.social": "Social care institution",
  "demo.f.type.ngo": "NGO",
  "demo.f.type.other": "Other",

  // Footer
  "footer.mission":
    "NUR.AI transforms existing cameras into intelligent assistants — supporting professionals, never replacing them.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms",
  "footer.tagline": "AI assists. Humans decide.",
  "footer.rights": "All rights reserved.",
};

const uz: Dict = {
  "nav.solutions": "Yechimlar",
  "nav.how": "Qanday ishlaydi",
  "nav.institutions": "Muassasalar",
  "nav.security": "Xavfsizlik",
  "nav.faq": "Savollar",
  "nav.contact": "Aloqa",
  "cta.request_demo": "Demoni so‘rash",
  "cta.see_how": "Qanday ishlashini ko‘rish",
  "hero.eyebrow": "AI Kamera Intellekt Platformasi",
  "hero.title": "Mavjud kameralarni aqlli yordamchiga aylantiring.",
  "hero.subtitle":
    "NUR.AI mutaxassislarga vaziyatlarni oldinroq sezishga va tezroq javob berishga yordam beradi — qarorni doim inson qabul qiladi.",
  "hero.badge_hitl": "Human-in-the-Loop tamoyili",
  "solution.tag": "AI yordam beradi. Inson qaror qiladi.",
  "footer.tagline": "AI yordam beradi. Inson qaror qiladi.",
  "footer.rights": "Barcha huquqlar himoyalangan.",
};

const ru: Dict = {
  "nav.solutions": "Решения",
  "nav.how": "Как это работает",
  "nav.institutions": "Учреждения",
  "nav.security": "Безопасность",
  "nav.faq": "Вопросы",
  "nav.contact": "Контакты",
  "cta.request_demo": "Запросить демо",
  "cta.see_how": "Как это работает",
  "hero.eyebrow": "Платформа AI-видеоаналитики",
  "hero.title": "Превратите существующие камеры в интеллектуальных помощников.",
  "hero.subtitle":
    "NUR.AI помогает специалистам замечать ситуации раньше и реагировать быстрее — окончательное решение всегда за человеком.",
  "hero.badge_hitl": "Принцип Human-in-the-Loop",
  "solution.tag": "ИИ помогает. Решает человек.",
  "footer.tagline": "ИИ помогает. Решает человек.",
  "footer.rights": "Все права защищены.",
};

const kk: Dict = {
  "nav.solutions": "Sheshimler",
  "nav.how": "Qalay isleydi",
  "nav.institutions": "Mákemeler",
  "nav.security": "Qawipsizlik",
  "nav.faq": "Sorawlar",
  "nav.contact": "Baylanıs",
  "cta.request_demo": "Demo soraw",
  "cta.see_how": "Qalay islewin kóriw",
  "hero.eyebrow": "AI Kamera Intellekt Platforması",
  "hero.title": "Bar kameralardı aqıllı járdemshige aylandırıń.",
  "hero.subtitle":
    "NUR.AI qánigelerge jaǵdaydı erterek baylaqlawǵa hám tez juwap beriwge járdem beredi — sheshim hámiyshe ádem tárepinen qabıllanadı.",
  "hero.badge_hitl": "Human-in-the-Loop tiykarında",
  "solution.tag": "AI járdem beredi. Ádem sheshedi.",
  "footer.tagline": "AI járdem beredi. Ádem sheshedi.",
  "footer.rights": "Barlıq huqıqlar qorǵalǵan.",
};

const dictionaries: Record<Locale, Dict> = { en, uz, ru, kk };

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);
const STORAGE_KEY = "nurai.locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && (LOCALES as readonly string[]).includes(saved)) {
        setLocaleState(saved);
      }
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const dict = dictionaries[locale];
    return {
      locale,
      setLocale: (l) => {
        setLocaleState(l);
        try {
          window.localStorage.setItem(STORAGE_KEY, l);
        } catch {
          /* noop */
        }
      },
      t: (key) => dict[key] ?? dictionaries.en[key] ?? key,
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
