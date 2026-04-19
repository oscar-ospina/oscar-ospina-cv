import type { CvData } from "./types";

export const cvEn: CvData = {
  name: "Oscar Ospina",
  role: "Lead · Senior Fullstack Developer",
  careerStartYear: 2013,
  tagline: "I can build whatever you can dream.",
  summary:
    "Senior Full Stack Developer with 13+ years architecting distributed systems and high-performance applications. Expert in TypeScript/Node.js, React, and cloud platforms (GCP/AWS/Azure). Proven track record scaling microservices to handle millions of users with sub-second latency.",
  location: "Medellín, Colombia",
  contact: {
    email: "osdao.lopez@gmail.com",
    phone: "+57 319 404 9005",
    linkedin: "linkedin.com/in/oscar-david-ospina-65b94451",
    linkedinHandle: "oscar-david-ospina",
    github: "github.com/oscar-ospina",
    githubHandle: "oscar-ospina",
    stackoverflow: "stackoverflow.com/users/4070633/sxntk",
    stackoverflowHandle: "sxntk",
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
