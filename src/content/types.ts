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
