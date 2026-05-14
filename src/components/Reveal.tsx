import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number; // ms
  style?: CSSProperties;
  /** When true, child is unwrapped: applies reveal classes to its only child via cloneElement is not used here.
   *  Instead, Reveal always renders a wrapper element (default div).  */
  once?: boolean;
}

/**
 * Subtle fade-up-on-scroll. Triggers via IntersectionObserver.
 * Disabled automatically for users with prefers-reduced-motion.
 */
export const Reveal = ({
  children,
  as,
  className,
  delay = 0,
  style,
  once = true,
}: RevealProps) => {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honor reduced motion: skip animation entirely.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn("reveal", visible && "reveal--in", className)}
      style={{ ...style, transitionDelay: visible && delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
};
