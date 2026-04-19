# Oscar Ospina CV Site — Design Spec

**Date:** 2026-04-19
**Status:** Approved (pending user review of this document)
**Target:** Ship a production CV/profile site by porting the Claude Design handoff prototype into the Next.js 16 + Tailwind v4 scaffold, with production polish, i18n (EN/ES), and dark mode.

## Goals

1. Recreate the handoff design (`html-handoff.tar.gz` → `Oscar Ospina.html` + `styles.css` + `cv-data.js`) as a production Next.js 16 site, pixel-close.
2. Add production-grade essentials the prototype lacks: SEO metadata, OG image, favicon, responsive image handling, accessibility, analytics.
3. Add three functional extensions: **internationalization (EN default, ES secondary)**, **dark mode**, **custom domain + CI/CD**.
4. **Click-to-reveal for email and phone** wherever those values appear, with light anti-scraping obfuscation.
5. Deploy to Vercel Hobby at `oscarospina.com`.

## Non-goals

- No blog, project gallery, contact form, PDF download, or admin UI.
- No automated tests (lint + typecheck + build only in CI).
- No CMS; content lives in typed TypeScript modules.
- No static export — Vercel build is the target.
- No theme picker beyond light + dark; no alternate palettes.
- No animations beyond the signature scroll transform, focus rings, and subtle hover transitions already in the handoff CSS.

## Source material

The handoff bundle (extracted from `html-handoff.tar.gz`) contains:

- `Oscar Ospina.html` — primary design, full page (270 lines).
- `styles.css` — full design system (388 lines, warm crema + black + amber palette).
- `cv-data.js` — real CV content: summary, contact, 4 jobs with highlights, skills, education, certifications, languages.
- `assets/oscar.jpg` — profile photo.
- `chats/chat1.md` — design conversation showing intent.

The design is a single page: full-viewport **hero** (large name, photo, tagline) that **scroll-transforms** into a 2-column **CV document** (left sidebar with summary/contact/languages/certs/education, right column with experience + skills), a sticky compact **nav** that appears past ~55% of the first viewport, a **progress bar**, and a **footer CTA**.

The design is locked; this spec does not revisit visual choices.

## Architecture

### Rendering model

- **Next.js 16 App Router**, Server Components by default. Content is known at build time — no runtime data fetching.
- **Client components** only where needed: locale toggle, theme toggle, and the click-to-reveal contact component. The scroll transform is **pure CSS** (`animation-timeline: scroll()`), no client JS.
- **Build target:** standard Next.js build on Vercel (not static export). This enables native `next/image`, `next/font`, `proxy.ts` (Next.js 16 rename of middleware), and `next/og` for OG images.

### Route structure (i18n)

EN is the default at `/`. ES lives at `/es`. Path-based, one canonical URL per locale.

```
src/
  proxy.ts              # Next.js 16 "proxy" (renamed from middleware); sibling of app/
  app/
    [lang]/
      layout.tsx        # <html lang={lang}>, fonts, theme init, sticky nav
      page.tsx          # the CV page
      not-found.tsx     # scoped 404 per-locale
    layout.tsx          # minimal root; required by App Router
    sitemap.ts
    robots.ts
    icon.tsx            # favicon via ImageResponse
```

**Proxy behavior** (`src/proxy.ts`):

- If pathname starts with `/es` — pass through untouched.
- If pathname is `/` — rewrite to `/en` internally (URL in the browser stays as `/`). On first visit, if `Accept-Language` prefers `es`, **redirect** to `/es`. On subsequent visits (detected via the `NEXT_LOCALE` cookie set by our locale toggle or by a prior redirect), skip detection and just rewrite to `/en`.
- All other paths: pass through.

**`generateStaticParams`** in `[lang]/layout.tsx` returns `[{lang:'en'}, {lang:'es'}]` so both locales prerender at build.

**Locale guard:** a `hasLocale(lang: string): lang is Locale` type predicate. Unknown values call `notFound()`.

**Language toggle** (client component): calls `router.push(pathname.replace(/^\/es/, '') || '/')` or `router.push('/es' + pathname)`. Sets `NEXT_LOCALE` cookie so the proxy skips `Accept-Language` detection on future visits. Choice persists via URL + cookie.

### Content model

```
src/content/
  types.ts              # CvData, UiStrings, Job, Skill, Locale types
  cv.en.ts              # typed CvData, English
  cv.es.ts              # typed CvData, Spanish
  ui-strings.en.ts      # nav labels, section headings, CTAs, footer copy
  ui-strings.es.ts
  index.ts              # getContent(lang: Locale) → { cv, ui }
```

**`CvData` shape** mirrors the handoff `cv-data.js`: `name`, `role`, `experience`, `tagline`, `summary`, `location`, `contact {email, phone, linkedin, github, stackoverflow}`, `jobs: Job[]`, `skills: Record<string, string[]>`, `education`, `certifications`, `languages`.

**Which fields translate:**

- Translated: `role`, `tagline`, `summary`, `job.context`, `job.role`, `job.highlights[].desc`, `job.highlights[].label`, `job.team`, `job.industry`, `education.degree`, `education.school`, `languages[].level`, and all UI strings (nav, section labels, CTAs, footer).
- Not translated (identical in both files): `name`, company names, dates, periods, durations, numeric metrics, stacks, URLs, email, phone, certification names and issuers, `skills` category keys and items.

Acceptable duplication for ~150 lines of content per locale; avoids polluting `CvData` with `{en, es}` unions.

## Design system

### Tokens (Tailwind v4 `@theme` in `src/app/globals.css`)

Light palette (ported from handoff):

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-paper: #f5f1e8;
  --color-paper-2: #efeadc;
  --color-ink: #0f0f0e;
  --color-ink-2: #2a2a28;
  --color-ink-3: #5c5a53;
  --color-ink-4: #8f8c83;
  --color-accent: #c2410c;
  --color-accent-2: #9a3412;
  --color-accent-soft: #fdecd4;
  --font-sans: var(--font-geist);
  --font-mono: var(--font-jetbrains);
  --font-display: var(--font-geist);
}
```

Dark palette (warm dark, keeps editorial feel):

```css
.dark {
  --color-paper: #17140f;
  --color-paper-2: #1f1b14;
  --color-ink: #f2ede0;
  --color-ink-2: #d6d0c0;
  --color-ink-3: #8f8a7e;
  --color-ink-4: #5c584f;
  --color-accent: #f59e0b;     /* brighter amber for dark contrast */
  --color-accent-2: #d97706;
  --color-accent-soft: #3a2a10;
}
```

The noise/grain SVG overlay from the handoff is preserved (inline in `globals.css`).

### Fonts

`next/font/google` for:

- **Geist** (400/500/600/700) — sans + display, exposed as `--font-geist`.
- **JetBrains Mono** (400/500) — mono, exposed as `--font-jetbrains`.

Assigned to `<html>` via `className` in the root layout.

### Theming

- `class="dark"` on `<html>` when dark mode is active.
- **`ThemeToggle` (client):** cycles `system → light → dark → system`, writes to `localStorage.theme` (`'light' | 'dark' | 'system'`).
- **`ThemeScript` (inline blocking script in root layout):** reads `localStorage.theme` on first paint and sets the `dark` class synchronously before hydration, preventing FOUC. Not a React component — a raw `<script dangerouslySetInnerHTML>`.

## Components

```
src/components/
  nav/
    StickyNav.tsx         # server; receives ui strings + lang
    LocaleToggle.tsx      # client; EN/ES swap, sets NEXT_LOCALE cookie
    ThemeToggle.tsx       # client; system/light/dark cycle
  hero/
    Hero.tsx              # server; CSS-only transform target
  cv/
    CvDocument.tsx        # server; 2-col grid wrapper
    Summary.tsx
    Contact.tsx
    Languages.tsx         # includes progress bars
    Certifications.tsx
    Education.tsx
    Experience.tsx        # renders Job[]
    Job.tsx               # card with highlights + stack chips
    Skills.tsx            # grouped skills
  footer/
    FooterCta.tsx
  contact/
    RevealContact.tsx     # client; click-to-reveal for email/phone
  chrome/
    ScrollProgress.tsx    # progress bar; CSS-only
    ThemeScript.tsx       # inline blocking <script>
```

Each component stays small and focused (target: well under ~200 lines). Server by default; `"use client"` only on the two toggles and `RevealContact`.

### Click-to-reveal for email and phone

Every place the email (`osdao.lopez@gmail.com`) or phone (`+57 319 404 9005`) would otherwise appear as plaintext is replaced by a `<RevealContact>` instance:

- **Hero CTA** (email button) — "See experience →" stays as-is; the second button becomes a `RevealContact` for email.
- **Doc-header `Hire me` button** — becomes a `RevealContact` for email.
- **Contact list rows** (left sidebar) — Email and Phone rows each use `RevealContact`. Other rows (LinkedIn, GitHub, Stack Overflow, Location) stay as plain links/text.
- **Footer channels** — email button and phone button become `RevealContact` instances.
- **Nav `Get in touch →` CTA** — also uses `RevealContact` (reveals email on click, then the button becomes a functioning `mailto:` link).

**Props:** `<RevealContact kind="email" | "phone" value={base64} labelClosed={t('reveal.email')} className={...} />`.

- `value` prop is the Base64-encoded email or phone. The plaintext value never appears in the rendered HTML.
- Encoding happens at build time: a small helper `encodeContact(value: string): string` lives in `src/content/encode.ts` and is called from the content modules when exporting contact fields to the UI. The `CvData` type keeps plaintext — the encoding is applied in the page layer, not in the content file, so the data stays readable for humans.
- Alternative considered: fetching from an API route on click. Rejected as overkill for a personal CV.

**Behavior:**

1. **Initial render:** a `<button type="button">` with an icon (eye or lock) and the `labelClosed` text (e.g. "Show email", "Mostrar teléfono"). `aria-label` includes what will be revealed. Same visual styling as the surrounding button/chip it replaces so layout doesn't shift.
2. **On click:** component decodes `value` (atob + a small deobfuscation step — see below), switches internal state to "revealed", and re-renders as an `<a href="mailto:..." | "tel:...">` containing the plaintext value. Focus stays on the element.
3. **Persistence:** in-memory only (component state). Navigating away and back re-obfuscates. No `localStorage`.

**Encoding:** Base64 of the value, plus a one-character salt prefix (e.g. `"x" + btoa(value)`) to defeat dumb scrapers that grep HTML for `btoa`-looking strings of known email/phone lengths. Not serious cryptography — a deterrent.

**Accessibility:**

- Closed button is a native `<button>` with `aria-label="Reveal email address"` / `aria-label="Reveal phone number"` (translated per locale).
- Open state renders a real `<a>` with the value as the link text.
- Focus-visible ring in both states.
- Screen reader receives an announcement via an `aria-live="polite"` region when revealed.

**No-JS fallback:** with JS disabled the button is inert and email/phone stay hidden. Explicitly chosen trade-off: preserves anti-scraping benefit; cost to human no-JS visitors is enabling JS or using LinkedIn/GitHub links (which remain plaintext).

**What stays plaintext:** LinkedIn URL, GitHub URL, Stack Overflow URL, location ("Medellín, Colombia"), education strings, company names, etc. Only email and phone are gated.

## Scroll transform (CSS-only)

Uses `animation-timeline: scroll(root block)` with `animation-range`. No scroll listeners, no client JS.

```css
@keyframes hero-shrink {
  from { transform: scale(1) translateY(0); opacity: 1; }
  to   { transform: scale(0.65) translateY(-60px); opacity: 0; }
}
.hero {
  animation: hero-shrink linear both;
  animation-timeline: scroll(root block);
  animation-range: 0 80vh;
}

@keyframes doc-appear { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
.doc {
  animation: doc-appear linear both;
  animation-timeline: scroll(root block);
  animation-range: 40vh 90vh;
}

@keyframes nav-appear { from { opacity: 0; transform: translateY(-100%); } to { opacity: 1; transform: none; } }
.sticky-nav {
  animation: nav-appear linear both;
  animation-timeline: scroll(root block);
  animation-range: 55vh 65vh;
}

.progress-bar {
  transform-origin: left;
  animation: grow linear;
  animation-timeline: scroll(root block);
}
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

/* Graceful fallback on browsers without scroll-driven animations */
@supports not (animation-timeline: scroll()) {
  .hero, .doc { opacity: 1; transform: none; }
  .sticky-nav, .progress-bar { display: none; }
}

/* Respect motion preferences */
@media (prefers-reduced-motion: reduce) {
  .hero, .doc, .sticky-nav, .progress-bar { animation: none; }
  .hero, .doc { opacity: 1; transform: none; }
}
```

Browsers without `animation-timeline` (current Firefox without the flag) get a fully legible static layout: hero at the top, CV document below, no sticky nav, no progress bar.

## SEO & metadata

- **`generateMetadata`** per locale in `[lang]/page.tsx`: title, description, canonical URL, `alternates.languages: { en: '/', es: '/es' }`, OG tags, Twitter card.
- **OG image:** dynamic via `next/og` `ImageResponse` at `src/app/[lang]/opengraph-image.tsx` — 1200×630, same palette, photo + name + tagline. One source per locale.
- **Favicon:** `src/app/icon.tsx` using `ImageResponse` — monogram "OO" in accent color on paper.
- **`sitemap.ts`** at `src/app/`: lists `/` and `/es` with `alternates`, `lastModified: new Date()`.
- **`robots.ts`**: allow all.
- **JSON-LD `Person`** schema injected into `[lang]/page.tsx` via a `<script type="application/ld+json">` tag: `name`, `jobTitle`, `url`, `sameAs: [linkedin, github, stackoverflow]`, `address` (Medellín, CO), `knowsAbout` (top skills). **Email and telephone are intentionally omitted** from JSON-LD so the click-to-reveal gating isn't undermined by structured data scraping. The LinkedIn URL in `sameAs` already gives legitimate recruiters a contact path.
- **Metadata `description`** stays contact-free (no email/phone in the meta description, OG description, or page title).
- `<html lang={lang}>` correctly set via root layout using the `lang` param.

## Accessibility

- Semantic HTML: `<header>`, `<main>`, `<section aria-labelledby="…">`, `<footer>`.
- **Skip-to-content link** as first focusable element, hidden until focus.
- `focus-visible` rings on every interactive element (nav links, CTAs, cert cards, toggles, stack chips if linkable).
- WCAG AA contrast verified at implementation time for both palettes, especially amber-on-paper and amber-on-dark.
- `prefers-reduced-motion` honored (see scroll transform above).
- Both toggles (locale, theme) are proper `<button>` elements with `aria-label` and `aria-pressed`/`aria-current` as appropriate.
- `RevealContact` accessibility detailed in the "Click-to-reveal" section above.

## Deployment & CI

### Vercel Hobby
- One Vercel project linked to the GitHub repo.
- Auto-deploy on push to `main`; preview deploys per PR.
- No secrets / env vars required.

### Custom domain
- Add `oscarospina.com` (and `www.oscarospina.com`) in Vercel.
- DNS records applied in GoDaddy per Vercel's instructions (typically `A` record for apex → Vercel's IP, `CNAME` for `www` → `cname.vercel-dns.com`).
- HTTPS auto-provisioned by Vercel.

### Analytics
- `@vercel/analytics` dependency.
- `<Analytics />` component added once in root layout.
- Free tier on Vercel Hobby.

### GitHub Actions CI (`.github/workflows/ci.yml`)
- Triggers: PRs to `main`, pushes to `main`.
- Steps: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`.
- No tests. No deploy step (Vercel's own GitHub integration handles that).

### `package.json` additions
- `"typecheck": "tsc --noEmit"` script.
- Dependencies to add: `@vercel/analytics`.
- Dev dependencies stay as-is (already includes ESLint, TypeScript, Tailwind).

## Assets

- Copy `html-handoff.tar.gz`'s `assets/oscar.jpg` into `public/oscar.jpg`.
- Rendered via `next/image` with `priority` on the hero photo, lower priority on the small doc-header photo.
- Delete scaffold artifacts (`public/{next,vercel,file,globe,window}.svg`, `src/app/favicon.ico` if replaced by `icon.tsx`).
- After successful port, delete `html-handoff.tar.gz` from the repo root (it's a handoff artifact, not production code).

## Implementation phases (for plan skill to expand)

1. **Foundation:** tokens in `globals.css` (light + dark), fonts in root layout, theme init script, base typography.
2. **i18n scaffolding:** `[lang]` route, `proxy.ts`, `generateStaticParams`, content type + both locale files, `getContent` helper, `hasLocale` guard.
3. **Hero + scroll transform:** hero component, CSS keyframes, fallback, reduced-motion.
4. **CV document:** left sidebar components (summary, contact, languages, certs, education), right column (experience, skills), job card.
5. **Chrome:** sticky nav, locale toggle, theme toggle, scroll progress, footer CTA.
6. **Click-to-reveal:** `RevealContact` component, `encodeContact` helper, wired into every email/phone occurrence.
7. **Page assembly:** `[lang]/page.tsx` wires everything, JSON-LD injected.
8. **SEO + metadata:** `generateMetadata`, OG image route, favicon, sitemap, robots.
9. **Analytics + CI + deploy:** Vercel Analytics, GitHub Actions workflow, Vercel project setup, domain configuration.

## Open questions (none blocking implementation)

All answered during brainstorming.
