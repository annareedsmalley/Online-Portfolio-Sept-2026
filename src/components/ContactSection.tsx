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
        <rect width="1440" height="1024" fill="#FBF6EF" />
        <g opacity="0.04" style={{ mixBlendMode: "hard-light" }}>
          <path
            d="M86 1063.11V503.212C86 450.514 128.72 407.794 181.418 407.794C234.116 407.794 276.836 450.514 276.836 503.212V811.612C276.836 869.16 323.488 915.811 381.035 915.811H401.64C447.807 915.811 485.234 953.238 485.234 999.406C485.234 1045.57 522.66 1083 568.828 1083H868.345C964.54 1083 1042.52 1005.02 1042.52 908.823V849.967C1042.52 786.276 1094.15 734.645 1157.84 734.645C1221.53 734.645 1273.16 786.276 1273.16 849.967V965.177C1273.16 1011.25 1310.51 1048.59 1356.58 1048.59C1402.65 1048.59 1440 1011.25 1440 965.177V516.227C1440 437.981 1376.57 374.551 1298.32 374.551C1220.08 374.551 1156.65 311.12 1156.65 232.874V-114.5"
            stroke="#AA4D18"
            strokeWidth="100"
          />
        </g>
      </svg>

      <div className="relative z-10 mx-auto max-w-content xl:max-w-[min(1312px,70vw)] px-6 pt-14 pb-20 md:px-16 md:pt-[72px] md:pb-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 rounded-lg border border-title/[0.08] bg-background/55 px-8 py-12 text-center shadow-[0_1px_1px_hsl(var(--text-title)/0.03),0_16px_40px_-20px_hsl(var(--text-title)/0.14)] backdrop-blur-[2px] md:gap-10 md:px-16 md:py-16">
          <div>
            <h2 className="font-serif font-normal text-[24px] text-title md:text-[36px] max-w-[28rem]">
              Let's talk
            </h2>
            <p className="body-text mt-5 max-w-[28rem] text-base md:text-lg">
              If you're in the <strong className="font-medium text-title">SF Bay Area</strong>, I especially love meeting up in person.
            </p>
            <p className="body-text mt-3 max-w-[28rem] text-base md:text-lg">
              <span>Send me a message on&nbsp;</span>
              <a
                href="https://www.linkedin.com/in/anna-smalley-uxlead/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-title underline underline-offset-4 transition-colors hover:text-terracotta"
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
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-navy px-4 py-2.5 font-sans text-sm font-medium text-primary-foreground transition-colors hover:bg-navy/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
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
      className="peer block w-full rounded-md border border-border bg-white px-3 pt-3 pb-1.5 font-sans text-[15px] text-title outline-none transition-colors focus:border-terracotta focus:shadow-[inset_0_0_0_1px_hsl(var(--terracotta))]"
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
      className="peer block w-full resize-y rounded-md border border-border bg-white px-3 pt-4 pb-2 font-sans text-[15px] text-title outline-none transition-colors focus:border-terracotta focus:shadow-[inset_0_0_0_1px_hsl(var(--terracotta))]"
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
