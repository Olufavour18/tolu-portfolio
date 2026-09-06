# Tolu Favour Omoloye — Portfolio

A premium, fully responsive portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion — architected so you can add and update content for years without touching the UI code.

**The one rule that makes this easy to maintain: everything you'll want to change lives in `src/data/`. Never edit a component just to add a project, skill, or experience entry.**

---

## Quick start

```bash
npm install
npm run dev       # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

Requires Node.js 18+.

---

## 1. Add, edit, or remove a project

File: **`src/data/projects.ts`**

Every project is one object in the `projects` array. To add a project, copy an existing object, give it a unique `id`, and fill in the fields:

```ts
{
  id: "project-007",
  title: "WhatsApp AI Lead Automation",
  category: "AI Automation", // must be one of the categories below
  shortDescription: "Automated lead qualification using WhatsApp, n8n and AI.",
  fullDescription: "Detailed project description...",
  problem: "What was broken or manual before this existed.",
  solution: "What you built and how it solved the problem.",
  workflow: [                 // optional — shows a Trigger → Result chain
    { label: "Trigger", description: "New WhatsApp message" },
    { label: "Processing", description: "Classify intent" },
    { label: "AI/Logic", description: "Generate reply" },
    { label: "Action", description: "Send response" },
    { label: "Result", description: "Lead qualified" },
  ],
  tools: ["n8n", "WhatsApp", "OpenAI"],
  image: "/projects/whatsapp-ai.jpg",   // see "Adding images" below
  screenshots: [],                       // optional array of image paths
  githubUrl: "",                         // leave blank if none
  liveUrl: "",                           // leave blank if none
  featured: true,                        // featured projects sort first
  date: "2026",
  results: ["What improved as a result"],
}
```

- **To remove a project**, delete its object from the array.
- **Categories must be one of:** `"AI Automation" | "n8n" | "Data Analytics" | "CRM" | "AI Agents" | "Dashboards" | "Web Applications"`. The filter bar on the Projects section and the two showcase sections below it all read from this same array, so a new project appears everywhere automatically — no other file needs to change.
- Adding a `workflow` array automatically makes the project appear in the **"Automation systems I've built"** section on the homepage.
- Projects categorized `"Data Analytics"` or `"Dashboards"` automatically appear in the **"Data analytics & dashboard projects"** section.

The shared shape for a project lives in `src/data/types.ts` if you ever want to add a new field (e.g. `duration`) — add it there once, then it's available on every project object.

---

## 2. Edit skills

File: **`src/data/skills.ts`**

Skills are grouped. To add a skill, add a string to a group's `skills` array. To add a whole new group (e.g. "Cloud & DevOps"), copy one of the existing group objects and give it a unique `id`.

---

## 3. Edit experience

File: **`src/data/experience.ts`**

Each entry is one object with `role`, `company`, `period`, `description`, and an `achievements` array. The timeline on the site renders in the order you list them — put your most recent role first.

---

## 4. Change personal information

File: **`src/data/site.ts`**

This one file controls your name, role/title, hero tagline, location, email, **About section text** (`aboutParagraphs` — one array item per paragraph), and the **"What I focus on" bullet list** (`focusAreas`) — it feeds the navbar, hero section, About section, and contact section.

---

## 5. Change social links

Also in **`src/data/site.ts`**, under the `social` object:

```ts
social: {
  linkedin: "https://linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
  whatsapp: "https://wa.me/2340000000000",
  twitter: "",
},
```

Leave a field as an empty string `""` to hide that link from the Contact section — it won't render a broken button.

---

## 6. Add project images

1. Drop image files into **`public/projects/`** (e.g. `public/projects/my-project.jpg`).
2. Reference them in `src/data/projects.ts` as `/projects/my-project.jpg` (note the leading slash, no `public` in the path).
3. Sample placeholder SVGs are already in `public/projects/` so the site works out of the box — replace them with real screenshots whenever you're ready.

For the Open Graph preview image, replace `public/og-image.jpg` (referenced in `index.html`).

---

## 7. Edit services and testimonials

- **Services:** `src/data/services.ts`. Each entry needs an `icon` name — see the list of available names at the top of `src/components/IconResolver.tsx`. To use a new lucide-react icon, import it there and add it to the map.
- **Testimonials:** `src/data/testimonials.ts`. This section is hidden automatically while the array is empty — add objects as you collect real quotes.

---

## 8. Add certificates and courses

File: **`src/data/certifications.ts`**

As you complete a course or credential (e.g. a cybersecurity course), add an object here:

```ts
{
  id: "cert-002",
  title: "Foundations of Cybersecurity",
  issuer: "Google / Coursera",
  date: "2026",
  credentialUrl: "https://coursera.org/verify/your-credential-id", // optional
  image: "/certifications/cybersecurity-foundations.png",           // optional
}
```

Put certificate images in `public/certifications/`. This section is hidden automatically until you add at least one certification, and appears in the nav bar once it does.

---

## 9. Attach real files to a project (n8n JSON, dashboard files, PDFs)

Project images (`image`, `screenshots`) show up as pictures. If you also want people to be able to **download** something — an exported n8n workflow `.json`, a Power BI `.pbix` file, a PDF report — use the `files` field on a project in `src/data/projects.ts`:

```ts
files: [
  { label: "Download n8n workflow (.json)", url: "/files/lead-intake-workflow.json" },
  { label: "Download dashboard report (.pdf)", url: "/files/sales-report.pdf" },
],
```

1. Put the actual files in `public/files/`.
2. Reference them with a leading slash, as shown above.
3. They'll appear as download links in that project's detail view.

---

## 10. Add a "Download CV" button

The **Download CV** button (shown in the hero section and the contact section) is hidden automatically until you set it up:

1. Put your resume/CV file in the `public/` folder, e.g. `public/resume.pdf`.
2. Open `src/data/site.ts` and set `resumeUrl: "/resume.pdf"`.
3. Save — the button appears on its own, no component changes needed.

---

## Project structure

```
src/
├── components/     # UI only — should rarely need edits
├── data/           # everything you'll actually edit lives here
│   ├── types.ts        # shared shapes for all data below
│   ├── site.ts          # name, tagline, email, social links, About text
│   ├── projects.ts       # every project — add/remove here
│   ├── skills.ts          # skills by group
│   ├── experience.ts       # timeline entries
│   ├── services.ts          # service cards
│   ├── certifications.ts     # certificates & courses (hidden until you add one)
│   └── testimonials.ts        # optional testimonials
├── hooks/
│   └── useTheme.tsx    # light/dark mode, persisted to localStorage
├── App.tsx           # section order — reorder sections here if needed
└── main.tsx
```

Design notes: dark theme by default with a light mode toggle (top right of the nav), colors and fonts defined once as CSS variables in `src/index.css`, and animations respect `prefers-reduced-motion` throughout.

---

## Deploying

### Netlify
1. Push this project to a GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project**, connect the repo.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy.

Or drag-and-drop: run `npm run build` locally, then drag the generated `dist/` folder onto app.netlify.com/drop.

### Vercel
1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repo.
3. Vercel auto-detects Vite — leave the default build command (`npm run build`) and output directory (`dist`).
4. Deploy.

Both platforms will give you a live URL and redeploy automatically on every push once connected.
