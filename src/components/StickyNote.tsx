import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type StickyColor = "yellow" | "pink" | "blue" | "green" | "peach" | "sage" | "beige" | "blush";
type StickySize = "sm" | "md" | "lg";

const colorMap: Record<StickyColor, string> = {
  yellow: "#FCE38A",
  pink: "#F8B6C2",
  blue: "#B6D7E8",
  green: "#C7E5B4",
  peach: "#F8C9A4",
  sage: "#C8D5BE",
  beige: "#EEE0C9",
  blush: "#F7CBC6",
};

const sizeMap: Record<StickySize, string> = {
  sm: "p-4 text-sm",
  md: "p-5",
  lg: "p-6",
};

interface StickyNoteProps {
  children: ReactNode;
  color?: StickyColor;
  rotate?: number; // resting rotation in degrees
  size?: StickySize;
  className?: string;
  hoverLift?: boolean;
}

/**
 * FigJam-inspired sticky note. Uses CSS variables + the `.sticky-note`
 * utility (defined in index.css) to animate a small extra rotation on
 * hover, optionally combined with a lift.
 */
export const StickyNote = forwardRef<HTMLDivElement, StickyNoteProps>(
  (
    { children, color = "yellow", rotate = -3, size = "md", className, hoverLift = true },
    ref,
  ) => {
    const hoverDelta = rotate >= 0 ? 5 : -5;
    return (
      <div
        ref={ref}
        className={cn(
          "sticky-note",
          hoverLift && "sticky-note--lift",
          "inline-block rounded-[2px] text-title shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)]",
          sizeMap[size],
          className,
        )}
        style={
          {
            backgroundColor: colorMap[color],
            "--sticky-rest-rot": `${rotate}deg`,
            "--sticky-hover-rot": `${rotate + hoverDelta}deg`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    );
  },
);
StickyNote.displayName = "StickyNote";
