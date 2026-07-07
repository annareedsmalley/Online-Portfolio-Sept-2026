import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  CASE_STUDY_GATE_STORAGE_KEY,
  CASE_STUDY_PASSWORD,
} from "@/config/caseStudyGate";

interface PasswordGateProps {
  children: ReactNode;
}

export const PasswordGate = ({ children }: PasswordGateProps) => {
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
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-xl flex-col items-start gap-4 rounded-2xl border border-border bg-sand/40 p-6">
        <h3 className="font-serif text-[18px] font-normal leading-[1.3] text-title md:text-[20px] text-left">
          To read more, please enter password.
        </h3>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
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
            className="w-full self-start rounded-md border border-border bg-background px-4 py-3 font-sans text-[15px] text-title placeholder:text-title/40 focus:border-title/30 focus:outline-none focus:ring-1 focus:ring-title/10"
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
            className="self-end rounded-md bg-terracotta px-5 py-3 font-label text-xs uppercase tracking-wider text-background transition-colors hover:bg-terracotta/90 focus:outline-none focus:ring-2 focus:ring-terracotta/40"
          >
            Unlock case study
          </button>
        </form>
      </div>
    </div>
  );
};
