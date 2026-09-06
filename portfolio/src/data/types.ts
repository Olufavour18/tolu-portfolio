// ─────────────────────────────────────────────────────────────
// Shared type definitions for every editable data file.
// You should not need to touch this file when adding content —
// only when you want to add a brand-new field to track.
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
  /** What the download link says, e.g. "Download n8n workflow (.json)" */
  label: string;
  /** Path to the file — put it in /public/files/ and reference it as /files/your-file.json */
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
  /** Optional Trigger → Processing → AI/Logic → Action → Result chain, shown on automation projects */
  workflow?: WorkflowStep[];
  tools: string[];
  image: string;
  screenshots?: string[];
  /** Downloadable files for this project — n8n workflow JSON exports, dashboard files, PDF reports, etc. */
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
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  /** name of a lucide-react icon component, see components/IconResolver.tsx */
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
  /** Optional link to view/verify the credential */
  credentialUrl?: string;
  /** Optional certificate image — put it in /public/certifications/ */
  image?: string;
}

export interface SiteInfo {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  resumeUrl?: string;
  /** Each string is one paragraph in the About section, shown in order */
  aboutParagraphs: string[];
  /** Short bullet list shown in the "What I focus on" card in the About section */
  focusAreas: string[];
  social: {
    linkedin?: string;
    github?: string;
    whatsapp?: string;
    twitter?: string;
  };
}
