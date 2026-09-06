import type { SkillGroup } from "./types";

// Add or remove a skill by editing the "skills" array of a group.
// Add a whole new group by copying one of the objects below.
export const skillGroups: SkillGroup[] = [
  {
    id: "automation",
    title: "Automation",
    skills: [
      "n8n",
      "Workflow Automation",
      "API Integration",
      "Webhooks",
      "Process Automation",
    ],
  },
  {
    id: "ai",
    title: "AI",
    skills: [
      "AI Agents",
      "OpenAI APIs",
      "Prompt Engineering",
      "LLM Workflows",
      "AI Automation",
    ],
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    skills: [
      "Excel",
      "SQL",
      "Power BI",
      "Data Cleaning",
      "Data Visualization",
      "Data Analysis",
    ],
  },
  {
    id: "crm-business",
    title: "CRM & Business Systems",
    skills: ["CRM Automation", "Lead Management", "Customer Workflows"],
  },
  {
    id: "development",
    title: "Development",
    skills: ["JavaScript", "Python", "HTML", "CSS", "Git/GitHub"],
  },
];
