import { cn } from "@/lib/utils";

interface DeviceMockupProps {
  brand: string;
  accent?: "terracotta" | "navy" | "sand" | "deep";
  children?: React.ReactNode;
}

const accentBg = {
  terracotta: "bg-terracotta",
  navy: "bg-navy",
  sand: "bg-sand",
  deep: "bg-terracotta-deep",
};

const accentText = {
  terracotta: "text-white",
  navy: "text-white",
  sand: "text-title",
  deep: "text-white",
};

export const DeviceMockup = ({ brand, accent = "terracotta" }: DeviceMockupProps) => (
  <div className="flex flex-col items-center gap-6">
    <span className="font-serif text-xl tracking-wide text-title">{brand}</span>
    <div className="relative h-[420px] w-[210px] rounded-[36px] border-[10px] border-title bg-background shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-title/40" />
      <div className="flex h-full flex-col overflow-hidden rounded-[26px]">
        <div className={cn("flex h-32 items-end p-4", accentBg[accent], accentText[accent])}>
          <span className="font-serif text-lg leading-tight">{brand}</span>
        </div>
        <div className="flex flex-1 flex-col gap-3 bg-background p-4">
          <div className="h-3 w-3/4 rounded-full bg-sand" />
          <div className="h-3 w-1/2 rounded-full bg-sand" />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="aspect-square rounded-md bg-bluegrey" />
            <div className="aspect-square rounded-md bg-sand" />
            <div className="aspect-square rounded-md bg-sand" />
            <div className="aspect-square rounded-md bg-bluegrey" />
          </div>
          <div className="mt-auto h-8 rounded-full bg-terracotta/90" />
        </div>
      </div>
    </div>
  </div>
);
