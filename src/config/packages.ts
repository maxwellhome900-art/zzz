import type { AddOn, PackageId, PhotoPackage } from "../types";

/**
 * Packages, prices, and optional extras.
 * Edit this file to change what the site charges. The booking total
 * is calculated from these numbers — don't hardcode prices in components.
 */
export const packages: PhotoPackage[] = [
  {
    id: "quick",
    index: "01",
    name: "Quick Capture",
    price: 75,
    description: "Perfect for tourists who want beautiful memories of Times Square.",
    duration: "20 minutes",
    photoCount: 5,
    includes: [
      "20-minute photoshoot",
      "5 professionally edited digital photos",
      "1 Times Square shooting location",
      "Basic color correction and retouching",
      "Digital delivery within 3–5 days",
    ],
    cta: "Book Quick Capture",
  },
  {
    id: "signature",
    index: "02",
    name: "Signature Experience",
    price: 150,
    description:
      "The perfect balance between creativity, variety, and professional portraits.",
    duration: "45 minutes",
    photoCount: 15,
    includes: [
      "45-minute photoshoot",
      "15 professionally edited digital photos",
      "Up to 2 nearby shooting locations",
      "Professional posing guidance",
      "Advanced color grading and retouching",
      "Digital delivery within 3–5 days",
    ],
    popular: true,
    cta: "Book Signature Experience",
  },
  {
    id: "premium",
    index: "03",
    name: "Premium Experience",
    price: 250,
    description: "For clients who want a complete NYC photography experience.",
    duration: "90 minutes",
    photoCount: 30,
    includes: [
      "90-minute photoshoot",
      "30 professionally edited digital photos",
      "Up to 3 nearby shooting locations",
      "Multiple outfit changes",
      "Professional posing and creative direction",
      "Premium editing and retouching",
      "Digital delivery within 3–5 days",
    ],
    cta: "Book Premium Experience",
  },
  {
    id: "vip",
    index: "04",
    name: "VIP NYC Experience",
    price: 400,
    description: "The ultimate personalized photography experience in New York City.",
    duration: "2 hours",
    photoCount: 50,
    includes: [
      "2-hour private photoshoot",
      "50 professionally edited digital photos",
      "Multiple NYC locations within an agreed travel area",
      "Multiple outfit changes",
      "Personalized photoshoot planning",
      "Professional posing and creative direction",
      "Premium retouching",
      "Priority photo delivery within 48–72 hours",
    ],
    cta: "Book VIP Experience",
  },
];

export const addOns: AddOn[] = [
  {
    id: "extra-5",
    name: "Additional 5 edited photos",
    price: 25,
    description: "Five more finished photographs from the same session.",
  },
  {
    id: "extra-15",
    name: "Additional 15 edited photos",
    price: 60,
    description: "A larger edit, for a session with more than one look.",
  },
  {
    id: "extra-30-min",
    name: "Extra 30 minutes",
    price: 50,
    description: "Extend the photoshoot by half an hour.",
  },
  {
    id: "rush",
    name: "Rush editing (24 hours)",
    price: 50,
    description: "Edited files prioritized for delivery within 24 hours.",
  },
  {
    id: "extra-location",
    name: "Additional shooting location",
    price: 40,
    description: "One more nearby location during the same booking.",
  },
];

const packageIds = new Set<string>(packages.map((item) => item.id));

export function isPackageId(value: string): value is PackageId {
  return packageIds.has(value);
}

export function getPackage(id: PackageId | null): PhotoPackage | undefined {
  if (!id) return undefined;
  return packages.find((item) => item.id === id);
}

export function getAddOn(id: string): AddOn | undefined {
  return addOns.find((item) => item.id === id);
}
