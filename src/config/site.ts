/**
 * Brand, contact details, and biography.
 * Change the photographer's name, email, phone, and social links here.
 * Also update the matching title and description in index.html.
 * Photographs live in src/config/portfolio.ts.
 * Prices live in src/config/packages.ts.
 */
export const site = {
  monogram: "ZÉE",
  photographerName: "Zee Navarro",
  title: "Zee Navarro · Times Square Photography",
  description:
    "Capturing unforgettable moments in the heart of New York City. Experience Times Square through my lens.",
  footerDescription:
    "Editorial portraits and night photography in the neon heart of New York City.",
  url: "https://zeenavarro.com",
  email: "hello@zeenavarro.com",
  phoneDisplay: "+1 (212) 555-0148",
  phoneHref: "tel:+12125550148",
  whatsappUrl:
    "https://wa.me/12125550148?text=Hello%2C%20I%27d%20like%20to%20ask%20about%20a%20Times%20Square%20photoshoot.",
  instagramHandle: "@zeenavarro",
  instagramUrl: "https://instagram.com/zeenavarro",
  location: "Times Square, New York City",
  locationShort: "New York City",
  coordinates: "40.7580° N · 73.9855° W",
  heroPhotoId: "1496442226666-8d4d0e62e6e9",
  portraitPhotoId: "1507003211169-0a1dd7228f2d",
} as const;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#packages", label: "Packages" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export const shootLocations = [
  "Times Square",
  "Broadway & 42nd Street",
  "Bryant Park",
  "Rockefeller Center",
  "Fifth Avenue",
  "Grand Central Terminal",
  "I'll choose with the photographer",
] as const;

export const about = {
  headline: "Behind the Lens",
  mission:
    "I believe every photograph tells a story. My mission is to capture authentic emotions and unforgettable memories against the incredible backdrop of New York City.",
  paragraphs: [
    "I'm a Times Square photographer working with tourists, couples, solo travelers, and fashion portraits. Years of night shoots around Broadway have taught me how to find a quiet frame inside the loudest square in the world.",
    "I don't chase stiff poses. I direct just enough to help you feel at ease, then I wait for the real expression — the laugh, the glance back, the second the billboards hit your face.",
  ],
  stats: [
    { value: "500+", label: "Photoshoots" },
    { value: "5+", label: "Years of experience" },
    { value: "NYC", label: "Based" },
    { value: "100%", label: "Passion for photography" },
  ],
} as const;

export const instagramPosts = [
  {
    photoId: "1496442226666-8d4d0e62e6e9",
    alt: "Times Square at dusk beneath bright billboards",
  },
  {
    photoId: "1534528741775-53994a69daeb",
    alt: "Close portrait lit with blue light",
  },
  {
    photoId: "1522083165195-3424ed129620",
    alt: "The Brooklyn Bridge and the Lower Manhattan skyline",
  },
  {
    photoId: "1515886657613-9f3515b0c78f",
    alt: "Fashion portrait in chrome yellow",
  },
  {
    photoId: "1428366890462-dd4baecf492b",
    alt: "The Empire State Building at dusk",
  },
  {
    photoId: "1520854221256-17451cc331bf",
    alt: "A couple holding hands",
  },
] as const;
