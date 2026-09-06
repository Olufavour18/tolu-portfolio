import type { Service } from "./types";

// "icon" must match a key in components/IconResolver.tsx
export const services: Service[] = [
  {
    id: "ai-workflow-automation",
    title: "AI Workflow Automation",
    description:
      "Designing automated workflows that combine business logic with AI to remove repetitive manual work.",
    icon: "Workflow",
  },
  {
    id: "n8n-automation",
    title: "n8n Automation",
    description:
      "Building and maintaining custom n8n workflows that connect your tools and keep data moving without manual input.",
    icon: "GitBranch",
  },
  {
    id: "data-analytics-dashboards",
    title: "Data Analytics & Dashboards",
    description:
      "Cleaning, transforming, and analyzing raw data to build interactive dashboards that reveal trends and support better business decisions.",
    icon: "BarChart3",
  },
  {
    id: "crm-automation",
    title: "CRM Automation",
    description:
      "Automating lead capture, follow-ups, and record maintenance inside your CRM so nothing falls through the cracks.",
    icon: "Users",
  },
  {
    id: "ai-agent-development",
    title: "AI Agent Development",
    description:
      "Building AI agents that can answer questions, route requests, and complete simple tasks on their own.",
    icon: "Bot",
  },
  {
    id: "api-system-integration",
    title: "API & System Integration",
    description:
      "Connecting the tools your business already uses so information flows between them automatically.",
    icon: "Plug",
  },
  
    {
      id: "excel-data-automation",
      title: "Excel Data Analysis & Automation",
      description:
        "Using advanced Excel formulas, PivotTables, XLOOKUP, data validation, and automation techniques to streamline reporting and repetitive tasks.",
      icon: "BarChart3",
    },
];
