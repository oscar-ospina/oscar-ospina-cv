"use client";

import { useEffect, useState } from "react";
import type { UiStrings } from "@/content/types";

type Mode = "system" | "light" | "dark";

function applyMode(mode: Mode) {
  const isDark =
    mode === "dark" ||
    (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

export function ThemeToggle({ ui }: { ui: UiStrings["toggles"] }) {
  const [mode, setMode] = useState<Mode>("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial: Mode = stored === "light" || stored === "dark" ? stored : "system";
    // localStorage is an external system; syncing it into state post-hydration is
    // the React-recommended pattern and avoids an SSR/CSR text mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(initial);
  }, []);

  useEffect(() => {
    applyMode(mode);
    if (mode !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => applyMode("system");
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [mode]);

  function cycle() {
    const next: Mode = mode === "system" ? "light" : mode === "light" ? "dark" : "system";
    setMode(next);
    if (next === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", next);
    }
    applyMode(next);
  }

  const label =
    mode === "system" ? ui.themeSystem : mode === "light" ? ui.themeLight : ui.themeDark;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${ui.themeLabel}: ${label}`}
      className="font-mono-micro text-[11px] tracking-wider uppercase text-(--color-ink-3) hover:text-(--color-ink) transition-colors px-2 py-1"
    >
      {label}
    </button>
  );
}
