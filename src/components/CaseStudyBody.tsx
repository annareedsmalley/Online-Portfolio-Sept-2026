import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ZoomableImage } from "@/components/ZoomableImage";
import { StickyNote } from "@/components/StickyNote";
import { PasswordGate } from "@/components/PasswordGate";
import { CASE_STUDY_GATE_STORAGE_KEY } from "@/config/caseStudyGate";
import theSituationImg from "@/assets/the-situation.png";
import myTeamSurfiesBrandiesImg from "@/assets/my-team-surfies-brandies.png";
import showingNotTellingVideo from "@/assets/showing-not-telling.mov";
import crossFunctionalAlignment2Img from "@/assets/cross-functional-alignment-2.png";
import validatingUserResearchImg from "@/assets/validating-user-research.png";
import aikidoAmazonPushImg from "@/assets/aikido-amazon-push.png";
import solutionBComparisonTableImg from "@/assets/solution-b-comparison-table.png";
import deadLinksOnPdpImg from "@/assets/dead-links-on-pdp.png";
import guidelinesThatLastedImg from "@/assets/guidelines-that-lasted.png";

interface NavSection {
  id: string;
  title: string;
}

interface CaseStudyBodyProps {
  studyTitle: string;
}

// Sticky nav reflects every H2 in the source document, in order.
const sections: NavSection[] = [
  { id: "leadership-context", title: "Context & Objectives" },
  { id: "my-approach", title: "Setup & Staffing" },
  { id: "first-battle", title: "Challenge #1" },
  { id: "second-challenge", title: "Challenge #2" },
  { id: "results", title: "Results" },
  { id: "team-leadership-impact", title: "Lasting Strategic Impact" },
  { id: "reflections", title: "Reflections" },
];

// ----- Reusable typographic primitives -----
const H2 = ({ id, children, className }: { id: string; children: ReactNode; className?: string }) => (
  <h2
    id={id}
    className={`scroll-mt-28 font-serif text-[28px] leading-[1.15] text-title md:text-[40px] mt-10 -mb-1 ${className ?? ""}`}
  >
    {children}
  </h2>
);

const H3 = ({ children, id }: { children: ReactNode; id?: string }) => (
  <h3 id={id} className="font-serif text-[22px] leading-[1.25] text-title md:text-[26px] mt-7 -mb-1">
    {children}
  </h3>
);

const H4 = ({ children }: { children: ReactNode }) => (
  <h4 className="font-serif text-[18px] leading-[1.25] text-title md:text-[20px] mt-5 -mb-1">
    {children}
  </h4>
);

const P = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={`body-text text-[16px] leading-[1.5] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title ${className ?? ""}`}>
    {children}
  </p>
);

const UL = ({ children }: { children: ReactNode }) => (
  <ul className="body-text flex list-disc flex-col pl-6 text-[16px] leading-[1.4] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title">
    {children}
  </ul>
);

// Image with caption per spec:
//  - 8px gap below image
//  - Montserrat Regular, 12px, color #56514D
const CyclingFigure = ({
  images,
  alt,
  caption,
  intervalMs = 3500,
}: {
  images: { src: string; alt?: string }[];
  alt: string;
  caption: string;
  intervalMs?: number;
}) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);
  return (
    <figure className="flex flex-col">
      <div className="relative rounded-xl overflow-hidden">
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`transition-opacity duration-700 ${i === index ? "opacity-100 relative" : "opacity-0 absolute inset-0"}`}
            aria-hidden={i !== index}
          >
            <ZoomableImage
              src={img.src}
              alt={img.alt ?? alt}
              className="rounded-xl overflow-hidden"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-terracotta" : "w-1.5 bg-title/20"}`}
          />
        ))}
      </div>
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
    </figure>
  );
};

const Figure = ({ src, alt, caption, bgColor }: { src: string; alt: string; caption: string; bgColor?: string }) => (
  <figure className="flex flex-col">
    <ZoomableImage
      src={src}
      alt={alt}
      className="rounded-xl overflow-hidden"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    />
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
  </figure>
);

const VideoFigure = ({ src, ariaLabel, caption }: { src: string; ariaLabel: string; caption?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };
  return (
    <figure className="flex flex-col">
      <div className="relative rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          aria-label={ariaLabel}
          autoPlay
          loop
          muted
          playsInline
          className="block h-auto w-full"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          aria-pressed={!playing}
          className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-title/80 text-background shadow-md backdrop-blur transition hover:bg-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        >
          {playing ? (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
              <rect x="1" y="1" width="4" height="14" rx="1" />
              <rect x="9" y="1" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
              <path d="M2 1.5v13a.5.5 0 0 0 .77.42l10-6.5a.5.5 0 0 0 0-.84l-10-6.5A.5.5 0 0 0 2 1.5Z" />
            </svg>
          )}
        </button>
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
};

const Section = ({ children }: { id?: string; children: ReactNode }) => (
  <Reveal as="section" className="flex scroll-mt-28 flex-col gap-4">
    {children}
  </Reveal>
);

const SectionDivider = () => null;

const KeyInsight = ({
  children,
  color = "yellow",
  rotate = -2,
  label = "Key insight",
}: {
  children: ReactNode;
  color?: "yellow" | "pink" | "blue" | "green" | "peach";
  rotate?: number;
  label?: string;
}) => (
  <div className="my-6">
    <StickyNote color={color} rotate={rotate} size="lg" className="max-w-[440px]">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
        {label}
      </p>
      <p className="mt-3 font-serif text-[18px] leading-[1.4] text-title">
        {children}
      </p>
    </StickyNote>
  </div>
);

export const CaseStudyBody = ({ studyTitle }: CaseStudyBodyProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(sections[0].id);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CASE_STUDY_GATE_STORAGE_KEY) === "1") {
        setUnlocked(true);
      }
    } catch {
      // ignore
    }
    const handler = () => setUnlocked(true);
    window.addEventListener("case-study-unlocked", handler);
    return () => window.removeEventListener("case-study-unlocked", handler);
  }, []);

  const [observerTick, setObserverTick] = useState(0);

  useEffect(() => {
    const handler = () => setObserverTick((t) => t + 1);
    window.addEventListener("case-study-unlocked", handler);
    return () => window.removeEventListener("case-study-unlocked", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    const attach = () => {
      const found = sections
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => !!el);
      found.forEach((el) => observer.observe(el));
      return found.length;
    };
    let count = attach();
    // If gated sections aren't in the DOM yet, retry shortly.
    const retry = count < sections.length
      ? window.setTimeout(() => attach(), 100)
      : undefined;
    return () => {
      if (retry) window.clearTimeout(retry);
      observer.disconnect();
    };
  }, [observerTick]);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-content px-6 py-12 md:px-16 md:py-24">
        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr] md:gap-16"
        >
          {/* LEFT: sticky table of contents (scoped to this page only) */}
          <aside className="hidden md:block">
            <nav className="sticky top-28 flex flex-col gap-4">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-left font-serif text-[20px] leading-[1.2] text-title transition-colors hover:text-terracotta"
              >
                Delivering multi-variant PDP strategy through <strong className="font-semibold">organizational change at Gap Inc.</strong>
              </button>
              <ul className="flex flex-col gap-2 border-l border-border pl-4">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`font-label text-xs uppercase tracking-wider transition-colors hover:text-terracotta ${
                        active === s.id ? "text-terracotta" : "text-title/70"
                      }`}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* RIGHT: content */}
          <article className="flex min-w-0 flex-col gap-4 [&_section:first-of-type_h2:first-of-type]:mt-0 [&_h2+h3]:mt-6 [&_h3+h4]:mt-0">
            <PasswordGate>

            {/* ===================== Leadership Context ===================== */}
            <Section id="leadership-context">
              <H2 id="leadership-context">Context & Objectives</H2>

              <P>
                This project began as a single-brand initiative, owned by Old Navy. Within the brand world at Gap Inc., that meant something specific: there was <strong>no brief, no strategy, and no stakeholder alignment</strong>. Old Navy had a vision, they wanted it implemented, and the impact on customers was assumed to be positive without needing interrogation. No user research. No design involvement in the scoping.
              </P>
              <P>
                Then a leadership decision changed everything. Gap Inc. was moving to a <strong>"headless UI" architecture</strong>, and new principles were being established: brands could no longer build anything that couldn't be used by all four brands. Everything would be built on the shared platform, with differences in behavior and functionality per brand managed through the design system. That meant this was no longer Old Navy's project. It was a platform initiative. And that meant it landed on my team.
              </P>
              <Figure
                src={theSituationImg}
                alt="The Situation"
                caption="The brand's vision was to replicate the in-store experience of seeing all variant options."
              />

              <P>
                Years of brand requests for multi-variant PDPs, and zero design work had been done. Engineering had already given an estimate and timeline. <strong>Handoff was three weeks away.</strong> And Old Navy had a <strong>$17 million marketing campaign</strong> riding on that timeline.
              </P>
              <P>
                Leadership had scoped multi-variant PDPs as straightforward UI. "Just add selectors to the page; should be simple." It wasn't. 
              </P>

              <P>
                I was navigating a <strong>complex web of stakeholders</strong>: my UX team of 7 designers, the design systems team, the UXR team, a content strategist, the product manager for product groupings, the product manager for the PDP in general, platform engineering and PDP engineering, the leaders of each brand's digital experience, 1 to 3 brand producers for each brand, and the VP of UX and VP of Product Management.
              </P>
              <P>
              </P>



              <H2 id="my-approach">Setup & Staffing</H2>
              <P>
                The decision to take on this project was itself a leadership call. There were many other projects in flight for my team. Instead of keeping them all 100% allocated to other pre-existing work, I said "yes" to this, and I think that decision had to do with using it as an opportunity to <strong>influence something foundational</strong>.
              </P>
              <P>
                We knew that if we didn't invest in trying to turn the ship around, it would come back to us in a way that would be much more unpleasant: cleaning up after a mess instead of designing a solid, validated solution in the first place. One that customers and the business would benefit from. And that we would benefit from, in terms of earning trust and respect from the brands and our other partners within the central org.
              </P>

              <P>
                My first move was <strong>selecting the right designer</strong>.{"\u00a0"}I chose Kimberly, a designer I'd hired onto my Buy team years earlier and watched grow into someone operating well above her title.{"\u00a0"}I chose Kimberly, a designer I'd hired onto my Buy team years earlier and watched grow into someone operating well above her title.{"\u00a0"}Why: Kimberly's strengths were in going deep into problems that appeared deceptively shallow. I knew she was doing senior-level work and wanted to promote her, and knew it would be an uphill battle without a high-profile story to tell.
              </P>
              <P>
                One gap I knew I needed to fill was that Kimberly had spent most of her Gap Inc career on the non-branded side of the journey (cart, checkout, profile, fulfillment) where the experience is the same regardless of brand. She wasn't as accustomed to the political dynamics of brand-differentiated work, where every brand wants special treatment and tensions can escalate quickly.
              </P>
              <P>
                My second move was to strategize directly with Kimberly, bringing her into the thinking about what needed to be done, which had everything to do with establishing trust with the brands quickly. I knew this would require relationship building and neutral demonstrations: <strong>showing, not telling</strong>, why the assumed simple solution would not be in any brand's interest to build without more thought and validation.
              </P>

              <P>
                I had 7 designers, and everyone had a senior title except Kimberly. The team was structured in a new way that I had recently designed and begun implementing: each designer specialized in either a single "surface" across all four brands (the Product Listing Page or the Product Detail Page, for example) or specialized in one single brand across the whole eCommerce experience. The first group were called <strong>"Surfies"</strong> and the second group were called <strong>"Brandies."</strong>
              </P>
              <P>
                This structure meant that whenever Kimberly, as a Surfie specializing in the PDP, was working on a project for a specific brand, she could always get peer support, feedback, guidance, and connections from the Brandie for that brand. Someone with deep expertise in that brand's design theme, tone, products, business model, customers, and critically, the personalities, roles, and dynamics within that brand's organization. 
              </P>
              <Figure
                src={myTeamSurfiesBrandiesImg}
                alt="My Team: Surfies and Brandies"
                bgColor="#DF894E"
                caption={"Each designer specialized in either a single \"surface\" across all four brands or specialized in one single brand across the whole eCommerce experience. The first group were called \"Surfies\" and the second group were called \"Brandies.\""}
              />
            </Section>

            <SectionDivider />

             {/* ===================== Design Work ===================== */}
            <Section id="structuring-work">
              <P>
                In addition to the requisite competitive research, I made sure the team looked for best practices around solving this problem. Not because best practices usually held much weight with the brands, but because they could, when combined with other more tangible evidence, help with winning or clarifying the argument.
              </P>
               
              <P>
                I leveraged the sprint structure I had already set up for a parallel project (Gap Inc's "headless UI" migration), which involved several different kinds of forums, some with brands and some just with the central team. This meant there was always a <strong>live forum right around the corner</strong> where stakeholders could bring up concerns and feel heard.
              </P>
              <Figure
                src={crossFunctionalAlignment2Img}
                alt="Cross-Functional Alignment Structure Image 2"
                caption={'The two-week sprint cadence I had already established for Gap Inc\'s "headless UI" migration (designing foundational, themeable UI components for all four brands). Each week included cross-brand reviews, brand feedback loops, office hours, and design-to-dev handoff, ensuring stakeholders always had a forum within days.'}
              />
            </Section>

            <SectionDivider />

            {/* ===================== The First Battle: Buying Time ===================== */}
            <Section id="first-battle">
              <H2 id="first-battle">Challenge #1</H2>

              <P>
                Our challenge was to ask the right questions and get answers quickly to determine feasibility. We had one week's worth of competitive analysis, prototypes, and best practices research. We needed to convince stakeholders that three weeks wasn't enough, that engineering should pause, and assumptions needed to be challenged.
              </P>
              <P>
                We rallied: "These assumptions need to be challenged. We need time to put this in front of customers, look at best practices, and review competitors."
              </P>
              <P>
                Then we brought the evidence. The best practices were clear: do not add more than 1 to 2 variant selector types to a PDP. The reality? A single product could have 5 selector types (Size, Length, Rise, Leg Style, Stretch) creating 72 possible combinations. And with <strong>70% of shoppers on mobile</strong>, viewing only a partial page at any given moment, adding even one or two variant selectors created cognitive overload and invisible updates.
              </P>
              <P>
                Our first instinct was to understand, not to design. We separated the stated solution from the true goal. We established clear success metrics tied to conversion and bounce rates. Then we built to learn. The team produced <strong>15+ Figma prototypes across 4 brands</strong> and multiple platforms, not to present polished solutions, but to stress-test assumptions from brands, engineering, and ourselves. Failure scenarios and edge cases were mapped across every combination. Prototypes became our primary tool for stakeholder alignment throughout the project. This was a deliberate strategic choice: instead of telling brands their assumptions were wrong, we showed them.
              </P>
              <P>
                All of our efforts (bringing brands along, competitive evidence, prototypes as proof) paid off. <strong>Everyone approved. We bought the time.</strong>
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== What We Did with the Time ===================== */}
            <Section id="what-we-did">
              <H3 id="structuring-work">Discovery</H3>
              <P>
                All of our work so far had led us to our own assumptions. Specifically, we assumed that adding more variant sets could do two things: create <strong>cognitive overload</strong> create a viewport limitation issue on mobile. (Specifically, changes made to variants at the bottom of the page could cause changes to the product's price and color, but these things would be out of view.) The next step was to find out what happened when we talked to real users.
              </P>
              <P>
                Our user research confirmed a critical gap: customers were <strong>struggling to discover and compare product variants</strong> on PDPs.
              </P>
              <P>
                We ran two phases of research. The Phase 1 alternate options study (N=15, unmoderated, females aged 24–49, recent Gap Inc. shoppers, mobile web) tested three prototype designs for variant discovery.
              </P>
              <P>
                A critical insight emerged: shoppers do not consider, and often do not comprehend, the issue we were trying to solve with MVG. Their suggested solutions only accounted for changing a single attribute within a multi-attribute style.
              </P>
              <P>
                The Phase 2 study (N=9, moderated, 45-minute sessions, females aged 29–58, P12M Old Navy shoppers) went deeper into color grouping, price visibility, sizing, and attribute ordering.
              </P>
              <P>
                The takeaway was: customers have <strong>strong mental models</strong> about how products should be organized, and when variant groupings violate those mental models, confusion and frustration follow quickly. Price grouping, attribute ordering, and measurement consistency all emerged as non-negotiable from the customer's perspective.
              </P>
              <Figure
                src={validatingUserResearchImg}
                alt="Validating Through User Research"
                caption="Research stimuli used in our user studies: real product pages with multi-variant selectors, tested across different product types and complexity levels to surface where the experience broke down."
              />

              <P>
                My intuition told me that the solution as it was being handed to us would cause cognitive overload for neurotypical users, so it seemed especially important to get the perspective of <strong>people who already face barriers to comprehension</strong> when using websites and apps like ours.
              </P>
              <P>
                I guided the team to take the same stimuli we were sharing with our UXR team and also share them with Gap Inc.'s third-party accessibility partner, the <strong>Center for Accessible Technology (C4AT)</strong>. This way, C4AT could conduct research with customers with disabilities at the same time as the UXR team was running studies with their standard pool of participants.
              </P>
              <P>
                We got results that made us feel more confident in our approach than if we had only done UXR with the "standard" pool of participants.
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== The First Design Solution ===================== */}
            <Section id="first-solution">
              <H3>Design Solution A</H3>
              <P>
                The Sticky Container keeps price, reviews, images, and selected color visible as users scroll through variant options. Paired with product setup guidelines limiting PDPs to a maximum of four variant groups.
              </P>
              <VideoFigure
                src={showingNotTellingVideo}
                ariaLabel="Showing, Not Telling: Prototyping as a Leadership Tool"
                caption="A sample of the 15+ Figma prototypes built across four brands and multiple platforms. These weren't polished solutions; they were stress tests designed to surface failure scenarios and make assumptions visible."
              />
              <P>
                Based on the research, the team developed <strong>Solution A: a Sticky Container</strong> that solved the out-of-viewport problem, keeping key elements like price, reviews, images, and selected color visible as users scrolled, paired with <strong>Product Setup Guidelines</strong> that addressed cognitive overload by limiting variant complexity.
              </P>
              <P>
                We also developed ARIA text alerting users when the page refreshes and resetting the cursor, an accessibility consideration built into the solution from the start.
              </P>
            </Section>

            <SectionDivider />

             {/* ===================== The Second Challenge ===================== */}
             <Section id="second-challenge">
               <H2 id="second-challenge">Challenge #2</H2>
               <P>
                 As we were sharing UXR findings, engineering discovered a critical technical issue in parallel testing: the products that brands had submitted for POC testing did not always have 100% cross-variant coverage. This resulted in <strong>dead clicks</strong> on variants that could not be combined with variants already selected for other attributes.
               </P>
              <Figure
                src={deadLinksOnPdpImg}
                alt="Mobile PDP showing dead links on size and Wide Leg variants that could not be combined with other selected attributes."
                caption="Short, Wide Leg pants have never existed, causing dead links."
              />
              <P>
                With deadlines looming and a critical bug exposed, tensions were high. We had already extended the deadline once, so asking for more time again was a harder sell.
              </P>
              <P>
                We deployed the playbook again. We established <strong>shared vocabulary</strong>, this time around "MVG products with 100% coverage" vs. "without," then demonstrated through actual code what partial coverage would do to customers. There was no easy fix, and internal alignment was fractured.
              </P>

            </Section>

            <SectionDivider />

            {/* ===================== Accessibility: Round Two ===================== */}
            <Section id="accessibility-round-two">
              <P>
                Once again, we won the extra time to design and test possible solutions with customers. Because it had gone so well the first time and added nothing to the timeline, we ran <strong>parallel accessibility research</strong> again with C4AT during this second phase. This time the results were even more robust.
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== The Second Solution: Comparison Table ===================== */}
            <Section id="additional-solution">
              <P>
                Some brands wanted the Amazon-style experience, so we showed them Amazon. Then we translated what we saw into projected lost sales, returns, and customer frustration for Gap Inc.'s brands.
              </P>
              <P>
                The key insight we communicated was: <strong>the user will assume all variant combinations exist.</strong> That assumption, unmet, leads directly to dead clicks. Furthermore, Gap Inc.'s brand promise is not Amazon's brand promise.
              </P>
              <H3>Design Solution B</H3>

              <P>
                <em>The strategic win — the answer the brands rallied behind.</em>
              </P>

              <P>
                The brands accepted the path forward. Athleta was the first brand to choose Option 3, and gave us the time to build it.
              </P>
              <P>
                The result was a <strong>Comparison Table</strong>: a shared pattern that all four brands could align on, showing related products side by side (e.g., Straight vs. Wide Leg vs. Ankle) with key attributes compared. <strong>No 100% coverage required.</strong>
              </P>
              <P>
                What made this possible was solving the underlying <strong>cross-brand data problem</strong>. By establishing clear grouping guidelines and getting merchants and engineers aligned on variant structure, we created the conditions for a pattern that works across every brand's catalog — not just one.
              </P>
              <P>
                The Comparison Table was validated through user research and is now in development. In the end, the benefit of the data crisis was that we now had two solutions to pick from. We wouldn't have had to do this if the data crisis hadn't happened. This is <strong>design amplification</strong>: designing for an edge case yielded something useful for everyone.
              </P>
              <Figure
                src={solutionBComparisonTableImg}
                alt="Solution B: The Comparison Table"
                caption="The Comparison Table shows related products side by side with key attributes compared. Unlike the stacked selector, this pattern works without requiring 100% variant data coverage."
              />
            </Section>

            <SectionDivider />

            {/* ===================== Two Solutions ===================== */}
            <Section id="two-solutions">
              <H3 id="two-solutions">The final delivery: two options to choose from</H3>
              <P>Rather than mandate a single path, we presented three genuine options:</P>
              <UL>
                <li>
                  <strong>Option 1: Fix your data</strong> - achieve 100% coverage, follow the max-dimensions rule, and continue with selectors and the sticky container. (Max 4 variant groups, 100% production coverage required, variant categories must be logically coherent.)
                </li>
                <li><strong>Option 2: Accept a broken experience</strong> with the risks we've demonstrated.</li>
                <li><strong>Option 3: An alternative path</strong> - a new pattern that doesn't require 100% coverage.</li>
              </UL>
              <P>
                This was the <strong>aikido approach</strong> at its purest: we shared all information openly and let any brand experiment who wanted to. The numbers told the story.
              </P>
              <P>
                Brands have two patterns to choose from depending on their products and data. The Comparison Table is the more comprehensive solution where data and product fit allow, while the Stacked Selector remains available for simpler product setups. Either way, brands have guidelines for A/B testing to determine what works best.
              </P>
              <H2 id="results">Results</H2>
              <P>
                We gave every brand the same framework, the same guidelines, and the same choice. What happened next proved the approach worked.
              </P>
              <P><strong>Brands that followed the guidelines:</strong></P>
              <UL>
                <li>
                  <strong>Banana Republic</strong> adopted a clean variant structure, grouping only logically coexisting variants (Skinny / Slim / Straight / Athletic). <strong>No dead clicks. No confused customers.</strong>
                </li>
                <li>
                  <strong>Athleta</strong> launched with length-based groupings (7/8 / Full / Capri / Crop), going live on 7/23 with 11 product groups containing 27 style variants. The experience performed as designed.
                </li>
              </UL>
              <P><strong>Brands that didn't:</strong></P>
              <UL>
                <li>
                  <strong>Gap</strong> grouped Cropped / Full with Sleeveless / Short Sleeve / Long Sleeve, but a Sleeveless Crop doesn't exist. Result: dead clicks, exactly the failure we had warned about.
                </li>
                <li>
                  <strong>Old Navy</strong> combined numeric sizes with Curvy / Classic fit types, creating the kind of complexity our research showed would break. It did.
                </li>
              </UL>
              <P>
                We didn't have to say "I told you so." The whole point of the aikido approach was that brands would <strong>learn on their own terms</strong>, and they did.
              </P>

              <H2 id="team-leadership-impact">Lasting Strategic Impact</H2>
              <H3>Product and business</H3>
              <UL>
                <li>
                  <strong>Solution B (Comparison Table)</strong> was designed and validated through user research and is now in development.
                </li>
                <li>
                  <strong>Solution A (Stacked Selector + Sticky Container)</strong> is live today, available to any brand to apply to the products they choose. Early results have been neutral, which surfaced the need for a more comprehensive solution.
                </li>
                <li>
                  <strong>Prevented a $17M marketing campaign failure.</strong> We discovered the proposed solution would create dead clicks, silent variant-switching, and customer confusion. We redirected the approach before damage was done, saving the brands from loss of customer trust and a campaign that would have flopped.
                </li>
              </UL>

              <H3>Team and leadership</H3>
              <UL>
                <li>
                  Raised the confidence and profile of a junior designer. I got approval from the VP of UX to promote Kimberly, largely because of the visibility and impact of her work on this project. Kimberly has since been able to use her case study for this work to get a senior role at a large tech company.
                </li>
                <li>
                  Proved out the <strong>Surfies/Brandies team model</strong> on a high-stakes, politically complex project, validating the team structure I had designed.
                </li>
                <li>
                  Set a precedent for brand-to-platform transitions. We demonstrated what it looks like when formerly brand-owned initiatives are transferred to the central team: the UX browse team moves quickly to understand where the brands are trying to go, meets them where they are, then collaboratively works on solutions to the actual problem they're trying to solve.
                </li>
                <li>
                  Set a new precedent at Gap Inc. for inclusive research: if a team had stimuli ready for UXR, that same stimuli went in front of people with disabilities. No added timeline. No added designer effort. The C4AT partnership was still running accessibility research alongside standard UXR when I left.
                </li>
              </UL>

              <H3>Guidelines that lasted</H3>
              <P>
                Company-wide grouping guidelines adopted as <strong>official policy across all four brands</strong> for future product decisions.
              </P>
              <UL>
                <li>Merchant Job Aids updated to reflect grouping guidelines for site merchants loading products.</li>
                <li>Sticky Container pattern adopted into the design system library for future use across products.</li>
              </UL>
              <Figure
                src={guidelinesThatLastedImg}
                alt="Guidelines That Lasted"
                caption="Caption of the visual"
              />
            </Section>

            <SectionDivider />

            {/* ===================== Reflections ===================== */}
            <Section id="reflections">
              <H2 id="reflections">Reflections</H2>

              
              <P>
                I'm incredibly proud of how I led my team through this challenging experience, and of the work we delivered. If there's anything I would do differently, it's that I would encourage more design studio workshops. We ran at least one hands-on brainstorming workshop with the central team (product, engineering, UX) and it was incredibly useful for alignment. Co-creation always builds faster alignment than presentation.
              </P>

              <P>
                I'm particularly proud of the following:
              </P>

              

              
              <div className="mt-6 grid grid-cols-1 items-start justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3">
                <StickyNote color="beige" rotate={-4} size="md" className="w-full max-w-[260px]">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
                    AIKIDO APPROACH
                  </p>
                  <p className="mt-2 font-serif text-[15px] leading-snug text-title">
                    Shared all information openly and let any brand experiment who wanted to. The numbers told the story.
                  </p>
                </StickyNote>
                <StickyNote color="blush" rotate={3} size="md" className="w-full max-w-[260px]">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
                    Strategic relationships
                  </p>
                  <p className="mt-2 font-serif text-[15px] leading-snug text-title">
                    Investing in the relationships that made all the difference when stakes were highest.
                  </p>
                </StickyNote>
                <StickyNote color="sage" rotate={-2} size="md" className="w-full max-w-[260px]">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
                    ELEVATING TALENT
                  </p>
                  <p className="mt-2 font-serif text-[15px] leading-snug text-title">
                    Throughout this project, I kept the focus on giving my team a chance to shine. This was a great success for my team, our partners and our customers. 
                  </p>
                </StickyNote>
              </div>
            </Section>
            </PasswordGate>
          </article>
        </div>
      </div>
    </section>
  );
};
