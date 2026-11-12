import type { BookingRequest, ContactMessage, CustomerInfo, PackageId } from "../types";

const BOOKING_KEY = "zee.bookingRequests";
const CONTACT_KEY = "zee.contactMessages";

/**
 * Browser stand-in for the future booking API.
 * Replace `saveBookingRequest` with a POST. Keep returning a BookingRequest
 * whose status stays "request" until the server confirms the appointment.
 */

function readList<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeList<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items.slice(0, 40)));
}

export function saveBookingRequest(request: BookingRequest): void {
  const existing = readList<BookingRequest>(BOOKING_KEY);
  writeList(BOOKING_KEY, [request, ...existing]);
}

export function saveContactMessage(message: ContactMessage): void {
  const existing = readList<ContactMessage>(CONTACT_KEY);
  writeList(CONTACT_KEY, [message, ...existing]);
}

export function createRequestId(): string {
  const year = new Date().getFullYear();
  const token = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ZEE-${year}-${token}`;
}

export function createEmptyCustomer(): CustomerInfo {
  return {
    fullName: "",
    email: "",
    phone: "",
    partySize: "",
    location: "",
    notes: "",
  };
}

export function createEmptyDraft(packageId: PackageId | null = null) {
  return {
    packageId,
    addOnIds: [] as string[],
    date: null as string | null,
    time: null as string | null,
    customer: createEmptyCustomer(),
  };
}
