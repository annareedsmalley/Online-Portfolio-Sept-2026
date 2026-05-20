import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ZoomableImage } from "@/components/ZoomableImage";
import { StickyNote } from "@/components/StickyNote";
import { PasswordGate } from "@/components/PasswordGate";
import { PlaceholderVisual } from "@/components/PlaceholderVisual";
import { CASE_STUDY_GATE_STORAGE_KEY } from "@/config/caseStudyGate";
import aiThesis from "@/assets/cs03/ai-thesis.png";
import competitiveAnalysis from "@/assets/cs03/competitive-analysis.png";
import trustFailureModes from "@/assets/cs03/trust-failure-modes.png";
import threeBucketSentiment from "@/assets/cs03/three-bucket-sentiment.png";
import modelConfidenceStates from "@/assets/cs03/model-confidence-states.png";
import keywordCollaboration from "@/assets/cs03/keyword-collaboration.png";
import abResults from "@/assets/cs03/ab-results.png";
import crossBrandScale from "@/assets/cs03/cross-brand-scale.png";
import uiPatternsAiSummary from "@/assets/cs03/ui-patterns-ai-summary.png";
import otherExplorations from "@/assets/cs03/other-explorations.png";
import otherExplorations2 from "@/assets/cs03/other-explorations-2.png";

interface NavSection {
  id: string;
  title: string;
}

interface CaseStudyBodyAIProps {
  studyTitle: string;
}

const sections: NavSection[] = [
  { id: "the-situation", title: "Context" },
  { id: "ai-thesis", title: "The AI thesis I walked in with" },
  { id: "structuring-work", title: "How I structured the team's work" },
  { id: "launch-reframe", title: "The launch and the reframe" },
  { id: "scaling", title: "Scaling across four brands" },
  { id: "lasting-impact", title: "Lasting strategic impact" },
  { id: "reflections", title: "Reflections" },
];

const H2 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2
    id={id}
    className="scroll-mt-28 font-serif text-[28px] leading-[1.15] text-title md:text-[40px] mt-12"
  >
    {children}
  </h2>
);

const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="font-serif text-[22px] leading-[1.25] text-title md:text-[26px] mt-6 mb-2">
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

const Pullquote = ({
  children,
  color = "yellow",
  rotate = -2,
  kicker = "Key Idea",
}: {
  children: ReactNode;
  color?: "yellow" | "pink" | "blue" | "green" | "peach";
  rotate?: number;
  kicker?: string;
}) => (
  <div className="my-6">
    <StickyNote color={color} rotate={rotate} size="lg" className="max-w-[560px]">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
        {kicker}
      </p>
      <p className="mt-3 font-serif text-[20px] leading-[1.35] text-title md:text-[22px]">
        {children}
      </p>
    </StickyNote>
  </div>
);

const ResearchQuote = ({ quote, attribution }: { quote: string; attribution: string }) => (
  <figure className="my-6 border-l-2 border-terracotta pl-6">
    <blockquote className="font-serif text-[20px] italic leading-[1.45] text-title md:text-[22px]">
      "{quote}"
    </blockquote>
    <figcaption
      className="mt-3 font-normal"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "12px",
        color: "#56514D",
      }}
    >
      {attribution}
    </figcaption>
  </figure>
);

const Section = ({ children }: { id?: string; children: ReactNode }) => (
  <Reveal as="section" className="flex scroll-mt-28 flex-col gap-4">
    {children}
  </Reveal>
);

const SectionDivider = () => null;

export const CaseStudyBodyAI = ({ studyTitle }: CaseStudyBodyAIProps) => {
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
    const retry = count < sections.length ? window.setTimeout(() => attach(), 100) : undefined;
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
                                const y = el.getBoundingClientRect().top + window.scrollY - 80;
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
          <article className="flex min-w-0 flex-col gap-0 [&_section:first-of-type_h2]:mt-0">
            <PasswordGate>

            {/* ===================== The Situation ===================== */}
            <Section id="the-situation">
              <H2 id="the-situation">Context</H2>
              <P>
                Every retailer in 2024 was racing to put Generative AI in front of customers. Inside Gap Inc., I was part of the cross-functional leadership group of product managers, engineers, and UX leaders who had originally proposed using AI to generate review summaries and highlights for customers. So this was a project I had helped seed long before the brief landed on my team.
              </P>
              <P>
                Executive leadership came to us with a brief that was deliberately open: <strong>pilot an AI-generated review summary on the PDP, with any brand that was interested, and see if we could make it succeed</strong>. The technology already existed internally. SCOUT is an LLM-based tool that classifies sentiment, extracts key phrases, identifies recurring themes across thousands of reviews, and generates a concise summary of customer opinions. The ask was: put a UI on it, ship it, and learn.
              </P>
              <P>
                My team owned the PDP across all four brands, which meant any customer-facing AI on a PDP would route through us. There was a precedent worth noting here. <strong>A separate UX team dedicated to strategic initiatives for Athleta had recently tried and failed to launch an Athleta AI fashion assistant chatbot.</strong> Leadership made the deliberate choice not to give that team the AI review summaries work, even though Athleta was one of the brands most interested in the feature. This work landed on my team instead.
              </P>
              <H3>My read on the situation</H3>
              <P>
                When the brief came in, my first thought was that we were not being asked to ship a feature. We were being asked to set a precedent. This was going to be the first time a Gap Inc. customer would knowingly interact with AI on our site, and whatever pattern we established here would set the bar, both internally and externally, for every AI experience that came after.
              </P>
              <P>
                That changed the stakes. If this feature shipped and customers found it slick but untrustworthy, we would not just lose the feature. We would poison the well for AI at Gap Inc. for years. Customers would associate "Gap Inc. AI" with the same vague unease they already felt about AI in general. And the next team trying to ship an AI feature would have to overcome that gravity.
              </P>
              <P>
                There was also a familiar reflex I needed to dispel early. Similar to the assumption that nearly derailed the multivariant PDP project, there was a "this will be easy, let's just copy Amazon" notion floating around the room. By this point I had seen, more than once, what happened when product managers, engineers, and brand leaders assumed that copying Amazon would work for our customers. I knew it would not.
              </P>
              <P>
                My job was to help leadership understand that this feature would create our customers' first impression of how Gap Inc. brands deploy AI, which made rigorous UX research around customer feelings about AI, trust, and transparency in product reviews more important than ever. We invested heavily in that research, running a foundational exploratory study in March 2024 followed by design testing in July 2024, and those studies became the spine of every design decision that followed.
              </P>
              <Pullquote color="yellow" rotate={-2} kicker="The Stakes">
                We were not being asked to ship a feature. We were being asked to set a precedent.
              </Pullquote>

              <H3>Deciding to say yes</H3>
              <P>
                My team had a full roadmap. <strong>Saying yes to leading this meant taking on a project where the design problem was downstream of a much bigger problem about how Gap Inc. would think about AI.</strong> That was exactly why I said yes.
              </P>
              <P>
                There was a version of this where the design team showed up after the fact, tidying up the UI on whatever Brand and AI/ML had already built. I have seen that movie before. The design ends up looking right but the experience is wrong, and by the time anyone notices, it is shipping. I wanted us upstream.
              </P>
              <P>
                What I did not want to do was simply add another project to my Sr. Designer's plate. The decision I actually made was to invest more of my own time into supporting her on this project, and on her other projects in parallel, so she had the runway to do this well. When I ran the plan by her, she was enthusiastic. Customer-facing AI was already high on her own list of career goals.
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== AI Thesis & Team ===================== */}
            <Section id="ai-thesis">
              <H2 id="ai-thesis">The AI thesis I walked in with</H2>
              <P>
                Before any design work started, I made sure my team and our cross-functional partners understood the lens I was bringing to this. Six principles, which I came back to again and again as we worked:
              </P>
              <UL>
                <li><strong>Trust before flash.</strong> Not everyone trusts AI by default. Our job was not to show off the model. It was to design something customers would actually want to use, that happened to be AI underneath.</li>
                <li><strong>Transparency about AI is non-negotiable.</strong> Disclosure that AI is involved is both an ethics commitment and a trust commitment. Customers can tell when something has been generated. Pretending otherwise is what triggers the "what are they hiding?" reflex.</li>
                <li><strong>Model confidence is a design constraint.</strong> AI is uneven: confident on some products, weak on others. The UI has to gracefully reflect what the model actually knows, and never pretend to be certain.</li>
                <li><strong>Reframe success metrics.</strong> AI features that help customers make better decisions often do not lift conversion in the short term. They reduce returns, complaints, and support load. We needed to set up the measurement plan to capture the right signal, not the most familiar one.</li>
                <li><strong>Show, don't hide, imperfections.</strong> My research told me that customers are sophisticated readers of reviews. They often actively look for negatives — they use them to test whether a product is right for them. An AI summary that scrubs the negatives reads as marketing copy and erodes trust.</li>
                <li><strong>Build foundationally, not feature-shaped.</strong> Whatever we shipped here had to be designed so the next ten AI features at Gap Inc. could inherit from it: components, sentiment patterns, confidence states, disclosure language. Otherwise we were going to keep paying this design tax forever.</li>
              </UL>
              <ZoomableImage src={aiThesis} alt="AI thesis framework graphic: six principles — Trust before flash; Transparency about AI is non-negotiable; Model confidence is a design constraint; Reframe success metrics; Show, don't hide, imperfections; Build foundationally, not feature-shaped — arranged in a two-row grid." className="overflow-hidden w-full h-auto rounded-2xl my-4" />

              <H3>Staffing + Setup for Success</H3>
              <P>
                My next move was to pick a designer. Who I put on a project tells the team and the org what I think the project is.
              </P>
              <P>
                I chose Katie. Her background made her unusually well suited for AI work. She has an MS in Human Factors and is a systems thinker by temperament. She is the kind of designer who treats a UI as the visible surface of a much larger machine. That mental model is exactly what an AI feature requires. Most designers treat an AI feature as a UI problem; Katie treats it as a system problem with a UI on top.
              </P>
              <P>
                She was also an experienced native app designer when she joined my team. That meant much more of her career had been spent designing for small screens than the rest of my team, who all had experience designing for desktop as well. Mobile is where most of our customers shop, and the constraint of a small screen is where AI either earns its keep or wastes the customer's time. Katie brought the right instincts for that constraint.
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== Structuring the Work ===================== */}
            <Section id="structuring-work">
              <P>Once Katie was on the project, my role was to set the conditions for her to do her best work. </P>
              <P>
                What I did was bridge. Katie was new to Gap Inc., and she had a lot on her plate already, which meant she had not yet built the relationships across Brand, Product, and UX leadership that I had spent years developing. I used those relationships to make her path easier. I made sure she walked into rooms that were already warmed up to her, I translated the political subtext when she needed it, and I backed her up when a stakeholder pushed back on a recommendation we knew was right.
              </P>
              <H2 id="structuring-work">How I structured the team's work</H2>

              <P>
                The brief came in as "pilot an AI-generated review summary." <strong>Katie's first job was to refuse that framing politely, and to back up to the underlying question: what are customers actually trying to do when they read reviews, and why might an AI summary fail them?</strong>
              </P>
              <P>
                What she found, working with UXR and looking at our existing review data, reframed the project. Customers who engage with reviews are 10% more likely to convert. But on PDPs with thousands of reviews, decision fatigue causes drop-off. Customers want a synthesis. The question was not whether AI summarization was useful. It clearly was. The question was whether customers would trust an AI to do that synthesis honestly.
              </P>
              <P>
                The answer from the research was a flashing yellow light: customers do not trust AI to be neutral. They assume the company is hiding something, they suspect the AI is biased toward selling, and they second-guess any purchase decision an AI nudged them toward. This was the design problem under the design problem.
              </P>
              <Pullquote color="pink" rotate={2} kicker="The real question">
                Customers want a synthesis. The question was whether they would trust an AI to do that synthesis honestly.
              </Pullquote>

              <H3>Discovery</H3>
              <P>
                Working closely with our UXR team, Katie's next step was looking at how other retailers were handling their AI review summaries, including Amazon, Target, NewEgg, and Expedia. The point was not to copy patterns. The point was to find the place where every existing implementation was thin: trust. Most existing AI review experiences felt either too cheerful (Amazon's summaries that read like marketing copy) or too confusing (color systems and iconography that customers could not parse). The gap in the market was an AI summary that was honest about a product's limitations.
              </P>
              <figure className="my-4">
                <ZoomableImage src={competitiveAnalysis} alt="Competitive analysis grid: the four reference retailers (Amazon, Target, NewEgg, Expedia) with annotated callouts on what each got right and where the trust gap lived." className="overflow-hidden w-full h-auto rounded-2xl" />
                <figcaption
                  className="mt-3 font-normal"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "#56514D" }}
                >
                  March 2024 GenAI Reviews Summary UXR report
                </figcaption>
              </figure>

              <P>
                We ran a phased UXR program over the project. The discovery phase confirmed what we suspected: customers actively look for negative reviews. They use them to test whether a product is right for them. They distrust unalloyed praise. They distrust AI. They want to see how a product fails before they trust it to succeed.
              </P>
              <ResearchQuote
                quote="I feel like this brand really is being transparent. I don't get the feeling they're only publishing certain reviews, but that they're literally taking customers' voices and putting it here."
                attribution="UX Research participant, Discovery research — the kind of customer reaction we were designing for."
              />
              <ZoomableImage src={trustFailureModes} alt="Discovery research findings card titled Trust Failure Modes: 1) Assume the company is hiding something, 2) Distrust AI as biased toward selling, 3) Second-guess any AI-influenced purchase decision." className="overflow-hidden w-full h-auto rounded-2xl my-4" />
            </Section>

            <SectionDivider />

            {/* ===================== Strategic Bets ===================== */}
            <Section id="strategic-bets">
              <H3>Design</H3>
              <P>
                Once we understood the trust problem, Katie and I aligned on five calls about what the design had to do, before exploring individual UI patterns. Each of these was a leadership decision more than a design decision — the kind of call where you have to hold the line through pushback from people who would rather not be there.
              </P>

              <H3>Bet 1: show negative sentiment, don't hide it</H3>
              <P>
                The instinct from Brand was understandable: an AI summary that says "customers found this product runs small" or "the fabric pills" sounds like negative marketing copy. The instinct from craft was to soften it, smooth it, surface it in the lightest possible way.
              </P>
              <P>
                Katie and I held the opposite line. The whole point of the feature was to build trust, and the research was emphatic that customers earn their trust by seeing what is wrong with a product, not by seeing what is right. We were going to surface negatives clearly, in a dedicated bucket, with the same visual weight as the positives.
              </P>
              <P>
                Old Navy pushed back hardest. They were worried that letting customers easily identify what other customers disliked about their products would reflect negatively on customers' impressions of brand quality. Rather than override them, we offered a path: a feature flag that would let them turn off the bucketed keyword display and show only the text AI summary, for all products. They took the offer and launched without the buckets. Their return rate did not go down as much as the brands that showed both the attribute buckets and the AI text summary. After seeing the data, Old Navy turned the buckets back on.
              </P>
              <P>
                We made one further accommodation. For any product where the only attributes the model surfaced were negative, with no trending mixed or positive attributes, we gave brands the option to hide the buckets for that specific product and show only the text summary. It was a way to respect each brand's concern about how their own products were represented on their own site, without compromising the trust architecture for the products where the model could actually paint a balanced picture.
              </P>
              <ResearchQuote
                quote="I'd want to still see the Dislikes [bucket] because if I went to another product that had Dislikes and then I go to this one and it's not there, then it's like 'are dislikes so bad they're hiding it from me?'"
                attribution="UX Research participant. The customer logic behind keeping the Dislikes bucket visible even when empty. UXR also found that keeping the Dislikes bucket and showing 'No Trending Dislikes' was interpreted as the brand maintaining integrity for their customers' product experience. And most participants perceived Mixed Reviews as a credibility signal: a brand willing to acknowledge mixed feedback was a brand they trusted more."
              />

              <H3>Bet 2: add an AI disclaimer</H3>
              <P>
                Most teams shipping AI features hide the AI. They roll out a feature labeled "summary" or "highlights" and let customers infer what is going on. We did the opposite: told the customer this is AI, labeled the section, and used a disclaimer to acknowledge the model's limits. This is the trust-first thesis expressed in copy rather than in structure, and it drew almost no pushback, which was itself a signal that the org was further along than I had expected on the ethics of AI disclosure.
              </P>
              <figure className="my-4">
                <ZoomableImage src={otherExplorations2} alt="Other explorations board showing alternative AI review summary layouts including outlined keyword pills, attribute-icon groupings with color-coded sentiment, and ratings-at-a-glance bar score variants." className="overflow-hidden w-full h-auto rounded-2xl" />
              </figure>

              <H3>Bet 3: use a 3-bucket sentiment system</H3>
              <P>
                Katie explored multiple ways to surface sentiment: a single paragraph summary, a list of keywords, color-coded attributes, the works. Through UXR (the July 2024 design testing study), Design 1 emerged as the strongest: a 3-bucket system that separates what customers liked, what they had mixed feelings about, and what they disliked. The 3-bucket system did the most important thing the feature could do: it formally acknowledged that there are negatives, while still summarizing them concisely.
              </P>
              <P>
                I pushed for this pattern over the simpler alternatives because it carried the trust philosophy in its structure, not just its content. A single summary can be edited to feel positive. A "likes / dislikes" binary feels combative. The three-bucket structure mirrors how customers actually think (there are things I love, things I am unsure about, and things I worry about), and that mirroring is what makes it land as honest.
              </P>

              <P>
                A feature like this lives or dies on cross-functional execution. The org map for this project was wider than for almost any project I had led: Data Science (running the model), AI/ML Engineering (running the SCOUT pipeline), and Brand Category Merchants across all four brands. There was also much heavier-than usual involvement from Content Strategy (because everything the model output was content the org had not previously generated.
              </P>
              <P>
                While the project was in flight, Katie ran daily working sessions with the central team and weekly sessions with the brands, plus many ad-hoc collaborative working sessions with the content strategist, the brand category merchants, and the product manager.
              </P>
              <figure className="my-4">
                <ZoomableImage src={keywordCollaboration} alt="Cross-functional collaboration artifact: a working session where Content Strategy, Data Science, and brand category merchants determined which review keywords mapped to positive, negative, or mixed indicators across the six attributes shown in the bucket display." className="overflow-hidden w-full h-auto rounded-2xl" />
                <figcaption
                  className="mt-3 font-normal"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "#56514D" }}
                >
                  Figma — AI Review Summary (node 4578-812)
                </figcaption>
              </figure>
              <H3>Bet 4: make the AI summary scannable</H3>
              <P>
                My fifth call was one I had to make repeatedly, and one that did not come from the designer or the content strategist. I pushed for using GenAI not only to produce the text summary and the attribute table, but also to bold a few key words inside the text summary, making it even more scannable. This was not something most of our competitors were doing.
              </P>
              <P>
                The instinct behind it came from a neuroinclusive lens. Visual text scannability is a strong UX principle for everyone, but it is crucial for many folks with dyslexia, ADHD, autism, and other cognitive and reading differences. Designing for that need also tends to make text easier for everyone.
              </P>
              <P>
                There was pushback from Banana Republic and Gap on the concept. The implementation for the Gap brand ended up not including bolding for a different reason: the Gap brand design system only contains one font weight, so bolding was technically not possible in that theme. That accident gave us a natural comparison point. Across the brands that did include bolding, the feature reduced returns more. Once that data was shared with Banana Republic, they were swayed. Today, every Gap Inc. brand except Gap itself uses the bolded-keywords treatment.
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== Cross-Functional Execution ===================== */}
            {/* ===================== Launch & Reframe ===================== */}
            <Section id="launch-reframe">
              <figure className="my-4">
                <ZoomableImage src={uiPatternsAiSummary} alt="Annotated UI patterns for the AI Summary feature: title, three keyword buckets (Likes, Mixed Reviews, Dislikes) with one line and 2–4 keywords each, a 2–3 sentence review summary capped at 350 characters with one bolded phrase per line, and an AI disclaimer." className="overflow-hidden w-full h-auto rounded-2xl" />
                <figcaption
                  className="mt-3 font-normal"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "#56514D" }}
                >
                  UI patterns and content rules for the GenAI Review Summary.
                </figcaption>
              </figure>
              <H3>Bet 5: design for model confidence, not against it</H3>
              <P>
                The most consequential AI thinking we did on this project was designing the UI around what the model actually knew, not around what we wished it knew. AI confidence is uneven. Some products have thousands of reviews and the model is highly confident. Some have a hundred reviews split across mixed sentiment and the model is much less confident about negatives in particular. Some products have a clear pattern of negative sentiment and the model is highly confident there is a problem.
              </P>
              <P>
                Katie designed three states for the UI to handle this gracefully: full confidence across all keyword buckets, limited negative confidence (where positives surface clearly but negatives are presented more softly), and high negative confidence (where the negative pattern surfaces clearly, because hiding a real signal is worse than showing it).
              </P>
              <P>
                This is the part of the design I am most proud of from an AI standpoint. Most teams ship a single UI and let the model fight with it. We designed a UI that responds to the model. That is what AI-aware design means in practice, and it is the thing that should make any future AI work at Gap Inc. cheaper to ship.
              </P>
              <figure className="my-4">
                <ZoomableImage src={modelConfidenceStates} alt="Model-confidence states diagram showing three UI variants side by side: Full Confidence (Likes, Mixed Reviews, and Dislikes buckets all populated), Limited Negatives (Dislikes shows 'No Trending Dislikes'), and High Negative Signal (review summary only, no buckets), with annotations explaining how layout, language, and emphasis shift with model confidence." className="overflow-hidden w-full h-auto rounded-2xl" />
                <figcaption
                  className="mt-3 font-normal"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "#56514D" }}
                >
                  Figma — AI Review Summary (nodes 4070-705 and 4087-2105)
                </figcaption>
              </figure>
              <H2 id="launch-reframe">The launch and the reframe</H2>
              <P>
                We launched on Athleta and Old Navy in early 2025. The A/B test was set up to measure conversion, add-to-bag, and return rates.
              </P>
              <P>
                When the results came back, conversion was up 0.7%. Add-to-bag was up by a similar amount. By the standards most AI feature launches are evaluated against, that is essentially flat. Most teams in our position would have called it a wash, asked for more time to optimize, or quietly let the feature slide.
              </P>
              <P>
                The data we had been waiting for was not in the conversion column. It was in the returns column. Returns were down 0.9%, which on the volume Old Navy and Athleta were doing translated to roughly $2.5M in annualized value, with Athleta alone projected at ~$4.4M in returns revenue value for 2025.
              </P>
              <P>
                Reducing returns was already a top Gap Inc. priority before this project. Online return rate had been a persistent and expensive problem, and the company had attempted to bring it down through multiple prior initiatives, including different approaches to fit finders, product descriptions, and model photography. None of those had moved the number meaningfully. This was the first thing that did.
              </P>
              <P>
                That was the case I made to leadership, and the case is durable on three counts. First, reducing returns saves the company a substantial amount of money. Second, reducing returns is a major sustainability win: every avoided return is avoided waste, energy, water, and the broader environmental cost of producing and re-shipping apparel. And third, return rate is an indirect but tangible measure of whether customers got what they wanted from us. Lower returns means more customers buying things they want to keep. That is what an e-commerce experience is supposed to do.
              </P>
              <Pullquote color="green" rotate={-3} kicker="The Reframe">
                The feature was working. It was just working on a different axis than we had initially measured.
              </Pullquote>
              <ZoomableImage src={abResults} alt="A/B results panel: 'What we expected to move' shows conversion rate +0.7% and add-to-bag +0.7% (essentially flat); 'What actually moved' shows return rate -0.9% (significant reduction), $2.5M annualized value across Athleta and Old Navy, and $4.4M projected returns value at Athleta." className="overflow-hidden w-full h-auto rounded-2xl my-4" />
            </Section>

            <SectionDivider />

            {/* ===================== Scaling ===================== */}
            <Section id="scaling">
              <H2 id="scaling">Scaling across four brands</H2>
              <P>
                Once we had the trust and returns story validated at Old Navy and Athleta, the next problem was scale. Four brands, each with its own visual identity, its own merchandising priorities, and its own opinions about what AI should and should not say to its customers.
              </P>
              <P>
                I had been here before. The lesson from the Headless UI migration was that the only way to scale across four brands without burning out is to build the underlying experience as a foundational design system component, with brand expression layered on top through theming. We treated the GenAI Review Summary the same way. The trust patterns (the buckets, the disclaimer, the model-confidence states) were locked at the foundational layer, and the brand styling lived on top.
              </P>
              <P>
                That gave each brand the room to feel like itself without putting the trust architecture up for renegotiation. Brands could choose how to theme the component. They could choose, in narrow cases, to suppress the buckets for a specific product or to opt out of bolded keywords. What they could not choose was whether to disclose the AI or whether to acknowledge negatives at all. Those defaults held, and the data on returns and trust held with them.
              </P>
              <ZoomableImage src={crossBrandScale} alt="Cross-brand scale visual: the GenAI Review Summary applied across Old Navy, Gap, Banana Republic, and Athleta product pages, showing a consistent trust architecture with brand-specific theming." className="overflow-hidden w-full h-auto rounded-2xl my-4" />
            </Section>

            <SectionDivider />

            {/* ===================== Lasting Strategic Impact ===================== */}
            <Section id="lasting-impact">
              <H2 id="lasting-impact">Lasting strategic impact</H2>
              <P>
                What I am most proud of from this project is not the feature itself, although the business value speaks for itself. What I am most proud of is what the feature seeded.
              </P>
              <P>
                The success of this work contributed directly to the creation of Gap Inc.'s dedicated Office of AI, a function that exists, in part, because we proved out a way for AI to ship to customers responsibly and successfully. The patterns we established here (transparency, AI disclaimers, model-confidence-aware UI, sentiment buckets, returns as a leading trust signal) became the company's working reference for how AI features get built.
              </P>
              <Pullquote color="blue" rotate={2} kicker="The Compounding Effect">
                That is what foundational work is supposed to do. One project pays for the next ten.
              </Pullquote>

              <H3>The AI principles this work established</H3>
              <P>
                If a hiring manager wants to know how I think about AI, this is the shortest version. These are the principles I walked into this project with, and that this project then validated in production.
              </P>
              <UL>
                <li><strong>Trust before flash.</strong> The first job of customer-facing AI is to be trusted. Capability is wasted without it.</li>
                <li><strong>Transparency about AI is non-negotiable.</strong> Disclosure is both an ethics commitment and a trust commitment.</li>
                <li><strong>Show, don't hide, imperfections.</strong> Negatives, disclaimers, and acknowledgements of uncertainty are trust-building, not trust-eroding.</li>
                <li><strong>Design around model confidence.</strong> The UI should reflect what the model knows, not pretend to be certain.</li>
                <li><strong>Reframe success metrics.</strong> AI features that help customers decide better often show up in returns, satisfaction, and support load, not in conversion. Set up the measurement plan accordingly.</li>
                <li><strong>Build foundationally.</strong> The first AI feature should be designed so the next ten can inherit from it. Otherwise the design tax compounds.</li>
              </UL>
            </Section>

            <SectionDivider />

            {/* ===================== Reflections ===================== */}
            <Section id="reflections">
              <H2 id="reflections">Reflections</H2>

              <H3>What I'm proud of</H3>
              <UL>
                <li>Reframing the success conversation when conversion came back flat and returns came back down. That moment, more than any individual design decision, is what made this project a foundation rather than a one-off.</li>
                <li>Holding the line on trust architecture (especially the negatives, the disclaimer, and the model-confidence states) through the inevitable pressure to make the feature feel "more positive" or "more confident" than the underlying data justified.</li>
                <li>The bolded-keywords idea, which originated from me rather than from the designer or content strategist, and which the natural Gap-can't-bold experiment later validated. It is the smallest design decision I am most proud of, in part because it came from a neuroinclusive instinct that turned out to help everyone.</li>
                <li>A design solution that respected each brand's legitimate fear of presenting their own products poorly, on their own brand website, while holding the line on ethical integrity and customer trust. The brands and the customers both got something they needed.</li>
                <li>Investing in Katie. Putting a senior designer on a project of this profile, then staying out of her way and letting her headline, is the kind of leadership decision I will keep making.</li>
                <li>The challenge was not getting any one of those teams to do their part. The challenge was that none of them had previously worked together at this depth, and two of those teams (Data Science and AI/ML Engineering) had not previously worked closely with the product organization at all. They had a different operating culture: they were used to setting the direction and making the final calls on the things they worked on, rather than having a product manager doing so.</li>
                <li>Our product manager was used to doing so. And the friction surfaced predictably. He asked us to be less supportive of the ideas coming from Data Science and AI/ML, because he felt they were stepping on his toes. We told him what he needed to hear, which was also true: we empathized with him, we supported him, and we would keep him in the loop on every decision. And we kept doing what we had been doing: incorporating all voices and bringing all parties into the working sessions where ideas were shaped. That dual move is how we built trust with both sides at the same time.</li>
              </UL>
            </Section>
            </PasswordGate>
          </article>
        </div>
      </div>
    </section>
  );
};
