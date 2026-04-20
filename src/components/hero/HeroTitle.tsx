"use client";

import { useEffect, useState } from "react";

const PRE = "Oscar ";
const EM = "Ospina";
const POST = ".";
const TOTAL = PRE.length + EM.length + POST.length;
const STEP_MS = 85;
const STORAGE_KEY = "hero-typed";

export function HeroTitle() {
  const [typed, setTyped] = useState<number>(TOTAL);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let played = false;
    try {
      played = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return;
    }
    if (played) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTyped(0);
    setAnimating(true);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= TOTAL) {
        window.clearInterval(id);
        setAnimating(false);
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {}
      }
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, []);

  const preEnd = PRE.length;
  const emEnd = preEnd + EM.length;
  const preText = PRE.slice(0, Math.min(typed, preEnd));
  const emText = typed > preEnd ? EM.slice(0, Math.min(typed - preEnd, EM.length)) : "";
  const postText = typed > emEnd ? POST.slice(0, typed - emEnd) : "";

  return (
    <h1
      aria-label="Oscar Ospina"
      className="font-(family-name:--font-display) font-semibold text-[clamp(64px,11vw,148px)] leading-[0.92] tracking-[-0.04em]"
      suppressHydrationWarning
    >
      <span aria-hidden="true">{preText}</span>
      {emText && (
        <em
          aria-hidden="true"
          className="not-italic italic font-normal text-(--color-accent)"
        >
          {emText}
        </em>
      )}
      <span aria-hidden="true">{postText}</span>
      {animating && <span aria-hidden="true" className="hero-caret" />}
    </h1>
  );
}
