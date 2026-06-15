import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

import { ArrowRight } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(10, "A few sentences, please").max(1000),
});

type FormState = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormState, string>>;

export const ContactSection = () => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    console.info("[contact] submission", result.data);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Thanks — I'll get back to you soon.");
    }, 400);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-background scroll-mt-16">
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 1440 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Warm afternoon light filtering through redwoods */}
          <linearGradient id="contact-sky" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#E0EBD0" />
            <stop offset="0.42" stopColor="#EFF4E0" />
            <stop offset="0.78" stopColor="#F4EFE3" />
            <stop offset="1" stopColor="#E4E7D6" />
          </linearGradient>
          {/* Green-ting strategy light glow — top-left */}
          <radialGradient id="contact-sun" cx="0.18" cy="0.16" r="0.7" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#C8D9B0" stopOpacity="0.85" />
            <stop offset="0.45" stopColor="#A8C9A0" stopOpacity="0.32" />
            <stop offset="1" stopColor="#A8C9A0" stopOpacity="0" />
          </radialGradient>
          {/* Forest fern haze rising from the ground */}
          <linearGradient id="contact-fern" x1="0" y1="1" x2="0" y2="0" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#3D7A5A" stopOpacity="0.20" />
            <stop offset="1" stopColor="#3D7A5A" stopOpacity="0" />
          </linearGradient>
          {/* Soft warm glow pooling low in the scene */}
          <radialGradient id="contact-warm-low" cx="0.75" cy="0.85" r="0.65" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#C8D9B0" stopOpacity="0.14" />
            <stop offset="1" stopColor="#C8D9B0" stopOpacity="0" />
          </radialGradient>
          {/* Creamy mid-tone atmospheric haze */}
          <radialGradient id="contact-cream-mid" cx="0.35" cy="0.55" r="0.55" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#EFF4E0" stopOpacity="0.22" />
            <stop offset="1" stopColor="#EFF4E0" stopOpacity="0" />
          </radialGradient>
          {/* Subtle green-amber wash */}
          <radialGradient id="contact-amber-soft" cx="0.85" cy="0.35" r="0.6" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#A8C9A0" stopOpacity="0.12" />
            <stop offset="1" stopColor="#A8C9A0" stopOpacity="0" />
          </radialGradient>
          {/* Cool sage-pine green — deepens the shaded lower-right, away from the light */}
          <radialGradient id="contact-green-deep" cx="0.88" cy="0.92" r="0.85" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#5E8C72" stopOpacity="0.30" />
            <stop offset="0.5" stopColor="#6E9C82" stopOpacity="0.16" />
            <stop offset="1" stopColor="#6E9C82" stopOpacity="0" />
          </radialGradient>
          {/* Same cool green drifting across mid-scene to tie the palette together */}
          <radialGradient id="contact-green-mid" cx="0.55" cy="0.6" r="0.6" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#6E9C82" stopOpacity="0.14" />
            <stop offset="1" stopColor="#6E9C82" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1440" height="1024" fill="url(#contact-sky)" />
        <rect width="1440" height="1024" fill="url(#contact-green-deep)" />
        <rect width="1440" height="1024" fill="url(#contact-green-mid)" />
        <rect width="1440" height="1024" fill="url(#contact-sun)" />
        <rect width="1440" height="1024" fill="url(#contact-fern)" />
        <rect width="1440" height="1024" fill="url(#contact-warm-low)" />
        <rect width="1440" height="1024" fill="url(#contact-cream-mid)" />
        <rect width="1440" height="1024" fill="url(#contact-amber-soft)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-content xl:max-w-[min(1312px,70vw)] px-6 pt-16 pb-20 md:px-16 md:pt-20 md:pb-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 rounded-lg border border-title/[0.08] bg-[hsl(42,40%,94%)]/92 px-8 py-12 text-center shadow-[0_1px_1px_hsl(var(--text-title)/0.03),0_16px_40px_-20px_hsl(var(--text-title)/0.14)] backdrop-blur-[2px] md:gap-10 md:px-16 md:py-16">
          <div>
            <h2 className="font-inter font-normal text-[24px] text-title md:text-[36px] max-w-[28rem]">
              Let's talk
            </h2>
            <p className="font-inter text-body leading-[1.5] mt-8 max-w-[28rem] text-[15px] md:text-base">
              If you're in the <strong className="font-medium text-title">SF Bay Area</strong>, I especially love&nbsp;meeting up in person.
            </p>
            <p className="font-inter text-body leading-[1.5] mt-3 max-w-[28rem] text-[15px] md:text-base">
              <span>Send me a message on&nbsp;</span>
              <a
                href="https://www.linkedin.com/in/anna-smalley-uxlead/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-title underline underline-offset-4 transition-colors hover:text-[hsl(355,72%,52%)]"
              >
                LinkedIn
              </a>
              <span> or below.</span>
            </p>
          </div>

          <div className="w-full max-w-[28rem] mx-auto">
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 text-left">
              <Field
                id="name"
                label="Your name"
                value={form.name}
                onChange={onChange("name")}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="email"
                label="Your email"
                type="email"
                value={form.email}
                onChange={onChange("email")}
                error={errors.email}
                autoComplete="email"
              />
              <TextareaField
                id="message"
                label="Message"
                value={form.message}
                onChange={onChange("message")}
                error={errors.message}
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-navy px-4 py-2.5 font-inter text-sm font-medium text-primary-foreground transition-colors hover:bg-navy/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
                >
                  {submitting ? "Sending…" : "Send"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}

const Field = ({ id, label, value, onChange, error, type = "text", autoComplete }: FieldProps) => (
  <div className="relative">
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      placeholder=" "
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className="peer block w-full rounded-md border border-border bg-white px-3 pt-3 pb-1.5 font-inter text-[15px] text-title outline-none transition-colors focus:border-terracotta focus:shadow-[inset_0_0_0_1px_hsl(var(--terracotta))]"
    />
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 font-sans text-[15px] text-body/60 transition-all duration-150 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[12px] peer-focus:font-medium peer-focus:text-terracotta peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-title"
    >
      {label}
    </label>
    {error ? (
      <p id={`${id}-error`} className="mt-1 font-sans text-xs text-destructive">
        {error}
      </p>
    ) : null}
  </div>
);

interface TextareaProps extends Omit<FieldProps, "onChange" | "type"> {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField = ({ id, label, value, onChange, error }: TextareaProps) => (
  <div className="relative">
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      rows={5}
      placeholder=" "
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className="peer block w-full resize-y rounded-md border border-border bg-white px-3 pt-4 pb-2 font-inter text-[15px] text-title outline-none transition-colors focus:border-terracotta focus:shadow-[inset_0_0_0_1px_hsl(var(--terracotta))]"
    />
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-3 top-4 bg-white px-1 font-sans text-[15px] text-body/60 transition-all duration-150 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[12px] peer-focus:font-medium peer-focus:text-terracotta peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-title"
    >
      {label}
    </label>
    {error ? (
      <p id={`${id}-error`} className="mt-1 font-sans text-xs text-destructive">
        {error}
      </p>
    ) : null}
  </div>
);
