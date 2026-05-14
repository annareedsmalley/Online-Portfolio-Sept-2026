import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CtaSectionProps {
  kicker?: string;
  title?: string;
  body?: string;
  buttonLabel?: string;
  to?: string;
}

export const CtaSection = ({
  title = "Let's Talk",
  body = "From eCommerce scale to accessible AI — I bring strategic depth, cross-functional range, and a track record of building high-performing design teams.",
  buttonLabel = "Get In Touch",
  to = "/contact",
}: CtaSectionProps) => (
  <section className="relative overflow-hidden bg-[#32101B]">
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 1440 680"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        d="M101 727.512V207.165C101 158.141 140.742 118.4 189.765 118.4C238.789 118.4 278.531 158.141 278.531 207.165V493.665C278.531 547.2 321.93 590.599 375.465 590.599H394.698C437.611 590.599 472.399 625.387 472.399 668.299C472.399 711.212 507.186 746 550.099 746H828.935C918.348 746 990.832 673.516 990.832 584.103V529.487C990.832 470.237 1038.86 422.206 1098.11 422.206C1157.36 422.206 1205.39 470.238 1205.39 529.487V636.419C1205.39 679.277 1240.14 714.02 1283 714.02C1325.85 714.02 1360.6 679.277 1360.6 636.419V219.299C1360.6 146.508 1301.59 87.5 1228.8 87.5C1156.01 87.5 1097 27.7903 1097 -45"
        stroke="#5C2734"
        strokeWidth="100"
        opacity="0.45"
      />
    </svg>
    <div className="relative z-10 mx-auto flex max-w-content flex-col items-center justify-center gap-6 px-6 py-32 text-center md:px-16">
      <h2 className="font-serif text-[42px] leading-[1.1] text-[#FAF8F5] md:text-[56px]">
        {title}
      </h2>
      <p className="max-w-[600px] font-sans text-base text-[#FAF8F5] md:text-lg">
        {body}
      </p>
      <Link
        to={to}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#FAF8F5] px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-[#32101B] transition-all duration-200 hover:-translate-y-0.5"
      >
        {buttonLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);
