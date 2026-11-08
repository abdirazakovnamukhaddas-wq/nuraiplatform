import { describe, expect, test } from "bun:test";
import { dictionaries, isLocale, LOCALES, STORAGE_KEY, translate } from "./i18n";
import { investorEn } from "./i18n-investor";

describe("language requirements", () => {
  test("English is the first/default supported language", () => {
    expect(LOCALES).toEqual(["en", "uz", "ru"]);
  });
  test("only supported saved languages are restored", () => {
    expect(STORAGE_KEY).toBe("nurai.locale");
    for (const locale of ["en", "uz", "ru"]) expect(isLocale(locale)).toBe(true);
    for (const value of ["kk", "fr", "", null, undefined]) expect(isLocale(value)).toBe(false);
  });
  test("every English dictionary key is available in Uzbek and Russian", () => {
    for (const locale of ["uz", "ru"] as const) {
      for (const key of Object.keys(dictionaries.en)) {
        expect(dictionaries[locale][key], `${locale}: ${key}`).toBeTruthy();
      }
    }
  });
  test("all investor dictionary keys exist in every supported language", () => {
    for (const locale of LOCALES) {
      for (const key of Object.keys(investorEn)) expect(dictionaries[locale][key]).toBeTruthy();
    }
  });
  test("English is used for an untranslated entry without exposing a raw key", () => {
    const key = "test.fallback";
    dictionaries.en[key] = "fallback value";
    try {
      expect(translate("uz", key)).toBe("fallback value");
      expect(translate("ru", key)).toBe("fallback value");
      expect(translate("en", "missing.test.key")).toBe("");
    } finally {
      delete dictionaries.en[key];
    }
  });
});