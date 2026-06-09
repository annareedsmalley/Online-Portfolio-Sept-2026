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
      {/* HERO — eyebrow, headline, intro on light background */}
      <section className="bg-background hero-enter">
        <div className="mx-auto max-w-content xl:max-w-[min(1312px,70vw)] px-6 pb-4 pt-12 md:px-16 md:pb-5 md:pt-16">
          <Reveal>
            <p className="font-label text-[12px] font-semibold uppercase tracking-[0.16em] md:text-[14px]" style={{ color: '#c2363a' }}>
              DESIGN LEADER · TEAM BUILDER · ACCESSIBILITY CHAMPION
            </p>
            <h1 className="mt-6 max-w-[75%] font-serif text-[32px] leading-[1.05] text-title md:mt-8 md:text-[clamp(40px,6.5vw,84px)]">
              Building Teams<br />That Build For All
            </h1>
            <p className="body-text mt-6 max-w-[75%] text-base md:mt-8 md:text-lg whitespace-pre-line">
              {`Oh hi - I'm Anna Smalley, a design leader with 17+ years turning cross-functional groups into high-performing, happy teams and shipping 50+ products across Gap Inc, Salesforce and Walmart. My greatest passion is universal design: starting with the people most often excluded, then creating experiences that end up better for everyone. I'm based in the SF Bay Area, and I'm currently looking for a mission-driven, joyful team that prioritizes inclusion.`}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" className="scroll-mt-20 bg-background">
        <div className="mx-auto max-w-content xl:max-w-[min(1312px,70vw)] px-6 py-1.5 md:px-16 md:py-2">
          <h2 className="font-serif text-[24px] text-title md:text-[36px]">
            Recent work
          </h2>

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
      <section id="about" className="bg-background">
        <div className="mx-auto max-w-content xl:max-w-[min(1312px,70vw)] px-6 pt-5 pb-16 md:px-16 md:pt-7 md:pb-20">
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
              <h2 className="font-serif text-[24px] text-title md:text-[36px]">
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
