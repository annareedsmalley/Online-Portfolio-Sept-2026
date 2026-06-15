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
          {/* Warm golden afternoon light filtering through redwoods */}
          <linearGradient id="contact-sky" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#F6E2B8" />
            <stop offset="0.42" stopColor="#FAF1DD" />
            <stop offset="0.78" stopColor="#F4EFE3" />
            <stop offset="1" stopColor="#E4E7D6" />
          </linearGradient>
          {/* Low sun glow — warm golden afternoon */}
          <radialGradient id="contact-sun" cx="0.82" cy="0.16" r="0.7" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#FBE8A6" stopOpacity="0.85" />
            <stop offset="0.45" stopColor="#F4D98C" stopOpacity="0.32" />
            <stop offset="1" stopColor="#F4D98C" stopOpacity="0" />
          </radialGradient>
          {/* Forest fern haze rising from the ground */}
          <linearGradient id="contact-fern" x1="0" y1="1" x2="0" y2="0" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#3D7A5A" stopOpacity="0.20" />
            <stop offset="1" stopColor="#3D7A5A" stopOpacity="0" />
          </linearGradient>
          {/* Soft organic glow for light pools */}
          <radialGradient id="contact-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FBE8A6" stopOpacity="0.35" />
            <stop offset="1" stopColor="#FBE8A6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1440" height="1024" fill="url(#contact-sky)" />
        <rect width="1440" height="1024" fill="url(#contact-sun)" />
        <rect width="1440" height="1024" fill="url(#contact-fern)" />

        {/* Rolling hills — soft ground curves */}
        <g opacity="0.12">
          <path d="M-80 920C180 860 400 980 680 930C960 880 1180 840 1520 900V1100H-80Z" fill="#5A3A1F" />
          <path d="M-80 980C260 920 540 1010 860 960C1180 910 1340 940 1520 980V1100H-80Z" fill="#3D2B15" opacity="0.6" />
        </g>

        {/* Redwood trunks — organic curved bark shapes */}
        <g style={{ mixBlendMode: "multiply" }} opacity="0.55">
          <path d="M158 -40C198 160 138 460 178 660C198 760 218 860 198 1120H102C122 860 82 760 102 660C142 460 82 160 122 -40H158Z" fill="#A85A33" opacity="0.14" />
          <path d="M390 -80C422 140 374 440 406 640C422 740 438 840 422 1160H342C358 840 322 740 338 640C370 440 322 140 354 -80H390Z" fill="#8A4A26" opacity="0.12" />
          <path d="M1045 -60C1085 150 1025 450 1065 650C1085 750 1105 850 1085 1140H995C1015 850 975 750 995 650C1035 450 975 150 1015 -60H1045Z" fill="#A85A33" opacity="0.12" />
          <path d="M1310 -40C1358 160 1298 460 1338 660C1358 760 1378 860 1358 1120H1258C1278 860 1238 760 1258 660C1298 460 1238 160 1286 -40H1310Z" fill="#8A4A26" opacity="0.14" />
        </g>

        {/* Light shafts — soft curved rays drifting through the trees */}
        <g style={{ mixBlendMode: "soft-light" }} opacity="0.4">
          <path d="M1020 -120C1120 200 880 600 680 1140H520C720 600 960 200 860 -120Z" fill="#FBE8A6" />
          <path d="M1220 -120C1320 240 1080 640 880 1140H760C960 640 1200 240 1100 -120Z" fill="#FBE8A6" />
        </g>

        {/* Dappled light pools on the forest floor */}
        <g opacity="0.5">
          <ellipse cx="320" cy="940" rx="180" ry="40" fill="url(#contact-glow)" />
          <ellipse cx="720" cy="980" rx="220" ry="48" fill="url(#contact-glow)" opacity="0.7" />
          <ellipse cx="1120" cy="920" rx="160" ry="36" fill="url(#contact-glow)" opacity="0.6" />
        </g>

        {/* Soft drifting mist */}
        <g opacity="0.25">
          <path d="M-80 680C240 620 480 740 720 680C960 620 1200 560 1520 620V780C1200 720 960 840 720 780C480 720 240 660 -80 720Z" fill="#FAF1DD" />
          <path d="M-80 800C280 740 520 860 760 800C1000 740 1240 680 1520 740V860C1240 800 1000 920 760 860C520 800 280 740 -80 800Z" fill="#F4EFE3" opacity="0.6" />
        </g>
      </svg>

      <div className="relative z-10 mx-auto max-w-content xl:max-w-[min(1312px,70vw)] px-6 pt-16 pb-20 md:px-16 md:pt-20 md:pb-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 rounded-lg border border-title/[0.08] bg-background/55 px-8 py-12 text-center shadow-[0_1px_1px_hsl(var(--text-title)/0.03),0_16px_40px_-20px_hsl(var(--text-title)/0.14)] backdrop-blur-[2px] md:gap-10 md:px-16 md:py-16">
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
