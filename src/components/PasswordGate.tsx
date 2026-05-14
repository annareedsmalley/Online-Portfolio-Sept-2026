import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Lock } from "lucide-react";
import {
  CASE_STUDY_GATE_STORAGE_KEY,
  CASE_STUDY_PASSWORD,
} from "@/config/caseStudyGate";

interface PasswordGateProps {
  children: ReactNode;
  message?: string;
}

const DEFAULT_MESSAGE =
  "This case study contains confidential client work. Enter the password to continue reading.";

export const PasswordGate = ({ children, message = DEFAULT_MESSAGE }: PasswordGateProps) => {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CASE_STUDY_GATE_STORAGE_KEY) === "1") {
        setUnlocked(true);
      }
    } catch {
      // sessionStorage may be unavailable (private mode, SSR) — fall through.
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === CASE_STUDY_PASSWORD) {
      try {
        sessionStorage.setItem(CASE_STUDY_GATE_STORAGE_KEY, "1");
      } catch {
        // ignore
      }
      setUnlocked(true);
      setError(null);
      // Notify listeners (e.g. TOC scrollspy) that gated content is now in the DOM.
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("case-study-unlocked"));
      }
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-sand/40 p-8 md:p-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
        <Lock className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-[24px] leading-[1.2] text-title md:text-[28px]">
          Protected case study
        </h2>
        <p className="body-text text-[15px] leading-[1.6] md:text-[16px]">{message}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3">
        <label htmlFor="case-study-password" className="sr-only">
          Password
        </label>
        <input
          id="case-study-password"
          type="password"
          autoComplete="current-password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Password"
          className="w-full rounded-md border border-border bg-background px-4 py-3 font-sans text-[15px] text-title placeholder:text-title/40 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "case-study-password-error" : undefined}
        />
        {error && (
          <p
            id="case-study-password-error"
            className="font-sans text-[13px] text-terracotta"
            role="alert"
          >
            {error}
          </p>
        )}
        <button
          type="submit"
          className="self-start rounded-md bg-terracotta px-5 py-3 font-label text-xs uppercase tracking-wider text-background transition-colors hover:bg-terracotta/90 focus:outline-none focus:ring-2 focus:ring-terracotta/40"
        >
          Unlock case study
        </button>
      </form>
    </div>
  );
};
