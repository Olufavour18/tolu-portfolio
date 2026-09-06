Put your resume/CV file here as resume.pdf (or any name you like).

Then open src/data/site.ts and set:

resumeUrl: "/resume.pdf"

The "Download CV" button on the site (in the hero section and the
contact section) only appears once resumeUrl is set to something —
it's hidden automatically while it's empty.
