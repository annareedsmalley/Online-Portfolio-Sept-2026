import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { ActionButton } from "@/components/ActionButton";
import { StickyNote } from "@/components/StickyNote";
import { Mail, Linkedin, ArrowRight } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(10, "A few sentences, please").max(1000),
});

type FormState = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormState, string>>;

const Contact = () => {
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
    // TODO: wire to backend (Lovable Cloud) when available.
    console.info("[contact] submission", result.data);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Thanks — I'll get back to you soon.");
    }, 400);
  };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-background">
        {/* Decorative arch background — bleeds to all edges, behind content */}
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

        <div className="relative z-10 mx-auto max-w-content px-6 py-20 md:py-28">
          <div className="grid gap-16 md:grid-cols-12">
            {/* Left column — direct contact */}
            <div className="md:col-span-4">
              <h1 className="font-serif text-[44px] leading-[1.1] text-title md:text-[56px]">
                Let's <span className="text-terracotta-hero">talk</span>
              </h1>
              <p className="body-text mt-5 max-w-xl text-base md:text-lg">
                Whether it's a hiring conversation, an advisory engagement, or a hard product question
                you'd like a second pair of eyes on — I'd love to hear{" "}
                <span className="whitespace-nowrap">from you.</span>
              </p>

              {/* FigJam-style sticky note */}
              <StickyNote color="yellow" rotate={-3} size="lg" className="mt-10">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-title/70">
                  Reach out directly
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href="mailto:hello@annasmalley.com"
                    className="inline-flex items-center gap-2 font-sans text-[15px] font-medium text-title underline-offset-4 hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    hello@annasmalley.com
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-[15px] font-medium text-title underline-offset-4 hover:underline"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
                <p className="mt-8 font-serif text-[15px] italic text-title/60">— Anna</p>
              </StickyNote>
            </div>

            {/* Right column — form */}
            <div className="md:col-span-7 md:col-start-6">
              <div className="rounded-2xl bg-white p-8 shadow-sm md:p-10">
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
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
                    label="Email"
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

                  <div>
                    <ActionButton type="submit" variant="primary" size="lg" disabled={submitting} className="bg-terracotta-hero hover:bg-terracotta-hero/90">
                      {submitting ? "Sending…" : "Send message"}
                      <ArrowRight className="h-4 w-4" />
                    </ActionButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
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
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="font-label text-[11px] font-semibold uppercase tracking-wider text-title">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className="rounded-lg border border-border bg-background px-4 py-3 font-sans text-[15px] text-title outline-none transition-colors placeholder:text-body/60 focus:border-terracotta"
    />
    {error ? (
      <p id={`${id}-error`} className="font-sans text-xs text-destructive">
        {error}
      </p>
    ) : null}
  </div>
);

interface TextareaProps extends Omit<FieldProps, "onChange" | "type"> {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField = ({ id, label, value, onChange, error }: TextareaProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="font-label text-[11px] font-semibold uppercase tracking-wider text-title">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      rows={6}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className="resize-y rounded-lg border border-border bg-background px-4 py-3 font-sans text-[15px] text-title outline-none transition-colors placeholder:text-body/60 focus:border-terracotta"
    />
    {error ? (
      <p id={`${id}-error`} className="font-sans text-xs text-destructive">
        {error}
      </p>
    ) : null}
  </div>
);

export default Contact;
