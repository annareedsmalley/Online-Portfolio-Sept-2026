import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export interface ArchCaseStudyCardProps {
  to: string;
  title: string;
  tags: string;
  image: string;
  imageAlt: string;
  arrowColor: string;
  titleColor?: string;
}

export const ArchCaseStudyCard = ({
  to,
  title,
  tags,
  image,
  imageAlt,
  arrowColor,
  titleColor,
}: ArchCaseStudyCardProps) => (
  <Link to={to} className="group flex flex-col gap-4">
    <div className="flex flex-col gap-1">
      <h3
        className="font-serif text-xl md:text-2xl line-clamp-2 overflow-hidden text-ellipsis"
        style={titleColor ? { color: titleColor } : undefined}
      >
        {title}
      </h3>
      <p className="font-sans text-[13px]" style={{ color: "#56514D" }}>
        {tags}
      </p>
    </div>
    <div className="relative overflow-hidden rounded-2xl transition-all duration-200 group-hover:-translate-y-1" style={{ aspectRatio: "1312 / 456" }}>
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <ArrowUpRight
        className="absolute bottom-5 right-5 h-6 w-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: arrowColor }}
      />
    </div>
  </Link>
);
