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
    className="group relative block transition-colors duration-200 hover:bg-sand"
  >
    <div className="relative flex flex-col gap-4 px-2 py-8 md:flex-row md:items-center md:justify-between md:gap-6 md:px-4 md:py-10">
      <div className="relative z-20 flex w-full flex-col gap-1.5 md:w-5/12">
        <h3 className="font-serif text-xl leading-snug text-title md:text-2xl">
          {title}
        </h3>
        <p className="font-sans text-[13px] text-[#56514D]">
          {tags}
        </p>
      </div>

      <div className="relative z-10 shrink-0">
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
