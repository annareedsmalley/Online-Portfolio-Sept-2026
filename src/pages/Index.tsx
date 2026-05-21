import { SiteLayout } from "@/components/SiteLayout";
import { CaseStudyListRow } from "@/components/CaseStudyListRow";
import { ContactSection } from "@/components/ContactSection";
import { Reveal } from "@/components/Reveal";

import { StickyNote } from "@/components/StickyNote";
import { TestimonialGrid } from "@/components/TestimonialStack";
import annaPortrait from "@/assets/anna-portrait.jpg";
import { caseStudies } from "@/data/caseStudies";

const Index = () => {
  return (
    <SiteLayout>
      {/* HERO — playful collage on terracotta */}
      <section
        className="relative -mt-16 overflow-hidden hero-enter pt-16"
        style={{ backgroundColor: "#C55829" }}
      >
        {/* Faint arch background */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 916"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <g opacity="0.07" style={{ mixBlendMode: "hard-light" }}>
            <path
              className="hero-arch-path"
              d="M-125 987.101V443.262C-125 381.544 -74.9678 331.512 -13.25 331.512C48.4678 331.512 98.5 381.544 98.5 443.262V670.594C98.5 764.012 174.23 839.741 267.647 839.741H353.165C399.353 839.741 436.795 877.184 436.795 923.371C436.795 969.558 474.237 1007 520.424 1007H944.224C1017.68 1007 1077.22 947.216 1077.22 873.762C1077.22 800.571 1136.56 741 1209.75 741H1226.48C1290.43 741 1342.27 792.841 1342.27 856.79V876.718C1342.27 929.661 1385.19 972.58 1438.14 972.58C1491.08 972.58 1534 929.661 1534 876.718V461.068C1534 371.149 1461.11 298.255 1371.19 298.255C1281.27 298.255 1208.37 225.361 1208.37 135.442V-191"
              stroke="#FFFFFF"
              strokeWidth="100"
            />
          </g>
        </svg>

        {/* Collage stage */}
        <div className="relative z-10 mx-auto max-w-content px-6 pb-16 pt-14 md:px-16 md:pb-20 md:pt-16">
          <div className="relative">
            {/* MOBILE-FRIENDLY: simple stack */}
            <div className="flex flex-col items-center gap-8 text-center md:hidden">
              <h1 className="font-serif text-[32px] leading-[1.1] text-white">
                I'm <span>Anna Smalley</span>, a senior UX leader
              </h1>
            <img
              src={annaPortrait}
              alt="Anna Smalley portrait"
              className="h-40 w-40 rounded-full object-cover shadow-[0_18px_40px_-12px_rgba(0,0,0,0.4)]"
            />
            <StickyNote color="pink" rotate={-4} size="md" hoverLift={false}>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
                Currently
              </p>
              <p className="mt-1 font-serif text-[15px] leading-snug text-title">
                Open to advisory<br />engagements →
              </p>
            </StickyNote>
          </div>

            {/* DESKTOP COLLAGE — two-line title with inline headshot + side sticky note */}
            <div className="relative mx-auto hidden w-full max-w-[1000px] md:block">
              {/* Sticky note — floated well off to the side so it never overlaps the title.
                  Only shown on xl+ where there's enough horizontal room. */}
              <div
                className="absolute top-1/2 z-20 hidden -translate-y-1/2 xl:block"
                style={{ left: '-180px' }}
              >
                <StickyNote color="pink" rotate={-8} size="md" hoverLift={false}>
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
                    Currently
                  </p>
                  <p className="mt-1 font-serif text-[14px] leading-snug text-title">
                    Open to advisory<br />engagements →
                  </p>
                </StickyNote>
              </div>

              <h1 className="font-serif text-[clamp(36px,6.4vw,100px)] leading-[1.05] text-white">
                {/* Line 1: I'm Anna Smalley, [headshot] */}
                <span className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                  <span
                    className="pop-in pop-delay-1 inline-block"
                    style={{ ['--pop-rot' as string]: '0deg' }}
                  >
                    I'm
                  </span>
                  <span
                    className="pop-in pop-delay-2 inline-block"
                    style={{ ['--pop-rot' as string]: '0deg' }}
                  >
                    Anna Smalley,
                  </span>
                </span>

                {/* Line 2: a Senior UX Leader. */}
                <span className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                  <span
                    className="pop-in pop-delay-5 inline-block whitespace-nowrap"
                    style={{ ['--pop-rot' as string]: '0deg' }}
                  >
                    a senior UX leader
                  </span>
                </span>
              </h1>
            </div>

          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" className="scroll-mt-20 bg-background">
        <div className="mx-auto max-w-content px-6 py-12 md:px-16 md:py-16">
          <h2 className="font-serif text-[32px] text-title md:text-[44px]">
            Recent work
          </h2>
          <p className="mt-3 max-w-xl text-base text-body">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                window.history.replaceState(null, "", "#contact");
              }}
              className="font-medium text-title underline-offset-4 hover:underline"
            >
              Contact me
            </a>{" "}
            for case studies on Salesforce and Walmart.
          </p>

          <div className="group/list mt-6 flex flex-col">
            {caseStudies.map((cs, idx) => (
              <Reveal key={cs.to} delay={idx * 100}>
                <CaseStudyListRow {...cs} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-sand">
        <div className="mx-auto max-w-content px-6 py-20 md:px-16 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={annaPortrait}
                  alt="Anna Smalley portrait"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="block h-auto w-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <h2 className="font-serif text-[32px] text-title md:text-[48px]">
                About me
              </h2>
              <p className="body-text mt-6 text-base md:text-lg">
                I'm a UX design leader with deep experience in eCommerce, a strong reputation for building collaborative, high-impact cross-functional partnerships, and an unwavering commitment to inclusion and accessibility - both in design work itself and in the way I lead teams.
              </p>
              <p className="body-text mt-4 text-base md:text-lg">
                Recently, I have also become profoundly excited about the potential of agentic AI to supercharge inclusion, especially neuroinclusive and accessibility-first design.
              </p>
              <p className="body-text mt-4 text-base md:text-lg">
                As a result, I'm currently seeking a leadership role in UX Design, UX Strategy, Design Operations or Accessibility. In this role, I hope to help shape an organization's agentic AI transformation, guiding it towards achieving something great: making that organization's products and services far more inclusive, far faster.
              </p>
            </div>
          </div>

          {/* Big stats — sticky-note style */}
          <div className="mt-20 grid grid-cols-1 items-start justify-items-center gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            <BigStat end={15} suffix="+" label="Years leading UX" color="yellow" rotate={-4} />
            <BigStat end={4} label="Brands unified" color="peach" rotate={3} />
            <BigStat end={40} suffix="+" label="Designers mentored" color="blue" rotate={-2} />
            <BigStat end={17} prefix="$" suffix="M" label="Launch failure prevented" color="green" rotate={4} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — interactive sticky-stack */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="font-serif text-[28px] text-title md:whitespace-nowrap md:text-[40px]">
              Kind words
            </h2>
          </div>
          <TestimonialGrid items={testimonials} />
        </div>
      </section>

      <ContactSection />
    </SiteLayout>
  );
};

const testimonials = [
  {
    quote:
      "Anna brings strategic clarity to ambiguous problems faster than anyone I've worked with. She made our roadmap feel inevitable instead of contested.",
    author: "Priya M.",
    role: "VP Product, Gap Inc.",
    topic: "Strategy",
  },
  {
    quote:
      "She rebuilt our design org during a year of constant change without losing a single major initiative. Calm, decisive, and deeply trusted by execs.",
    author: "Kimberly K.",
    role: "Director of Engineering",
    topic: "Leadership",
  },
  {
    quote:
      "The shared component model her team built saved us roughly 25% of our design and engineering capacity. Quietly transformative work.",
    author: "Daniel O.",
    role: "Principal Engineer",
    topic: "Systems Thinking",
  },
];

const BigStat = ({
  end,
  prefix,
  suffix,
  label,
  color,
  rotate,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  color: "yellow" | "pink" | "blue" | "green" | "peach";
  rotate: number;
}) => (
  <StickyNote color={color} rotate={rotate} size="lg" className="flex w-[200px] flex-col gap-3 md:w-[220px]">
    <span className="font-serif text-[56px] leading-none text-title md:text-[72px]">
      {prefix}{end}{suffix}
    </span>
    <span className="font-label text-[11px] font-semibold uppercase tracking-[0.14em] text-title/80">
      {label}
    </span>
  </StickyNote>
);

export default Index;
