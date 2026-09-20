import type { Certification } from "./types";

// Edit this array to add/remove certifications. The /certifications page reads it.
export const certifications: Certification[] = [
  {
    id: "cert-001",
    title: "Data Analytics Consulting Virtual Internship",
    issuer: "KPMG / Forage",
    date: "August 2023",
    image: "/certifications/kpmg-data-analytics-certificate.png",
  },
  {
    id: "cert-002",
    title: "Data Analytics Training Program",
    issuer: "DataAce Academy",
    date: "July 2023",
    image: "/certifications/dataace-academy-data-analytics-certificate.png",
  },
  {
    id: "cert-placeholder",
    title: "Placeholder Certificate — replace me",
    issuer: "Issuer name",
    date: "YYYY",
  },
];
