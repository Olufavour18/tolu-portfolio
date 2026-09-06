import type { Project } from "./types";

// ─────────────────────────────────────────────────────────────
// HOW TO ADD A PROJECT
// Copy an object below, change every field, give it a unique
// "id", and add it to the array. The site updates automatically —
// no component changes needed. Delete an object to remove a
// project. See README.md for full field-by-field notes.
// ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "project-001",
    title: "New Dealer Lead Intake & Notification Automation",
    category: "n8n",
    shortDescription:
      "Captures new dealer leads from a webhook and a Google Form, checks for existing customers, and notifies the team and the customer automatically.",
    fullDescription:
      "An n8n workflow that accepts new dealer leads from two entry points — a manual webhook and a Google Form — maps the lead information, checks a Google Sheet to see whether the person is a new or returning customer, updates the records accordingly, and sends a Slack notification to the team along with a welcome message to the customer.",
    problem:
      "Leads were coming in from two different sources (a manual process and a Google Form), with no automatic way to tell whether someone was a new dealer or a returning customer, and no consistent notification going to the team or the customer.",
    solution:
      "Built an n8n workflow with two triggers — a webhook for manual entry and a Google Sheets trigger fed by a Google Form — that maps the lead's information, looks it up in a Google Sheet, and branches based on whether a matching row exists: updating the existing row for returning customers or appending a new row for first-time ones. The workflow then posts a message to the team on Slack and sends a welcome message to the customer.",
    workflow: [
      { label: "Trigger", description: "Webhook or Google Form submission" },
      { label: "Processing", description: "Map lead information" },
      { label: "AI/Logic", description: "Check sheet: new or returning customer" },
      { label: "Action", description: "Update or add record, notify team" },
      { label: "Result", description: "Customer receives a welcome message" },
    ],
    tools: ["n8n", "Google Sheets", "Slack", "Gmail", "Webhooks"],
    image: "/projects/new-dealer-lead-sheet.jpeg",
    screenshots: [],
    githubUrl: "",
    liveUrl: "",
    featured: true,
    date: "2026",
    results: [
      "New and returning dealers are automatically told apart using the Google Sheet as a record",
      "The sales team is notified on Slack the moment a lead comes in",
      "Every customer automatically receives a welcome message with no manual follow-up",
    ],
  },
{
  id: "project-002",
  title: "AI Daily Weather & News Assistant",
  category: "AI Agents",
  shortDescription:
    "An AI-powered assistant that collects today's weather and latest news, summarizes the information, and delivers it directly by email.",
  fullDescription:
    "An n8n-based AI assistant that uses an AI Agent powered by Google Gemini to gather and process real-time weather and news information. The workflow uses an HTTP Request node to retrieve weather data from OpenWeather and an RSS Feed to collect the latest news, then uses the AI Agent to organize the information into a useful daily briefing and sends the final update to email.",
  problem:
    "Checking the weather and searching through different news sources every day can be time-consuming. I wanted a simple automated system that could gather the information for me and deliver it in one place.",
  solution:
    "Built an n8n workflow where a user trigger starts an AI Agent powered by Google Gemini. The workflow uses Simple Memory to maintain conversational context, retrieves weather information through the OpenWeather API using an HTTP Request node, collects the latest news through an RSS Feed, and sends the processed daily briefing directly to email.",
  workflow: [
    { label: "Trigger", description: "User trigger starts the workflow" },
    { label: "AI Agent", description: "AI Agent processes and coordinates the request" },
    { label: "AI Model", description: "Google Gemini generates and organizes the response" },
    { label: "Memory", description: "Simple Memory maintains conversation context" },
    { label: "Weather", description: "HTTP Request retrieves current weather data from OpenWeather" },
    { label: "News", description: "RSS Feed retrieves the latest news for today" },
    { label: "Action", description: "AI organizes the weather and news into a daily briefing" },
    { label: "Result", description: "Daily briefing is sent to email" },
  ],
  tools: [
    "n8n",
    "Google Gemini",
    "OpenWeather API",
    "RSS Feed",
    "HTTP Request",
    "Simple Memory",
    "Email"
  ],
  image: "/projects/ai-weather-news-assistant.jpeg",
  screenshots: [],
  githubUrl: "",
  liveUrl: "",
  featured: true,
  date: "2026",
  results: [
    "Weather information is retrieved automatically",
    "Latest news is collected from an RSS feed",
    "Google Gemini organizes the information into a useful briefing",
    "The final weather and news update is delivered directly to email",
  ],
},
  {
    id: "project-003",
    title: "Sales Performance Dashboard",
    category: "Dashboards",
    shortDescription:
      "A Power BI dashboard turning raw sales exports into a clear monthly performance view.",
    fullDescription:
      "A recurring reporting workflow that cleans messy sales exports and produces a dashboard the sales team actually opens every week, instead of a spreadsheet nobody reads.",
    problem:
      "Monthly sales figures lived in inconsistent spreadsheets, making it hard to see trends or compare performance across regions.",
    solution:
      "Cleaned and standardized the raw exports, modeled the data, and built a Power BI dashboard with revenue, conversion, and regional breakdowns that refreshes on a schedule.",
    tools: ["Power BI", "Excel", "SQL", "Data Cleaning"],
    image: "/projects/sales-dashboard.svg",
    screenshots: [],
    githubUrl: "",
    liveUrl: "",
    featured: true,
    date: "2024",
    results: [
      "Replaced a manually updated spreadsheet with a self-refreshing dashboard",
      "Made month-over-month regional comparisons visible at a glance",
    ],
  },
  {
    id: "project-004",
    title: "Customer Churn Data Cleaning & Analysis",
    category: "Data Analytics",
    shortDescription:
      "Cleaned and analyzed a customer dataset to surface early churn indicators.",
    fullDescription:
      "An exploratory analysis project that took an inconsistent customer dataset and turned it into clear, defensible findings about which behaviors correlate with churn.",
    problem:
      "Customer records were duplicated and inconsistently formatted, making any analysis of churn patterns unreliable.",
    solution:
      "Standardized the dataset, removed duplicates, and used SQL and Excel to analyze usage patterns, surfacing the behaviors most associated with customers who churned.",
    tools: ["SQL", "Excel", "Data Cleaning", "Data Visualization"],
    image: "/projects/churn-analysis.svg",
    screenshots: [],
    githubUrl: "",
    liveUrl: "",
    featured: false,
    date: "2024",
    results: [
      "Identified the usage patterns most associated with churned accounts",
      "Delivered a cleaned dataset the team could reuse for future analysis",
    ],
  },
  {
    id: "project-005",
    title: "CRM Duplicate Cleanup & Enrichment",
    category: "CRM",
    shortDescription:
      "A scheduled workflow that finds duplicate CRM records and enriches incomplete ones.",
    fullDescription:
      "A maintenance automation that keeps a CRM database tidy over time by finding duplicate contacts and filling in missing fields from available data sources.",
    problem:
      "The CRM had accumulated duplicate and incomplete contact records after years of manual entry from different sources.",
    solution:
      "Built a scheduled n8n workflow that scans for likely duplicates, merges them following defined rules, and enriches records that were missing key fields.",
    workflow: [
      { label: "Trigger", description: "Scheduled run" },
      { label: "Processing", description: "Scan CRM records" },
      { label: "AI/Logic", description: "Detect likely duplicates" },
      { label: "Action", description: "Merge & enrich records" },
      { label: "Result", description: "Cleaner CRM database" },
    ],
    tools: ["n8n", "CRM Automation", "API Integration"],
    image: "/projects/crm-cleanup.svg",
    screenshots: [],
    githubUrl: "",
    liveUrl: "",
    featured: false,
    date: "2024",
    results: ["Reduced duplicate contact records in the CRM"],
  },
  {
    id: "project-006",
    title: "Internal Reporting Portal",
    category: "Web Applications",
    shortDescription:
      "A lightweight internal web app for viewing automated weekly reports.",
    fullDescription:
      "A small internal tool built so the operations team could view automatically generated weekly reports in a browser instead of digging through email attachments.",
    problem:
      "Weekly reports were emailed as attachments, making them easy to lose track of and impossible to compare over time.",
    solution:
      "Built a simple web application that displays the generated reports in one place, with filtering by week and department.",
    tools: ["JavaScript", "HTML", "CSS", "API Integration"],
    image: "/projects/reporting-portal.svg",
    screenshots: [],
    githubUrl: "",
    liveUrl: "",
    featured: false,
    date: "2023",
    results: ["Gave the team one place to view and compare past reports"],
  },
  {
    id: "project-008",
    title: "AI Lead Qualification Chatbot for a Real Estate Agency",
    category: "AI Agents",
    shortDescription:
      "An AI chatbot that talks to website visitors, extracts what they're looking for, and scores and routes the lead automatically.",
    fullDescription:
      "A conversational AI agent built for a real estate client that chats with website visitors, pulls out key details like property type, budget, location, and timeline across the conversation, scores how serious the lead is, and alerts the sales team instantly for hot leads.",
    problem:
      "Website chat enquiries needed someone available to ask the right questions, and there was no consistent way to tell a serious buyer from someone just browsing — meaning hot leads could sit unnoticed in a queue with everyone else.",
    solution:
      "Built an n8n workflow that receives each chat message through a webhook, sends the full conversation to Claude to extract structured lead details (name, property type, budget, location, timeline), scores the lead based on how complete and promising those details are, stores it, and instantly alerts the sales team on hot leads while routing warmer/colder ones to the normal follow-up queue.",
    workflow: [
      { label: "Trigger", description: "Website chat message received" },
      { label: "Processing", description: "Build conversation prompt" },
      { label: "AI/Logic", description: "Claude extracts details & scores lead" },
      { label: "Action", description: "Store lead & alert team if hot" },
      { label: "Result", description: "Customer replied to, team notified" },
    ],
    tools: ["n8n", "Claude API", "Webhooks", "Slack"],
    image: "/projects/lead-bot-workflow.jpeg",
    screenshots: [],
    files: [
      { label: "Download n8n workflow (.json)", url: "/files/lead-bot-workflow.json" },
    ],
    githubUrl: "",
    liveUrl: "",
    featured: true,
    date: "2026",
    results: [
      "Every website enquiry is automatically scored instead of treated the same",
      "The sales team is alerted instantly for hot leads instead of finding out later",
    ],
  },
]
