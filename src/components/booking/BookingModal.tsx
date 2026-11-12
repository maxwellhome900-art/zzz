import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useBooking } from "../../context/BookingContext";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useLockBody } from "../../hooks/useLockBody";
import { formatPrice } from "../../lib/pricing";
import { btnPrimary, btnSecondary, cn } from "../../lib/styles";
import { BookingSteps, bookingStepLabels } from "./BookingSteps";

export function BookingModal() {
  const {
    isOpen,
    closeBooking,
    step,
    setStep,
    draft,
    total,
    next,
    back,
  } = useBooking();
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  useLockBody(isOpen);
  useFocusTrap(isOpen, panelRef, closeBooking);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [step]);

  if (typeof document === "undefined") return null;

  const blocked = (step === 0 && !draft.packageId) || (step === 2 && (!draft.date || !draft.time));
  const onReview = step === 4;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[85] flex items-stretch justify-center bg-black/75 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBooking}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28 }}
            onClick={(event) => event.stopPropagation()}
            className="flex h-[100dvh] w-full max-w-5xl flex-col overflow-hidden bg-[#0c0c0f] sm:h-[min(92dvh,880px)] sm:border sm:border-white/10"
          >
            <p className="sr-only" aria-live="polite">
              {step < 5 ? `Step ${step + 1} of 5, ${bookingStepLabels[step]}` : "Booking request submitted"}
            </p>

            {step < 5 ? (
              <>
                <div className="h-px bg-white/10">
                  <div
                    className="h-px bg-neon transition-all duration-500"
                    style={{ width: `${((step + 1) / 5) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
                  <p className="font-grotesk text-[11px] tracking-[0.28em] text-muted uppercase">
                    Step {step + 1} / 5 · {bookingStepLabels[step]}
                  </p>
                  <button type="button" className="grid size-10 place-items-center text-paper" aria-label="Close booking" onClick={closeBooking}>
                    <X size={18} />
                  </button>
                </div>
                <div className="grid min-h-0 flex-1 lg:grid-cols-[220px_1fr]">
                  <aside className="hidden border-r border-white/10 p-6 lg:block">
                    <ol className="space-y-3">
                      {bookingStepLabels.map((label, index) => (
                        <li key={label}>
                          <button
                            type="button"
                            disabled={index > step}
                            aria-current={index === step ? "step" : undefined}
                            onClick={() => {
                              if (index < step) setStep(index);
                            }}
                            className={cn(
                              "flex w-full items-baseline gap-3 text-left font-grotesk text-[11px] tracking-[0.18em] uppercase disabled:cursor-default",
                              index === step ? "text-paper" : "text-muted",
                            )}
                          >
                            <span className={index === step ? "text-neon" : ""}>0{index + 1}</span>
                            {label}
                          </button>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-10 border-t border-white/10 pt-5">
                      <p className="font-grotesk text-[10px] tracking-[0.22em] text-muted uppercase">Total</p>
                      <p className="mt-2 font-display text-4xl text-paper" aria-live="polite">
                        {draft.packageId ? formatPrice(total) : "—"}
                      </p>
                    </div>
                  </aside>
                  <div ref={bodyRef} className="min-h-0 overflow-y-auto px-5 py-6 sm:px-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <BookingSteps />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="border-t border-white/10 px-5 py-4 sm:px-6">
                  {blocked ? (
                    <p className="mb-3 text-sm text-muted">
                      {step === 0 ? "Select a package to continue." : "Choose a date and an open time."}
                    </p>
                  ) : null}
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-2xl text-paper lg:hidden" aria-live="polite">
                      {draft.packageId ? formatPrice(total) : "—"}
                    </p>
                    <div className="ml-auto flex gap-2">
                      {step > 0 ? (
                        <button type="button" className={btnSecondary} onClick={back}>
                          Back
                        </button>
                      ) : null}
                      <button type="button" className={btnPrimary} disabled={blocked} onClick={next}>
                        {onReview ? "Submit request" : "Continue"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto">
                <BookingSteps />
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
