Put downloadable project files here — n8n workflow JSON exports,
dashboard files (.pbix), PDF reports, etc.

Then reference them in src/data/projects.ts like:

files: [
  { label: "Download n8n workflow (.json)", url: "/files/my-workflow.json" },
]
