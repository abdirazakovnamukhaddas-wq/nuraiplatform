/**
 * Base44 MVP links. These are public URLs (not secrets), configured through
 * VITE_BASE44_APP_URL / VITE_BASE44_DEMO_URL / VITE_BASE44_PILOT_URL.
 * Leave empty until the founder supplies the real published addresses.
 */
const clean = (v: unknown) => (typeof v === "string" && /^https:\/\//.test(v.trim()) ? v.trim() : "");

export const BASE44 = {
  app: clean(import.meta.env.VITE_BASE44_APP_URL),
  demo: clean(import.meta.env.VITE_BASE44_DEMO_URL),
  pilot: clean(import.meta.env.VITE_BASE44_PILOT_URL),
};

export const IS_DEV = import.meta.env.DEV;
