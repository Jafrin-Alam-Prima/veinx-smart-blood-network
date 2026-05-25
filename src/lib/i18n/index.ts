"use client";

import { useLanguageStore } from "@/store/language-store";
import { localizeNumber } from "@/lib/utils";
import { DICT } from "./dictionary";

/** Translation hook: t() for strings, n() for locale-aware numbers. */
export function useT() {
  const locale = useLanguageStore((s) => s.locale);

  function t(key: string, vars?: Record<string, string | number>) {
    const entry = DICT[key];
    let str = entry ? entry[locale] : key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        const val = typeof v === "number" ? localizeNumber(v, locale) : v;
        str = str.replace(`{${k}}`, String(val));
      }
    }
    return str;
  }

  const n = (value: number | string) => localizeNumber(value, locale);

  return { t, n, locale };
}

export { DICT } from "./dictionary";
