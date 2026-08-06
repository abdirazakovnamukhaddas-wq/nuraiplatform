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
  "nav.primary": "Primary",
  "nav.open_menu": "Open menu",
  "nav.close_menu": "Close menu",
  "nav.change_language": "Change language",
  "cta.request_demo": "Request Demo",
  "cta.see_how": "See How It Works",

  // Meta / SEO
  "meta.title": "NUR.AI — Assistive AI Camera Intelligence for Human-Led Care",
  "meta.description":
    "NUR.AI integrates with existing cameras to help teachers, rehabilitation specialists and caregivers notice situations earlier and respond faster. Human-in-the-Loop by design.",

  // Hero
  "hero.eyebrow": "AI Camera Intelligence Platform",
  "hero.title": "Transform existing cameras into intelligent assistants.",
  "hero.subtitle":
    "NUR.AI helps professionals notice potential situations earlier and respond faster — while humans always remain in control.",
  "hero.badge_hitl": "Human-in-the-Loop by design",
  "hero.card.signal": "Assistive signal",
  "hero.card.review": "Human review required",
  "hero.card.suggestion": "Suggestion · reviewable · non-diagnostic",
  "hero.card.tag": "AI assists · humans decide",
  "hero.row.attention": "Attention pattern shift",
  "hero.row.group": "Group dynamic — check-in suggested",
  "hero.row.individual": "Individual well-being cue",

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
  "solution.node.camera": "Existing camera",
  "solution.node.ai": "Assistive AI",
  "solution.node.alert": "Quiet alert",
  "solution.node.human": "Human decision",

  // How it works
  "how.eyebrow": "How it works",
  "how.title": "A calm, six-step assistive workflow.",
  "how.subtitle":
    "Every alert is a suggestion for a qualified professional — never an automated action.",
  "how.step": "Step",
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
  "serve.kinder.title": "Private kindergartens",
  "serve.kinder.body": "Help educators stay attentive to every child in a busy group.",

  // Hero trust line
  "hero.trust": "Built from real conversations with kindergarten and rehabilitation professionals.",

  // Real user insights
  "insights.eyebrow": "Research",
  "insights.title": "Real user insights",
  "insights.1.title": "Interview completed",
  "insights.1.body": "1 private kindergarten specialist.",
  "insights.2.title": "Early validation",
  "insights.2.body": "1 rehabilitation center.",
  "insights.3.title": "Key insight",
  "insights.3.body":
    "One educator may supervise around fifteen children simultaneously, each requiring different levels of attention and care.",
  "insights.4.title": "Next step",
  "insights.4.body":
    "15 additional private kindergarten interviews are planned this month to better understand real operational challenges.",

  // Contact
  "contact.email": "Email",
  "contact.email_value": "nurai.platform@gmail.com",
  "contact.linkedin": "LinkedIn",
  "contact.linkedin_desc": "Official NUR.AI LinkedIn page",

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
  "why.1.title": "Integrates with existing surveillance systems",
  "why.1.body":
    "NUR.AI integrates with supported surveillance systems to analyze video streams using artificial intelligence.",
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
  "faq.q1": "Can NUR.AI integrate with our existing surveillance system?",
  "faq.a1":
    "Yes. NUR.AI is designed to integrate with supported surveillance systems while preserving your existing monitoring workflow.",
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
  "demo.f.type.placeholder": "Select institution type",
  "demo.f.required": "Required",
  "demo.f.optional": "Optional",
  "demo.f.err.institution": "Please enter your institution name.",
  "demo.f.err.rep": "Please enter your name.",
  "demo.f.err.role": "Please enter your role.",
  "demo.f.err.email": "Enter a valid email address.",
  "demo.f.err.phone": "Enter a valid phone number.",
  "demo.f.err.type": "Please select an institution type.",
  "demo.f.err.consent": "Please accept the Privacy Policy to continue.",
  "demo.f.error.title": "Something went wrong.",
  "demo.f.error.body":
    "Your request couldn't be sent. Your information is safe — please try again.",
  "demo.f.retry": "Try again",
  "demo.f.back": "Back to form",

  // 404 / error
  "err.404.title": "Page not found",
  "err.404.body": "The page you're looking for doesn't exist or has been moved.",
  "err.404.home": "Go home",
  "err.500.title": "This page didn't load",
  "err.500.body": "Something went wrong on our end. You can try refreshing or head back home.",
  "err.500.retry": "Try again",

  // Footer
  "footer.mission":
    "NUR.AI transforms existing cameras into intelligent assistants — supporting professionals, never replacing them.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms",
  "footer.legal": "Legal",
  "footer.tagline": "AI Assists. Humans Decide.",
  "footer.rights": "All rights reserved.",
};

const uz: Dict = {
  "nav.solutions": "Yechimlar",
  "nav.how": "Qanday ishlaydi",
  "nav.institutions": "Muassasalar",
  "nav.security": "Xavfsizlik",
  "nav.faq": "Savollar",
  "nav.contact": "Aloqa",
  "nav.primary": "Asosiy",
  "nav.open_menu": "Menyuni ochish",
  "nav.close_menu": "Menyuni yopish",
  "nav.change_language": "Tilni o‘zgartirish",
  "cta.request_demo": "Demoni so‘rash",
  "cta.see_how": "Qanday ishlashini ko‘rish",

  "meta.title": "NUR.AI — Insonga yordamchi AI kamera platformasi",
  "meta.description":
    "NUR.AI mavjud kameralar bilan integratsiyalashadi: o‘qituvchilar, reabilitatsiya mutaxassislari va parvarishchilarga vaziyatlarni oldinroq sezish va tezroq javob berishga yordam beradi. Human-in-the-Loop tamoyili asosida.",

  "hero.eyebrow": "AI Kamera Intellekt Platformasi",
  "hero.title": "Mavjud kameralarni aqlli yordamchiga aylantiring.",
  "hero.subtitle":
    "NUR.AI mutaxassislarga vaziyatlarni oldinroq sezishga va tezroq javob berishga yordam beradi — qarorni doim inson qabul qiladi.",
  "hero.badge_hitl": "Human-in-the-Loop tamoyili",
  "hero.card.signal": "Yordamchi signal",
  "hero.card.review": "Inson tekshiruvi talab qilinadi",
  "hero.card.suggestion": "Taklif · ko‘rib chiqiladi · tashxis emas",
  "hero.card.tag": "AI yordam beradi · inson qaror qiladi",
  "hero.row.attention": "E’tibor namunasidagi o‘zgarish",
  "hero.row.group": "Guruh dinamikasi — suhbat tavsiya etiladi",
  "hero.row.individual": "Shaxsiy farovonlik belgisi",

  "problem.eyebrow": "Muammo",
  "problem.title": "Muassasalarda kameralar bor. Ammo yolg‘iz kameralar yetarli emas.",
  "problem.subtitle":
    "An’anaviy tizimlar tasvirni yozadi, biroq izohlash yuklamali xodimlar zimmasida qoladi. Muhim daqiqalar sezilmay qolishi mumkin.",
  "problem.a.title": "An’anaviy kameralar",
  "problem.a.1": "Faqat tasvirni yozadi",
  "problem.a.2": "Vaziyatni izohlay olmaydi",
  "problem.a.3": "Hodisalarni tartiblay olmaydi",
  "problem.a.4": "Aqlli bildirishnomalar yo‘q",
  "problem.b.title": "NUR.AI bilan",
  "problem.b.1": "Jonli yordamchi tahlil",
  "problem.b.2": "Kontekstga mos takliflar",
  "problem.b.3": "Ustuvor e’tibor belgilari",
  "problem.b.4": "Sokin, aniq bildirishnomalar",

  "solution.eyebrow": "Yechim",
  "solution.title": "Insonlarga g‘amxo‘rlik qiladigan mutaxassislar uchun aqlli yordamchi.",
  "solution.subtitle":
    "NUR.AI mavjud kameralaringizdan kelayotgan jonli oqimni tahlil qiladi. Ehtimoliy vaziyat aniqlansa, tegishli xodim sokin xabardor qilinadi. Malakali mutaxassis vaziyatni ko‘rib chiqadi va yakuniy qarorni qabul qiladi.",
  "solution.tag": "AI yordam beradi. Inson qaror qiladi.",
  "solution.node.camera": "Mavjud kamera",
  "solution.node.ai": "Yordamchi AI",
  "solution.node.alert": "Sokin bildirishnoma",
  "solution.node.human": "Inson qarori",

  "how.eyebrow": "Qanday ishlaydi",
  "how.title": "Sokin, olti bosqichli yordamchi jarayon.",
  "how.subtitle":
    "Har bir bildirishnoma — malakali mutaxassis uchun taklif, hech qachon avtomatik harakat emas.",
  "how.step": "Bosqich",
  "how.s1.title": "Mavjud kameralar",
  "how.s1.body": "Muassasangizda allaqachon ishlab turgan kameralar bilan ishlaydi.",
  "how.s2.title": "AI tahlili",
  "how.s2.body": "Jonli video sizning infratuzilmangizda tahlil qilinadi.",
  "how.s3.title": "Ehtimoliy vaziyat aniqlanadi",
  "how.s3.body": "Tizim e’tiborga munosib bo‘lishi mumkin bo‘lgan daqiqani ajratadi.",
  "how.s4.title": "Tezkor bildirishnoma",
  "how.s4.body": "Sokin, kontekstli bildirishnoma mas’ul xodimga yetkaziladi.",
  "how.s5.title": "Professional ko‘rib chiqish",
  "how.s5.body": "Malakali mutaxassis kontekst va dalillarni ko‘rib chiqadi.",
  "how.s6.title": "Inson qarori",
  "how.s6.body": "Mutaxassis mos javobni belgilaydi. Har doim.",

  "serve.eyebrow": "Biz xizmat qilamiz",
  "serve.title": "Haqiqiy mas’uliyat yuklangan muassasalar uchun yaratilgan.",
  "serve.rehab.title": "Reabilitatsiya markazlari",
  "serve.rehab.body": "Tiklanish jarayonidagi insonlarga g‘amxo‘rlik qiladigan mutaxassislarga yordam.",
  "serve.schools.title": "Inklyuziv maktablar",
  "serve.schools.body": "O‘qituvchilar har bir bolaga e’tiborli bo‘lishiga yordam beradi.",
  "serve.health.title": "Sog‘liqni saqlash muassasalari",
  "serve.health.body": "Yuqori mas’uliyatli muhitda xodimlarga yordam.",
  "serve.gov.title": "Davlat tashkilotlari",
  "serve.gov.body": "Jamoat muassasalarini mas’uliyat bilan zamonaviylashtiring.",
  "serve.social.title": "Ijtimoiy xizmat muassasalari",
  "serve.social.body": "Fidoyi parvarishchilar e’tiborini kengaytiradi.",
  "serve.ngo.title": "Nodavlat tashkilotlar",
  "serve.ngo.body": "Cheklangan resurslarni mas’uliyatli texnologiya bilan kuchaytiring.",
  "serve.kinder.title": "Xususiy bog‘chalar",
  "serve.kinder.body": "Tarbiyachilarga guruhdagi har bir bolaga e’tiborli bo‘lishda yordam beradi.",

  // Hero trust line
  "hero.trust": "Bog‘cha va reabilitatsiya mutaxassislari bilan real suhbatlar asosida yaratilgan.",

  // Real user insights
  "insights.eyebrow": "Tadqiqot",
  "insights.title": "Real foydalanuvchi tahlillari",
  "insights.1.title": "O‘tkazilgan intervyu",
  "insights.1.body": "1 nafar xususiy bog‘cha mutaxassisi.",
  "insights.2.title": "Dastlabki tasdiq",
  "insights.2.body": "1 ta reabilitatsiya markazi.",
  "insights.3.title": "Asosiy xulosa",
  "insights.3.body":
    "Bitta tarbiyachi bir vaqtning o‘zida taxminan o‘n besh bolani kuzatishi mumkin va ularning har biri turlicha e’tibor va g‘amxo‘rlik talab qiladi.",
  "insights.4.title": "Keyingi qadam",
  "insights.4.body":
    "Bu oy real operatsion muammolarni chuqurroq tushunish uchun yana 15 ta xususiy bog‘cha bilan intervyu rejalashtirilgan.",

  // Contact
  "contact.email": "Elektron pochta",
  "contact.email_value": "nurai.platform@gmail.com",
  "contact.linkedin": "LinkedIn",
  "contact.linkedin_desc": "NUR.AI rasmiy LinkedIn sahifasi",

  "caps.eyebrow": "AI imkoniyatlari",
  "caps.title": "Real, mas’uliyatli aniqlash.",
  "caps.subtitle":
    "NUR.AI tashxis qo‘ymaydi va insonlarni identifikatsiya qilmaydi. U inson tekshiruviga arziydigan namunalarni ko‘rsatadi.",
  "caps.fall.title": "Ehtimoliy yiqilishni aniqlash",
  "caps.fall.body": "Yiqilishga o‘xshash harakatlarni ajratib ko‘rsatadi.",
  "caps.area.title": "Cheklangan zonani kuzatish",
  "caps.area.body": "Muassasa belgilagan zonalardagi mavjudlikni qayd etadi.",
  "caps.wander.title": "Sarson-sargardonlikni aniqlash",
  "caps.wander.body": "Uzoq davom etuvchi g‘ayrioddiy harakat namunalarini belgilaydi.",
  "caps.emergency.title": "Favqulodda holat namunalari",
  "caps.emergency.body": "Shoshilinch bo‘lishi mumkin bo‘lgan namunalarni taniydi.",
  "caps.behaviour.title": "G‘ayrioddiy xatti-harakat belgilari",
  "caps.behaviour.body": "Odatiy faoliyatdan chetlanishlarni ko‘rsatadi.",
  "caps.activity.title": "Faoliyatni kuzatish",
  "caps.activity.body": "Umumiy faoliyat darajasini vaqt bo‘yicha jamlaydi.",

  "why.eyebrow": "Nega NUR.AI",
  "why.title": "Bo‘rttirmasdan, amaliy afzalliklar.",
  "why.1.title": "Mavjud kuzatuv tizimlari bilan integratsiyalashadi",
  "why.1.body":
    "NUR.AI qo‘llab-quvvatlanadigan kuzatuv tizimlari bilan integratsiyalashib, video oqimlarni sun’iy intellekt yordamida tahlil qiladi.",
  "why.2.title": "Human-in-the-loop",
  "why.2.body": "Yakuniy qarorni doim inson qabul qiladi.",
  "why.3.title": "Mas’uliyatli AI",
  "why.3.body": "Ehtiyotkor, tashxissiz uslub.",
  "why.4.title": "Tez bildirishnomalar",
  "why.4.body": "Sokin bildirishnomalar kerakli odamga tez yetadi.",
  "why.5.title": "Oson joriy etish",
  "why.5.body": "Mavjud infratuzilmangizga integratsiyalanadi.",
  "why.6.title": "Maxfiylik birinchi o‘rinda",
  "why.6.body": "Biometrik identifikatsiya yo‘q.",
  "why.7.title": "Kengaytiriladigan arxitektura",
  "why.7.body": "Bitta obyektdan ko‘pgacha o‘sadi.",
  "why.8.title": "Zamonaviy panel",
  "why.8.body": "Tushunarli ko‘rib chiqish, shaffof kontekst.",

  "sec.eyebrow": "Xavfsizlik va maxfiylik",
  "sec.title": "Mas’uliyat markazida ishlab chiqilgan.",
  "sec.subtitle":
    "NUR.AI nozik kontekstlar bilan ishlaydigan muassasalar ichida joylashtirish uchun yaratilgan.",
  "sec.1.title": "Mavjud infratuzilma",
  "sec.1.body": "Siz ishonadigan tizimlar bilan yonma-yon ishlaydi.",
  "sec.2.title": "Maxfiylik birinchi o‘rinda",
  "sec.2.body": "Yuzni tanish yo‘q, biometrik identifikatsiya yo‘q.",
  "sec.3.title": "Inson ko‘rib chiqadi",
  "sec.3.body": "Muhim har bir qaror inson tomonidan qabul qilinadi.",
  "sec.4.title": "Mas’uliyatli AI",
  "sec.4.body": "Tibbiy tashxis yo‘q, mutlaq da’volar yo‘q.",
  "sec.5.title": "Xavfsiz joylashtirish",
  "sec.5.body": "Muassasangiz muhitida joylashtirish mumkin.",
  "sec.6.title": "Shaffof qaror qo‘llab-quvvatlash",
  "sec.6.body": "Kontekst beriladi, mutaxassislar xotirjam ko‘rib chiqadi.",

  "faq.eyebrow": "Savollar",
  "faq.title": "Muassasalar bizga eng ko‘p beradigan savollar.",
  "faq.q1": "NUR.AI mavjud kuzatuv tizimimiz bilan integratsiyalasha oladimi?",
  "faq.a1":
    "Ha. NUR.AI qo‘llab-quvvatlanadigan kuzatuv tizimlari bilan integratsiyalashish uchun mo‘ljallangan va mavjud kuzatuv jarayoningizni saqlab qoladi.",
  "faq.q2": "AI o‘qituvchilar yoki mutaxassislarni almashtiradimi?",
  "faq.a2": "Yo‘q. NUR.AI yordamchi. U ishni bajarayotgan mutaxassislarni qo‘llab-quvvatlaydi.",
  "faq.q3": "AI yakuniy qaror qabul qiladimi?",
  "faq.a3": "Hech qachon. Har qanday muhim qaror joyda ishlayotgan malakali inson tomonidan qabul qilinadi.",
  "faq.q4": "Muassasalar bildirishnomalarni boshqara oladimi?",
  "faq.a4": "Ha. Bildirishnoma qoidalari, zonalar va oluvchilar ish jarayoningizga moslashtiriladi.",
  "faq.q5": "Maxfiylik qanday himoyalanadi?",
  "faq.a5":
    "NUR.AI biometrik identifikatsiya va tibbiy tashxisdan qochadi hamda infratuzilmangiz ichida joylashtirilishi mumkin.",

  "demo.eyebrow": "Demoni so‘rash",
  "demo.title": "Muassasangiz bilan pilot loyihani ko‘rib chiqing.",
  "demo.subtitle":
    "Kontekstingiz haqida qisqacha ma’lumot bering. Jamoamiz maxsus taqdimotni tashkil qilish uchun bog‘lanadi.",
  "demo.form.title": "Demoni so‘rash",
  "demo.form.subtitle": "Ikki ish kuni ichida javob beramiz.",
  "demo.f.institution": "Muassasa nomi",
  "demo.f.rep": "Vakil ismi",
  "demo.f.role": "Lavozim",
  "demo.f.email": "Email",
  "demo.f.phone": "Telefon",
  "demo.f.type": "Muassasa turi",
  "demo.f.cameras": "Joriy kamera tizimi (ixtiyoriy)",
  "demo.f.children": "Bolalar soni (ixtiyoriy)",
  "demo.f.message": "Xabar",
  "demo.f.consent": "Maxfiylik siyosatiga roziman.",
  "demo.f.submit": "Demoni so‘rash",
  "demo.f.sending": "Yuborilmoqda…",
  "demo.f.success.title": "Rahmat.",
  "demo.f.success.body":
    "So‘rovingiz qabul qilindi. Jamoamiz yaqin orada maxsus taqdimotni tashkil etish uchun bog‘lanadi.",
  "demo.f.close": "Yopish",
  "demo.f.type.rehab": "Reabilitatsiya markazi",
  "demo.f.type.school": "Inklyuziv maktab",
  "demo.f.type.health": "Sog‘liqni saqlash muassasasi",
  "demo.f.type.gov": "Davlat tashkiloti",
  "demo.f.type.social": "Ijtimoiy xizmat muassasasi",
  "demo.f.type.ngo": "Nodavlat tashkilot",
  "demo.f.type.other": "Boshqa",
  "demo.f.type.placeholder": "Muassasa turini tanlang",
  "demo.f.required": "Majburiy",
  "demo.f.optional": "Ixtiyoriy",
  "demo.f.err.institution": "Muassasa nomini kiriting.",
  "demo.f.err.rep": "Ismingizni kiriting.",
  "demo.f.err.role": "Lavozimingizni kiriting.",
  "demo.f.err.email": "Amaldagi email manzil kiriting.",
  "demo.f.err.phone": "Amaldagi telefon raqamini kiriting.",
  "demo.f.err.type": "Muassasa turini tanlang.",
  "demo.f.err.consent": "Davom etish uchun Maxfiylik siyosatiga rozilik bildiring.",
  "demo.f.error.title": "Nimadir noto‘g‘ri ketdi.",
  "demo.f.error.body":
    "So‘rovingizni yubora olmadik. Ma’lumotlaringiz xavfsiz — iltimos, qayta urinib ko‘ring.",
  "demo.f.retry": "Qayta urinib ko‘ring",
  "demo.f.back": "Formaga qaytish",

  "err.404.title": "Sahifa topilmadi",
  "err.404.body": "Siz izlayotgan sahifa mavjud emas yoki ko‘chirilgan.",
  "err.404.home": "Bosh sahifaga",
  "err.500.title": "Sahifa yuklanmadi",
  "err.500.body": "Bizning tomonimizda xatolik yuz berdi. Sahifani yangilashga yoki bosh sahifaga qaytishga urinib ko‘ring.",
  "err.500.retry": "Qayta urinib ko‘ring",

  "footer.mission":
    "NUR.AI mavjud kameralarni aqlli yordamchiga aylantiradi — mutaxassislarni qo‘llab-quvvatlaydi, ularni almashtirmaydi.",
  "footer.privacy": "Maxfiylik siyosati",
  "footer.terms": "Shartlar",
  "footer.legal": "Huquqiy",
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
  "nav.primary": "Основное",
  "nav.open_menu": "Открыть меню",
  "nav.close_menu": "Закрыть меню",
  "nav.change_language": "Сменить язык",
  "cta.request_demo": "Запросить демо",
  "cta.see_how": "Как это работает",

  "meta.title": "NUR.AI — Помощник на базе ИИ для видеокамер и заботы о людях",
  "meta.description":
    "NUR.AI интегрируется с существующими камерами и помогает педагогам, специалистам по реабилитации и работникам ухода замечать ситуации раньше и реагировать быстрее. Принцип Human-in-the-Loop.",

  "hero.eyebrow": "Платформа AI-видеоаналитики",
  "hero.title": "Превратите существующие камеры в интеллектуальных помощников.",
  "hero.subtitle":
    "NUR.AI помогает специалистам замечать ситуации раньше и реагировать быстрее — окончательное решение всегда за человеком.",
  "hero.badge_hitl": "Принцип Human-in-the-Loop",
  "hero.card.signal": "Вспомогательный сигнал",
  "hero.card.review": "Требуется проверка человеком",
  "hero.card.suggestion": "Подсказка · для проверки · без диагноза",
  "hero.card.tag": "ИИ помогает · решает человек",
  "hero.row.attention": "Изменение паттерна внимания",
  "hero.row.group": "Групповая динамика — рекомендуется проверка",
  "hero.row.individual": "Сигнал о самочувствии",

  "problem.eyebrow": "Проблема",
  "problem.title": "В учреждениях уже есть камеры. Но одних камер недостаточно.",
  "problem.subtitle":
    "Традиционные системы записывают видео, но интерпретация ложится на перегруженный персонал. Важные моменты могут остаться незамеченными.",
  "problem.a.title": "Обычные камеры",
  "problem.a.1": "Только запись видео",
  "problem.a.2": "Не могут интерпретировать ситуации",
  "problem.a.3": "Не расставляют приоритеты",
  "problem.a.4": "Нет умных уведомлений",
  "problem.b.title": "С NUR.AI",
  "problem.b.1": "Живой вспомогательный анализ",
  "problem.b.2": "Подсказки с учётом контекста",
  "problem.b.3": "Приоритизированные сигналы внимания",
  "problem.b.4": "Тихие адресные уведомления",

  "solution.eyebrow": "Решение",
  "solution.title": "Интеллектуальный помощник для специалистов, заботящихся о людях.",
  "solution.subtitle":
    "NUR.AI анализирует прямые потоки с ваших камер. При обнаружении возможной ситуации нужный сотрудник получает тихое уведомление. Квалифицированный специалист оценивает момент и принимает окончательное решение.",
  "solution.tag": "ИИ помогает. Решает человек.",
  "solution.node.camera": "Существующая камера",
  "solution.node.ai": "Вспомогательный ИИ",
  "solution.node.alert": "Тихое уведомление",
  "solution.node.human": "Решение человека",

  "how.eyebrow": "Как это работает",
  "how.title": "Спокойный вспомогательный процесс из шести шагов.",
  "how.subtitle":
    "Каждое уведомление — подсказка для специалиста, а не автоматическое действие.",
  "how.step": "Шаг",
  "how.s1.title": "Существующие камеры",
  "how.s1.body": "Работает с камерами, которые уже установлены у вас.",
  "how.s2.title": "AI-анализ",
  "how.s2.body": "Живое видео анализируется в вашей инфраструктуре.",
  "how.s3.title": "Обнаружена возможная ситуация",
  "how.s3.body": "Система выделяет момент, заслуживающий внимания.",
  "how.s4.title": "Мгновенное уведомление",
  "how.s4.body": "Тихое контекстное уведомление приходит ответственному сотруднику.",
  "how.s5.title": "Профессиональная проверка",
  "how.s5.body": "Квалифицированный специалист оценивает контекст и данные.",
  "how.s6.title": "Решение человека",
  "how.s6.body": "Специалист выбирает подходящий ответ. Всегда.",

  "serve.eyebrow": "Кому мы служим",
  "serve.title": "Создано для учреждений с настоящей ответственностью.",
  "serve.rehab.title": "Реабилитационные центры",
  "serve.rehab.body": "Поддержка специалистов, работающих с людьми в процессе восстановления.",
  "serve.schools.title": "Инклюзивные школы",
  "serve.schools.body": "Помогает учителям быть внимательными к каждому ребёнку.",
  "serve.health.title": "Медицинские учреждения",
  "serve.health.body": "Поддержка персонала в среде высокой ответственности.",
  "serve.gov.title": "Государственные организации",
  "serve.gov.body": "Ответственная модернизация общественных объектов.",
  "serve.social.title": "Учреждения социальной защиты",
  "serve.social.body": "Расширяет внимание преданных работников ухода.",
  "serve.ngo.title": "НКО",
  "serve.ngo.body": "Усиливает ограниченные ресурсы ответственной технологией.",
  "serve.kinder.title": "Частные детские сады",
  "serve.kinder.body": "Помогает воспитателям быть внимательными к каждому ребёнку в группе.",

  // Hero trust line
  "hero.trust": "Создано на основе реальных бесед со специалистами детских садов и реабилитационных центров.",

  // Real user insights
  "insights.eyebrow": "Исследование",
  "insights.title": "Реальные инсайты пользователей",
  "insights.1.title": "Проведено интервью",
  "insights.1.body": "1 специалист частного детского сада.",
  "insights.2.title": "Ранняя валидация",
  "insights.2.body": "1 реабилитационный центр.",
  "insights.3.title": "Ключевой инсайт",
  "insights.3.body":
    "Один воспитатель может одновременно присматривать примерно за пятнадцатью детьми, каждому из которых нужен разный уровень внимания и заботы.",
  "insights.4.title": "Следующий шаг",
  "insights.4.body":
    "В этом месяце запланировано ещё 15 интервью с частными детскими садами, чтобы лучше понять реальные операционные задачи.",

  // Contact
  "contact.email": "Эл. почта",
  "contact.email_value": "nurai.platform@gmail.com",
  "contact.linkedin": "LinkedIn",
  "contact.linkedin_desc": "Официальная страница NUR.AI в LinkedIn",

  "caps.eyebrow": "Возможности ИИ",
  "caps.title": "Реалистичное, ответственное обнаружение.",
  "caps.subtitle":
    "NUR.AI не ставит диагнозов и не идентифицирует людей. Он выделяет паттерны, заслуживающие проверки человеком.",
  "caps.fall.title": "Возможное падение",
  "caps.fall.body": "Выделяет движения, похожие на возможное падение.",
  "caps.area.title": "Контроль ограниченных зон",
  "caps.area.body": "Отмечает присутствие в зонах, определённых учреждением.",
  "caps.wander.title": "Обнаружение блуждания",
  "caps.wander.body": "Отмечает длительные необычные паттерны движения.",
  "caps.emergency.title": "Распознавание экстренных паттернов",
  "caps.emergency.body": "Замечает паттерны, которые могут указывать на срочность.",
  "caps.behaviour.title": "Необычные признаки поведения",
  "caps.behaviour.body": "Выделяет отклонения от привычной активности.",
  "caps.activity.title": "Мониторинг активности",
  "caps.activity.body": "Обобщает уровень активности во времени.",

  "why.eyebrow": "Почему NUR.AI",
  "why.title": "Практические преимущества без преувеличений.",
  "why.1.title": "Интегрируется с существующими системами видеонаблюдения",
  "why.1.body":
    "NUR.AI интегрируется с поддерживаемыми системами видеонаблюдения и анализирует видеопотоки с помощью искусственного интеллекта.",
  "why.2.title": "Human-in-the-loop",
  "why.2.body": "Финальное решение всегда за человеком.",
  "why.3.title": "Ответственный ИИ",
  "why.3.body": "Аккуратный язык без диагнозов.",
  "why.4.title": "Быстрые уведомления",
  "why.4.body": "Тихие сигналы быстро доходят до нужного человека.",
  "why.5.title": "Простое внедрение",
  "why.5.body": "Интегрируется с текущей инфраструктурой.",
  "why.6.title": "Приватность прежде всего",
  "why.6.body": "Без биометрической идентификации.",
  "why.7.title": "Масштабируемая архитектура",
  "why.7.body": "Растёт от одного объекта до многих.",
  "why.8.title": "Современная панель",
  "why.8.body": "Ясная проверка, прозрачный контекст.",

  "sec.eyebrow": "Безопасность и приватность",
  "sec.title": "Спроектировано с ответственностью в центре.",
  "sec.subtitle":
    "NUR.AI создан для развёртывания внутри учреждений, работающих с чувствительным контекстом.",
  "sec.1.title": "Существующая инфраструктура",
  "sec.1.body": "Работает рядом с системами, которым вы доверяете.",
  "sec.2.title": "Приватность прежде всего",
  "sec.2.body": "Без распознавания лиц и биометрической идентификации.",
  "sec.3.title": "Проверка человеком",
  "sec.3.body": "Каждое важное решение принимает человек.",
  "sec.4.title": "Ответственный ИИ",
  "sec.4.body": "Без медицинских диагнозов и абсолютных утверждений.",
  "sec.5.title": "Безопасное развёртывание",
  "sec.5.body": "Разворачивается внутри среды вашего учреждения.",
  "sec.6.title": "Прозрачная поддержка решений",
  "sec.6.body": "Контекст предоставляется, чтобы специалисты могли спокойно оценивать.",

  "faq.eyebrow": "Вопросы",
  "faq.title": "Что чаще всего спрашивают учреждения.",
  "faq.q1": "Может ли NUR.AI интегрироваться с нашей системой видеонаблюдения?",
  "faq.a1":
    "Да. NUR.AI создан для интеграции с поддерживаемыми системами видеонаблюдения и сохраняет ваш текущий процесс мониторинга.",
  "faq.q2": "ИИ заменяет учителей или специалистов?",
  "faq.a2": "Нет. NUR.AI — вспомогательный. Он поддерживает специалистов, которые уже делают работу.",
  "faq.q3": "Принимает ли ИИ окончательные решения?",
  "faq.a3": "Никогда. Любое значимое решение принимает квалифицированный человек на месте.",
  "faq.q4": "Могут ли учреждения управлять уведомлениями?",
  "faq.a4": "Да. Правила, зоны и получатели настраиваются под ваш процесс.",
  "faq.q5": "Как защищена приватность?",
  "faq.a5":
    "NUR.AI избегает биометрической идентификации и медицинских диагнозов и может быть развёрнут внутри вашей инфраструктуры.",

  "demo.eyebrow": "Запросить демо",
  "demo.title": "Обсудим пилот с вашим учреждением.",
  "demo.subtitle":
    "Расскажите немного о контексте. Наша команда свяжется, чтобы организовать индивидуальную презентацию.",
  "demo.form.title": "Запросить демо",
  "demo.form.subtitle": "Ответим в течение двух рабочих дней.",
  "demo.f.institution": "Название учреждения",
  "demo.f.rep": "Имя представителя",
  "demo.f.role": "Должность",
  "demo.f.email": "Email",
  "demo.f.phone": "Телефон",
  "demo.f.type": "Тип учреждения",
  "demo.f.cameras": "Текущая система камер (необязательно)",
  "demo.f.children": "Количество детей (необязательно)",
  "demo.f.message": "Сообщение",
  "demo.f.consent": "Я согласен с Политикой конфиденциальности.",
  "demo.f.submit": "Запросить демо",
  "demo.f.sending": "Отправка…",
  "demo.f.success.title": "Спасибо.",
  "demo.f.success.body":
    "Ваш запрос получен. Наша команда скоро свяжется, чтобы организовать индивидуальную презентацию.",
  "demo.f.close": "Закрыть",
  "demo.f.type.rehab": "Реабилитационный центр",
  "demo.f.type.school": "Инклюзивная школа",
  "demo.f.type.health": "Медицинское учреждение",
  "demo.f.type.gov": "Государственная организация",
  "demo.f.type.social": "Учреждение социальной защиты",
  "demo.f.type.ngo": "НКО",
  "demo.f.type.other": "Другое",
  "demo.f.type.placeholder": "Выберите тип учреждения",
  "demo.f.required": "Обязательно",
  "demo.f.optional": "Необязательно",
  "demo.f.err.institution": "Пожалуйста, укажите название учреждения.",
  "demo.f.err.rep": "Пожалуйста, укажите ваше имя.",
  "demo.f.err.role": "Пожалуйста, укажите вашу должность.",
  "demo.f.err.email": "Введите корректный email.",
  "demo.f.err.phone": "Введите корректный номер телефона.",
  "demo.f.err.type": "Пожалуйста, выберите тип учреждения.",
  "demo.f.err.consent": "Примите Политику конфиденциальности, чтобы продолжить.",
  "demo.f.error.title": "Что-то пошло не так.",
  "demo.f.error.body":
    "Не удалось отправить запрос. Ваши данные в безопасности — попробуйте ещё раз.",
  "demo.f.retry": "Попробовать снова",
  "demo.f.back": "Вернуться к форме",

  "err.404.title": "Страница не найдена",
  "err.404.body": "Страница, которую вы ищете, не существует или была перемещена.",
  "err.404.home": "На главную",
  "err.500.title": "Страница не загрузилась",
  "err.500.body": "На нашей стороне произошла ошибка. Попробуйте обновить или вернуться на главную.",
  "err.500.retry": "Попробовать снова",

  "footer.mission":
    "NUR.AI превращает существующие камеры в интеллектуальных помощников — поддерживает специалистов, а не заменяет их.",
  "footer.privacy": "Политика конфиденциальности",
  "footer.terms": "Условия",
  "footer.legal": "Юридическое",
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
  "nav.primary": "Tiykarǵı",
  "nav.open_menu": "Menyudi ashıw",
  "nav.close_menu": "Menyudi jabıw",
  "nav.change_language": "Tildi awıstırıw",
  "cta.request_demo": "Demo soraw",
  "cta.see_how": "Qalay islewin kóriw",

  "meta.title": "NUR.AI — Ádemge kómek beretuǵın AI kamera platforması",
  "meta.description":
    "NUR.AI bar kameralar menen integraciyalasadı hám muǵallimlerge, reabilitaciya qánigelerine hám qárawshılarǵa jaǵdaydı erterek baylaqlawǵa hám tez juwap beriwge járdem beredi. Human-in-the-Loop tiykarında.",

  "hero.eyebrow": "AI Kamera Intellekt Platforması",
  "hero.title": "Bar kameralardı aqıllı járdemshige aylandırıń.",
  "hero.subtitle":
    "NUR.AI qánigelerge jaǵdaydı erterek baylaqlawǵa hám tez juwap beriwge járdem beredi — sheshim hámiyshe ádem tárepinen qabıllanadı.",
  "hero.badge_hitl": "Human-in-the-Loop tiykarında",
  "hero.card.signal": "Járdemshi signal",
  "hero.card.review": "Ádem tekseriwi kerek",
  "hero.card.suggestion": "Usınıs · tekseriw ushın · diagnoz emes",
  "hero.card.tag": "AI járdem beredi · ádem sheshedi",
  "hero.row.attention": "Itibar úlgisiniń ózgeriwi",
  "hero.row.group": "Toparlıq dinamika — tekseriw usınıladı",
  "hero.row.individual": "Jeke amanlıq belgisi",

  "problem.eyebrow": "Máseleni",
  "problem.title": "Mákemelerde kameralar bar. Biraq jalǵız kameralar jetkiliksiz.",
  "problem.subtitle":
    "Ádettegi sistemalar videoni jazadı, biraq túsindiriw jumıs júkli xızmetkerlerge júkleneadi. Áhmiyetli sátler baylaqsız ótip ketiwi múmkin.",
  "problem.a.title": "Ádettegi kameralar",
  "problem.a.1": "Tek videoni jazadı",
  "problem.a.2": "Jaǵdaydı túsindire almaydı",
  "problem.a.3": "Waqiyalardı prioritetlestire almaydı",
  "problem.a.4": "Aqıllı bildiriwler joq",
  "problem.b.title": "NUR.AI menen",
  "problem.b.1": "Janlı járdemshi analiz",
  "problem.b.2": "Kontekstke sáykes usınıslar",
  "problem.b.3": "Prioritetli itibar belgileri",
  "problem.b.4": "Tıńıshtaǵı, dál bildiriwler",

  "solution.eyebrow": "Sheshim",
  "solution.title": "Ádemlerge qamqorlıq etetuǵın qánigeler ushın aqıllı járdemshi.",
  "solution.subtitle":
    "NUR.AI bar kameralarınızdan kelgen janlı aǵımdı analizleydi. Múmkin bolǵan jaǵdaydı anıqlaǵanda, tiyisli xızmetker tıńıshtaǵı bildiriw aladı. Malaqalı qánige jaǵdaydı tekseredi hám aqırǵı sheshimdi qabıllaydı.",
  "solution.tag": "AI járdem beredi. Ádem sheshedi.",
  "solution.node.camera": "Bar kamera",
  "solution.node.ai": "Járdemshi AI",
  "solution.node.alert": "Tıńıshtaǵı bildiriw",
  "solution.node.human": "Ádem sheshimi",

  "how.eyebrow": "Qalay isleydi",
  "how.title": "Tınısh, altı basqıshlı járdemshi process.",
  "how.subtitle":
    "Hár bir bildiriw — qánige ushın usınıs, hesh qashan avtomat háreket emes.",
  "how.step": "Basqısh",
  "how.s1.title": "Bar kameralar",
  "how.s1.body": "Mákemenizde islep atırǵan kameralar menen isleydi.",
  "how.s2.title": "AI analizi",
  "how.s2.body": "Janlı video sizdiń infrastrukturaǵızda analizlenedi.",
  "how.s3.title": "Múmkin bolǵan jaǵday anıqlandı",
  "how.s3.body": "Sistema itibarǵa iye bolıwı múmkin bolǵan sátti ajıratadı.",
  "how.s4.title": "Tez bildiriw",
  "how.s4.body": "Tınısh, kontekstli bildiriw juwapker xızmetkerge jetedi.",
  "how.s5.title": "Professional tekseriw",
  "how.s5.body": "Malaqalı qánige kontekst hám dálillerdi tekseredi.",
  "how.s6.title": "Ádem sheshimi",
  "how.s6.body": "Qánige tiyisli juwaptı belgileydi. Hámiyshe.",

  "serve.eyebrow": "Kimge xızmet etemiz",
  "serve.title": "Haqıyqıy juwapkershilikke iye mákemeler ushın jasalǵan.",
  "serve.rehab.title": "Reabilitaciya orayları",
  "serve.rehab.body": "Tikleniw processindegi ádemlerge qamqorlıq etetuǵın qánigelerge kómek.",
  "serve.schools.title": "Inklyuziv mekteper",
  "serve.schools.body": "Muǵallimlerge hár bir balaǵa itibarlı bolıwǵa járdem beredi.",
  "serve.health.title": "Salamatlıq saqlaw mákemeleri",
  "serve.health.body": "Joqarı juwapkershilikli ortalıqta xızmetkerlerge kómek.",
  "serve.gov.title": "Mámleket shólkemleri",
  "serve.gov.body": "Járiya obektlerdi juwapkershilik penen zamanagóylestiriń.",
  "serve.social.title": "Sociallıq xızmet mákemeleri",
  "serve.social.body": "Berilgen qárawshılardıń itibarın keńeytedi.",
  "serve.ngo.title": "MEK",
  "serve.ngo.body": "Sheklengen resurslardı juwapkershilikli texnologiya menen kúsheytiriń.",
  "serve.kinder.title": "Jeke balalar baqshaları",
  "serve.kinder.body": "Tárbiyashılarǵa toparıdaǵı hár bir balaǵa itibarlı bolıwǵa járdem beredi.",

  // Hero trust line
  "hero.trust": "Balalar baqshası hám reabilitaciya qánigeleri menen bolǵan haqıyqıy sáwbetler tiykarında islengen.",

  // Real user insights
  "insights.eyebrow": "Izertlew",
  "insights.title": "Haqıyqıy paydalanıwshı analizleri",
  "insights.1.title": "Ótkerilgen intervyu",
  "insights.1.body": "1 jeke balalar baqshası qánigesi.",
  "insights.2.title": "Dáslepki tastıyıqlaw",
  "insights.2.body": "1 reabilitaciya orayı.",
  "insights.3.title": "Tiykarǵı juwmaq",
  "insights.3.body":
    "Bir tárbiyashı bir waqıtta shama menen on bes balanı baqlawı múmkin, hár biri hár qıylı dárejedegi itibar hám qamqorlıqtı talap etedi.",
  "insights.4.title": "Keyingi qádem",
  "insights.4.body":
    "Bul ay haqıyqıy operaciyalıq mashqalalardı jaqsıraq túsiniw ushın taǵı 15 jeke balalar baqshası menen intervyu jobalastırılǵan.",

  // Contact
  "contact.email": "Elektron pochta",
  "contact.email_value": "nurai.platform@gmail.com",
  "contact.linkedin": "LinkedIn",
  "contact.linkedin_desc": "NUR.AI rásmiy LinkedIn beti",

  "caps.eyebrow": "AI múmkinshilikleri",
  "caps.title": "Realistik, juwapkershilikli anıqlaw.",
  "caps.subtitle":
    "NUR.AI diagnoz qoymaydı hám ádemlerdi identifikaciyalamaydı. Ol ádem tekseriwine iye bolıwı kerek úlgilerdi kórsetedi.",
  "caps.fall.title": "Múmkin qulaw anıqlanıwı",
  "caps.fall.body": "Qulawǵa uqsas háreketlerdi ajıratıp kórsetedi.",
  "caps.area.title": "Sheklengen aymaqtı baqlaw",
  "caps.area.body": "Mákeme belgilegen aymaqlardaǵı barlıqtı belgileydi.",
  "caps.wander.title": "Sanıradan júriw anıqlaması",
  "caps.wander.body": "Uzaq dawam etetuǵın ádettegi emes háreket úlgilerin belgileydi.",
  "caps.emergency.title": "Shal-shalıqlıq úlgilerin tanıw",
  "caps.emergency.body": "Shal-shalıqlı bolıwı múmkin úlgilerdi taniydı.",
  "caps.behaviour.title": "Ádettegi emes minez belgileri",
  "caps.behaviour.body": "Ádettegi jumıstan awıspaqlardı kórsetedi.",
  "caps.activity.title": "Aktivlikti baqlaw",
  "caps.activity.body": "Ulıwma aktivlik dárejesin waqıt boyınsha jámleydi.",

  "why.eyebrow": "Nege NUR.AI",
  "why.title": "Asırıp júbermey, ámeliy artıqmashılıqlar.",
  "why.1.title": "Bar baqlaw sistemaları menen integraciyalasadı",
  "why.1.body":
    "NUR.AI qollap-quwatlanatuǵın baqlaw sistemaları menen integraciyalasıp, video aǵımlardı jasalma intellekt penen analiz etedi.",
  "why.2.title": "Human-in-the-loop",
  "why.2.body": "Aqırǵı sheshim hámiyshe ádem tárepinen.",
  "why.3.title": "Juwapkershilikli AI",
  "why.3.body": "Diqqatlı, diagnozsız til.",
  "why.4.title": "Tez bildiriwler",
  "why.4.body": "Tınısh signallar kerekli ádemge tez jetedi.",
  "why.5.title": "Ańsat ornatıw",
  "why.5.body": "Házirgi infrastrukturaǵızǵa integraciyalanadı.",
  "why.6.title": "Jasırınlıq birinshi",
  "why.6.body": "Biometrik identifikaciya joq.",
  "why.7.title": "Skalabelli arxitektura",
  "why.7.body": "Bir obekten kóplegen obektlerge deyin ósedi.",
  "why.8.title": "Zamanagóy panel",
  "why.8.body": "Anıq tekseriw, ashıq kontekst.",

  "sec.eyebrow": "Qawipsizlik hám jasırınlıq",
  "sec.title": "Juwapkershilik orayında islep shıǵılǵan.",
  "sec.subtitle":
    "NUR.AI sezimtal konteksler menen islep atırǵan mákemeler ishinde ornatılıw ushın jasalǵan.",
  "sec.1.title": "Bar infrastruktura",
  "sec.1.body": "Siz isenetuǵın sistemalar menen birge isleydi.",
  "sec.2.title": "Jasırınlıq birinshi",
  "sec.2.body": "Beti tanıw joq, biometrik identifikaciya joq.",
  "sec.3.title": "Ádem tekseriwi",
  "sec.3.body": "Áhmiyetli hár sheshim ádem tárepinen qabıllanadı.",
  "sec.4.title": "Juwapkershilikli AI",
  "sec.4.body": "Medicinalıq diagnoz joq, absolyut dáwaslar joq.",
  "sec.5.title": "Qawipsiz ornatıw",
  "sec.5.body": "Mákemeniz ortalıǵında ornatıw múmkin.",
  "sec.6.title": "Ashıq sheshim qollap-quwatlaw",
  "sec.6.body": "Kontekst beriledi, qánigeler tınısh tekseredi.",

  "faq.eyebrow": "Sorawlar",
  "faq.title": "Mákemeler bizge kóbirek beretuǵın sorawlar.",
  "faq.q1": "NUR.AI bar baqlaw sistemamız benen integraciyalasa ala ma?",
  "faq.a1":
    "Awa. NUR.AI qollap-quwatlanatuǵın baqlaw sistemaları menen integraciyalasıw ushın jasalǵan hám ámeldegi baqlaw processińizdi saqlaydı.",
  "faq.q2": "AI muǵallimlerdi yamasa qánigelerdi almastırama?",
  "faq.a2": "Yaq. NUR.AI járdemshi. Ol jumıs islep atırǵan qánigelerdi qollap-quwatlaydı.",
  "faq.q3": "AI aqırǵı sheshim qabıllaydı ma?",
  "faq.a3": "Hesh qashan. Áhmiyetli hár sheshim jaydaǵı malaqalı ádem tárepinen qabıllanadı.",
  "faq.q4": "Mákemeler bildiriwlerdi basqara aladı ma?",
  "faq.a4": "Awa. Bildiriw qaydeleri, aymaqlar hám alıwshılar sizdiń jumıs processińizge bapladı.",
  "faq.q5": "Jasırınlıq qalay qorǵaladı?",
  "faq.a5":
    "NUR.AI biometrik identifikaciya hám medicinalıq diagnozdan qashadı hám infrastrukturańız ishinde ornatılıwı múmkin.",

  "demo.eyebrow": "Demo soraw",
  "demo.title": "Mákemeniz benen pilot loyihanı kóriń.",
  "demo.subtitle":
    "Kontekstińiz haqqında qısqa maǵlıwmat beriń. Komandamız arnawlı prezentaciya shólkemlestiriw ushın baylanısadı.",
  "demo.form.title": "Demo soraw",
  "demo.form.subtitle": "Eki jumıs kúnindegi ishinde juwap beremiz.",
  "demo.f.institution": "Mákeme atı",
  "demo.f.rep": "Wákil atı",
  "demo.f.role": "Lawazım",
  "demo.f.email": "Email",
  "demo.f.phone": "Telefon",
  "demo.f.type": "Mákeme túri",
  "demo.f.cameras": "Házirgi kamera sisteması (mindetli emes)",
  "demo.f.children": "Balalar sanı (mindetli emes)",
  "demo.f.message": "Xabar",
  "demo.f.consent": "Jasırınlıq siyasatına kelisemen.",
  "demo.f.submit": "Demo soraw",
  "demo.f.sending": "Jiberilmekte…",
  "demo.f.success.title": "Raxmet.",
  "demo.f.success.body":
    "Sorawıńız qabıl etildi. Komandamız jaqın arada arnawlı prezentaciya shólkemlestiriw ushın baylanısadı.",
  "demo.f.close": "Jabıw",
  "demo.f.type.rehab": "Reabilitaciya orayı",
  "demo.f.type.school": "Inklyuziv mektep",
  "demo.f.type.health": "Salamatlıq saqlaw mákemesi",
  "demo.f.type.gov": "Mámleket shólkemi",
  "demo.f.type.social": "Sociallıq xızmet mákemesi",
  "demo.f.type.ngo": "MEK",
  "demo.f.type.other": "Basqa",
  "demo.f.type.placeholder": "Mákeme túrin saylań",
  "demo.f.required": "Mindetli",
  "demo.f.optional": "Mindetli emes",
  "demo.f.err.institution": "Mákeme atın kirgiziń.",
  "demo.f.err.rep": "Atıńızdı kirgiziń.",
  "demo.f.err.role": "Lawazımıńızdı kirgiziń.",
  "demo.f.err.email": "Durıs email adresti kirgiziń.",
  "demo.f.err.phone": "Durıs telefon nomerin kirgiziń.",
  "demo.f.err.type": "Mákeme túrin saylań.",
  "demo.f.err.consent": "Dawam etiw ushın Jasırınlıq siyasatın qabıllań.",
  "demo.f.error.title": "Nárse durıs ketpedi.",
  "demo.f.error.body":
    "Sorawıńızdı jibere almadıq. Maǵlıwmatlarıńız qawipsiz — qaytadan urınıp kóriń.",
  "demo.f.retry": "Qaytadan urınıp kóriw",
  "demo.f.back": "Formaǵa qaytıw",

  "err.404.title": "Bet tabılmadı",
  "err.404.body": "Siz izlep atırǵan bet joq yamasa kóshirilgen.",
  "err.404.home": "Bas betke",
  "err.500.title": "Bet júktelmedi",
  "err.500.body": "Bizde qátelik boldı. Betti jańalaw yamasa bas betke qaytıp kóriń.",
  "err.500.retry": "Qaytadan urınıp kóriw",

  "footer.mission":
    "NUR.AI bar kameralardı aqıllı járdemshige aylandıradı — qánigelerdi qollap-quwatlaydı, olardı almastırmaydı.",
  "footer.privacy": "Jasırınlıq siyasatı",
  "footer.terms": "Shártler",
  "footer.legal": "Huqıqıy",
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
      const dict = dictionaries[locale];
      const title = dict["meta.title"] ?? dictionaries.en["meta.title"];
      const description = dict["meta.description"] ?? dictionaries.en["meta.description"];
      if (title) document.title = title;
      const setMeta = (selector: string, value: string) => {
        const el = document.head.querySelector<HTMLMetaElement>(selector);
        if (el) el.setAttribute("content", value);
      };
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:title"]', title);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[property="og:locale"]', locale);
      setMeta('meta[name="twitter:title"]', title);
      setMeta('meta[name="twitter:description"]', description);
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
