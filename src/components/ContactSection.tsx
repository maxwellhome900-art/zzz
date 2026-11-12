import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { site } from "../config/site";
import { useBooking } from "../context/BookingContext";
import { createRequestId, saveContactMessage } from "../lib/bookingStore";
import { btnPrimary, btnSecondary } from "../lib/styles";
import { validateContact } from "../lib/validation";
import { TextField } from "./ui/Fields";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { InstagramIcon } from "./ui/InstagramIcon";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

export function ContactSection() {
  const { openBooking } = useBooking();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateContact({ name, email, message });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    saveContactMessage({
      id: createRequestId(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    });
    setSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-ink">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 lg:grid-cols-12 lg:px-16 lg:py-32">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading index="07" eyebrow="Contact" title="Let's capture your NYC moment" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Tell me about the trip, the people, and the hour you want. Or book a session directly and I'll confirm the time with you.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a className="inline-flex items-center gap-3 text-paper hover:text-neon" href={`mailto:${site.email}`}>
                  <Mail size={16} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-paper">
                <MapPin size={16} aria-hidden="true" />
                {site.location}
              </li>
              <li>
                <a className="inline-flex items-center gap-3 text-paper hover:text-neon" href={site.phoneHref}>
                  <Phone size={16} aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a className={btnSecondary} href={site.instagramUrl} target="_blank" rel="noreferrer">
                <InstagramIcon className="size-4" />
                Instagram
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a className={btnSecondary} href={site.whatsappUrl} target="_blank" rel="noreferrer">
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </a>
            </div>
            <button type="button" className={`${btnPrimary} mt-6`} onClick={() => openBooking()}>
              Book your photoshoot
            </button>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <div className="border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            {sent ? (
              <div>
                <p className="font-grotesk text-[11px] tracking-[0.32em] text-neon">MESSAGE RECEIVED</p>
                <h3 className="mt-4 font-display text-4xl text-paper uppercase">Thank you, {name.trim()}.</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-muted">
                  This preview stores your note on this device so the form can be tested. It has not been emailed yet. Once a mail service is connected, messages will reach the studio directly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-7">
                <TextField
                  id="contact-name"
                  label="Name"
                  value={name}
                  autoComplete="name"
                  error={errors.name}
                  onChange={setName}
                />
                <TextField
                  id="contact-email"
                  label="Email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  placeholder={site.email}
                  error={errors.email}
                  onChange={setEmail}
                />
                <TextField
                  id="contact-message"
                  label="Message"
                  value={message}
                  multiline
                  error={errors.message}
                  onChange={setMessage}
                />
                <button type="submit" className={btnPrimary}>
                  Send message
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
