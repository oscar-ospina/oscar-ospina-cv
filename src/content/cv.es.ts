import type { CvData } from "./types";

export const cvEs: CvData = {
  name: "Oscar Ospina",
  role: "Lead · Senior Fullstack Developer",
  careerStartYear: 2013,
  tagline: "Puedo construir lo que sueñes.",
  summary:
    "Senior Full Stack Developer con 13+ años diseñando sistemas distribuidos y aplicaciones de alto rendimiento. Experto en TypeScript/Node.js, React y plataformas cloud (GCP/AWS/Azure). Historial comprobado escalando microservicios a millones de usuarios con latencia sub-segundo.",
  location: "Medellín, Colombia",
  contact: {
    email: "osdao.lopez@gmail.com",
    phone: "+57 319 404 9005",
    linkedin: "www.linkedin.com/in/oscar-ospina-65b94451",
    linkedinHandle: "oscar-ospina-65b94451",
    github: "github.com/oscar-ospina",
    githubHandle: "oscar-ospina",
    stackoverflow: "stackoverflow.com/users/4070633/sxntk",
    stackoverflowHandle: "sxntk",
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
