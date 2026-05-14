import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface PillProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const Pill = ({ icon: Icon, children, className }: PillProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full bg-bluegrey px-3 py-1 font-label text-[11px] font-medium uppercase tracking-wider text-navy",
      className,
    )}
  >
    {Icon ? <Icon className="h-3.5 w-3.5" strokeWidth={2.25} /> : null}
    {children}
  </span>
);
