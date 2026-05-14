import { Link } from "react-router-dom";
import { Pill } from "./Pill";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CaseStudyCardProps {
  to: string;
  kicker: string;
  title: string;
  description: string;
  tags: { label: string; icon?: LucideIcon }[];
  thumbVariant?: "terracotta" | "sand" | "navy";
  brands?: string[];
}

const thumbBg = {
  terracotta: "bg-terracotta text-white",
  sand: "bg-sand text-title",
  navy: "bg-navy text-white",
};

export const CaseStudyCard = ({
  to,
  kicker,
  title,
  description,
  tags,
  thumbVariant = "terracotta",
  brands = [],
}: CaseStudyCardProps) => (
  <Link
    to={to}
    className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-background transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
  >
    <div
      className={cn(
        "relative flex aspect-[16/10] items-center justify-center overflow-hidden",
        thumbBg[thumbVariant],
      )}
    >
      <div className="absolute right-[-40px] top-[-40px] h-48 w-48 rounded-full bg-white/10" />
      <div className="absolute bottom-[-30px] left-[-30px] h-32 w-32 rounded-full bg-white/5" />
      <div className="relative flex flex-col items-center gap-3">
        {brands.length > 0 ? (
          brands.map((b) => (
            <span key={b} className="font-serif text-xl tracking-wide opacity-95">
              {b}
            </span>
          ))
        ) : (
          <span className="font-serif text-3xl">Project</span>
        )}
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
      <span className="kicker">{kicker}</span>
      <h3 className="font-serif text-2xl text-title md:text-[26px]">{title}</h3>
      <p className="body-text text-[15px]">{description}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Pill key={t.label} icon={t.icon}>
            {t.label}
          </Pill>
        ))}
      </div>
      <div className="mt-2 inline-flex items-center gap-1 font-sans text-sm font-semibold text-terracotta">
        Read case study
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </div>
  </Link>
);
