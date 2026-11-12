export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export const btn =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-center font-grotesk text-[11px] font-medium uppercase tracking-[0.22em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:cursor-not-allowed disabled:opacity-40";

export const btnPrimary = `${btn} bg-neon text-ink hover:bg-paper`;

export const btnSecondary = `${btn} border border-paper/35 text-paper hover:bg-paper hover:text-ink`;
