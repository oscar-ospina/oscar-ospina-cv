# Oscar Ospina — CV site

Personal CV site for Oscar Ospina. Hero + scrollable CV document, bilingual (EN/ES), light/dark/system theme, click-to-reveal contact to deter scraping.

## Stack

- **Next.js 16.2** (App Router, `proxy.ts`, async `params`)
- **React 19.2**
- **Tailwind CSS v4** (`@theme`, `@custom-variant dark`)
- **TypeScript 6**
- **@vercel/analytics**

## Scripts

```bash
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build
npm run start      # run production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Project layout

```
src/
  app/
    layout.tsx            # root layout, reads x-locale header → <html lang>
    [lang]/
      layout.tsx          # per-locale skip-link, sticky nav, footer
      page.tsx            # hero + CV document
    icon.tsx              # dynamic favicon
    opengraph-image.tsx   # dynamic OG image
  proxy.ts                # locale rewrite + x-locale header injection
  content/
    cv.en.ts, cv.es.ts    # CV data (role, jobs, skills, certs, contact)
    ui-strings.en.ts, ui-strings.es.ts  # UI copy
    types.ts              # CvData / UiStrings / Locale / yearsOfExperience
    encode.ts             # base64 + "x" salt contact obfuscation
  components/
    nav/          StickyNav, LocaleToggle, ThemeToggle
    hero/         Hero, HeroTitle (typewriter)
    cv/           CvDocument, Job, Skills, Contact, …
    contact/      RevealContact (click-to-reveal)
    footer/       FooterCta
    chrome/       SmoothScroll
```

## How things work

- **Locale routing.** `proxy.ts` rewrites `/es/*` to `/[lang]/*`, passes an `x-locale` header to the server so the root layout can set `<html lang>` correctly. The locale cookie (`NEXT_LOCALE`) steers the redirect at `/`.
- **Years of experience.** Single source of truth is `cv.careerStartYear` (number). `yearsOfExperience()` computes the current value; copy uses `ui.experience.yearsSuffix`.
- **Contact reveal.** Email/phone live encoded in the DOM (base64 + single-char salt). `RevealContact` decodes on click, preventing trivial scraping while keeping a crawlable `mailto`/`tel` label once revealed.
- **Theme.** `ThemeToggle` writes `data-theme` on `<html>` and persists to `localStorage`. System mode follows `prefers-color-scheme`. State is synced in an effect post-hydration to avoid SSR/CSR mismatch.
- **Hero typewriter.** `HeroTitle` animates "Oscar Ospina." once per session (`sessionStorage`-gated). SSR renders the full text; `prefers-reduced-motion` skips the animation.
- **SEO.** JSON-LD `Person` schema in `[lang]/page.tsx` (no email/phone, to match the reveal-behind-click UX). `alternates.languages` includes `x-default`. Dynamic OG image and favicon via `ImageResponse`.
- **a11y.** Skip link, semantic landmarks, `aria-current="page"` on the active locale, reduced-motion respected in typewriter and scroll animations.

## Editing content

- **Role / jobs / skills / certs / contact** — `src/content/cv.{en,es}.ts`
- **UI copy** (nav, hero, footer, toggles, section headings) — `src/content/ui-strings.{en,es}.ts`
- **Skill group labels** — add to `ui.skillGroups` in both locales; the key must match the group name in `cv.skills`.

## Deploy

Deploys to Vercel. No environment variables required.
