import type { ReactNode } from "react";

const fieldClass =
  "mt-2 w-full border-b border-white/20 bg-transparent py-3 text-base text-paper outline-none transition placeholder:text-white/30 focus:border-neon";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
  hint?: string;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  placeholder,
  multiline = false,
  maxLength,
  hint,
}: FieldProps) {
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : undefined;
  return (
    <div>
      <label htmlFor={id} className="font-grotesk text-[10px] tracking-[0.28em] text-paper/75">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldClass} min-h-32 resize-y`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={type === "email" ? "email" : type === "tel" ? "tel" : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass}
        />
      )}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-sm text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
  children: ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="font-grotesk text-[10px] tracking-[0.28em] text-paper/75">
        {label}
      </label>
      <select
        id={id}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
