export type PackageId = "quick" | "signature" | "premium" | "vip";

export type GalleryCategory =
  | "portraits"
  | "street"
  | "night"
  | "couples"
  | "fashion"
  | "experiences";

export type PhotoAspect = "portrait" | "tall" | "landscape" | "wide";

export type PhotoPackage = {
  id: PackageId;
  index: string;
  name: string;
  price: number;
  description: string;
  duration: string;
  photoCount: number;
  includes: string[];
  popular?: boolean;
  cta: string;
};

export type AddOn = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type GalleryImage = {
  id: string;
  photoId: string;
  alt: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  aspect: PhotoAspect;
};

export type CustomerInfo = {
  fullName: string;
  email: string;
  phone: string;
  partySize: string;
  location: string;
  notes: string;
};

export type BookingDraft = {
  packageId: PackageId | null;
  addOnIds: string[];
  date: string | null;
  time: string | null;
  customer: CustomerInfo;
};

export type BookingStatus = "request";

export type BookingRequest = {
  id: string;
  status: BookingStatus;
  submittedAt: string;
  packageId: PackageId;
  addOnIds: string[];
  date: string;
  time: string;
  customer: CustomerInfo;
  total: number;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
};

export type Testimonial = {
  id: string;
  name: string;
  origin: string;
  quote: string;
  rating: number;
  sample: true;
};
