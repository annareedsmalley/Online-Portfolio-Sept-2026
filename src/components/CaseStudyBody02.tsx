import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { StickyNote } from "@/components/StickyNote";
import { PasswordGate } from "@/components/PasswordGate";
import { CASE_STUDY_GATE_STORAGE_KEY } from "@/config/caseStudyGate";
import startingPointImg from "@/assets/cs02/starting-point.png";
import theInitiativeImg from "@/assets/cs02/the-initiative.png";
import theFrameworkImg from "@/assets/cs02/the-framework.png";
import managingComplexityImg from "@/assets/cs02/managing-complexity.png";
import managingComplexityGroupedImg from "@/assets/cs02/managing-complexity-grouped.png";
import twoFirstsImg from "@/assets/cs02/two-firsts.png";
import integratedLoyaltyIdentityImg from "@/assets/cs02/integrated-loyalty-identity.png";
import results1Img from "@/assets/cs02/results-1.png";
import results2Img from "@/assets/cs02/results-2.png";
import approachedWork1Img from "@/assets/cs02/approached-work-1.png";
import approachedWork3Img from "@/assets/cs02/approached-work-3.png";
import firstBigWinImg from "@/assets/cs02/first-big-win.png";
import firstBigWin2Video from "@/assets/cs02/first-big-win-2.mov";
import builtOnce1Img from "@/assets/cs02/built-once-1.png";
import builtOnce2Img from "@/assets/cs02/built-once-2.png";
import builtOnce3Img from "@/assets/cs02/built-once-3.gif";
import ourUxTeamsImg from "@/assets/cs02/our-ux-teams.png";
import journeyEnrollImg from "@/assets/cs02/journey-enroll.png";
import journeyEarnImg from "@/assets/cs02/journey-earn.png";
import journeyRedeemImg from "@/assets/cs02/journey-redeem.png";

interface NavSection {
  id: string;
  title: string;
}

const sections: NavSection[] = [
  { id: "leadership-context", title: "Leadership context" },
  { id: "integrated-loyalty", title: "Integrated loyalty" },
  { id: "next-evolution", title: "The next evolution" },
  { id: "payoff-product-gating", title: "The payoff: product gating" },
  { id: "reflections", title: "Reflections" },
];

// ----- Reusable typographic primitives (identical to CS01) -----
const H2 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2
    id={id}
    className="scroll-mt-28 font-serif text-[32px] leading-[1.15] text-title md:text-[40px]"
  >
    {children}
  </h2>
);

const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="font-serif text-[22px] leading-[1.25] text-title md:text-[26px] mt-12 mb-4">
    {children}
  </h3>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="body-text text-[16px] leading-[1.7] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title">
    {children}
  </p>
);

const UL = ({ children }: { children: ReactNode }) => (
  <ul className="body-text flex list-disc flex-col gap-2 pl-6 text-[16px] leading-[1.7] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title">
    {children}
  </ul>
);

const Figure = ({ src, alt, caption, bgColor }: { src: string; alt: string; caption?: string; bgColor?: string }) => (
  <figure className="flex flex-col">
    <div className="rounded-xl overflow-hidden" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <img src={src} alt={alt} className="block h-auto w-full" />
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
  <Reveal as="section" className="flex scroll-mt-28 flex-col gap-6">
    {children}
  </Reveal>
);

const SectionDivider = () => (
  <div className="my-12">
    <hr className="my-0 h-px w-full border-0 bg-border" aria-hidden="true" />
  </div>
);

export const CaseStudyBody02 = () => {
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
      <div className="mx-auto max-w-content px-16 py-24">
        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-16 lg:grid-cols-[35fr_65fr]"
        >
          {unlocked && (
            <aside className="relative">
              <div className="sticky top-28 w-full" style={{ maxWidth: 412 }}>
                <nav
                  aria-label="Case study sections"
                  className="w-full rounded-2xl border border-sand bg-sand/50 p-6"
                  style={{ maxWidth: 412 }}
                >
                  <ul className="flex flex-col gap-1">
                    {sections.map((s) => {
                      const isActive = active === s.id;
                      return (
                        <li key={s.id} className="min-w-0">
                          <a
                            href={`#${s.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const el = document.getElementById(s.id);
                              if (el) {
                                const y = el.getBoundingClientRect().top + window.scrollY - 112;
                                window.scrollTo({ top: y, behavior: "smooth" });
                                history.replaceState(null, "", `#${s.id}`);
                              }
                            }}
                            className={`block rounded-md px-3 py-2 font-sans text-[13px] font-semibold leading-snug tracking-wide transition-colors ${
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
          <article className="flex min-w-0 flex-col gap-0">
            <PasswordGate>

            {/* ===================== Leadership Context ===================== */}
            <Section id="leadership-context">
              <H2 id="leadership-context">Leadership context</H2>

              <H3>The starting point: four brands, one easy checkout</H3>
              <P>
                When I joined Gap Inc. in 2018, the eCommerce platform allowed customers to shop just one of Gap Inc.'s brands, or switch between them. All products a customer added would appear in a shared cart.
              </P>
              <Figure
                src={startingPointImg}
                alt="Brand switcher mobile flow showing Old Navy to Gap to a shared cart"
                caption="Brand switcher: a four-screen mobile flow from Old Navy to brand switcher to Gap to a shared cart."
              />

              <H3>My read on the situation</H3>
              <P>
                The shared checkout was a remarkable feat of platform engineering, but I quickly noticed a gap between what the platform could technically support and what customers actually experienced day to day.
              </P>

              <H3>My scope at Gap, Inc.</H3>
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

              <H3>The problem</H3>
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
              <P><strong>"Where are my rewards? What is going on here?"</strong></P>
            </Section>

            <SectionDivider />

            {/* ===================== Integrated Loyalty ===================== */}
            <Section id="integrated-loyalty">
              <H2 id="integrated-loyalty">Integrated loyalty (2020–2021)</H2>

              <H3>The initiative</H3>
              <P>
                In 2020, my team joined the "Integrated Loyalty" project — a multi-year effort to create a single loyalty program for shoppers of all four Gap Inc. brands. This program promised:
              </P>
              <UL>
                <li><strong>Unified rewards structure for all customers</strong></li>
                <li><strong>Automatic membership with account creation</strong></li>
                <li><strong>Free shipping benefits based on loyalty tier</strong></li>
              </UL>
              <Figure
                src={ourUxTeamsImg}
                alt="Our UX Teams table showing Brand Creative, .Com Browse UX, Native Mobile App, and CMS UX teams with their points of contact and goals"
                caption="Our UX Teams: the cross-functional structure that delivered the Integrated Loyalty program across all four Gap Inc. brands."
              />

              <H3>My team's role</H3>
              <P>
                I was the Sr. Manager for the "Web Buy" team — a team of 3 designers that owned authentication (sign up, sign in, and the various experiences around recognized customers vs. signed-in customers vs. unrecognized "guests"), web bag, checkout, profile, and post-purchase experiences including emails.
              </P>
              <P>
                I was responsible for making all changes to all of these surfaces needed for the integrated loyalty program. We designed the UX for all of the loyalty program touchpoints a customer would encounter in a standard shopping journey, besides marketing assets for the program. However, we worked closely with the loyalty marketing team to guide the content of those assets.
              </P>
              <P>
                We weren't responsible for the app surfaces, but the App Buy UX team followed our lead in terms of the UX we came up with for web.
              </P>

              <H3>The framework</H3>
              <P>
                I helped define the three workstreams that would guide the UX team's contribution to the integrated loyalty program: Program Foundation; Value Proposition & Omni CX; and Loyalty Self-Service & Account Management.
              </P>
              <Figure
                src={theFrameworkImg}
                alt="The Backwards Journey matrix mapping Redeem, Earn, Learn + engage, and Enroll across Ecomm, App, and Store over three sprints"
              />
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

              <H3>Managing the complexity</H3>
              <P>
                To reach these goals, we worked through a massive amount of complexity. The challenge required deep cross-functional and cross-brand alignment, because the experience for the first version of the integrated loyalty program was going to be almost identical across brands.
              </P>
              <P>
                The types of customer account states we had to track included: enrollment in Gap Inc. Loyalty or MTL/Encore tiers (Core, Premier, All-Access), credit card holder status (Gap/Barclays/Encore Mastercard for 5x points earning), ecommerce account existence (for login, points accrual across brands, and Loyalty Hub access), and rewards/points balance.
              </P>
              <Figure
                src={managingComplexityImg}
                alt="Free Shipping Component messaging spreadsheet showing 6 states across loyalty tiers and authentication states"
                caption="One of the many messaging spreadsheets we created to map every possible combination of customer state, loyalty tier, and authentication level."
              />
              <Figure
                src={managingComplexityGroupedImg}
                alt="Sticky notes grouped into themes: Way Finding, Rewards & Points, Discoverability, Loyalty program/Hub, Program Comprehension, Fun & Ease of Use, Tiering, Motivation, Value/Expectations, Customer Control, Communication, Balancing Shopping Task vs Loyalty Task, Hub/Account, Card Acquisition, and Omni/In Store."
              />

              <H3>The hardest part</H3>
              <P>
                The hardest part was mapping all of the existing types of accounts and rewards options and making sure the required account merging experience was smooth for all types of account holders. We had to reconcile what would need to happen to create a simple and graceful transition experience for customers in dozens of different scenarios — e.g. "customer has an ecommerce account only and has some rewards earned through the Old Navy MTL program but also has a separate Athleta loyalty account with a different type of reward."
              </P>

              <H3>The launch</H3>
              <P>Then, in 2021…</P>
              <P>
                <strong>We did it! We launched our new cross-brand, Integrated Loyalty Program.</strong>
              </P>
              <P>
                Ever since then, all customers have been able to use a single account, in stores and online, to access all Gap Inc. loyalty program benefits, all of which apply to all four brands.
              </P>

              <H3>Two Gap Inc. firsts</H3>
              <P>
                This was the first time we offered free shipping benefits to those with loyalty accounts.
              </P>
              <P>
                It was also the first time Gap Inc. customers could enter their email address and let us tell them whether they already had an account.
              </P>
              <Figure
                src={twoFirstsImg}
                alt="Two mobile screens showing the One Membership, Four Brands login flow"
                caption='A single entry point for all four brands: email entry on Gap.com and "Welcome back!" password screen on Old Navy — the UX expression of the unified program.'
              />
              <Figure
                src={integratedLoyaltyIdentityImg}
                alt="Integrated Loyalty framework diagram showing three pillars: Program Foundation (unified identity, single points bank, streamlined communication, easy enrollment), Value Proposition & Omni CX (on-demand redemption, recognition, differentiated shipping, cross-brand benefits), and Loyalty Self-Service & Account Management (self-service empowerment, personalized customer care)."
              />

              <H3>19 million new accounts</H3>
              <P>
                By 2022, customers had created <strong>19 million new Gap Inc loyalty accounts!</strong>
              </P>

              <H3>The results</H3>
              <P>
                Within the first year of launch, the integrated loyalty program drove significant customer growth and adoption across brands.
              </P>
              <P>
                By 2021, Gap Inc. reported enrolling more than 19 million new customers in less than 12 months, with total participation reaching 37 million members across cardholders and rewards users.
              </P>
              <P>As noted in their announcement:</P>
              <Pullquote>
                Since relaunching our loyalty program in the fall of 2020, we have enrolled more than 19 million new customers in less than 12 months… Cardmembers and Rewards members combined are 37 million users.
              </Pullquote>
              <P>
                This level of rapid adoption highlighted the success of creating a unified, cross-brand loyalty experience that simplified engagement and increased participation at scale.
              </P>
              <Figure
                src={results1Img}
                alt="ContactPigeon article 'Gap Marketing Strategy: How the American Clothing Retailer Scaled to Over 3000 Stores' with a pull quote noting Gap enrolled 19 million new customers in less than 12 months and reached 37 million combined Cardmembers and Rewards members."
              />
              <Figure
                src={results2Img}
                alt="Gap Inc. announcement 'Gap Inc. Announces Launch of New Integrated Rewards Program: One Membership. Four Brands.' highlighting 19 million new customers and 37 million combined Cardmembers and Rewards members migrated to the new program."
              />
            </Section>

            <SectionDivider />

            {/* ===================== The Next Evolution ===================== */}
            <Section id="next-evolution">
              <H2 id="next-evolution">The next evolution (2024)</H2>

              <H3>Phase 2 begins</H3>
              <P>
                By 2024, it was time to start on the second phase of the Gap Inc Loyalty program.
              </P>
              <P>Among the opportunities identified for this second phase:</P>
              <Pullquote>
                Retain the simplicity and power of a single, shared loyalty program while also applying brand-specific styling to each customer's loyalty experience?
              </Pullquote>

              <H3>The answer was technology</H3>
              <P>
                As it turned out, the answer to this How Might We resided in… Technology.
              </P>
              <P>
                This is because, prior to 2024, Gap Inc.'s eCommerce UI was not "headless." In other words, applying a different look & feel to the same underlying experience meant rebuilding that experience four times.
              </P>

              <H3>Leading the headless UI migration</H3>
              <P>
                Luckily, later that very same year, Gap Inc. started the process to move our entire web platform to headless UI, using <strong>Next.js and Tailwind</strong>. Soon after, I became the lead of the Product Design team dedicated to this effort.
              </P>

              <H3>How we approached the work</H3>
              <P>
                Our "Unlocking Momentum" strategy framework focused on three principles: <strong>scaling</strong> across new platforms, markets, and brands; <strong>moving fast</strong> through prototyping and testing; and ensuring <strong>consistency</strong> across platforms, devices, and teams.
              </P>
              <P>
                We followed a Converge/Diverge process — Audit, Analyze, Synthesize, Theme — and sequenced component rewrites accordingly. A Figma "Variables" / design token architecture let primitive tokens flow through semantic tokens to component-level tokens, enabling brand theming.
              </P>
              <Figure
                src={approachedWork1Img}
                alt="Illustration of evolved design approach: unsustainable variance converges to a themed foundation, then diverges into responsible, expressive variance"
              />
              <Figure
                src={approachedWork3Img}
                alt="New foundational PDP buy box template preview across Athleta, Banana Republic, Gap, and Old Navy"
              />

              <H3>75% done in 10 months</H3>
              <P>
                10 months later, we're <strong>75% done with this work, including 100% of our PLP and PDP pages.</strong>
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== The Payoff: Product Gating ===================== */}
            <Section id="payoff-product-gating">
              <H2 id="payoff-product-gating">The payoff: product gating (2024–2025)</H2>

              <H3>The first big win</H3>
              <P>
                Soon after the Headless UI PDP was completed, the Gap brand tried product gating for the first time, granting Gap Inc. credit card holders exclusive access to products from the <strong>Gap x Cult Gaia</strong> line.
              </P>
              <P>
                This campaign was only possible because of the platform my team had spent the past 10 months building.
              </P>
              <P>
                <strong>This led to the biggest single increase in credit card applications in Gap Inc.'s history.</strong>
              </P>
              <StatBlock value="604%" label="The percentage increase in the number of credit card applications Gap received in one day." />
              <Figure
                src={firstBigWinImg}
                alt="Gated Experience journey map and product gating screens from Q4 Sprint prototypes"
                caption="The journey map shows our customer-centered methodology — making customers feel special, savvy, valued and seen — alongside product gating screens from the Q4 Sprint prototypes."
              />
              <VideoFigure
                src={firstBigWin2Video}
                ariaLabel="Product gating interaction loop"
              />

              <H3>Built once, used by all</H3>
              <P>
                Because Gap used Headless UI to create these 3 new shared components for the product gating experience, it was trivial for the other brands to implement the same program, using their own brand theme.
              </P>
              <KeyInsight color="green" rotate={-3}>
                Build once, theme four times. The platform investment quietly compounded with every brand campaign that followed.
              </KeyInsight>
              <Figure
                src={builtOnce1Img}
                alt="Added to bag shared component themed across Old Navy, Gap, Banana Republic, and Athleta"
              />
              <Figure
                src={builtOnce2Img}
                alt="Add to Bag restricted message tile shared component themed across Gap, Old Navy, Banana Republic, and Athleta"
              />
              <Figure
                src={builtOnce3Img}
                alt="Bag screen shared component themed across Old Navy, Gap, Banana Republic, and Athleta"
              />

              <H3>The efficiency gain</H3>
              <StatBlock value="25%" label="The amount of engineering and design time it now takes to propagate a new experience across all four brands, compared to the time it would have taken last year, before we launched Headless UI." />
              <P>
                Given the impact of just one campaign, for one brand, the potential is exponential.
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== Reflections ===================== */}
            <Section id="reflections">
              <H2 id="reflections">Reflections</H2>

              <H3>What I'm most proud of</H3>
              <P>
                I'm proudest of how the work compounded. The integrated loyalty launch gave 19 million customers a simpler relationship with our brands, and the headless platform that followed turned every future loyalty improvement into a four-brand win by default. None of that happens without the cross-functional trust my team built over years of unglamorous reconciliation work.
              </P>

              <H3>What I would do differently</H3>
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
