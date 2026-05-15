import { Check } from "lucide-react";

interface ImpactItemProps {
  label: string;
  body: string;
}

export const ImpactItem = ({ label, body }: ImpactItemProps) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2">
      <Check className="h-5 w-5 text-terracotta" strokeWidth={2.5} />
      <h4 className="font-label text-[16px] font-semibold uppercase tracking-wider text-terracotta">
        {label}
      </h4>
    </div>
    <p className="body-text text-[14px]">{body}</p>
  </div>
);
