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

const dictionaries: Record<Locale, Dict> = {
  en: {
    "nav.platform": "Platform",
    "nav.solutions": "Solutions",
    "nav.trust": "Responsible AI",
    "nav.contact": "Contact",
    "cta.request_demo": "Request a demo",
    "cta.talk_to_team": "Talk to our team",
    "hero.eyebrow": "AI Camera Intelligence Platform",
    "hero.title": "Assistive AI for the professionals who care for people.",
    "hero.subtitle":
      "NUR.AI works with your existing cameras to help teachers, rehabilitation specialists and caregivers notice situations earlier and respond faster. AI assists — humans always decide.",
    "hero.badge_hitl": "Human-in-the-Loop by design",
    "principles.title": "Built on responsible principles",
    "principles.subtitle":
      "NUR.AI is not surveillance and not facial recognition. It is an assistive layer that supports the people already doing the work.",
    "principle.assist.title": "AI assists, humans decide",
    "principle.assist.body":
      "Every alert is a suggestion for a qualified professional. The final judgement stays with the specialist on the ground.",
    "principle.privacy.title": "Privacy by design",
    "principle.privacy.body":
      "Deployed on your infrastructure, integrated with your existing cameras. No biometric identification, no medical diagnosis.",
    "principle.calm.title": "Calm, not alarming",
    "principle.calm.body":
      "Signals are quiet, contextual and reviewable — designed to reduce cognitive load, not add noise to already demanding environments.",
    "audiences.title": "Made for the institutions that carry real responsibility",
    "audiences.rehab": "Rehabilitation centers",
    "audiences.schools": "Inclusive schools",
    "audiences.health": "Healthcare organizations",
    "audiences.ngo": "NGOs",
    "audiences.gov": "Government agencies",
    "audiences.enterprise": "Enterprise & investors",
    "footer.tagline": "Assistive AI. Human decisions.",
    "footer.rights": "All rights reserved.",
  },
  uz: {
    "nav.platform": "Platforma",
    "nav.solutions": "Yechimlar",
    "nav.trust": "Mas’uliyatli AI",
    "nav.contact": "Aloqa",
    "cta.request_demo": "Demoni so‘rash",
    "cta.talk_to_team": "Jamoamiz bilan bog‘lanish",
    "hero.eyebrow": "AI Kamera Intellekt Platformasi",
    "hero.title": "Insonlar haqida g‘amxo‘rlik qiluvchi mutaxassislar uchun yordamchi AI.",
    "hero.subtitle":
      "NUR.AI mavjud kameralaringiz bilan ishlaydi: o‘qituvchilar, reabilitatsiya mutaxassislari va parvarish qiluvchilarga vaziyatlarni oldinroq sezishga yordam beradi. AI yordam beradi — qarorni doim inson qabul qiladi.",
    "hero.badge_hitl": "Human-in-the-Loop tamoyili",
    "principles.title": "Mas’uliyatli tamoyillar asosida",
    "principles.subtitle":
      "NUR.AI kuzatuv tizimi ham, yuzni tanish tizimi ham emas. U mutaxassislarga yordam beruvchi qatlam.",
    "principle.assist.title": "AI yordam beradi, inson qaror qiladi",
    "principle.assist.body":
      "Har bir signal — malakali mutaxassis uchun taklif. Yakuniy qarorni doim joydagi mutaxassis qabul qiladi.",
    "principle.privacy.title": "Maxfiylik — dizayn darajasida",
    "principle.privacy.body":
      "Sizning infratuzilmangizda joylashtiriladi va mavjud kameralar bilan integratsiya qilinadi. Biometrik identifikatsiya va tibbiy tashxis yo‘q.",
    "principle.calm.title": "Xotirjam, shovqinsiz",
    "principle.calm.body":
      "Signallar sokin, kontekstli va qayta ko‘rib chiqiladigan — ortiqcha shovqin emas, aniqlik uchun.",
    "audiences.title": "Haqiqiy mas’uliyatni his qiladigan tashkilotlar uchun",
    "audiences.rehab": "Reabilitatsiya markazlari",
    "audiences.schools": "Inklyuziv maktablar",
    "audiences.health": "Sog‘liqni saqlash tashkilotlari",
    "audiences.ngo": "Nodavlat tashkilotlar",
    "audiences.gov": "Davlat idoralari",
    "audiences.enterprise": "Korxona va investorlar",
    "footer.tagline": "Yordamchi AI. Inson qarorlari.",
    "footer.rights": "Barcha huquqlar himoyalangan.",
  },
  ru: {
    "nav.platform": "Платформа",
    "nav.solutions": "Решения",
    "nav.trust": "Ответственный ИИ",
    "nav.contact": "Контакты",
    "cta.request_demo": "Запросить демо",
    "cta.talk_to_team": "Связаться с командой",
    "hero.eyebrow": "Платформа AI-видеоаналитики",
    "hero.title": "Ассистирующий ИИ для специалистов, заботящихся о людях.",
    "hero.subtitle":
      "NUR.AI работает с вашими существующими камерами и помогает педагогам, специалистам по реабилитации и медработникам замечать ситуации раньше и реагировать быстрее. ИИ помогает — решает всегда человек.",
    "hero.badge_hitl": "Принцип Human-in-the-Loop",
    "principles.title": "Основано на ответственных принципах",
    "principles.subtitle":
      "NUR.AI — это не система слежения и не распознавание лиц. Это ассистирующий слой для специалистов.",
    "principle.assist.title": "ИИ помогает, человек решает",
    "principle.assist.body":
      "Каждое уведомление — это подсказка для квалифицированного специалиста. Окончательное решение всегда за ним.",
    "principle.privacy.title": "Приватность по умолчанию",
    "principle.privacy.body":
      "Развёртывается в вашей инфраструктуре и интегрируется с существующими камерами. Без биометрической идентификации и медицинских диагнозов.",
    "principle.calm.title": "Спокойно, а не тревожно",
    "principle.calm.body":
      "Сигналы тихие, контекстные и проверяемые — снижают когнитивную нагрузку, а не создают шум.",
    "audiences.title": "Для организаций с настоящей ответственностью",
    "audiences.rehab": "Реабилитационные центры",
    "audiences.schools": "Инклюзивные школы",
    "audiences.health": "Медицинские организации",
    "audiences.ngo": "НКО",
    "audiences.gov": "Государственные ведомства",
    "audiences.enterprise": "Бизнес и инвесторы",
    "footer.tagline": "Ассистирующий ИИ. Решения — за человеком.",
    "footer.rights": "Все права защищены.",
  },
  kk: {
    "nav.platform": "Platforma",
    "nav.solutions": "Sheshimler",
    "nav.trust": "Juwapker AI",
    "nav.contact": "Baylanıs",
    "cta.request_demo": "Demo soraw",
    "cta.talk_to_team": "Komanda menen sóylesiw",
    "hero.eyebrow": "AI Kamera Intellekt Platforması",
    "hero.title": "Adamlarǵa ǵamqorlıq etetuǵın qánigelerge járdemshi AI.",
    "hero.subtitle":
      "NUR.AI bar kameralarıńız benen isleydi hám muǵallim, reabilitatsiya qánigesi hám parvariwshılarǵa jaǵdaylardı erterek baylaqlawǵa járdem beredi. AI járdem beredi — sheshimdi ádem qabıllaydı.",
    "hero.badge_hitl": "Human-in-the-Loop tiykarında",
    "principles.title": "Juwapkerli tiykarlarǵa qurılǵan",
    "principles.subtitle":
      "NUR.AI baqlaw sistemasi emes hám júz tanıw sistemasi da emes. Ol qánigelerge járdem beriwshi qatlam.",
    "principle.assist.title": "AI járdem beredi, ádem sheshedi",
    "principle.assist.body":
      "Hár bir signal — kásiplik qánige ushın usınıs. Aqırǵı sheshim hámiyshe qánigede.",
    "principle.privacy.title": "Jasırınlıq — dizayn dárejesinde",
    "principle.privacy.body":
      "Siziń infratúzilmenizde ornatıladı, bar kameralar menen integraciya etiledi. Biometrikalıq identifikaciya hám medicinalıq diagnoz joq.",
    "principle.calm.title": "Tınısh, ádep",
    "principle.calm.body":
      "Signallar tınısh, kontekstli hám qayta kórilgen — kognitiv júkti azaytadı.",
    "audiences.title": "Ámeliy juwapkerlikti sezetuǵın shólkemler ushın",
    "audiences.rehab": "Reabilitatsiya orayları",
    "audiences.schools": "Inklyuziv mektepler",
    "audiences.health": "Densawlıqtı saqlaw shólkemleri",
    "audiences.ngo": "NDT‘ler",
    "audiences.gov": "Mámleket mákemeleri",
    "audiences.enterprise": "Kárxana hám investorlar",
    "footer.tagline": "Járdemshi AI. Ádem sheshimleri.",
    "footer.rights": "Barlıq huqıqlar qorǵalǵan.",
  },
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);
const STORAGE_KEY = "nurai.locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Read persisted locale after mount to avoid SSR hydration mismatch.
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
