import { ImageIcon } from "lucide-react";

interface PlaceholderVisualProps {
  description: string;
  source?: string;
  caption?: string;
  aspect?: "video" | "square" | "wide" | "tall";
}

const aspectClass: Record<NonNullable<PlaceholderVisualProps["aspect"]>, string> = {
  video: "aspect-[16/9]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  tall: "aspect-[4/5]",
};

/**
 * Placeholder visual block used in case studies where the final imagery has
 * not yet been provided. Renders a labeled box describing the intended visual.
 */
export const PlaceholderVisual = ({
  description,
  source,
  caption,
  aspect = "video",
}: PlaceholderVisualProps) => (
  <figure className="flex flex-col">
    <div
      className={`${aspectClass[aspect]} flex w-full items-center justify-center rounded-xl border-2 border-dashed border-terracotta/40 bg-sand/60 p-8`}
      role="img"
      aria-label={`Placeholder for visual: ${description}`}
    >
      <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
        <ImageIcon className="h-6 w-6 text-terracotta" aria-hidden="true" />
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta">
          Visual Placeholder
        </p>
        <p className="body-text text-[14px] leading-[1.5] text-title md:text-[15px]">
          {description}
        </p>
        {source && (
          <p
            className="font-normal"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "#56514D",
            }}
          >
            Source: {source}
          </p>
        )}
      </div>
    </div>
    {caption && (
      <figcaption
        className="mt-2 font-normal"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "12px",
          color: "#56514D",
          marginTop: "8px",
        }}
      >
        {caption}
      </figcaption>
    )}
  </figure>
);
