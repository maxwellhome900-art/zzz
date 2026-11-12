import { shootLocations } from "../config/site";
import type { CustomerInfo } from "../types";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCustomer(customer: CustomerInfo): Record<string, string> {
  const errors: Record<string, string> = {};
  if (customer.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!EMAIL.test(customer.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  const digits = customer.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    errors.phone = "Enter a valid phone number.";
  }
  const partySize = Number(customer.partySize);
  if (!Number.isInteger(partySize) || partySize < 1 || partySize > 8) {
    errors.partySize = "Select how many people will be photographed.";
  }
  if (!(shootLocations as readonly string[]).includes(customer.location)) {
    errors.location = "Choose a preferred location.";
  }
  if (customer.notes.trim().length > 800) {
    errors.notes = "Please keep notes under 800 characters.";
  }
  return errors;
}

export function validateContact(input: { name: string; email: string; message: string }): Record<string, string> {
  const errors: Record<string, string> = {};
  if (input.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(input.email.trim())) errors.email = "Enter a valid email address.";
  if (input.message.trim().length < 8) errors.message = "Write a short message so I know how to help.";
  if (input.message.trim().length > 2000) errors.message = "Please keep the message under 2000 characters.";
  return errors;
}
