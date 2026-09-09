import type { Certification } from "./types";

// ─────────────────────────────────────────────────────────────
// Add a certificate, course completion, or credential here any
// time you finish one — the Certifications section on the site
// picks it up automatically. Delete an object to remove one.
// This section hides itself automatically while this array is empty.
// ─────────────────────────────────────────────────────────────
export const certifications: Certification[] = [
  {
    id: "cert-001",
    title: "Data Analytics Consulting Virtual Internship",
    issuer: "KPMG / Forage",
    date: "August 2023",
    // credentialUrl: "", // optional verification link if available
    image: "/certifications/kpmg-data-analytics-certificate.png",
  },
  {
    id: "cert-002",
    title: "Data Analytics Training Program",
    issuer: "DataAce Academy",
    date: "July 2023",
    // credentialUrl: "", // optional verification link if available
    image: "/certifications/dataace-academy-data-analytics-certificate.png",
  },
];