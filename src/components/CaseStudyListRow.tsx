import { Link } from "react-router-dom";

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
    className="group relative block border-b border-border transition-colors duration-200 hover:bg-sand"
  >
    <div className="relative flex items-center justify-between gap-6 px-2 py-8 md:px-4 md:py-10">
      <div className="relative z-20 flex w-1/2 flex-col gap-1.5">
        <h3 className="font-serif text-xl leading-snug text-title md:text-2xl">
          {title}
        </h3>
        <p className="font-sans text-[13px] text-[#56514D]">
          {tags}
        </p>
      </div>

      <div className="relative z-10 hidden shrink-0 md:block">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-36 w-auto rounded-lg object-contain shadow-[0_8px_20px_rgba(0,0,0,0.12)] lg:h-44"
        />
      </div>
    </div>
  </Link>
);
