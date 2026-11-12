import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { isPackageId } from "../config/packages";
import {
  createEmptyDraft,
  createRequestId,
  saveBookingRequest,
} from "../lib/bookingStore";
import { calculateTotal } from "../lib/pricing";
import { validateCustomer } from "../lib/validation";
import type { BookingDraft, BookingRequest, CustomerInfo, PackageId } from "../types";

type BookingContextValue = {
  isOpen: boolean;
  step: number;
  draft: BookingDraft;
  errors: Record<string, string>;
  request: BookingRequest | null;
  total: number;
  openBooking: (packageId?: PackageId) => void;
  closeBooking: () => void;
  setStep: (step: number) => void;
  selectPackage: (packageId: PackageId) => void;
  toggleAddOn: (addOnId: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string | null) => void;
  updateCustomer: (partial: Partial<CustomerInfo>) => void;
  next: () => void;
  back: () => void;
  startAnother: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function writeBookParam(value: string | null) {
  const url = new URL(window.location.href);
  if (value) url.searchParams.set("book", value);
  else url.searchParams.delete("book");
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [step, setStepState] = useState(0);
  const [draft, setDraft] = useState<BookingDraft>(() => createEmptyDraft());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [request, setRequest] = useState<BookingRequest | null>(null);
  const requestRef = useRef<BookingRequest | null>(null);
  const submitLock = useRef(false);

  const setStep = useCallback((nextStep: number) => {
    setStepState(Math.max(0, Math.min(5, nextStep)));
  }, []);

  const openBooking = useCallback((packageId?: PackageId) => {
    setErrors({});
    if (requestRef.current) {
      submitLock.current = false;
      requestRef.current = null;
      setRequest(null);
      setDraft(createEmptyDraft(packageId ?? null));
      setStepState(0);
    } else if (packageId) {
      setDraft((current) => ({ ...current, packageId }));
      setStepState(0);
    }
    setOpen(true);
    writeBookParam(packageId ?? "1");
  }, []);

  const closeBooking = useCallback(() => {
    setOpen(false);
    writeBookParam(null);
  }, []);

  useEffect(() => {
    const book = new URLSearchParams(window.location.search).get("book");
    if (!book) return;
    openBooking(isPackageId(book) ? book : undefined);
  }, [openBooking]);

  const selectPackage = useCallback((packageId: PackageId) => {
    setDraft((current) => ({ ...current, packageId }));
  }, []);

  const toggleAddOn = useCallback((addOnId: string) => {
    setDraft((current) => ({
      ...current,
      addOnIds: current.addOnIds.includes(addOnId)
        ? current.addOnIds.filter((id) => id !== addOnId)
        : [...current.addOnIds, addOnId],
    }));
  }, []);

  const setDate = useCallback((date: string) => {
    setDraft((current) => ({ ...current, date, time: null }));
  }, []);

  const setTime = useCallback((time: string | null) => {
    setDraft((current) => ({ ...current, time }));
  }, []);

  const updateCustomer = useCallback((partial: Partial<CustomerInfo>) => {
    setDraft((current) => ({ ...current, customer: { ...current.customer, ...partial } }));
    setErrors((current) => {
      const next = { ...current };
      for (const key of Object.keys(partial)) delete next[key];
      return next;
    });
  }, []);

  const submit = useCallback(() => {
    if (submitLock.current) return;
    const packageId = draft.packageId;
    const date = draft.date;
    const time = draft.time;
    if (!packageId || !date || !time) return;
    const fieldErrors = validateCustomer(draft.customer);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setStepState(3);
      return;
    }
    submitLock.current = true;
    const nextRequest: BookingRequest = {
      id: createRequestId(),
      status: "request",
      submittedAt: new Date().toISOString(),
      packageId,
      addOnIds: draft.addOnIds,
      date,
      time,
      customer: draft.customer,
      total: calculateTotal(packageId, draft.addOnIds),
    };
    saveBookingRequest(nextRequest);
    requestRef.current = nextRequest;
    setRequest(nextRequest);
    setStepState(5);
  }, [draft]);

  const next = useCallback(() => {
    if (step === 0 && !draft.packageId) return;
    if (step === 2 && (!draft.date || !draft.time)) return;
    if (step === 3) {
      const fieldErrors = validateCustomer(draft.customer);
      setErrors(fieldErrors);
      if (Object.keys(fieldErrors).length > 0) return;
    }
    if (step === 4) {
      submit();
      return;
    }
    setStepState((current) => Math.min(current + 1, 4));
  }, [draft, step, submit]);

  const back = useCallback(() => {
    setStepState((current) => Math.max(0, current - 1));
  }, []);

  const startAnother = useCallback(() => {
    submitLock.current = false;
    requestRef.current = null;
    setRequest(null);
    setDraft(createEmptyDraft());
    setErrors({});
    setStepState(0);
    writeBookParam("1");
  }, []);

  const total = useMemo(
    () => calculateTotal(draft.packageId, draft.addOnIds),
    [draft.packageId, draft.addOnIds],
  );

  const value = useMemo<BookingContextValue>(
    () => ({
      isOpen,
      step,
      draft,
      errors,
      request,
      total,
      openBooking,
      closeBooking,
      setStep,
      selectPackage,
      toggleAddOn,
      setDate,
      setTime,
      updateCustomer,
      next,
      back,
      startAnother,
    }),
    [
      isOpen,
      step,
      draft,
      errors,
      request,
      total,
      openBooking,
      closeBooking,
      setStep,
      selectPackage,
      toggleAddOn,
      setDate,
      setTime,
      updateCustomer,
      next,
      back,
      startAnother,
    ],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const value = useContext(BookingContext);
  if (!value) throw new Error("useBooking must be used within BookingProvider");
  return value;
}
