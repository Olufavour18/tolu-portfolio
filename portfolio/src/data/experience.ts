import type { ExperienceItem } from "./types";

// Newest first. The timeline renders automatically from this array —
// add an object to add an entry, remove one to delete it.
export const experience: ExperienceItem[] = [
  {
    role: "AI Automation Specialist (Freelance)",
    company: "Self-employed",
    period: "2026 — Present",
    description:
      "Designing and building n8n automation workflows, AI agents, and data reporting systems for small businesses and individual clients.",
    achievements: [
      "Built automation workflows connecting forms, CRMs, and messaging platforms",
      "Developed AI agents for first-line customer support",
      "Delivered recurring data cleaning and dashboard reporting for clients",
    ],
  },
  {
    role: "Data Analyst (Independent Projects)",
    company: "Self-directed",
    period: "2022 — Present",
    description:
      "Worked on independent data analysis projects, cleaning and visualizing datasets to practice and demonstrate analytical skills.",
    achievements: [
      "Built dashboards in Power BI from raw, unstructured datasets",
      "Practiced SQL-based analysis on public and sample datasets",
    ],
  },
{
  role: "Data Analyst / Sales Coordinator",
  company: "HAUSSTROM LTD",
  period: "April 2024 — Present",
  description:
    "Manage sales data, executive reporting, ERP workflows, inventory datasets, and operational reporting to support data-driven decision-making across the organization.",
  achievements: [
    "Prepare and deliver daily, weekly, and monthly sales performance and profitability reports for the CEO and National Sales Manager.",
    "Manage and maintain corporate Google Sheets databases and reporting pipelines, including WAM, MIS, and FMS models.",
    "Clean, validate, and reconcile business data to maintain data accuracy and integrity across reporting systems.",
    "Manage the end-to-end ERP sales workflow, including client quotations, purchase orders, final billing, and data reconciliation.",
    "Analyze nationwide stock allocation datasets across multiple branches to support inventory optimization and reduce stock-out risks.",
    "Transform raw sales and operational data into meaningful reports and insights for management decision-making.",
    "Coordinate and analyze operational logistics data to support efficient transportation and executive operations.",
  ],
},
]