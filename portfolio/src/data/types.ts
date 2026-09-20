// ─────────────────────────────────────────────────────────────
// Shared type definitions for every editable data file.
// ─────────────────────────────────────────────────────────────

export type ProjectCategory =
  | "AI Automation"
  | "n8n"
  | "Data Analytics"
  | "CRM"
  | "AI Agents"
  | "Dashboards"
  | "Web Applications";

export interface WorkflowStep {
  label: string;
  description?: string;
}

export interface ProjectFile {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  workflow?: WorkflowStep[];
  tools: string[];
  image: string;
  screenshots?: string[];
  files?: ProjectFile[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  date?: string;
  results?: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  /** Short description shown on home + experience page (keep to ~2 lines) */
  description: string;
  /** Optional longer detail on the full experience page */
  achievements?: string[];
  /** Tool chips under each entry on the full experience page */
  tools: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}

export interface SiteInfo {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  resumeUrl?: string;
  aboutParagraphs: string[];
  focusAreas: string[];
  social: {
    linkedin?: string;
    github?: string;
    whatsapp?: string;
    twitter?: string;
  };
}
