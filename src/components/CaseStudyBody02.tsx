import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ZoomableImage } from "@/components/ZoomableImage";
import { StickyNote } from "@/components/StickyNote";
import { PasswordGate } from "@/components/PasswordGate";
import { CASE_STUDY_GATE_STORAGE_KEY } from "@/config/caseStudyGate";
import startingPointImg from "@/assets/cs02/starting-point.png";
import theInitiativeImg from "@/assets/cs02/the-initiative.png";
import managingComplexityImg from "@/assets/cs02/managing-complexity.png";
import managingComplexityGroupedImg from "@/assets/cs02/managing-complexity-grouped.png";
import twoFirstsImg from "@/assets/cs02/two-firsts.png";
import integratedLoyaltyIdentityImg from "@/assets/cs02/integrated-loyalty-identity.png";
import integratedLoyaltyUmbrellaImg from "@/assets/cs02/integrated-loyalty-umbrella.png";
import results2Img from "@/assets/cs02/results-2.png";
import launchPressReleaseImg from "@/assets/cs02/launch-press-release.png";
import approachedWork1Img from "@/assets/cs02/hui-infographic.png";
import approachedWork3Img from "@/assets/cs02/approached-work-3.png";
import firstBigWinImg from "@/assets/cs02/first-big-win.png";
import firstBigWin2Video from "@/assets/cs02/first-big-win-2.mov";
import builtOnce2Img from "@/assets/cs02/gated-products-shared-components.png";
import journeyEnrollImg from "@/assets/cs02/journey-enroll.png";
import journeyEarnImg from "@/assets/cs02/journey-earn.png";
import journeyRedeemImg from "@/assets/cs02/journey-redeem.png";
import preIntegratedLoyaltyImg from "@/assets/cs02/pre-integrated-loyalty.png";
import twoGapIncFirstsImg from "@/assets/cs02/progressive-sign-in.png";
import gapCultGaiaNewsroomImg from "@/assets/cs02/gap-cult-gaia-newsroom.png";
import gapProductGatingPdpImg from "@/assets/cs02/gap-product-gating-pdp.png";
import gapCultGaiaResultsImg from "@/assets/cs02/gap-cult-gaia-results.png";

interface NavSection {
  id: string;
  title: string;
  level?: number;
}


interface CaseStudyBody02Props {
  studyTitle: string;
}

const sections: NavSection[] = [
  { id: "leadership-context", title: "Context & Objectives", level: 2 },
  { id: "my-scope", title: "My scope at Gap Inc", level: 3 },
  { id: "the-problem", title: "Four brands, one cart, fragmented loyalty", level: 3 },
  { id: "integrated-loyalty", title: "Phase 1: Integrated Loyalty (2020–2021)", level: 2 },
  { id: "the-initiative", title: "The initiative", level: 3 },
  { id: "my-teams-role", title: "My team's role", level: 3 },
  { id: "the-framework", title: "The framework", level: 3 },
  { id: "managing-complexity", title: "Managing the complexity", level: 3 },
  { id: "two-gap-inc-firsts", title: "An extra, hard fought win: progressive sign in", level: 3 },
  { id: "the-launch", title: "Launch & Results", level: 3 },
  { id: "next-evolution", title: "Phase 2: Scalable Brand Expression (2024–2025)", level: 2 },
  { id: "phase-2-begins", title: "Loyalty's next challenge", level: 3 },
  
  { id: "leading-headless-ui", title: "Leading the headless UI migration", level: 3 },
  { id: "the-first-big-win", title: "Product Gating", level: 3 },
  { id: "built-once-used-by-all", title: "Built once, used by all", level: 3 },
  { id: "impact", title: "Impact", level: 2 },
  { id: "reflections", title: "Reflections", level: 2 },
];

// ----- Reusable typographic primitives (identical to CS01) -----
const H2 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2
    id={id}
    className="scroll-mt-28 font-serif text-[28px] leading-[1.15] text-title md:text-[40px] mt-12"
  >
    {children}
  </h2>
);

const H3 = ({ id, children }: { id?: string; children: ReactNode }) => (
  <h3
    id={id}
    className="scroll-mt-28 font-serif text-[22px] leading-[1.25] text-title md:text-[26px] mt-6 mb-2"
  >
    {children}
  </h3>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="body-text text-[16px] leading-[1.5] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title">
    {children}
  </p>
);

const UL = ({ children }: { children: ReactNode }) => (
  <ul className="body-text flex list-disc flex-col gap-1 pl-6 text-[16px] leading-[1.4] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title">
    {children}
  </ul>
);

const Figure = ({ src, alt, caption, bgColor }: { src: string; alt: string; caption?: string; bgColor?: string }) => (
  <figure className="flex flex-col">
    <ZoomableImage
      src={src}
      alt={alt}
      className="rounded-xl overflow-hidden"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    />
    {caption && (
      <figcaption
        className="mt-2 font-normal"
        style={{
          fontFamily: "'Montserrat', sans-serif",
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
            fontFamily: "'Montserrat', sans-serif",
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

const Pullquote = ({ children, color = "yellow", rotate = -2 }: { children: ReactNode; color?: "yellow" | "pink" | "blue" | "green" | "peach"; rotate?: number }) => (
  <div className="my-6">
    <StickyNote color={color} rotate={rotate} size="lg" className="max-w-[520px]">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
        How might we
      </p>
      <p className="mt-3 font-serif text-[20px] leading-[1.35] text-title md:text-[22px]">
        {children}
      </p>
    </StickyNote>
  </div>
);

const KeyInsight = ({ children, color = "blue", rotate = 2 }: { children: ReactNode; color?: "yellow" | "pink" | "blue" | "green" | "peach"; rotate?: number }) => (
  <div className="my-6">
    <StickyNote color={color} rotate={rotate} size="lg" className="max-w-[420px]">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
        Key insight
      </p>
      <p className="mt-3 font-serif text-[18px] leading-[1.4] text-title">
        {children}
      </p>
    </StickyNote>
  </div>
);

const StatBlock = ({ value, label }: { value: string; label: string }) => (
  <div className="my-4 flex flex-col gap-2">
    <span className="font-serif text-[64px] leading-none text-terracotta md:text-[88px]">{value}</span>
    <span className="body-text text-[14px] md:text-[15px]">{label}</span>
  </div>
);

const Section = ({ children }: { id?: string; children: ReactNode }) => (
  <Reveal as="section" className="flex scroll-mt-28 flex-col gap-4">
    {children}
  </Reveal>
);

const SectionDivider = () => null;

export const CaseStudyBody02 = ({ studyTitle }: CaseStudyBody02Props) => {
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
    const count = attach();
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
          className={`grid grid-cols-1 gap-16 ${unlocked ? "lg:grid-cols-[35fr_65fr]" : ""}`}
        >
          {unlocked && (
            <aside className="relative hidden lg:block">
              <div className="sticky top-28 w-full" style={{ maxWidth: 412 }}>
                <nav
                  aria-label="Case study sections"
                  className="w-full rounded-2xl border border-sand bg-sand/50 p-6"
                  style={{ maxWidth: 412 }}
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      history.replaceState(null, "", window.location.pathname);
                    }}
                    className="mb-3 block font-sans text-[15px] font-semibold tracking-wide leading-snug text-title hover:text-terracotta transition-colors"
                  >
                    {studyTitle}
                  </a>
                  <ul className="flex flex-col gap-1">
                    {sections.filter((s) => s.level !== 3).map((s) => {
                      const isActive = active === s.id;
                      const isLevel3 = s.level === 3;
                      return (
                        <li key={s.id} className="min-w-0">
                          <a
                            href={`#${s.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const el = document.getElementById(s.id);
                              if (el) {
                              const y = el.getBoundingClientRect().top + window.scrollY - 80;
                                window.scrollTo({ top: y, behavior: "smooth" });
                                history.replaceState(null, "", `#${s.id}`);
                              }
                            }}
                            className={`block rounded-md py-2 font-sans leading-snug tracking-wide transition-colors ${
                              isLevel3
                                ? "ml-4 px-2 text-[12px] font-medium"
                                : "px-3 text-[13px] font-semibold"
                            } ${
                              isActive
                                ? "bg-background text-terracotta"
                                : "text-title/70 hover:text-terracotta"
                            }`}
                          >
                            {s.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>
          )}

          {/* RIGHT: content */}
          <article className="flex min-w-0 flex-col gap-0 [&_section:first-of-type_h2]:mt-0">
            <PasswordGate>

            {/* ===================== Context ===================== */}
            <Section id="leadership-context">
              <H2 id="leadership-context">Context & Objectives</H2>

              <H3 id="my-scope">My scope at Gap Inc</H3>
              <P>
                During my tenure at Gap, Inc., I focused on each step of the eCommerce shopping journey, for all four brands:
              </P>
              <UL>
                <li>Search & Discovery</li>
                <li>Filtering & Category Pages</li>
                <li>Evaluation & Product Detail Pages</li>
                <li>Cart & Checkout</li>
                <li>Shipping & Store Pickup</li>
                <li>Login & Account</li>
                <li>Loyalty & Rewards</li>
              </UL>
              <P>
                I didn't just work on loyalty in isolation; I touched every part of the journey, which gave me a unique perspective on how loyalty connects to the full shopping experience.
              </P>

              <H3 id="the-problem">Four brands, one cart, fragmented loyalty</H3>
              <P>
                When I joined Gap Inc. in 2018, the eCommerce platform allowed customers to shop just one of Gap Inc.'s brands, or switch between them. All products a customer added would appear in a shared cart.
              </P>
              <Figure
                src={startingPointImg}
                alt="Brand switcher mobile flow showing Old Navy to Gap to a shared cart"
                caption="Brand switcher: a four-screen mobile flow from Old Navy to brand switcher to Gap to a shared cart."
              />

              <P>
                Gap Inc shoppers could become members of almost a dozen separate loyalty programs, depending on:
              </P>
              <UL>
                <li>Brand</li>
                <li>Store vs. Online</li>
                <li>Credit card membership</li>
              </UL>
              <P>
                A customer who shopped Old Navy online, Gap in stores, and had a Banana Republic credit card could be enrolled in three different programs with three different point balances and no way to see them together.
              </P>
              <P>
                Given that shoppers could shop all four brands at the same time online, the disconnects between loyalty programs created customer confusion, frustration and loss of trust.
              </P>
              <Figure
                src={preIntegratedLoyaltyImg}
                alt="Four brands, four loyalty programs: Navyist Rewards, Gap Good Rewards, Banana Republic Rewards, and Athleta Rewards shown with their respective non-card and credit card tiers."
                caption="Four brands. Four programs. One confused customer — the pre-integrated loyalty landscape across Gap Inc."
              />
              
            </Section>

            <SectionDivider />

            {/* ===================== Integrated Loyalty ===================== */}
            <Section id="integrated-loyalty">
              <H2 id="integrated-loyalty">Phase 1: Integrated Loyalty (2020–2021)</H2>

              <H3 id="the-initiative">The initiative</H3>
              <P>
                In 2020, I was asked to lead the Product Design team for "Integrated Loyalty"—a multi-year, cross-functional initiative to create a single loyalty program for all four Gap Inc. brands. The program promised:
              </P>
              <UL>
                <li><strong>Unified rewards structure</strong> — Earn and redeem across all four brands with a single account</li>
                <li><strong>Automatic membership</strong> — Join the loyalty program simply by creating an account</li>
                <li><strong>Free shipping benefits</strong> — Unlock perks based on loyalty tier</li>
                <li><strong>Seamless omnichannel</strong> — Same experience in stores and online, across all brands</li>
              </UL>
              <Figure
                src={integratedLoyaltyUmbrellaImg}
                alt="Integrated loyalty program (MTL & Card) under one umbrella with brand expressions and one value prop: Gap, Banana Republic, Old Navy, and Athleta unified via Account Unification (unified identity across MTL, Card, Ecomm; single points bank; streamlined communication; easy enrollment) and New Program Features (on-demand points redemption, recognition and personalization, differentiated shipping promise, branded and cross-brand benefits)."
              />

              <H3 id="my-teams-role">My team's role</H3>
              <P>
                In 2020, my team of three designers owned the end-to-end customer experience across authentication—sign up, sign in, and states for recognized, signed-in, and guest users—as well as the web bag, checkout, profile, and post-purchase touchpoints, including email communications. I was the Sr. Manager for the "Web Buy" team — a team of 3 designers that owned authentication (sign up, sign in, and the various experiences around recognized customers vs. signed-in customers vs. unrecognized "guests"), web bag, checkout, profile, and post-purchase experiences including emails.
              </P>
              <P>
                I led UX design for all non-marketing web experiences within the integrated loyalty initiative across all brands. We owned the end-to-end loyalty experience across the shopping journey, while the App Buy team extended our patterns to mobile. We also partnered closely with the loyalty marketing team to guide content and ensure consistency across touchpoints. I was responsible for making all changes to all of these surfaces needed for the integrated loyalty program. We designed the UX for all of the loyalty program touchpoints a customer would encounter in a standard shopping journey, besides marketing assets for the program. However, we worked closely with the loyalty marketing team to guide the content of those assets.
              </P>
              <H3 id="the-framework">The framework</H3>
              <P>
                I helped define the three workstreams that would guide the UX team's contribution to the integrated loyalty program: Program Foundation; Value Proposition & Omni CX; and Loyalty Self-Service & Account Management.
              </P>
              <Figure
                src={journeyEnrollImg}
                alt="Enroll journey: in-store and online flows from Browse to Welcome Email"
              />
              <Figure
                src={journeyEarnImg}
                alt="Earn journey: in-store and online flows from Browse to Points Available"
              />
              <Figure
                src={journeyRedeemImg}
                alt="Redeem journey: in-store and online flows from Browse to Points Deducted"
              />

              <H3 id="managing-complexity">Managing the complexity</H3>
              <P>
                To reach these goals, we worked through a massive amount of complexity. The challenge required deep cross-functional and cross-brand alignment, because the experience for the first version of the integrated loyalty program was going to be almost identical across brands.
              </P>
              <P>
                The types of customer account states we had to track included: enrollment in Gap Inc. Loyalty or MTL/Encore tiers (Core, Premier, All-Access), credit card holder status (Gap/Barclays/Encore Mastercard for 5x points earning), ecommerce account existence (for login, points accrual across brands, and Loyalty Hub access), and rewards/points balance.
              </P>

              <VideoFigure
                src={firstBigWin2Video}
                ariaLabel="Product gating interaction loop"
              />

              <H3 id="two-gap-inc-firsts">An extra, hard fought win: progressive sign in</H3>
              <P>
                It was also the first time Gap Inc. customers could enter their email address and let us tell them whether they already had an account.
              </P>

              <Figure
                src={twoGapIncFirstsImg}
                alt="Before and after mobile screens showing the progressive sign-in flow: previously a full Create an Account form, now a single email field under One Membership, Four Brands."
              />

              <H3 id="the-launch">Launch & Results</H3>
              <P>Then, in 2021…</P>
              <P>
                <strong>We did it! We launched our new cross-brand, Integrated Loyalty Program.</strong>
              </P>
              <P>
                Ever since then, all customers have been able to use a single account, in stores and online, to access all Gap Inc. loyalty program benefits, all of which apply to all four brands.
              </P>

              <Figure
                src={launchPressReleaseImg}
                alt="Primary source: Gap Inc. press release 'Gap Inc. Announces Launch of New Integrated Rewards Program: One Membership. Four Brands.' (May 26, 2023) highlighting 19 million new customers enrolled in less than 12 months and 37 million combined Cardmembers and Rewards members migrated to the new program."
              />

              <P>
                By 2022, customers had created 19 million new Gap Inc loyalty accounts.
              </P>
              <P>
                Within the first year of launch, the integrated loyalty program drove significant customer growth and adoption across brands.
              </P>
              <P>
                By 2021, Gap Inc. reported enrolling more than 19 million new customers in less than 12 months, with total participation reaching 37 million members across cardholders and rewards users.
              </P>
              <P>
                This level of rapid adoption highlighted the success of creating a unified, cross-brand loyalty experience that simplified engagement and increased participation at scale.
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== The Next Evolution ===================== */}
            <Section id="next-evolution">
              <H2 id="next-evolution">Phase 2: Scalable Brand Expression (2024–2025)</H2>

              <H3 id="phase-2-begins">Loyalty's next challenge</H3>
              <P>
                By 2024, it was time to start on the second phase of the Gap Inc Loyalty program.
              </P>
              <P>Among the opportunities identified for this second phase:</P>
              <Pullquote>
                Retain the simplicity and power of a single, shared loyalty program while also applying brand-specific styling to each customer's loyalty experience?
              </Pullquote>

              
              <P>
                As it turned out, the answer to this How Might We resided in… Technology.
              </P>
              <P>
                This is because, prior to 2024, Gap Inc.'s eCommerce UI was not "headless." In other words, applying a different look & feel to the same underlying experience meant rebuilding that experience four times.
              </P>

              <H3 id="leading-headless-ui">Leading the headless UI migration</H3>
              <P>
                Luckily, later that very same year, Gap Inc. started the process to move our entire web platform to headless UI, using <strong>Next.js and Tailwind</strong>. Soon after, I became the lead of the Product Design team dedicated to this effort.
              </P>

              
              <P>
                Our "Unlocking Momentum" strategy framework focused on three principles: <strong>scaling</strong> across new platforms, markets, and brands; <strong>moving fast</strong> through prototyping and testing; and ensuring <strong>consistency</strong> across platforms, devices, and teams.
              </P>
              <Figure
                src={approachedWork1Img}
                alt="Headless UI infographic: unsustainable variance converges into one shared system, then diverges into expressive, responsible variance across Gap, Athleta, Banana Republic, and Old Navy"
              />
              <P>
                We followed a Converge/Diverge process — Audit, Analyze, Synthesize, Theme — and sequenced component rewrites accordingly. A Figma "Variables" / design token architecture let primitive tokens flow through semantic tokens to component-level tokens, enabling brand theming.
              </P>
              <Figure
                src={approachedWork3Img}
                alt="New foundational PDP buy box template preview across Athleta, Banana Republic, Gap, and Old Navy"
              />

            </Section>

            <SectionDivider />

            {/* ===================== The Payoff: Product Gating ===================== */}
            <Section id="payoff-product-gating">
              

              <H3 id="the-first-big-win">Product Gating</H3>
              <P>
                Soon after the Headless UI PDP was completed, the Gap brand tried product gating for the first time, granting Gap Inc. credit card holders exclusive access to products from the <strong>Gap x Cult Gaia</strong> line.
              </P>
              <Figure
                src={gapCultGaiaNewsroomImg}
                alt="Gap Newsroom feature: Gap and Cult Gaia Collaboration Celebrates the Beauty and Strength of Today's Modern Goddess"
              />
              <P>
                This product gating feature was one of the first experiences build on the headless UI foundation my had spent the past 10 months designing.
              </P>
              <P>
                <strong>This led to the biggest single increase in credit card applications in Gap Inc.'s history.</strong>
              </P>
              <StatBlock value="604%" label="The percentage increase in the number of credit card applications Gap received in one day." />

              <H3 id="built-once-used-by-all">Built once, used by all</H3>
              <P>
                Because Gap used Headless UI to create these 3 new shared components for the product gating experience, it was trivial for the other brands to implement the same program, using their own brand theme.
              </P>
              <KeyInsight color="green" rotate={-3}>
                Build once, theme four times. The platform investment quietly compounded with every brand campaign that followed.
              </KeyInsight>
              <Figure
                src={builtOnce2Img}
                alt="Add to Bag restricted message tile shared component themed across Gap, Old Navy, Banana Republic, and Athleta"
              />
              <H2 id="impact">Impact</H2>
              <StatBlock value="25%" label="The amount of engineering and design time it now takes to propagate a new experience across all four brands, compared to the time it would have taken last year, before we launched Headless UI." />
              <P>
                Given the impact of just one campaign, for one brand, the potential is exponential.
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== Reflections ===================== */}
            <Section id="reflections">
              <H2 id="reflections">Reflections</H2>

              
              <P>
                I'm proudest of how the work compounded. The integrated loyalty launch gave 19 million customers a simpler relationship with our brands, and the headless platform that followed turned every future loyalty improvement into a four-brand win by default. None of that happens without the cross-functional trust my team built over years of unglamorous reconciliation work.
              </P>

              
              <P>
                I'd invest in the design token and theming architecture earlier. We spent years rebuilding the same experiences four times before headless UI made brand-specific theming trivial — and I underestimated how much faster every other initiative would move once that foundation existed.
              </P>
            </Section>
            </PasswordGate>
          </article>
        </div>
      </div>
    </section>
  );
};
