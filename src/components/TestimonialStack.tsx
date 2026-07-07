import { type CSSProperties } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  topic: string;
}

interface CardStyle {
  bg: string;
  fg: string;
  meta: string;
}

const palette: CardStyle[] = [
  { bg: "hsl(358 56% 49%)", fg: "hsl(36 33% 97%)", meta: "hsla(36, 33%, 97%, 0.75)" },
  { bg: "hsl(40 29% 94%)", fg: "hsl(30 8% 9%)", meta: "hsla(30, 8%, 9%, 0.6)" },
  { bg: "hsl(341 52% 13%)", fg: "hsl(36 33% 97%)", meta: "hsla(36, 33%, 97%, 0.7)" },
];

interface TestimonialGridProps {
  items: Testimonial[];
}

export const TestimonialGrid = ({ items }: TestimonialGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((t, i) => {
        const color = palette[i % palette.length];
        const rotation = (i * 37) % 7 - 3; // subtle varied rotation per card

        const style: CSSProperties = {
          backgroundColor: color.bg,
          color: color.fg,
          transform: `rotate(${rotation}deg)`,
        };

        return (
          <article
            key={`${t.author}-${i}`}
            className="flex flex-col gap-5 rounded-[2px] p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] sm:p-8"
            style={style}
          >
            <p
              className="font-label text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: color.meta }}
            >
              {t.author} on… <span style={{ color: color.fg }}>{t.topic}</span>
            </p>
            <p
              className="font-serif text-[18px] leading-[1.45] sm:text-[20px]"
              style={{ color: color.fg }}
            >
              "{t.quote}"
            </p>
            <div className="mt-auto">
              <p className="font-sans text-sm font-semibold" style={{ color: color.fg }}>
                {t.author}
              </p>
              <p className="font-sans text-xs" style={{ color: color.meta }}>
                {t.role}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
};
