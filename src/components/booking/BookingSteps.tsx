import { useEffect, useRef, useState } from "react";
import { availabilityProvider, type DayAvailability } from "../../config/availability";
import { addOns, getPackage, packages } from "../../config/packages";
import { shootLocations } from "../../config/site";
import { useBooking } from "../../context/BookingContext";
import { formatPrice } from "../../lib/pricing";
import { btnPrimary, btnSecondary, cn } from "../../lib/styles";
import { SelectField, TextField } from "../ui/Fields";
import { BookingSummary } from "./BookingSummary";
import { DatePicker } from "./DatePicker";
import { TimeSlotSelector } from "./TimeSlotSelector";

export const bookingStepLabels = ["Package", "Extras", "Schedule", "Details", "Review"] as const;

function PackageStep() {
  const { draft, selectPackage } = useBooking();
  const selected = getPackage(draft.packageId);

  return (
    <div>
      <h2 id="booking-title" className="font-display text-4xl text-paper uppercase">
        Select your package
      </h2>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
        Choose the session. You can add extras on the next step.
      </p>
      <div role="radiogroup" aria-label="Photography packages" className="mt-6 space-y-3">
        {packages.map((photoPackage) => {
          const active = draft.packageId === photoPackage.id;
          return (
            <button
              key={photoPackage.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => selectPackage(photoPackage.id)}
              className={cn(
                "w-full border p-4 text-left transition",
                active ? "border-neon bg-neon/10" : "border-white/10 hover:border-white/30",
              )}
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-display text-2xl text-paper uppercase">{photoPackage.name}</span>
                <span className="font-display text-2xl text-paper">{formatPrice(photoPackage.price)}</span>
              </span>
              <span className="mt-1 block text-sm text-cyan">
                {photoPackage.duration} · {photoPackage.photoCount} edited photos
              </span>
              <span className="mt-2 block text-sm text-muted">{photoPackage.description}</span>
            </button>
          );
        })}
      </div>
      {selected ? (
        <div className="mt-6 border border-white/10 p-4">
          <p className="font-grotesk text-[10px] tracking-[0.24em] text-neon uppercase">
            {selected.name} · {formatPrice(selected.price)} · {selected.duration}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-paper/90">
            {selected.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function AddOnStep() {
  const { draft, toggleAddOn, total } = useBooking();

  return (
    <div>
      <h2 id="booking-title" className="font-display text-4xl text-paper uppercase">
        Select add-ons
      </h2>
      <p className="mt-3 text-sm text-muted">Optional. The total updates as you select extras.</p>
      <ul className="mt-6 space-y-3">
        {addOns.map((addOn) => {
          const checked = draft.addOnIds.includes(addOn.id);
          return (
            <li key={addOn.id}>
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-4 border p-4 transition",
                  checked ? "border-neon bg-neon/10" : "border-white/10 hover:border-white/30",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAddOn(addOn.id)}
                  className="mt-1 size-4 accent-neon"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-paper">{addOn.name}</span>
                  <span className="mt-1 block text-sm text-muted">{addOn.description}</span>
                </span>
                <span className="font-display text-xl text-paper">{formatPrice(addOn.price)}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 font-display text-3xl text-paper" aria-live="polite">
        Total {formatPrice(total)}
      </p>
    </div>
  );
}

function ScheduleStep() {
  const { draft, setDate, setTime } = useBooking();
  const [day, setDay] = useState<DayAvailability | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [attempt, setAttempt] = useState(0);
  const timeRef = useRef(draft.time);
  timeRef.current = draft.time;

  useEffect(() => {
    if (!draft.date) {
      setDay(null);
      setStatus("idle");
      return;
    }
    let cancelled = false;
    setStatus("loading");
    availabilityProvider.getDay(draft.date).then(
      (result) => {
        if (cancelled) return;
        setDay(result);
        setStatus("ready");
        const selected = timeRef.current;
        if (selected && !result.slots.some((slot) => slot.time === selected && slot.available)) {
          setTime(null);
        }
      },
      () => {
        if (!cancelled) setStatus("error");
      },
    );
    return () => {
      cancelled = true;
    };
  }, [attempt, draft.date, setTime]);

  return (
    <div>
      <h2 id="booking-title" className="font-display text-4xl text-paper uppercase">
        Choose your date & time
      </h2>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <DatePicker value={draft.date} onChange={setDate} />
        <div>
          <h3 className="font-grotesk text-[11px] tracking-[0.28em] text-muted uppercase">Times</h3>
          <div className="mt-4">
            <TimeSlotSelector
              slots={day?.slots ?? null}
              status={status}
              value={draft.time}
              onChange={setTime}
              onRetry={() => setAttempt((current) => current + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailsStep() {
  const { draft, errors, updateCustomer } = useBooking();
  const customer = draft.customer;

  return (
    <div>
      <h2 id="booking-title" className="font-display text-4xl text-paper uppercase">
        Your details
      </h2>
      <p className="mt-3 text-sm text-muted">
        The preferred location is your starting point. Longer packages can move within the agreed area.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <TextField
          id="booking-name"
          label="Full name"
          value={customer.fullName}
          autoComplete="name"
          error={errors.fullName}
          onChange={(fullName) => updateCustomer({ fullName })}
        />
        <TextField
          id="booking-email"
          label="Email address"
          type="email"
          value={customer.email}
          autoComplete="email"
          error={errors.email}
          onChange={(email) => updateCustomer({ email })}
        />
        <TextField
          id="booking-phone"
          label="Phone number"
          type="tel"
          value={customer.phone}
          autoComplete="tel"
          error={errors.phone}
          onChange={(phone) => updateCustomer({ phone })}
        />
        <SelectField
          id="booking-party"
          label="Number of people"
          value={customer.partySize}
          placeholder="Select"
          error={errors.partySize}
          onChange={(partySize) => updateCustomer({ partySize })}
        >
          {Array.from({ length: 8 }, (_, index) => {
            const count = String(index + 1);
            return (
              <option key={count} value={count}>
                {count}
              </option>
            );
          })}
        </SelectField>
        <div className="sm:col-span-2">
          <SelectField
            id="booking-location"
            label="Preferred photoshoot location"
            value={customer.location}
            placeholder="Choose a location"
            error={errors.location}
            onChange={(location) => updateCustomer({ location })}
          >
            {shootLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </SelectField>
        </div>
        <div className="sm:col-span-2">
          <TextField
            id="booking-notes"
            label="Notes or special requests"
            value={customer.notes}
            multiline
            maxLength={800}
            hint={`${customer.notes.length}/800`}
            error={errors.notes}
            onChange={(notes) => updateCustomer({ notes })}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewStep() {
  const { draft, total, setStep } = useBooking();

  return (
    <div>
      <h2 id="booking-title" className="font-display text-4xl text-paper uppercase">
        Booking summary
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Review the request before you send it. Submitting does not confirm the appointment. The photographer still has to accept the time.
      </p>
      <div className="mt-6">
        <BookingSummary
          packageId={draft.packageId}
          addOnIds={draft.addOnIds}
          date={draft.date}
          time={draft.time}
          customer={draft.customer}
          total={total}
          onEdit={setStep}
        />
      </div>
    </div>
  );
}

function ConfirmationStep() {
  const { request, closeBooking, startAnother } = useBooking();
  if (!request) return null;
  const sent = new Date(request.submittedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="px-5 py-8 sm:px-10 sm:py-12">
      <p className="font-grotesk text-[11px] tracking-[0.32em] text-neon uppercase">Request pending</p>
      <h2 id="booking-title" className="mt-4 max-w-3xl font-display text-4xl leading-[0.95] text-paper uppercase md:text-6xl">
        Your NYC photoshoot request is in!
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
        This is a booking request, not a confirmed appointment. {request.id} was received {sent}.
      </p>
      <div className="mt-8 max-w-2xl border border-white/10 p-5 sm:p-6">
        <BookingSummary
          packageId={request.packageId}
          addOnIds={request.addOnIds}
          date={request.date}
          time={request.time}
          customer={request.customer}
          total={request.total}
          pending
        />
      </div>
      <div className="mt-8 max-w-2xl">
        <h3 className="font-grotesk text-[11px] tracking-[0.28em] text-paper uppercase">What happens next</h3>
        <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
          <li>1. The session is not confirmed. The time stays available until the photographer accepts it.</li>
          <li>2. You will be contacted at the email or phone you provided to confirm the details.</li>
          <li>3. The meeting point is final only after that confirmation.</li>
          <li>4. Edited photographs are delivered digitally after the shoot, on your package timeline.</li>
        </ol>
        <p className="mt-4 text-sm text-muted">
          In this preview, the request is saved on this device so the flow can be tested before a booking service is connected.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" className={btnPrimary} onClick={closeBooking}>
          Close
        </button>
        <button type="button" className={btnSecondary} onClick={startAnother}>
          Start another request
        </button>
      </div>
    </div>
  );
}

export function BookingSteps() {
  const { step } = useBooking();
  if (step === 0) return <PackageStep />;
  if (step === 1) return <AddOnStep />;
  if (step === 2) return <ScheduleStep />;
  if (step === 3) return <DetailsStep />;
  if (step === 4) return <ReviewStep />;
  return <ConfirmationStep />;
}
