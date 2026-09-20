import type { ExperienceItem } from "./types";

// Newest first. Home page shows the first 2; /experience shows all.
export const experience: ExperienceItem[] = [
  {
    id: "exp-hausstrom",
    role: "Data Analyst / Sales Coordinator",
    company: "HAUSSTROM LTD",
    period: "April 2024 — Present",
    description:
      "Manage sales data, executive reporting, ERP workflows, and inventory datasets to support data-driven decisions across the organization.",
    achievements: [
      "Prepare daily, weekly, and monthly sales and profitability reports for leadership",
      "Maintain Google Sheets reporting pipelines including WAM, MIS, and FMS models",
      "Manage end-to-end ERP sales workflow from quotation to billing",
    ],
    tools: ["Excel", "Google Sheets", "SQL", "ERP", "Power BI"],
  },
  {
    id: "exp-freelance",
    role: "AI Automation Specialist",
    company: "Freelance",
    period: "2025 — Present",
    description:
      "Design and build n8n workflows, AI agents, and data reporting systems for small businesses and individual clients.",
    achievements: [
      "Built automations connecting forms, CRMs, and messaging platforms",
      "Developed AI agents for first-line customer support and lead qualification",
    ],
    tools: ["n8n", "OpenAI", "Webhooks", "Slack", "Google Sheets"],
  },
  {
    id: "exp-independent",
    role: "Data Analyst",
    company: "Independent Projects",
    period: "2022 — Present",
    description:
      "Independent analysis work: cleaning messy datasets, SQL exploration, and building dashboards people actually use.",
    achievements: [
      "Built Power BI dashboards from unstructured exports",
      "Practiced SQL analysis on public and sample datasets",
    ],
    tools: ["SQL", "Excel", "Power BI", "Data Cleaning"],
  },
  {
    id: "exp-placeholder",
    role: "Placeholder Role",
    company: "Replace me",
    period: "YYYY — YYYY",
    description:
      "Placeholder entry — replace with another role, internship, or project once you have the details.",
    tools: ["Tool 1", "Tool 2"],
  },
];

/** Pull-quote shown on the home Experience strip and the full Experience page */
export const experienceQuote =
  "I've spent over four years in data analysis and have built hands-on experience in AI automation and workflow development for over eight months.";
