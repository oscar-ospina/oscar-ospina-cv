"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale, UiStrings } from "@/content/types";

export function LocaleToggle({
  lang,
  ui,
}: {
  lang: Locale;
  ui: UiStrings["toggles"];
}) {
  const router = useRouter();
  const pathname = usePathname();

  function goto(target: Locale) {
    if (target === lang) return;
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
    if (target === "en") {
      const stripped = pathname.replace(/^\/es(\/|$)/, "/");
      router.push(stripped || "/");
    } else {
      const base = pathname.startsWith("/es") ? pathname : `/es${pathname === "/" ? "" : pathname}`;
      router.push(base);
    }
  }

  return (
    <div className="flex items-center gap-1 font-mono-micro text-[11px] tracking-wider uppercase" aria-label={ui.localeLabel}>
      <button
        type="button"
        onClick={() => goto("en")}
        aria-current={lang === "en" ? "page" : undefined}
        className={`px-2 py-1 transition-colors ${lang === "en" ? "text-(--color-ink)" : "text-(--color-ink-4) hover:text-(--color-ink-2)"}`}
      >
        {ui.localeEn}
      </button>
      <span aria-hidden="true" className="text-(--color-ink-4)">/</span>
      <button
        type="button"
        onClick={() => goto("es")}
        aria-current={lang === "es" ? "page" : undefined}
        className={`px-2 py-1 transition-colors ${lang === "es" ? "text-(--color-ink)" : "text-(--color-ink-4) hover:text-(--color-ink-2)"}`}
      >
        {ui.localeEs}
      </button>
    </div>
  );
}
