import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export interface CaseStudyListRowProps {
  to: string;
  title: string;
  tags: string;
  image: string;
  imageAlt: string;
}

export const CaseStudyListRow = ({
  to,
  title,
  tags,
  image,
  imageAlt,
}: CaseStudyListRowProps) => (
  <Link
    to={to}
    className="group relative block border-b border-border transition-colors duration-200 hover:bg-terracotta"
  >
    <div className="relative flex items-center justify-between gap-6 px-2 py-8 md:px-4 md:py-10">
      <div className="relative z-20 flex w-1/2 flex-col gap-1.5">
        <h3 className="font-serif text-xl leading-snug text-title transition-colors duration-200 group-hover:text-white md:text-2xl">
          {title}
        </h3>
        <p className="font-sans text-[13px] text-[#56514D] transition-colors duration-200 group-hover:text-white/85">
          {tags}
        </p>
      </div>

      {/* Default thumbnail — visible on the right side, hidden when any row in the list is hovered */}
      <div className="relative z-10 hidden shrink-0 transition-opacity duration-200 group-hover/list:opacity-0 md:block">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-24 w-auto rounded-lg object-contain shadow-[0_8px_20px_rgba(0,0,0,0.12)] lg:h-28"
        />
      </div>

      <ArrowUpRight className="relative z-20 h-6 w-6 shrink-0 text-title transition-colors duration-200 group-hover:text-white md:h-7 md:w-7" />

      {/* Large hover image — only visible on the row currently being hovered. Constrained to the right half so it never overlaps the title. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-16 top-1/2 z-30 hidden max-w-[45%] -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block"
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-36 w-auto max-w-full rounded-xl object-contain shadow-[0_18px_40px_rgba(0,0,0,0.25)] lg:h-44"
        />
      </div>
    </div>
  </Link>
);
