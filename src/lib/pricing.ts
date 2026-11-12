import { getAddOn, getPackage } from "../config/packages";
import type { PackageId } from "../types";

export function calculateTotal(packageId: PackageId | null, addOnIds: readonly string[]): number {
  const selected = getPackage(packageId);
  const extras = addOnIds.reduce((sum, id) => sum + (getAddOn(id)?.price ?? 0), 0);
  return (selected?.price ?? 0) + extras;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
