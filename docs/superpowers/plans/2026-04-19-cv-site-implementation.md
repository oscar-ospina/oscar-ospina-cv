# Oscar Ospina CV Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the Claude Design handoff into the Next.js 16 scaffold as a production CV site at `oscarospina.com`, with EN/ES i18n, dark mode, click-to-reveal contact info, Vercel Hobby deploy, and GitHub Actions CI.

**Architecture:** Next.js 16 App Router, Server Components by default. i18n via `src/app/[lang]/` with `generateStaticParams`. Locale detection in `src/proxy.ts`. Scroll transform via pure CSS `animation-timeline: scroll()`. Click-to-reveal for email/phone via a single client component with Base64-obfuscated props. No automated tests — verification is lint + typecheck + build + manual dev-server smoke test.

**Tech Stack:** Next.js 16.2, React 19.2, TypeScript, Tailwind v4, `next/font`, `next/og`, `@vercel/analytics`. Reference: see `docs/superpowers/specs/2026-04-19-cv-site-design.md`.

**Source assets:** Handoff bundle under `/tmp/handoff/p-gina-de-perfil-profesional-oscar-ospina/project/`. Extract with `tar -xzf html-handoff.tar.gz -C /tmp/handoff/` if missing. Primary references are `Oscar Ospina.html`, `styles.css`, `cv-data.js`, `assets/oscar.jpg`.

**CLAUDE.md note:** AGENTS.md requires reading `node_modules/next/dist/docs/` before writing Next.js code. The API surface used here (`proxy.ts`, `generateStaticParams`, `PageProps<...>`, `ImageResponse`, `generateMetadata`) has been verified against those docs as of 2026-04-19.

---

## Task 1: Clean scaffold, install deps, add typecheck script

**Files:**
- Delete: `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg`, `src/app/favicon.ico`, `src/app/page.tsx`
- Modify: `package.json`

- [ ] **Step 1: Remove scaffold artifacts**

```bash
rm public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
rm src/app/favicon.ico src/app/page.tsx
```

- [ ] **Step 2: Install Vercel Analytics**

```bash
npm install @vercel/analytics
```

- [ ] **Step 3: Add typecheck script to `package.json`**

Open `package.json` and replace the `"scripts"` block with:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "typecheck": "tsc --noEmit"
},
```

- [ ] **Step 4: Verify install + typecheck**

```bash
npm run typecheck
```
Expected: no output (success). The scaffold has no code yet that would fail typecheck after page.tsx removal.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Strip scaffold boilerplate, add analytics dep and typecheck script"
```

---

## Task 2: Content types and locale guard

**Files:**
- Create: `src/content/types.ts`

- [ ] **Step 1: Write types file**

Create `src/content/types.ts`:

```ts
export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export type Contact = {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  stackoverflow: string;
};

export type Highlight = {
  metric: string;
  label: string;
  desc: string;
};

export type Job = {
  company: string;
  industry: string;
  role: string;
  period: string;
  duration: string;
  team: string;
  context: string;
  highlights: Highlight[];
  stack: string[];
};

export type LanguageSkill = {
  name: string;
  level: string;
  pct: number;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  url: string;
};

export type Education = {
  degree: string;
  school: string;
  period: string;
};

export type CvData = {
  name: string;
  role: string;
  experience: string;
  tagline: string;
  summary: string;
  location: string;
  contact: Contact;
  jobs: Job[];
  skills: Record<string, string[]>;
  education: Education;
  certifications: Certification[];
  languages: LanguageSkill[];
};

export type UiStrings = {
  nav: {
    experience: string;
    skills: string;
    certs: string;
    contact: string;
    cta: string;
    roleSuffix: string;
  };
  hero: {
    eyebrow: string;
    ctaSeeExperience: string;
    scrollHint: string;
  };
  docHeader: {
    linkedin: string;
    hireMe: string;
  };
  sections: {
    summary: string;
    contact: string;
    languages: string;
    certifications: string;
    education: string;
    experience: string;
    experienceHeading: string;
    skills: string;
    skillsHeading: string;
  };
  contactRows: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    stackoverflow: string;
  };
  footer: {
    heading: string;
    headingEm: string;
    subtitle: string;
  };
  reveal: {
    showEmail: string;
    showPhone: string;
    revealEmailAria: string;
    revealPhoneAria: string;
  };
  toggles: {
    themeLabel: string;
    themeSystem: string;
    themeLight: string;
    themeDark: string;
    localeLabel: string;
    localeEn: string;
    localeEs: string;
  };
  notFound: {
    title: string;
    body: string;
    backHome: string;
  };
};
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/content/types.ts
git commit -m "Add content types and locale guard"
```

---

## Task 3: CV content — English

**Files:**
- Create: `src/content/cv.en.ts`

- [ ] **Step 1: Write EN content**

Create `src/content/cv.en.ts` by porting the handoff `cv-data.js`:

```ts
import type { CvData } from "./types";

export const cvEn: CvData = {
  name: "Oscar Ospina",
  role: "Lead · Senior Fullstack Developer",
  experience: "13+ years",
  tagline: "I can build whatever you can dream.",
  summary:
    "Senior Full Stack Developer with 13+ years architecting distributed systems and high-performance applications. Expert in TypeScript/Node.js, React, and cloud platforms (GCP/AWS/Azure). Proven track record scaling microservices to handle millions of users with sub-second latency.",
  location: "Medellín, Colombia",
  contact: {
    email: "osdao.lopez@gmail.com",
    phone: "+57 319 404 9005",
    linkedin: "linkedin.com/in/oscar-david-ospina-65b94451",
    github: "github.com/oscar-ospina",
    stackoverflow: "stackoverflow.com/users/4070633/sxntk",
  },
  jobs: [
    {
      company: "SUMZ",
      industry: "Financial Services Platform",
      role: "Lead Senior Full Stack Developer",
      period: "Oct 2024 — Present",
      duration: "15 months",
      team: "5 devs · 2 UX · 1 PO",
      context:
        "High-volume financial services platform processing payments, loans, and account management for BNPL clients.",
      highlights: [
        {
          metric: "99.97%",
          label: "uptime",
          desc: "Architected cloud-native microservices platform on GCP serving 1,000+ customers, migrating Elixir/Phoenix to Node backend with PostgreSQL, deployed via Cloud Run with auto-scaling.",
        },
        {
          metric: "15+",
          label: "deploys/week",
          desc: "CI/CD pipeline on GitHub Actions + Cloud Build, Docker containerization, Terraform IaC — zero-downtime releases.",
        },
        {
          metric: "90%",
          label: "fewer incidents",
          desc: "Dropped from 10/month to <1/month via observability stack (Cloud Monitoring, Prometheus, structured logging). MTTR 4h → 45min.",
        },
        {
          metric: "45K",
          label: "lines decomposed",
          desc: "Led monolith → event-driven microservices (7 services: auth, payments, notifications, reporting, user-mgmt, loan-processing, audit). Feature deploy 2 weeks → 3 days.",
        },
        {
          metric: "40%",
          label: "faster reviews",
          desc: "Weekly architecture review sessions, code review standards, OpenAPI docs. Mentored 3 juniors → mid-level.",
        },
      ],
      stack: ["Node.js", "TypeScript", "PostgreSQL", "GCP", "Cloud Run", "Terraform", "Vitest", "Docker"],
    },
    {
      company: "Tranqui",
      industry: "Financial Agent Platform",
      role: "Lead Senior Full Stack Developer",
      period: "Aug 2023 — Sep 2024",
      duration: "13 months",
      team: "IC in 12-person team",
      context:
        "Platform for agents to manage customer accounts, transactions, and high-volume queries with strict performance requirements.",
      highlights: [
        {
          metric: "95%",
          label: "crashes eliminated",
          desc: "From 15 critical failures/week to <1/week. Heap profiling, circuit breakers, N+1 query fixes via TypeORM, rate limiting. Saved $45K/month.",
        },
        {
          metric: "45% → 95%",
          label: "test coverage",
          desc: "Jest (2,500+ cases), Supertest API tests, CI blocks PRs below 80%. Reduced production bugs 68% (25/mo → 8/mo).",
        },
        {
          metric: "<300ms",
          label: "update latency",
          desc: "Real-time dashboard for 200+ concurrent agents with Socket.io + React/TypeScript + MUI, SSE fallback for legacy browsers.",
        },
        {
          metric: "85%",
          label: "faster queries",
          desc: "Zero-downtime DB migration on 15M+ records: blue-green, CONCURRENTLY indexes, monthly partitions, PITR. 12s → 1.8s.",
        },
        {
          metric: "SOC 2",
          label: "passed audit",
          desc: "OAuth 2.0/JWT, RBAC with 15 permission levels, API signing, PCI-DSS logging, Snyk. Zero security incidents.",
        },
      ],
      stack: ["Node.js", "Express", "TypeORM", "PostgreSQL", "React", "Socket.io", "Jest", "Material-UI"],
    },
    {
      company: "Genius Sports",
      industry: "Real-Time Sports Betting",
      role: "Senior Full Stack Developer",
      period: "Jun 2021 — Jun 2023",
      duration: "24 months",
      team: "Cross-functional · 8 engineers",
      context:
        "Live sports widgets for NFL, NBA, Caesars, FanDuel. Sub-second latency, millions of concurrent users during peak events.",
      highlights: [
        {
          metric: "2.5M+",
          label: "concurrent users",
          desc: "NFL Sunday games. Event-driven microservices, React/TS frontend, Node APIs, GraphQL, WebSocket streaming, AWS Lambda odds calc. P99 380ms.",
        },
        {
          metric: "47%",
          label: "bundle size cut",
          desc: "920KB → 487KB gzipped. Code-splitting with React.lazy, dynamic imports, tree-shaking, progressive JPEGs, Akamai CDN. TTI 4.2s → 1.8s.",
        },
        {
          metric: "82%",
          label: "DB load reduction",
          desc: "12K → 2.2K queries/min. Redis Cluster with consistent hashing, cache-aside, warming, pub/sub invalidation. Handled 5x March Madness growth.",
        },
        {
          metric: "<650ms",
          label: "end-to-end latency",
          desc: "AWS SQS 50K+ msg/sec, WebSocket pooling (100K+ concurrent/instance), DataLoader for N+1, React virtualization for 10K+ betting options.",
        },
        {
          metric: "3.8 → 4.6★",
          label: "app rating",
          desc: "React Native mobile perf: native modules, FlashList, 35MB → 18MB bundle, offline-first with SQLite. Crash rate -78%.",
        },
        {
          metric: "95%",
          label: "test coverage",
          desc: "Jest (4,500+ unit tests), Cypress E2E, JMeter load testing at 100K users. TDD. Bugs -71%, 30+ releases/month.",
        },
      ],
      stack: ["React", "TypeScript", "GraphQL", "Node.js", "AWS Lambda", "Redis", "WebSockets", "React Native"],
    },
    {
      company: "Intergrupo",
      industry: "Consulting · EPM Utilities",
      role: "Junior Dev → Solution Architect",
      period: "Mar 2013 — Jun 2021",
      duration: "8 years 3 months",
      team: "",
      context:
        "Promoted from Junior Developer to Solution Architect within 8 years. Led 15+ enterprise projects for EPM utilities company.",
      highlights: [
        {
          metric: "$2M+",
          label: "annual savings",
          desc: "Azure cloud migration and process automation across 15+ enterprise projects.",
        },
        {
          metric: "2.5M+",
          label: "utility customers",
          desc: "Architected microservices platform with .NET Core APIs, Azure Functions, SQL Server. Downtime 12h/mo → 2h/mo.",
        },
        {
          metric: "15+",
          label: "devs mentored",
          desc: "Established code review practices, technical design doc standards, weekly architecture workshops.",
        },
      ],
      stack: [".NET Core", "Azure", "SQL Server", "Azure Functions"],
    },
  ],
  skills: {
    Languages: ["TypeScript", "JavaScript", "C#", "Elixir"],
    Frontend: ["React", "Next.js", "Remix", "Tailwind", "MUI", "Phoenix", "Lit"],
    Backend: ["Node.js", "Express", "NestJS", ".NET Core"],
    Databases: ["PostgreSQL", "SQL Server", "Oracle", "MongoDB", "Redis"],
    Cloud: ["GCP", "AWS", "Azure"],
    DevOps: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Azure DevOps"],
    Observability: ["Prometheus", "Grafana", "DataDog", "CloudWatch"],
    Testing: ["Vitest", "Jest", "Cypress", "JMeter"],
    Messaging: ["Pub/Sub", "AWS SQS", "RabbitMQ"],
    APIs: ["REST", "GraphQL", "WebSockets", "SOAP", "Webhooks"],
  },
  education: {
    degree: "Bachelor's in Systems Engineering",
    school: "Institución Universitaria de Envigado",
    period: "2010 — 2014",
  },
  certifications: [
    {
      name: "Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "Jun 2025",
      url: "https://www.credly.com/badges/4a4bac86-9141-40b1-be76-bed6cf077699/public_url",
    },
  ],
  languages: [
    { name: "Spanish", level: "Native", pct: 100 },
    { name: "English", level: "Professional", pct: 90 },
  ],
};
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/content/cv.en.ts
git commit -m "Add English CV content"
```

---

## Task 4: CV content — Spanish

**Files:**
- Create: `src/content/cv.es.ts`

- [ ] **Step 1: Write ES content (translate only the translatable fields; keep URLs, dates, metrics, company names, stacks, certification names identical)**

Create `src/content/cv.es.ts`:

```ts
import type { CvData } from "./types";

export const cvEs: CvData = {
  name: "Oscar Ospina",
  role: "Lead · Senior Fullstack Developer",
  experience: "13+ años",
  tagline: "Puedo construir lo que sueñes.",
  summary:
    "Senior Full Stack Developer con 13+ años diseñando sistemas distribuidos y aplicaciones de alto rendimiento. Experto en TypeScript/Node.js, React y plataformas cloud (GCP/AWS/Azure). Historial comprobado escalando microservicios a millones de usuarios con latencia sub-segundo.",
  location: "Medellín, Colombia",
  contact: {
    email: "osdao.lopez@gmail.com",
    phone: "+57 319 404 9005",
    linkedin: "linkedin.com/in/oscar-david-ospina-65b94451",
    github: "github.com/oscar-ospina",
    stackoverflow: "stackoverflow.com/users/4070633/sxntk",
  },
  jobs: [
    {
      company: "SUMZ",
      industry: "Plataforma de Servicios Financieros",
      role: "Lead Senior Full Stack Developer",
      period: "Oct 2024 — Presente",
      duration: "15 meses",
      team: "5 devs · 2 UX · 1 PO",
      context:
        "Plataforma de servicios financieros de alto volumen que procesa pagos, préstamos y gestión de cuentas para clientes BNPL.",
      highlights: [
        {
          metric: "99.97%",
          label: "uptime",
          desc: "Arquitectura de microservicios cloud-native en GCP sirviendo 1,000+ clientes; migración de backend Elixir/Phoenix a Node con PostgreSQL, desplegado en Cloud Run con auto-escalado.",
        },
        {
          metric: "15+",
          label: "deploys/semana",
          desc: "Pipeline CI/CD en GitHub Actions + Cloud Build, contenerización con Docker, IaC con Terraform — releases sin downtime.",
        },
        {
          metric: "90%",
          label: "menos incidentes",
          desc: "De 10/mes a <1/mes con stack de observabilidad (Cloud Monitoring, Prometheus, logging estructurado). MTTR 4h → 45min.",
        },
        {
          metric: "45K",
          label: "líneas descompuestas",
          desc: "Lideré monolito → microservicios event-driven (7 servicios: auth, pagos, notificaciones, reporting, user-mgmt, loan-processing, auditoría). Deploy de features 2 semanas → 3 días.",
        },
        {
          metric: "40%",
          label: "reviews más rápidas",
          desc: "Sesiones semanales de revisión de arquitectura, estándares de code review, docs OpenAPI. Mentoría de 3 juniors → mid-level.",
        },
      ],
      stack: ["Node.js", "TypeScript", "PostgreSQL", "GCP", "Cloud Run", "Terraform", "Vitest", "Docker"],
    },
    {
      company: "Tranqui",
      industry: "Plataforma para Agentes Financieros",
      role: "Lead Senior Full Stack Developer",
      period: "Ago 2023 — Sep 2024",
      duration: "13 meses",
      team: "IC en equipo de 12 personas",
      context:
        "Plataforma para que agentes gestionen cuentas de clientes, transacciones y consultas de alto volumen con requisitos estrictos de rendimiento.",
      highlights: [
        {
          metric: "95%",
          label: "crashes eliminados",
          desc: "De 15 fallas críticas/semana a <1/semana. Heap profiling, circuit breakers, fixes de N+1 vía TypeORM, rate limiting. Ahorro de $45K/mes.",
        },
        {
          metric: "45% → 95%",
          label: "cobertura de tests",
          desc: "Jest (2,500+ casos), tests de API con Supertest, CI bloquea PRs bajo 80%. Bugs en producción -68% (25/mes → 8/mes).",
        },
        {
          metric: "<300ms",
          label: "latencia de updates",
          desc: "Dashboard en tiempo real para 200+ agentes concurrentes con Socket.io + React/TypeScript + MUI, fallback SSE para navegadores legacy.",
        },
        {
          metric: "85%",
          label: "consultas más rápidas",
          desc: "Migración de BD sin downtime sobre 15M+ registros: blue-green, índices CONCURRENTLY, particiones mensuales, PITR. 12s → 1.8s.",
        },
        {
          metric: "SOC 2",
          label: "auditoría aprobada",
          desc: "OAuth 2.0/JWT, RBAC con 15 niveles de permiso, firma de API, logging PCI-DSS, Snyk. Cero incidentes de seguridad.",
        },
      ],
      stack: ["Node.js", "Express", "TypeORM", "PostgreSQL", "React", "Socket.io", "Jest", "Material-UI"],
    },
    {
      company: "Genius Sports",
      industry: "Apuestas Deportivas en Tiempo Real",
      role: "Senior Full Stack Developer",
      period: "Jun 2021 — Jun 2023",
      duration: "24 meses",
      team: "Cross-functional · 8 ingenieros",
      context:
        "Widgets deportivos en vivo para NFL, NBA, Caesars, FanDuel. Latencia sub-segundo, millones de usuarios concurrentes durante eventos pico.",
      highlights: [
        {
          metric: "2.5M+",
          label: "usuarios concurrentes",
          desc: "Domingos de NFL. Microservicios event-driven, frontend React/TS, APIs Node, GraphQL, streaming WebSocket, cálculo de cuotas en AWS Lambda. P99 380ms.",
        },
        {
          metric: "47%",
          label: "tamaño de bundle",
          desc: "920KB → 487KB gzipped. Code-splitting con React.lazy, imports dinámicos, tree-shaking, JPEGs progresivos, Akamai CDN. TTI 4.2s → 1.8s.",
        },
        {
          metric: "82%",
          label: "carga de BD reducida",
          desc: "12K → 2.2K consultas/min. Redis Cluster con consistent hashing, cache-aside, warming, invalidación pub/sub. Soportó crecimiento 5x en March Madness.",
        },
        {
          metric: "<650ms",
          label: "latencia end-to-end",
          desc: "AWS SQS 50K+ msg/seg, pooling de WebSockets (100K+ concurrentes/instancia), DataLoader para N+1, virtualización React para 10K+ opciones de apuesta.",
        },
        {
          metric: "3.8 → 4.6★",
          label: "rating de la app",
          desc: "Rendimiento móvil React Native: módulos nativos, FlashList, bundle 35MB → 18MB, offline-first con SQLite. Crashes -78%.",
        },
        {
          metric: "95%",
          label: "cobertura de tests",
          desc: "Jest (4,500+ unit tests), Cypress E2E, pruebas de carga JMeter a 100K usuarios. TDD. Bugs -71%, 30+ releases/mes.",
        },
      ],
      stack: ["React", "TypeScript", "GraphQL", "Node.js", "AWS Lambda", "Redis", "WebSockets", "React Native"],
    },
    {
      company: "Intergrupo",
      industry: "Consultoría · Utilities EPM",
      role: "Desarrollador Junior → Arquitecto de Soluciones",
      period: "Mar 2013 — Jun 2021",
      duration: "8 años 3 meses",
      team: "",
      context:
        "Promovido de Desarrollador Junior a Arquitecto de Soluciones en 8 años. Lideré 15+ proyectos enterprise para la empresa de utilities EPM.",
      highlights: [
        {
          metric: "$2M+",
          label: "ahorro anual",
          desc: "Migración a Azure y automatización de procesos en 15+ proyectos enterprise.",
        },
        {
          metric: "2.5M+",
          label: "clientes de utilities",
          desc: "Plataforma de microservicios con APIs .NET Core, Azure Functions, SQL Server. Downtime 12h/mes → 2h/mes.",
        },
        {
          metric: "15+",
          label: "devs mentorizados",
          desc: "Establecí prácticas de code review, estándares de documentos de diseño técnico, workshops semanales de arquitectura.",
        },
      ],
      stack: [".NET Core", "Azure", "SQL Server", "Azure Functions"],
    },
  ],
  skills: {
    Languages: ["TypeScript", "JavaScript", "C#", "Elixir"],
    Frontend: ["React", "Next.js", "Remix", "Tailwind", "MUI", "Phoenix", "Lit"],
    Backend: ["Node.js", "Express", "NestJS", ".NET Core"],
    Databases: ["PostgreSQL", "SQL Server", "Oracle", "MongoDB", "Redis"],
    Cloud: ["GCP", "AWS", "Azure"],
    DevOps: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Azure DevOps"],
    Observability: ["Prometheus", "Grafana", "DataDog", "CloudWatch"],
    Testing: ["Vitest", "Jest", "Cypress", "JMeter"],
    Messaging: ["Pub/Sub", "AWS SQS", "RabbitMQ"],
    APIs: ["REST", "GraphQL", "WebSockets", "SOAP", "Webhooks"],
  },
  education: {
    degree: "Ingeniería de Sistemas",
    school: "Institución Universitaria de Envigado",
    period: "2010 — 2014",
  },
  certifications: [
    {
      name: "Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "Jun 2025",
      url: "https://www.credly.com/badges/4a4bac86-9141-40b1-be76-bed6cf077699/public_url",
    },
  ],
  languages: [
    { name: "Español", level: "Nativo", pct: 100 },
    { name: "Inglés", level: "Profesional", pct: 90 },
  ],
};
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/content/cv.es.ts
git commit -m "Add Spanish CV content"
```

---

## Task 5: UI strings — English

**Files:**
- Create: `src/content/ui-strings.en.ts`

- [ ] **Step 1: Write EN UI strings**

Create `src/content/ui-strings.en.ts`:

```ts
import type { UiStrings } from "./types";

export const uiEn: UiStrings = {
  nav: {
    experience: "Experience",
    skills: "Skills",
    certs: "Certs",
    contact: "Contact",
    cta: "Get in touch →",
    roleSuffix: "· Senior Fullstack",
  },
  hero: {
    eyebrow: "Available for senior / lead roles",
    ctaSeeExperience: "See experience →",
    scrollHint: "scroll",
  },
  docHeader: {
    linkedin: "LinkedIn ↗",
    hireMe: "Hire me",
  },
  sections: {
    summary: "Summary",
    contact: "Contact",
    languages: "Languages",
    certifications: "Certifications",
    education: "Education",
    experience: "Experience",
    experienceHeading: "Where I've built things",
    skills: "Technical Skills",
    skillsHeading: "The toolkit",
  },
  contactRows: {
    email: "Email",
    phone: "Phone",
    location: "Location",
    linkedin: "LinkedIn",
    github: "GitHub",
    stackoverflow: "Stack Overflow",
  },
  footer: {
    heading: "Let's",
    headingEm: "build",
    subtitle: "Available for senior and lead fullstack roles. Remote-first, based in Medellín.",
  },
  reveal: {
    showEmail: "Show email",
    showPhone: "Show phone",
    revealEmailAria: "Reveal email address",
    revealPhoneAria: "Reveal phone number",
  },
  toggles: {
    themeLabel: "Theme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    localeLabel: "Language",
    localeEn: "EN",
    localeEs: "ES",
  },
  notFound: {
    title: "Not found",
    body: "The page you're looking for doesn't exist.",
    backHome: "Back home",
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/content/ui-strings.en.ts
git commit -m "Add English UI strings"
```

---

## Task 6: UI strings — Spanish

**Files:**
- Create: `src/content/ui-strings.es.ts`

- [ ] **Step 1: Write ES UI strings**

Create `src/content/ui-strings.es.ts`:

```ts
import type { UiStrings } from "./types";

export const uiEs: UiStrings = {
  nav: {
    experience: "Experiencia",
    skills: "Skills",
    certs: "Certs",
    contact: "Contacto",
    cta: "Contáctame →",
    roleSuffix: "· Senior Fullstack",
  },
  hero: {
    eyebrow: "Disponible para roles senior / lead",
    ctaSeeExperience: "Ver experiencia →",
    scrollHint: "scroll",
  },
  docHeader: {
    linkedin: "LinkedIn ↗",
    hireMe: "Contrátame",
  },
  sections: {
    summary: "Resumen",
    contact: "Contacto",
    languages: "Idiomas",
    certifications: "Certificaciones",
    education: "Educación",
    experience: "Experiencia",
    experienceHeading: "Dónde he construido cosas",
    skills: "Skills Técnicas",
    skillsHeading: "El toolkit",
  },
  contactRows: {
    email: "Email",
    phone: "Teléfono",
    location: "Ubicación",
    linkedin: "LinkedIn",
    github: "GitHub",
    stackoverflow: "Stack Overflow",
  },
  footer: {
    heading: "Vamos a",
    headingEm: "construir",
    subtitle: "Disponible para roles senior y lead fullstack. Remote-first, basado en Medellín.",
  },
  reveal: {
    showEmail: "Mostrar email",
    showPhone: "Mostrar teléfono",
    revealEmailAria: "Revelar dirección de email",
    revealPhoneAria: "Revelar número de teléfono",
  },
  toggles: {
    themeLabel: "Tema",
    themeSystem: "Sistema",
    themeLight: "Claro",
    themeDark: "Oscuro",
    localeLabel: "Idioma",
    localeEn: "EN",
    localeEs: "ES",
  },
  notFound: {
    title: "No encontrado",
    body: "La página que buscas no existe.",
    backHome: "Volver al inicio",
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/content/ui-strings.es.ts
git commit -m "Add Spanish UI strings"
```

---

## Task 7: encodeContact helper and getContent

**Files:**
- Create: `src/content/encode.ts`
- Create: `src/content/index.ts`

- [ ] **Step 1: Write encoder**

Create `src/content/encode.ts`:

```ts
const SALT = "x";

export function encodeContact(value: string): string {
  if (typeof window === "undefined") {
    return SALT + Buffer.from(value, "utf8").toString("base64");
  }
  return SALT + btoa(value);
}

export function decodeContact(encoded: string): string {
  const body = encoded.startsWith(SALT) ? encoded.slice(SALT.length) : encoded;
  if (typeof window === "undefined") {
    return Buffer.from(body, "base64").toString("utf8");
  }
  return atob(body);
}
```

- [ ] **Step 2: Write getContent**

Create `src/content/index.ts`:

```ts
import { cvEn } from "./cv.en";
import { cvEs } from "./cv.es";
import { uiEn } from "./ui-strings.en";
import { uiEs } from "./ui-strings.es";
import type { CvData, Locale, UiStrings } from "./types";

export function getContent(locale: Locale): { cv: CvData; ui: UiStrings } {
  if (locale === "es") return { cv: cvEs, ui: uiEs };
  return { cv: cvEn, ui: uiEn };
}
```

- [ ] **Step 3: Typecheck**

```bash
npm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add src/content/encode.ts src/content/index.ts
git commit -m "Add content encoder and getContent helper"
```

---

## Task 8: Proxy (locale detection + redirect)

**Files:**
- Create: `src/proxy.ts`

- [ ] **Step 1: Write proxy**

Create `src/proxy.ts` (note: sibling of `src/app/`, not inside it):

```ts
import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, hasLocale } from "./content/types";

function pickLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const requested = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase());
  for (const req of requested) {
    const base = req.split("-")[0];
    if (hasLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through internal, assets, and known locale prefixes
  const firstSegment = pathname.split("/")[1];
  if (hasLocale(firstSegment)) return NextResponse.next();

  // Only act on the exact root path for now — everything else is a real 404
  if (pathname !== "/") return NextResponse.next();

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const chosen = cookieLocale && hasLocale(cookieLocale)
    ? cookieLocale
    : pickLocale(request.headers.get("accept-language"));

  if (chosen === DEFAULT_LOCALE) {
    // Keep URL as "/" but render [lang=en]
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/${DEFAULT_LOCALE}`;
    const response = NextResponse.rewrite(rewriteUrl);
    if (!cookieLocale) response.cookies.set("NEXT_LOCALE", DEFAULT_LOCALE, { path: "/" });
    return response;
  }

  // Non-default: redirect so the URL reflects the locale
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${chosen}`;
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set("NEXT_LOCALE", chosen, { path: "/" });
  return response;
}

export const config = {
  matcher: [
    // Run on everything except internal Next assets, API routes, and files with extensions
    "/((?!_next/|api/|.*\\..*).*)",
  ],
};
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```
Expected: success. (The `src/app/[lang]` route doesn't exist yet so the build would fail, but typecheck passes.)

LOCALES is imported but unused; if the linter flags it, remove the import.

- [ ] **Step 3: Commit**

```bash
git add src/proxy.ts
git commit -m "Add proxy for locale detection and root rewrite"
```

---

## Task 9: Copy photo asset and write [lang] layout

**Files:**
- Create: `public/oscar.jpg`
- Create: `src/app/[lang]/layout.tsx`

- [ ] **Step 1: Copy handoff photo**

```bash
mkdir -p public
cp "/tmp/handoff/p-gina-de-perfil-profesional-oscar-ospina/project/assets/oscar.jpg" public/oscar.jpg
```

If `/tmp/handoff` is empty, first re-extract:
```bash
tar -xzf html-handoff.tar.gz -C /tmp/handoff/ 2>/dev/null || (mkdir -p /tmp/handoff && tar -xzf html-handoff.tar.gz -C /tmp/handoff/)
```

- [ ] **Step 2: Write the `[lang]` layout**

Create `src/app/[lang]/layout.tsx`:

```tsx
import { notFound } from "next/navigation";
import { Geist, JetBrains_Mono } from "next/font/google";
import { hasLocale, LOCALES } from "@/content/types";
import { getContent } from "@/content";
import { StickyNav } from "@/components/nav/StickyNav";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { cv, ui } = getContent(lang);

  return (
    <div className={`${geist.variable} ${jetbrains.variable}`}>
      <a href="#doc" className="skip-link">
        {ui.notFound.backHome /* reused as skip target label placeholder */}
      </a>
      <ScrollProgress />
      <StickyNav lang={lang} ui={ui} cv={cv} />
      {children}
    </div>
  );
}
```

Note: `LayoutProps<"/[lang]">` is a global helper (Next.js 16). Skip link label is intentionally a simple placeholder — will refine via a dedicated UI string if desired later.

- [ ] **Step 3: Configure path alias (if not already set)**

Open `tsconfig.json` and confirm `compilerOptions.paths` includes `"@/*": ["./src/*"]`. The scaffold already ships with this — verify:

```bash
grep -n '"@/\*"' tsconfig.json
```
Expected: match present. If missing, add it under `compilerOptions.paths`.

- [ ] **Step 4: Typecheck**

```bash
npm run typecheck
```
Expected to fail — `@/components/...` imports don't exist yet. That's OK; later tasks create them. Move on.

- [ ] **Step 5: Commit**

```bash
git add public/oscar.jpg src/app/\[lang\]/layout.tsx
git commit -m "Add [lang] layout skeleton and photo asset"
```

---

## Task 10: Root layout with Analytics and ThemeScript placeholder

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite root layout**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeScript } from "@/components/chrome/ThemeScript";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://oscarospina.com"),
  title: {
    default: "Oscar Ospina — Senior Fullstack Developer",
    template: "%s · Oscar Ospina",
  },
  description:
    "Senior Fullstack Developer with 13+ years shipping distributed systems that scale to millions.",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/">) {
  // Root layout wraps all routes. When a [lang] route renders, the lang param is available
  // via the nested layout; here we default to "en" so the <html lang> attribute has a value
  // even for the rewritten root path (which is [lang=en] under the hood).
  const resolved = await params.catch(() => ({}));
  const lang = (resolved as { lang?: string }).lang ?? "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-paper text-ink antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

Note: Next.js 16 `params` in the root layout is a Promise that may resolve to `{}` when there's no dynamic segment at the root. The `.catch` guard is defensive. If the typechecker rejects this pattern, replace with a simpler `<html lang="en">` — the `[lang]/layout.tsx` can re-set `lang` via a `<LangAttr>` pattern later if needed. For MVP, hardcoding `"en"` at the root is acceptable because the `[lang]` segment renders identical `<html>` via its own layout only when that layout sets it explicitly.

**Simpler fallback if the `.catch` pattern doesn't compile:** replace the entire body with:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-paper text-ink antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

Use the fallback if in doubt.

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```
Still fails on missing components — OK.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "Replace scaffold root layout with Analytics and ThemeScript"
```

---

## Task 11: Globals.css — tokens, dark palette, paper grain, base typography, scroll transform

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css entirely**

Replace the contents of `src/app/globals.css` with:

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
  --color-line: rgba(15, 15, 14, 0.1);
  --color-line-2: rgba(15, 15, 14, 0.18);
  --color-accent: #c2410c;
  --color-accent-2: #9a3412;
  --color-accent-soft: #fdecd4;
  --color-accent-glow: rgba(194, 65, 12, 0.12);
  --font-sans: var(--font-geist);
  --font-mono: var(--font-jetbrains);
  --font-display: var(--font-geist);
}

.dark {
  --color-paper: #17140f;
  --color-paper-2: #1f1b14;
  --color-ink: #f2ede0;
  --color-ink-2: #d6d0c0;
  --color-ink-3: #8f8a7e;
  --color-ink-4: #5c584f;
  --color-line: rgba(242, 237, 224, 0.08);
  --color-line-2: rgba(242, 237, 224, 0.14);
  --color-accent: #f59e0b;
  --color-accent-2: #d97706;
  --color-accent-soft: #3a2a10;
  --color-accent-glow: rgba(245, 158, 11, 0.14);
}

* { box-sizing: border-box; }
html, body { background: var(--color-paper); color: var(--color-ink); }
body { font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif; overflow-x: hidden; min-height: 100vh; }
a { color: inherit; text-decoration: none; }

/* Paper grain overlay */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.06 0 0 0 0 0.06 0 0 0 0 0.05 0 0 0 0.04 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  opacity: 0.5;
  mix-blend-mode: multiply;
}
.dark body::before { mix-blend-mode: screen; opacity: 0.12; }

/* Skip link (hidden until focused) */
.skip-link {
  position: absolute;
  left: -9999px;
  top: 8px;
  padding: 8px 14px;
  background: var(--color-ink);
  color: var(--color-paper);
  border-radius: 6px;
  z-index: 100;
  font-size: 13px;
}
.skip-link:focus { left: 8px; }

/* Focus-visible rings */
:where(a, button, [role="button"]):focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 6px;
}

/* Progress bar */
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 60;
  transform-origin: left;
  transform: scaleX(0);
  background: var(--color-accent);
  animation: progress-grow linear;
  animation-timeline: scroll(root block);
}
@keyframes progress-grow { to { transform: scaleX(1); } }

/* Hero shrink */
.hero {
  animation: hero-shrink linear both;
  animation-timeline: scroll(root block);
  animation-range: 0 80vh;
  will-change: transform, opacity;
}
@keyframes hero-shrink {
  from { transform: scale(1) translateY(0); opacity: 1; }
  to   { transform: scale(0.65) translateY(-60px); opacity: 0; }
}

/* Doc appears */
.doc {
  animation: doc-appear linear both;
  animation-timeline: scroll(root block);
  animation-range: 40vh 90vh;
  will-change: opacity, transform;
}
@keyframes doc-appear {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: none; }
}

/* Sticky nav appears past 55vh */
.sticky-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  opacity: 0;
  transform: translateY(-100%);
  animation: nav-appear linear both;
  animation-timeline: scroll(root block);
  animation-range: 55vh 65vh;
}
@keyframes nav-appear {
  to { opacity: 1; transform: none; }
}

/* Fallback: no scroll-driven animations */
@supports not (animation-timeline: scroll()) {
  .hero, .doc { opacity: 1; transform: none; animation: none; }
  .sticky-nav, .progress { display: none; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero, .doc, .sticky-nav, .progress { animation: none; }
  .hero, .doc { opacity: 1; transform: none; }
  .progress { transform: scaleX(0); }
}

/* Pulse animation for the hero eyebrow dot */
@keyframes pulse-ring {
  0%, 100% { box-shadow: 0 0 0 4px var(--color-accent-glow); }
  50% { box-shadow: 0 0 0 8px transparent; }
}

/* Scroll hint bounce */
@keyframes bounce-hint {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}

/* Utility: mono font */
.font-mono-micro {
  font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
}
```

- [ ] **Step 2: Start dev server and open browser to verify no CSS errors**

```bash
npm run dev
```
Open `http://localhost:3000`. Page will be broken (no content) but DevTools Console should be error-free. Stop with Ctrl-C.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "Write design tokens, dark palette, grain, and scroll-driven animations"
```

---

## Task 12: ThemeScript (inline blocking, no-FOUC)

**Files:**
- Create: `src/components/chrome/ThemeScript.tsx`

- [ ] **Step 1: Write component**

Create `src/components/chrome/ThemeScript.tsx`:

```tsx
const SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var mode = stored === 'light' || stored === 'dark' ? stored : 'system';
    var isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`.trim();

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/chrome/ThemeScript.tsx
git commit -m "Add ThemeScript for FOUC-free theme init"
```

---

## Task 13: ThemeToggle (client)

**Files:**
- Create: `src/components/nav/ThemeToggle.tsx`

- [ ] **Step 1: Write component**

Create `src/components/nav/ThemeToggle.tsx`:

```tsx
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
    setMode(initial);
    applyMode(initial);

    if (initial === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => applyMode("system");
      mql.addEventListener("change", listener);
      return () => mql.removeEventListener("change", listener);
    }
  }, []);

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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/nav/ThemeToggle.tsx
git commit -m "Add ThemeToggle with system/light/dark cycle"
```

---

## Task 14: LocaleToggle (client)

**Files:**
- Create: `src/components/nav/LocaleToggle.tsx`

- [ ] **Step 1: Write component**

Create `src/components/nav/LocaleToggle.tsx`:

```tsx
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
      // Strip /es prefix; root of site represents EN
      const stripped = pathname.replace(/^\/es(\/|$)/, "/");
      router.push(stripped || "/");
    } else {
      // Add /es prefix
      const base = pathname.startsWith("/es") ? pathname : `/es${pathname === "/" ? "" : pathname}`;
      router.push(base);
    }
  }

  return (
    <div className="flex gap-1 font-mono-micro text-[11px] tracking-wider uppercase" aria-label={ui.localeLabel}>
      <button
        type="button"
        onClick={() => goto("en")}
        aria-pressed={lang === "en"}
        className={`px-2 py-1 transition-colors ${lang === "en" ? "text-(--color-ink)" : "text-(--color-ink-4) hover:text-(--color-ink-2)"}`}
      >
        {ui.localeEn}
      </button>
      <span aria-hidden="true" className="text-(--color-ink-4)">/</span>
      <button
        type="button"
        onClick={() => goto("es")}
        aria-pressed={lang === "es"}
        className={`px-2 py-1 transition-colors ${lang === "es" ? "text-(--color-ink)" : "text-(--color-ink-4) hover:text-(--color-ink-2)"}`}
      >
        {ui.localeEs}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/nav/LocaleToggle.tsx
git commit -m "Add LocaleToggle with cookie persistence"
```

---

## Task 15: StickyNav (server) — uses RevealContact for the CTA

**Note:** StickyNav depends on `RevealContact` which is built in Task 18. Write the StickyNav code now with a temporary inline email placeholder; swap it for `RevealContact` in Task 18.

**Files:**
- Create: `src/components/nav/StickyNav.tsx`

- [ ] **Step 1: Write component**

Create `src/components/nav/StickyNav.tsx`:

```tsx
import Image from "next/image";
import type { CvData, Locale, UiStrings } from "@/content/types";
import { LocaleToggle } from "./LocaleToggle";
import { ThemeToggle } from "./ThemeToggle";

export function StickyNav({
  lang,
  ui,
  cv,
}: {
  lang: Locale;
  ui: UiStrings;
  cv: CvData;
}) {
  return (
    <nav
      className="sticky-nav flex items-center justify-between px-8 py-3 bg-(--color-paper)/85 backdrop-blur-md saturate-[180%] border-b border-(--color-line)"
      aria-label="Primary"
    >
      <div className="flex items-center gap-2.5 font-semibold text-sm">
        <Image
          src="/oscar.jpg"
          alt=""
          width={28}
          height={28}
          className="rounded-full border border-(--color-line-2)"
        />
        <span>{cv.name}</span>
        <span className="text-(--color-ink-4) font-normal">{ui.nav.roleSuffix}</span>
      </div>

      <div className="hidden md:flex gap-5 text-[13px] text-(--color-ink-3)">
        <a href="#experience" className="hover:text-(--color-ink) transition-colors">{ui.nav.experience}</a>
        <a href="#skills" className="hover:text-(--color-ink) transition-colors">{ui.nav.skills}</a>
        <a href="#certs" className="hover:text-(--color-ink) transition-colors">{ui.nav.certs}</a>
        <a href="#contact" className="hover:text-(--color-ink) transition-colors">{ui.nav.contact}</a>
      </div>

      <div className="flex items-center gap-3">
        <LocaleToggle lang={lang} ui={ui.toggles} />
        <ThemeToggle ui={ui.toggles} />
        {/* TEMP: plaintext CTA, will be replaced by RevealContact in Task 18 */}
        <a
          href={`mailto:${cv.contact.email}`}
          className="bg-(--color-ink) text-(--color-paper) px-3.5 py-2 rounded-md text-[13px] font-medium hover:-translate-y-px transition-transform"
        >
          {ui.nav.cta}
        </a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/nav/StickyNav.tsx
git commit -m "Add StickyNav with locale and theme toggles"
```

---

## Task 16: ScrollProgress (server, pure CSS)

**Files:**
- Create: `src/components/chrome/ScrollProgress.tsx`

- [ ] **Step 1: Write component**

Create `src/components/chrome/ScrollProgress.tsx`:

```tsx
export function ScrollProgress() {
  return <div className="progress" aria-hidden="true" />;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/chrome/ScrollProgress.tsx
git commit -m "Add ScrollProgress (CSS-only)"
```

---

## Task 17: Hero component

**Note:** Hero's secondary CTA ("email button") will swap to `RevealContact` in Task 18. Write with a plaintext placeholder first.

**Files:**
- Create: `src/components/hero/Hero.tsx`

- [ ] **Step 1: Write component**

Create `src/components/hero/Hero.tsx`:

```tsx
import Image from "next/image";
import type { CvData, UiStrings } from "@/content/types";

export function Hero({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center h-screen min-h-[640px] px-8 overflow-hidden"
    >
      <div className="hero max-w-[880px] w-full flex flex-col items-center text-center gap-7">
        <div className="relative">
          <Image
            src="/oscar.jpg"
            alt={cv.name}
            width={140}
            height={140}
            priority
            className="rounded-full border border-(--color-line-2) shadow-[0_1px_2px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.06)]"
          />
          <span
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-full border border-dashed border-(--color-line-2) opacity-70"
          />
        </div>

        <div className="inline-flex items-center gap-2.5 font-mono-micro text-xs uppercase tracking-[0.08em] text-(--color-ink-3)">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-(--color-accent)"
            style={{ animation: "pulse-ring 2s ease-in-out infinite", boxShadow: "0 0 0 4px var(--color-accent-glow)" }}
          />
          {ui.hero.eyebrow}
        </div>

        <h1 className="font-(family-name:--font-display) font-semibold text-[clamp(64px,11vw,148px)] leading-[0.92] tracking-[-0.04em]">
          Oscar <em className="not-italic italic font-normal text-(--color-accent)">Ospina</em>.
        </h1>

        <p className="max-w-[600px] text-[clamp(20px,2.4vw,28px)] leading-[1.3] text-(--color-ink-2) tracking-[-0.01em]">
          {cv.tagline} {cv.summary.split(".")[0]}.
        </p>

        <div className="flex gap-5 flex-wrap justify-center font-mono-micro text-xs tracking-wider uppercase text-(--color-ink-3)">
          <span>TS · NODE · REACT</span>
          <span className="text-(--color-ink-4)">·</span>
          <span>GCP · AWS · AZURE</span>
          <span className="text-(--color-ink-4)">·</span>
          <span>{cv.location.toUpperCase()}</span>
        </div>

        <div className="flex gap-2.5 mt-2">
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium bg-(--color-ink) text-(--color-paper) border border-(--color-ink) hover:bg-(--color-ink-2) transition-colors"
          >
            {ui.hero.ctaSeeExperience}
          </a>
          {/* TEMP: plaintext email CTA; replaced in Task 18 */}
          <a
            href={`mailto:${cv.contact.email}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-line-2) hover:bg-black/5 transition-colors"
          >
            {cv.contact.email}
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono-micro text-[11px] tracking-[0.12em] uppercase text-(--color-ink-4) flex flex-col items-center gap-2"
        style={{ animation: "bounce-hint 2.2s ease-in-out infinite" }}
      >
        {ui.hero.scrollHint}
        <span className="w-px h-6 bg-gradient-to-b from-(--color-ink-4) to-transparent" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/hero/Hero.tsx
git commit -m "Add Hero component with full-screen stage"
```

---

## Task 18: RevealContact + swap placeholders in StickyNav and Hero

**Files:**
- Create: `src/components/contact/RevealContact.tsx`
- Modify: `src/components/nav/StickyNav.tsx`
- Modify: `src/components/hero/Hero.tsx`

- [ ] **Step 1: Write RevealContact**

Create `src/components/contact/RevealContact.tsx`:

```tsx
"use client";

import { useState } from "react";
import { decodeContact } from "@/content/encode";

type Props = {
  kind: "email" | "phone";
  encoded: string;
  labelClosed: string;
  ariaLabel: string;
  className?: string;
  children?: never;
};

export function RevealContact({ kind, encoded, labelClosed, ariaLabel, className }: Props) {
  const [revealed, setRevealed] = useState<string | null>(null);

  if (revealed) {
    const href = kind === "email" ? `mailto:${revealed}` : `tel:${revealed.replace(/\s/g, "")}`;
    return (
      <>
        <a href={href} className={className}>
          {revealed}
        </a>
        <span aria-live="polite" className="sr-only">
          {kind === "email" ? "Email revealed" : "Phone revealed"}
        </span>
      </>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => setRevealed(decodeContact(encoded))}
      className={className}
    >
      <span aria-hidden="true" style={{ marginRight: 6 }}>
        {/* simple eye glyph */}
        👁
      </span>
      {labelClosed}
    </button>
  );
}
```

Also add a small utility for visually-hidden text. Open `src/app/globals.css` and append at the end:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 2: Swap StickyNav placeholder**

In `src/components/nav/StickyNav.tsx`, replace the temp `<a href={\`mailto:\${cv.contact.email}\`} ...>` block with:

```tsx
import { RevealContact } from "@/components/contact/RevealContact";
import { encodeContact } from "@/content/encode";
```

…at the top, then replace the placeholder `<a>` with:

```tsx
<RevealContact
  kind="email"
  encoded={encodeContact(cv.contact.email)}
  labelClosed={ui.nav.cta}
  ariaLabel={ui.reveal.revealEmailAria}
  className="bg-(--color-ink) text-(--color-paper) px-3.5 py-2 rounded-md text-[13px] font-medium hover:-translate-y-px transition-transform inline-flex items-center"
/>
```

- [ ] **Step 3: Swap Hero placeholder**

In `src/components/hero/Hero.tsx`, add the imports:

```tsx
import { RevealContact } from "@/components/contact/RevealContact";
import { encodeContact } from "@/content/encode";
```

Then replace the temp email `<a>` with:

```tsx
<RevealContact
  kind="email"
  encoded={encodeContact(cv.contact.email)}
  labelClosed={ui.reveal.showEmail}
  ariaLabel={ui.reveal.revealEmailAria}
  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-line-2) hover:bg-black/5 transition-colors"
/>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/contact/RevealContact.tsx src/components/nav/StickyNav.tsx src/components/hero/Hero.tsx src/app/globals.css
git commit -m "Add RevealContact and wire into nav + hero"
```

---

## Task 19: CV sidebar components (Summary, Contact, Languages, Certifications, Education)

**Files:**
- Create: `src/components/cv/Summary.tsx`
- Create: `src/components/cv/Contact.tsx`
- Create: `src/components/cv/Languages.tsx`
- Create: `src/components/cv/Certifications.tsx`
- Create: `src/components/cv/Education.tsx`

- [ ] **Step 1: Summary**

Create `src/components/cv/Summary.tsx`:

```tsx
import type { CvData, UiStrings } from "@/content/types";

export function Summary({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section className="mb-14">
      <div className="section-label">{ui.sections.summary}</div>
      <p className="text-[15px] leading-[1.6] text-(--color-ink-2) max-w-[540px]">{cv.summary}</p>
    </section>
  );
}
```

Also add `.section-label` styles to `src/app/globals.css` (append):

```css
.section-label {
  font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: var(--color-ink-4);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.section-label::before {
  content: "";
  width: 14px;
  height: 1px;
  background: var(--color-ink-4);
}
```

- [ ] **Step 2: Contact**

Create `src/components/cv/Contact.tsx`:

```tsx
import type { CvData, UiStrings } from "@/content/types";
import { RevealContact } from "@/components/contact/RevealContact";
import { encodeContact } from "@/content/encode";

type Row =
  | { k: string; kind: "text"; v: string }
  | { k: string; kind: "link"; v: string; href: string }
  | { k: string; kind: "reveal"; which: "email" | "phone" };

export function Contact({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  const rows: Row[] = [
    { k: ui.contactRows.email, kind: "reveal", which: "email" },
    { k: ui.contactRows.phone, kind: "reveal", which: "phone" },
    { k: ui.contactRows.location, kind: "text", v: cv.location },
    { k: ui.contactRows.linkedin, kind: "link", v: "oscar-david-ospina", href: `https://${cv.contact.linkedin}` },
    { k: ui.contactRows.github, kind: "link", v: "oscar-ospina", href: `https://${cv.contact.github}` },
    { k: ui.contactRows.stackoverflow, kind: "link", v: "sxntk", href: `https://${cv.contact.stackoverflow}` },
  ];

  return (
    <section id="contact" className="mb-14">
      <div className="section-label">{ui.sections.contact}</div>
      <div className="flex flex-col gap-2.5">
        {rows.map((row) => (
          <div
            key={row.k}
            className="flex justify-between items-center text-[13px] py-2 border-b border-dashed border-(--color-line) last:border-b-0"
          >
            <span className="font-mono-micro text-[10px] tracking-wider uppercase text-(--color-ink-4)">
              {row.k}
            </span>
            {row.kind === "reveal" ? (
              <RevealContact
                kind={row.which}
                encoded={encodeContact(row.which === "email" ? cv.contact.email : cv.contact.phone)}
                labelClosed={row.which === "email" ? ui.reveal.showEmail : ui.reveal.showPhone}
                ariaLabel={row.which === "email" ? ui.reveal.revealEmailAria : ui.reveal.revealPhoneAria}
                className="max-w-[60%] text-right truncate hover:text-(--color-accent) transition-colors"
              />
            ) : row.kind === "link" ? (
              <a
                href={row.href}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-[60%] text-right truncate hover:text-(--color-accent) transition-colors"
              >
                {row.v}
              </a>
            ) : (
              <span className="max-w-[60%] text-right truncate">{row.v}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Languages**

Create `src/components/cv/Languages.tsx`:

```tsx
import type { CvData, UiStrings } from "@/content/types";

export function Languages({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section className="mb-14">
      <div className="section-label">{ui.sections.languages}</div>
      <div>
        {cv.languages.map((lang) => (
          <div key={lang.name}>
            <div className="flex justify-between items-center mb-3 text-[13px]">
              <span className="font-medium">{lang.name}</span>
              <span className="font-mono-micro text-[11px] text-(--color-ink-4) tracking-wider uppercase">
                {lang.level}
              </span>
            </div>
            <div className="h-0.5 bg-(--color-line) rounded-sm overflow-hidden mb-4">
              <span className="block h-full bg-(--color-ink)" style={{ width: `${lang.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Certifications**

Create `src/components/cv/Certifications.tsx`:

```tsx
import type { CvData, UiStrings } from "@/content/types";

export function Certifications({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section id="certs" className="mb-14">
      <div className="section-label">{ui.sections.certifications}</div>
      <div className="flex flex-col gap-2.5">
        {cv.certifications.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-1 p-3.5 border border-(--color-line-2) rounded-lg bg-white/30 dark:bg-white/5 hover:border-(--color-accent) hover:bg-(--color-accent-soft) transition-colors"
          >
            <span className="font-semibold text-sm">{c.name}</span>
            <span className="font-mono-micro text-[11px] text-(--color-ink-3) tracking-wider">
              {c.issuer} · {c.date} ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Education**

Create `src/components/cv/Education.tsx`:

```tsx
import type { CvData, UiStrings } from "@/content/types";

export function Education({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section>
      <div className="section-label">{ui.sections.education}</div>
      <div className="text-sm">
        <div className="font-semibold mb-1">{cv.education.degree}</div>
        <div className="text-(--color-ink-3)">{cv.education.school}</div>
        <div className="font-mono-micro text-[11px] text-(--color-ink-4) tracking-wider mt-1">
          {cv.education.period}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/cv/ src/app/globals.css
git commit -m "Add CV sidebar components"
```

---

## Task 20: CV main column components (Experience, Job, Skills)

**Files:**
- Create: `src/components/cv/Job.tsx`
- Create: `src/components/cv/Experience.tsx`
- Create: `src/components/cv/Skills.tsx`

- [ ] **Step 1: Job**

Create `src/components/cv/Job.tsx`:

```tsx
import type { Job as JobT } from "@/content/types";

export function Job({ job, isCurrent }: { job: JobT; isCurrent: boolean }) {
  return (
    <article
      className={`relative pl-6 pb-10 border-l ${isCurrent ? "border-(--color-line)" : "border-(--color-line)"} last:border-l-transparent last:pb-0`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-[-5px] top-1 w-[9px] h-[9px] rounded-full border-2 ${
          isCurrent
            ? "bg-(--color-accent) border-(--color-accent) shadow-[0_0_0_4px_var(--color-accent-glow)]"
            : "bg-(--color-paper) border-(--color-ink)"
        }`}
      />
      <header className="flex justify-between items-start gap-4 mb-1.5 flex-wrap">
        <div>
          <div className="text-lg font-semibold tracking-[-0.01em] flex items-baseline gap-2.5 flex-wrap">
            <span>{job.company}</span>
            <span className="font-mono-micro text-[11px] text-(--color-ink-4) tracking-wider uppercase font-normal">
              {job.industry}
            </span>
          </div>
          <div className="text-sm text-(--color-accent) font-medium mb-1">{job.role}</div>
        </div>
        <div className="font-mono-micro text-[11px] text-(--color-ink-3) tracking-wider whitespace-nowrap">
          {job.period} · {job.duration}
        </div>
      </header>

      {job.team && (
        <div className="text-[13px] text-(--color-ink-3) mb-4">Team: {job.team}</div>
      )}

      <p className="text-sm leading-[1.55] text-(--color-ink-2) mb-4 max-w-[620px]">
        {job.context}
      </p>

      <div className="grid gap-2.5 mb-4">
        {job.highlights.map((h, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-5 p-3.5 border border-(--color-line) rounded-lg bg-white/35 dark:bg-white/5 hover:border-(--color-line-2) hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-(family-name:--font-display) text-2xl font-semibold tracking-[-0.03em] text-(--color-accent) leading-none">
                {h.metric}
              </span>
              <span className="font-mono-micro text-[10px] tracking-wider uppercase text-(--color-ink-4) leading-snug">
                {h.label}
              </span>
            </div>
            <div className="text-[13px] leading-[1.55] text-(--color-ink-2)">{h.desc}</div>
          </div>
        ))}
      </div>

      {job.stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.stack.map((s) => (
            <span
              key={s}
              className="font-mono-micro text-[11px] px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 text-(--color-ink-2) border border-(--color-line) hover:bg-(--color-accent-soft) hover:border-(--color-accent) hover:text-(--color-accent-2) transition-colors"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
```

- [ ] **Step 2: Experience**

Create `src/components/cv/Experience.tsx`:

```tsx
import type { CvData, UiStrings } from "@/content/types";
import { Job } from "./Job";

export function Experience({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section id="experience" className="mb-14">
      <div className="section-label">{ui.sections.experience}</div>
      <h3 className="text-[32px] mb-8 tracking-[-0.03em] font-semibold">
        {ui.sections.experienceHeading}
      </h3>
      {cv.jobs.map((job, idx) => (
        <Job key={job.company} job={job} isCurrent={idx === 0} />
      ))}
    </section>
  );
}
```

- [ ] **Step 3: Skills**

Create `src/components/cv/Skills.tsx`:

```tsx
import type { CvData, UiStrings } from "@/content/types";

export function Skills({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  const groups = Object.entries(cv.skills);
  return (
    <section id="skills">
      <div className="section-label">{ui.sections.skills}</div>
      <h3 className="text-[32px] mb-6 tracking-[-0.03em] font-semibold">
        {ui.sections.skillsHeading}
      </h3>
      <div className="grid grid-cols-1 gap-5">
        {groups.map(([group, items]) => (
          <div
            key={group}
            className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-5 items-baseline py-3.5 border-b border-(--color-line) last:border-b-0"
          >
            <div className="font-mono-micro text-[11px] tracking-wider uppercase text-(--color-ink-3)">
              {group}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span
                  key={item}
                  className="font-mono-micro text-[11px] px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 text-(--color-ink-2) border border-(--color-line) hover:bg-(--color-accent-soft) hover:border-(--color-accent) hover:text-(--color-accent-2) transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/cv/Job.tsx src/components/cv/Experience.tsx src/components/cv/Skills.tsx
git commit -m "Add Experience, Job, and Skills components"
```

---

## Task 21: CvDocument wrapper + doc header

**Files:**
- Create: `src/components/cv/CvDocument.tsx`

- [ ] **Step 1: Write wrapper**

Create `src/components/cv/CvDocument.tsx`:

```tsx
import Image from "next/image";
import type { CvData, UiStrings } from "@/content/types";
import { RevealContact } from "@/components/contact/RevealContact";
import { encodeContact } from "@/content/encode";
import { Summary } from "./Summary";
import { Contact } from "./Contact";
import { Languages } from "./Languages";
import { Certifications } from "./Certifications";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Skills } from "./Skills";

export function CvDocument({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <main id="doc" className="doc relative z-[2] max-w-[1200px] mx-auto px-8 pt-10 pb-32">
      <header className="grid grid-cols-[auto_1fr_auto] gap-6 items-center pb-6 mb-10 border-b border-(--color-line)">
        <Image
          src="/oscar.jpg"
          alt=""
          width={64}
          height={64}
          className="rounded-full border border-(--color-line-2)"
        />
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{cv.name}</h2>
          <div className="font-mono-micro text-[11px] text-(--color-ink-3) tracking-wider uppercase mt-1">
            {cv.role} · {cv.experience}
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href={`https://${cv.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-line-2) hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {ui.docHeader.linkedin}
          </a>
          <RevealContact
            kind="email"
            encoded={encodeContact(cv.contact.email)}
            labelClosed={ui.docHeader.hireMe}
            ariaLabel={ui.reveal.revealEmailAria}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium bg-(--color-accent) text-white border border-(--color-accent) hover:bg-(--color-accent-2) transition-colors"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2.2fr] gap-16">
        <aside>
          <Summary cv={cv} ui={ui} />
          <Contact cv={cv} ui={ui} />
          <Languages cv={cv} ui={ui} />
          <Certifications cv={cv} ui={ui} />
          <Education cv={cv} ui={ui} />
        </aside>
        <div>
          <Experience cv={cv} ui={ui} />
          <Skills cv={cv} ui={ui} />
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/cv/CvDocument.tsx
git commit -m "Add CvDocument wrapper with doc header"
```

---

## Task 22: FooterCta

**Files:**
- Create: `src/components/footer/FooterCta.tsx`

- [ ] **Step 1: Write component**

Create `src/components/footer/FooterCta.tsx`:

```tsx
import type { CvData, UiStrings } from "@/content/types";
import { RevealContact } from "@/components/contact/RevealContact";
import { encodeContact } from "@/content/encode";

export function FooterCta({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <footer className="relative mt-20 py-20 px-8 text-center border-t border-(--color-line)">
      <h3 className="font-(family-name:--font-display) text-[clamp(40px,6vw,72px)] font-semibold tracking-[-0.03em] leading-none mb-6">
        {ui.footer.heading}{" "}
        <em className="not-italic italic font-normal text-(--color-accent)">{ui.footer.headingEm}</em>{" "}
        something.
      </h3>
      <p className="text-(--color-ink-3) text-base max-w-[480px] mx-auto">{ui.footer.subtitle}</p>
      <div className="flex flex-wrap gap-2.5 justify-center mt-6">
        <RevealContact
          kind="email"
          encoded={encodeContact(cv.contact.email)}
          labelClosed={ui.reveal.showEmail}
          ariaLabel={ui.reveal.revealEmailAria}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium bg-(--color-accent) text-white border border-(--color-accent) hover:bg-(--color-accent-2) transition-colors"
        />
        <a
          href={`https://${cv.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-line-2) hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          {ui.docHeader.linkedin}
        </a>
        <a
          href={`https://${cv.contact.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-line-2) hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          GitHub ↗
        </a>
        <RevealContact
          kind="phone"
          encoded={encodeContact(cv.contact.phone)}
          labelClosed={ui.reveal.showPhone}
          ariaLabel={ui.reveal.revealPhoneAria}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-line-2) hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        />
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/footer/FooterCta.tsx
git commit -m "Add FooterCta with click-to-reveal contact buttons"
```

---

## Task 23: Page assembly + JSON-LD + smooth-scroll

**Files:**
- Create: `src/app/[lang]/page.tsx`
- Create: `src/app/[lang]/not-found.tsx`
- Create: `src/components/chrome/SmoothScroll.tsx`

- [ ] **Step 1: SmoothScroll client helper**

Create `src/components/chrome/SmoothScroll.tsx` (small client-side behavior to offset anchor scroll by the sticky-nav height):

```tsx
"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
```

- [ ] **Step 2: Page**

Create `src/app/[lang]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { hasLocale } from "@/content/types";
import { getContent } from "@/content";
import { Hero } from "@/components/hero/Hero";
import { CvDocument } from "@/components/cv/CvDocument";
import { FooterCta } from "@/components/footer/FooterCta";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { cv, ui } = getContent(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: cv.name,
    jobTitle: cv.role,
    description: cv.summary,
    url: lang === "en" ? "https://oscarospina.com/" : `https://oscarospina.com/${lang}`,
    sameAs: [
      `https://${cv.contact.linkedin}`,
      `https://${cv.contact.github}`,
      `https://${cv.contact.stackoverflow}`,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressCountry: "CO",
    },
    knowsAbout: [
      ...cv.skills.Languages,
      ...cv.skills.Frontend,
      ...cv.skills.Backend,
      ...cv.skills.Cloud,
    ],
  };

  return (
    <>
      <SmoothScroll />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero cv={cv} ui={ui} />
      <CvDocument cv={cv} ui={ui} />
      <FooterCta cv={cv} ui={ui} />
    </>
  );
}
```

- [ ] **Step 3: not-found**

Create `src/app/[lang]/not-found.tsx`:

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="text-(--color-ink-3)">The page you're looking for doesn't exist.</p>
      <Link href="/" className="underline text-(--color-accent)">Back home</Link>
    </div>
  );
}
```

- [ ] **Step 4: Start dev server and smoke-test EN and ES**

```bash
npm run dev
```

Manual verification in browser:
1. Open `http://localhost:3000` — should render EN page, hero + scroll into CV.
2. Scroll down — hero shrinks, sticky nav appears, progress bar grows.
3. Click the "Show email" button in the hero — should reveal `osdao.lopez@gmail.com` and become a functional mailto link.
4. Click the `EN/ES` toggle — navigates to `/es` and renders Spanish copy.
5. Click the theme toggle (cycles System/Light/Dark) — root `.dark` class toggles, palette inverts.
6. Open DevTools → Application → Cookies — `NEXT_LOCALE` is set after the toggle.
7. Open DevTools → Elements — confirm `osdao.lopez@gmail.com` and `+57 319 404 9005` are NOT present in raw HTML before reveal.

Stop dev server (Ctrl-C).

- [ ] **Step 5: Typecheck + build**

```bash
npm run typecheck && npm run build
```
Expected: both succeed.

- [ ] **Step 6: Commit**

```bash
git add src/app/\[lang\]/page.tsx src/app/\[lang\]/not-found.tsx src/components/chrome/SmoothScroll.tsx
git commit -m "Assemble page with hero, CV doc, footer, and JSON-LD"
```

---

## Task 24: generateMetadata for [lang]/page.tsx

**Files:**
- Modify: `src/app/[lang]/page.tsx`

- [ ] **Step 1: Add generateMetadata**

In `src/app/[lang]/page.tsx`, add the following export above the default export:

```tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { cv } = getContent(lang);

  const title =
    lang === "es"
      ? `${cv.name} — Senior Fullstack Developer`
      : `${cv.name} — Senior Fullstack Developer`;
  const description = cv.summary;
  const canonical = lang === "en" ? "/" : `/${lang}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: "/",
        es: "/es",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "profile",
      locale: lang === "es" ? "es_CO" : "en_US",
      alternateLocale: lang === "es" ? ["en_US"] : ["es_CO"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
```

- [ ] **Step 2: Typecheck + build**

```bash
npm run typecheck && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/\[lang\]/page.tsx
git commit -m "Add generateMetadata with locale alternates"
```

---

## Task 25: Dynamic OG image

**Files:**
- Create: `src/app/[lang]/opengraph-image.tsx`

- [ ] **Step 1: Write OG image route**

Create `src/app/[lang]/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";
import { hasLocale } from "@/content/types";
import { getContent } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Oscar Ospina — Senior Fullstack Developer";

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return new ImageResponse(<div>Not found</div>, size);
  }
  const { cv } = getContent(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f5f1e8",
          display: "flex",
          flexDirection: "column",
          padding: 64,
          fontFamily: "sans-serif",
          color: "#0f0f0e",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#5c5a53", marginBottom: 24 }}>
          {cv.role}
        </div>
        <div style={{ display: "flex", fontSize: 120, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>
          {cv.name}.
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#2a2a28", marginTop: 32, maxWidth: 900 }}>
          {cv.tagline}
        </div>
        <div style={{ marginTop: "auto", display: "flex", gap: 32, fontSize: 22, color: "#5c5a53", letterSpacing: 2, textTransform: "uppercase" }}>
          <span>TS · NODE · REACT</span>
          <span>·</span>
          <span>GCP · AWS · AZURE</span>
          <span>·</span>
          <span>{cv.location}</span>
        </div>
        <div style={{ position: "absolute", bottom: 64, right: 64, width: 80, height: 80, borderRadius: "50%", background: "#c2410c" }} />
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: Build and verify**

```bash
npm run build
```
Should build successfully.

Start dev server and open `http://localhost:3000/en/opengraph-image` — expect a 1200×630 PNG download or preview. Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/app/\[lang\]/opengraph-image.tsx
git commit -m "Add dynamic OG image per locale"
```

---

## Task 26: Favicon (monogram icon.tsx)

**Files:**
- Create: `src/app/icon.tsx`

- [ ] **Step 1: Write icon route**

Create `src/app/icon.tsx`:

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f5f1e8",
          color: "#c2410c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: -2,
          fontFamily: "sans-serif",
        }}
      >
        OO
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: Build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/icon.tsx
git commit -m "Add monogram favicon via ImageResponse"
```

---

## Task 27: sitemap and robots

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 1: Sitemap**

Create `src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://oscarospina.com/",
      lastModified: now,
      alternates: {
        languages: {
          en: "https://oscarospina.com/",
          es: "https://oscarospina.com/es",
        },
      },
    },
    {
      url: "https://oscarospina.com/es",
      lastModified: now,
      alternates: {
        languages: {
          en: "https://oscarospina.com/",
          es: "https://oscarospina.com/es",
        },
      },
    },
  ];
}
```

- [ ] **Step 2: Robots**

Create `src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://oscarospina.com/sitemap.xml",
    host: "https://oscarospina.com",
  };
}
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "Add sitemap and robots"
```

---

## Task 28: GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "Add GitHub Actions CI (lint, typecheck, build)"
```

---

## Task 29: Final cleanup + manual deploy instructions

**Files:**
- Delete: `html-handoff.tar.gz`
- Create: `docs/DEPLOY.md`

- [ ] **Step 1: Remove handoff bundle**

```bash
rm html-handoff.tar.gz
```

- [ ] **Step 2: Write deploy instructions**

Create `docs/DEPLOY.md`:

```markdown
# Deploy

## Vercel project setup

1. Visit https://vercel.com/new and import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected).
3. Build command: leave as default (`next build`).
4. Environment variables: none required.
5. Click **Deploy**. First deploy creates `<project>.vercel.app`.

## Custom domain: oscarospina.com

### 1. Add the domain in Vercel
- Project → Settings → Domains → Add Domain → `oscarospina.com`.
- Also add `www.oscarospina.com` and set it to redirect to the apex.
- Vercel will display the DNS records to configure. Copy them.

### 2. Apply DNS records in GoDaddy
- GoDaddy → My Products → DNS for oscarospina.com.
- Replace the apex `A` record(s) with the one Vercel shows (typically `A` → `76.76.21.21`).
- Replace or add a `CNAME` for `www` → `cname.vercel-dns.com`.
- Propagation is usually under 30 minutes.

### 3. HTTPS
- Vercel auto-provisions Let's Encrypt certificates after DNS resolves. Verify the lock icon in the browser.

## Vercel Analytics
- Already wired via `@vercel/analytics` in `src/app/layout.tsx`. After the first deploy, the dashboard at Project → Analytics populates automatically.

## CI
- GitHub Actions runs `lint`, `typecheck`, `build` on every push and PR to `main`. The deploy itself is handled by Vercel's GitHub integration, not by CI.
```

- [ ] **Step 3: Final verification run**

```bash
npm run lint && npm run typecheck && npm run build
```
All three must succeed.

- [ ] **Step 4: Dev-server smoke test, checklist**

```bash
npm run dev
```

Tick each manually (Chrome or another Chromium browser for `animation-timeline` support):

- [ ] `/` renders EN hero; scroll transforms hero → CV smoothly.
- [ ] Sticky nav appears after ~55% of first viewport scroll.
- [ ] Progress bar grows as scroll progresses.
- [ ] Locale toggle swaps to `/es` and renders Spanish copy; switching back returns to `/`.
- [ ] Theme toggle cycles System → Light → Dark → System, with correct palette.
- [ ] Click "Show email" in hero → reveals address; `mailto:` link is functional.
- [ ] Click "Show phone" in footer → reveals phone; `tel:` link is functional.
- [ ] View-source on `/` — search for `osdao.lopez` and `+57 319`: should be **not found** before any reveal.
- [ ] View-source on `/` — search for the string `"@type": "Person"` (JSON-LD) — should be **present** but without `email` or `telephone` properties.
- [ ] Test in a second browser or private window with `Accept-Language: es` (use DevTools → Sensors → Languages) — should redirect `/` to `/es`.
- [ ] Keyboard tab through the page — every interactive element shows a focus ring.
- [ ] Resize to mobile width (~375px) — layout stacks cleanly, no horizontal scroll.
- [ ] DevTools → Lighthouse → Accessibility score ≥ 95.

Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Remove handoff bundle and add deploy instructions"
```

- [ ] **Step 6: Manual deploy steps (outside of code)**

Follow `docs/DEPLOY.md`:
1. Push branch to GitHub.
2. Create Vercel project from the repo.
3. Add `oscarospina.com` + `www.oscarospina.com` in Vercel.
4. Apply DNS changes in GoDaddy.
5. Wait for HTTPS provisioning and verify.

---

## Self-review notes

- **Spec coverage:**
  - Rendering model (SC default, client islands) — Tasks 9–23.
  - `[lang]` route + `generateStaticParams` — Task 9.
  - Proxy for locale detection — Task 8.
  - Content model (types, per-locale modules, `getContent`) — Tasks 2–7.
  - Design tokens (light + dark), fonts, grain — Tasks 9, 11.
  - Theming (class, toggle, init script) — Tasks 10, 12, 13.
  - All component files from spec — Tasks 12–22.
  - Click-to-reveal for every email/phone occurrence (hero, doc-header Hire me, contact list, footer, nav CTA) — Tasks 15, 17, 18, 19, 21, 22.
  - Scroll transform (CSS only, fallback, reduced-motion) — Task 11.
  - SEO (generateMetadata, OG image, favicon, sitemap, robots) — Tasks 24–27.
  - JSON-LD (without email/phone) — Task 23.
  - Accessibility (skip link, focus rings, aria-live, semantic HTML) — Tasks 11, 18, and component tasks.
  - Analytics, CI, deploy — Tasks 1, 10, 28, 29.
  - Asset handling (photo via next/image, scaffold cleanup, handoff bundle removal) — Tasks 1, 9, 29.

- **Type consistency:** Types defined in `src/content/types.ts` (Task 2) — `CvData`, `UiStrings`, `Locale`, `Highlight`, `Job`, `LanguageSkill`, `Certification`, `Education`, `Contact` — referenced identically in every later task. `RevealContact` props signature identical across all call sites (Task 18 defines `kind | encoded | labelClosed | ariaLabel | className`).

- **No placeholders:** Every code block is complete and self-contained. No TBDs.

- **Known trade-offs documented in the plan:**
  - `src/app/layout.tsx` may render `<html lang="en">` statically; the nested `[lang]` layout is where the correct `lang` is actually known. This is acceptable because Next.js renders the nested layout's HTML shell effectively (the root layout wraps it). If the final build shows duplicate or wrong `<html>` attributes, the fallback minimal-root pattern in Task 10 is the recommended correction.
  - The scroll transform fallback for Firefox (without `animation-timeline` flag) is a static stacked layout — explicitly acceptable per the spec.
  - `RevealContact` with JS disabled leaves email/phone hidden — explicit trade-off per the spec.
