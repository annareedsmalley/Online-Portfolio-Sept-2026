// Single source of truth for the case-study password gate.
//
// Update this value to rotate the shared password, or set
// VITE_CASE_STUDY_PASSWORD in your environment to override it without
// editing source. This is a soft gate for confidential client work —
// it discourages casual viewing but is not a real security boundary,
// since the password is shipped to the browser.

export const CASE_STUDY_PASSWORD: string =
  (import.meta.env.VITE_CASE_STUDY_PASSWORD as string | undefined) ?? "anna2026";

export const CASE_STUDY_GATE_STORAGE_KEY = "case-study-unlocked";
