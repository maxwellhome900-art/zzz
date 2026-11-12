import type { GalleryCategory, GalleryImage } from "../types";

/**
 * Portfolio photographs.
 * These are Unsplash placeholders. Replace `photoId` with your own files
 * by pointing `src` at /images/... once you add them to the public folder,
 * or keep the helper and swap the URL builder in `photoSrc`.
 * Do not publish stock frames as if they were original client work.
 */
export const categories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "portraits", label: "Times Square Portraits" },
  { id: "street", label: "Street Photography" },
  { id: "night", label: "Night Photography" },
  { id: "couples", label: "Couples & Lifestyle" },
  { id: "fashion", label: "Fashion & Editorial" },
  { id: "experiences", label: "NYC Experiences" },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "blue-hour",
    photoId: "1534528741775-53994a69daeb",
    alt: "Close portrait of a woman lit with blue light",
    title: "Blue Hour",
    caption: "Portrait study in cool light.",
    category: "portraits",
    aspect: "portrait",
  },
  {
    id: "quiet-glamour",
    photoId: "1531746020798-e6953c6e8e04",
    alt: "Portrait of a woman wearing a gold necklace",
    title: "Quiet Glamour",
    caption: "A close portrait with jewelry and soft color.",
    category: "portraits",
    aspect: "tall",
  },
  {
    id: "denim-study",
    photoId: "1488426862026-3ee34a7d66df",
    alt: "Close portrait of a woman in a denim jacket",
    title: "Denim Study",
    caption: "Editorial headshot, direct and unforced.",
    category: "portraits",
    aspect: "portrait",
  },
  {
    id: "collar-light",
    photoId: "1531123897727-8f129e1688ce",
    alt: "Editorial portrait of a woman in a white collar",
    title: "Collar & Light",
    caption: "Fashion portrait with a strong profile.",
    category: "portraits",
    aspect: "portrait",
  },
  {
    id: "midtown-crossing",
    photoId: "1449824913935-59a10b8d2000",
    alt: "Yellow taxis on a wide Manhattan avenue",
    title: "Midtown Crossing",
    caption: "Manhattan avenue, yellow cabs, late morning.",
    category: "street",
    aspect: "landscape",
  },
  {
    id: "chrysler",
    photoId: "1500916434205-0c77489c6cf7",
    alt: "A Manhattan avenue leading toward the Chrysler Building",
    title: "Toward the Chrysler",
    caption: "Midtown, looking north toward the Chrysler Building.",
    category: "street",
    aspect: "portrait",
  },
  {
    id: "park-avenue",
    photoId: "1480714378408-67cf0d13bc1b",
    alt: "Sunlit view down a Manhattan avenue lined with towers",
    title: "Late Day",
    caption: "Sun dropping between the towers of Midtown.",
    category: "street",
    aspect: "wide",
  },
  {
    id: "the-square",
    photoId: "1496442226666-8d4d0e62e6e9",
    alt: "Times Square at dusk, crowded beneath bright billboards",
    title: "The Square",
    caption: "Times Square, New York City.",
    category: "night",
    aspect: "wide",
  },
  {
    id: "east-river",
    photoId: "1518391846015-55a9cc003b25",
    alt: "The Manhattan Bridge and the New York skyline at night",
    title: "East River Lights",
    caption: "Manhattan Bridge and the skyline after dark.",
    category: "night",
    aspect: "wide",
  },
  {
    id: "empire-moon",
    photoId: "1428366890462-dd4baecf492b",
    alt: "The Empire State Building at dusk with a crescent moon",
    title: "Empire, With the Moon",
    caption: "The Empire State Building at dusk.",
    category: "night",
    aspect: "tall",
  },
  {
    id: "after-rain",
    photoId: "1519501025264-65ba15a82390",
    alt: "Cars on a wet Manhattan street with lights reflecting on the pavement",
    title: "After the Rain",
    caption: "A wet Midtown avenue at twilight.",
    category: "night",
    aspect: "portrait",
  },
  {
    id: "the-vow",
    photoId: "1519741497674-611481863552",
    alt: "A couple in wedding attire standing in warm backlight",
    title: "The Vow",
    caption: "A couple, held in warm backlight.",
    category: "couples",
    aspect: "portrait",
  },
  {
    id: "hand-in-hand",
    photoId: "1520854221256-17451cc331bf",
    alt: "A couple holding hands, shadows falling beside them",
    title: "Hand in Hand",
    caption: "The small gesture that carries the whole frame.",
    category: "couples",
    aspect: "wide",
  },
  {
    id: "chrome-yellow",
    photoId: "1515886657613-9f3515b0c78f",
    alt: "Fashion portrait of a woman dressed in yellow",
    title: "Chrome Yellow",
    caption: "Full-length fashion editorial.",
    category: "fashion",
    aspect: "tall",
  },
  {
    id: "neon-set",
    photoId: "1509631179647-0177331693ae",
    alt: "Fashion portrait of a woman posing under a green neon sign",
    title: "Neon Set",
    caption: "Color, neon, and a full-length pose.",
    category: "fashion",
    aspect: "portrait",
  },
  {
    id: "black-silk",
    photoId: "1524504388940-b1c1722653e1",
    alt: "Studio fashion portrait of a woman dressed in black",
    title: "Black Silk",
    caption: "Studio editorial on a dark ground.",
    category: "fashion",
    aspect: "portrait",
  },
  {
    id: "brooklyn-bridge",
    photoId: "1522083165195-3424ed129620",
    alt: "The Brooklyn Bridge with Lower Manhattan in golden light",
    title: "Brooklyn Bridge",
    caption: "The bridge and Lower Manhattan in golden hour.",
    category: "experiences",
    aspect: "wide",
  },
  {
    id: "downtown-moon",
    photoId: "1514565131-fce0801e5785",
    alt: "The Lower Manhattan skyline across the water under a moon",
    title: "Downtown Moon",
    caption: "Lower Manhattan from the water.",
    category: "experiences",
    aspect: "wide",
  },
  {
    id: "amber-grid",
    photoId: "1485871981521-5b1fd3805eee",
    alt: "The Manhattan skyline at sunset with the Empire State Building centered",
    title: "Manhattan in Amber",
    caption: "The skyline at sunset.",
    category: "experiences",
    aspect: "landscape",
  },
];

const aspectClass: Record<GalleryImage["aspect"], string> = {
  portrait: "aspect-[3/4]",
  tall: "aspect-[2/3]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
};

export function aspectClassName(aspect: GalleryImage["aspect"]): string {
  return aspectClass[aspect];
}

export function photoSrc(photoId: string, width: number): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

export function photoSrcSet(photoId: string, widths: number[]): string {
  return widths.map((width) => `${photoSrc(photoId, width)} ${width}w`).join(", ");
}

export function categoryLabel(id: GalleryCategory): string {
  return categories.find((item) => item.id === id)?.label ?? id;
}
