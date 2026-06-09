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
    className="group relative mb-5 block rounded-xl bg-sand transition-colors duration-200 hover:bg-[#EFE6D6] md:mb-6"
  >
    <div className="relative flex flex-col gap-4 rounded-xl px-5 py-10 md:flex-row md:items-center md:justify-between md:gap-6 md:px-6 md:py-12">

      <div className="relative z-20 flex w-full flex-col gap-1.5 md:w-[54%]">
        <h3 className="font-inter font-normal text-xl leading-snug text-title md:text-2xl">
          {title}
        </h3>
        <p className="font-inter text-[13px] text-[#56514D]">
          {tags}
        </p>
      </div>

      <div className="relative z-10 shrink-0">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="w-auto rounded-lg object-contain md:h-36 md:shadow-[0_8px_20px_rgba(0,0,0,0.12)] lg:h-44"
        />
      </div>
    </div>
  </Link>
);
