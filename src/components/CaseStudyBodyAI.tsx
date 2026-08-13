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
import otherExplorations3 from "@/assets/cs03/other-explorations-3.png";


interface NavSection {
  id: string;
  title: string;
}

interface CaseStudyBodyAIProps {
  studyTitle: string;
}

const sections: NavSection[] = [
  { id: "the-situation", title: "Context & Objectives" },
  { id: "ai-thesis", title: "Setup for Success" },
  { id: "structuring-work", title: "Design Work" },
  { id: "launch-reframe", title: "Launch & Results" },
  { id: "lasting-impact", title: "Lasting Strategic Impact" },
  { id: "reflections", title: "Reflections" },
];

const H2 = ({ id, children }: { id?: string; children: ReactNode }) => (
  <h2
    id={id}
    className="scroll-mt-28 font-serif text-[28px] leading-[1.15] text-title md:text-[40px] mt-10 -mb-1"
  >
    {children}
  </h2>
);

const H3 = ({ id, children }: { id?: string; children: ReactNode }) => (
  <h3 className="font-serif text-[22px] leading-[1.25] text-title md:text-[26px] mt-7 -mb-1">
    {children}
  </h3>
);

const H4 = ({ id, children }: { id?: string; children: ReactNode }) => (
  <h4 className="font-serif text-[18px] leading-[1.3] text-title md:text-[20px] mt-5 -mb-1">
    {children}
  </h4>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="body-text text-[16px] leading-[1.5] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title">
    {children}
  </p>
);

const UL = ({ children }: { children: ReactNode }) => (
  <ul className="body-text flex list-disc flex-col pl-6 text-[16px] leading-[1.4] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title">
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
  color?: "yellow" | "pink" | "blue" | "green" | "peach" | "sage" | "beige" | "blush";
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
        fontFamily: "'Inter', sans-serif",
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
          className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr] md:gap-16"
        >
          {/* LEFT: sticky table of contents */}
          <aside className="hidden md:block">
            <nav className="sticky top-28 flex flex-col gap-4">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-left font-serif text-[20px] leading-[1.2] text-title transition-colors hover:text-terracotta"
              >
                Designing trust into <strong className="font-semibold">Gap Inc.'s first customer-facing AI feature</strong>
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

            {/* ===================== The Situation ===================== */}
            <Section id="the-situation">
              <H2 id="the-situation">Context & Objectives</H2>
              <P>
                Every retailer in early 2024 was racing to put Generative AI in front of customers. Inside Gap Inc., I was part of the cross-functional leadership group of PMs, engineers, and UX leaders who proposed using <strong>AI to generate summaries of product reviews</strong> for customers.
              </P>
              <P>
                Later in 2024, executive leadership drafted a deliberately open brief: <strong>pilot an AI-generated review summary on the PDP, with any brand</strong> that was interested, and see if we could make it succeed. The underlying tech already existed internally — SCOUT, an LLM-based tool that:
              </P>
              <ul className="body-text flex list-disc flex-col pl-6 text-[16px] leading-[1.4] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title">
                <li>Classifies sentiment across thousands of reviews</li>
                <li>Extracts key phrases and recurring themes</li>
                <li>Generates a concise summary of customer opinions</li>
              </ul>
              <P>
                The ask was simple: <strong>put a UI on it, ship it, and learn.</strong>
              </P>
              <P>
                Athleta quickly emerged as the brand most interested. Leadership could have handed this to Athleta's dedicated strategic initiatives design team — but that team had recently tried and failed to launch an Athleta AI fashion assistant chatbot. <strong>As a result, I was asked if my team could do it.</strong>
              </P>
              <H3>My read</H3>
              <P>
                My first thought when the brief came in: <strong>we were not being asked to ship a feature. We were being asked to set a precedent.</strong> This would be the first time a Gap Inc. customer knowingly interacted with AI on our site, and whatever pattern we established would set the bar — internally and externally — for every AI experience that came after.
              </P>
              <P>That changed the stakes. If this shipped slick but untrustworthy, we wouldn't just lose the feature — we'd <strong>poison the well for AI at Gap Inc. for years</strong>. Every future team would have to overcome that gravity.</P>
              <P>
                I also had to dispel a familiar reflex early: the <strong>"this will be easy, let's just copy Amazon"</strong> notion floating around the room. I'd seen, more than once, what happens when PMs, engineers, and brand leaders assume copying Amazon will work for our customers. It doesn't.
              </P>
              <P>
                My job was to help leadership see that this feature would shape our customers' <strong>first impression of Gap Inc. AI</strong>, making rigorous UX research on trust and transparency more important than ever. We invested heavily:
              </P>
              <ul className="body-text flex list-disc flex-col pl-6 text-[16px] leading-[1.4] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title">
                <li><strong>March 2024</strong> — foundational exploratory study</li>
                <li><strong>July 2024</strong> — design testing</li>
              </ul>
              <P>Those studies became the spine of every design decision that followed.</P>
              <Pullquote color="sage" rotate={-2} kicker="The Stakes">
                We were not being asked to ship a feature. We were being asked to set a precedent.
              </Pullquote>

              <H3>Deciding to say yes</H3>
              <P>
                My team had a full roadmap. However, saying yes meant taking on a project where the design problem was downstream of a much bigger problem: <strong>how Gap Inc. would think about AI.</strong> There's a version of this where design shows up after the fact, tidying up whatever Brand and AI/ML already built. I've seen that movie — the design looks right but the experience is wrong, and by the time anyone notices, it's shipping. <strong>I wanted us upstream.</strong>
              </P>
              <P>
                What I didn't want was to simply add another project to my team's plate. Instead, I considered the fact that one of my Sr. Designers, <strong>Katie</strong>, had already expressed interest in taking on additional work, as long as that work involved AI. I also decided I could <strong>invest more of my own time</strong> supporting her — on this project and her others in parallel — so she had the runway to do it well. When I proposed this plan, she enthusiastically agreed.
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== AI Thesis & Team ===================== */}
            <Section id="ai-thesis">
              <H2 id="ai-thesis">Setup for Success</H2>

              <P>
                As an added bonus to offering this work to Katie, her background made her unusually well suited for customer-facing AI:
              </P>
              <ul className="body-text flex list-disc flex-col pl-6 text-[16px] leading-[1.4] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title">
                <li><strong>She had an MS in Human Factors</strong> and was a systems thinker by temperament.</li>
                <li>She always treated UI as <strong>the visible surface of a larger machine</strong> — exactly the mental model AI requires.</li>
                <li>Most of her career was spent on designing <strong>native apps</strong>. This mattered because mobile is where most of Gap eCommerce customers shop, and small screens is where AI either earns its keep or becomes a costly waste of space.</li>
              </ul>


            </Section>

            <SectionDivider />

            {/* ===================== Structuring the Work ===================== */}
            <Section id="structuring-work">
              <P>
                After bringing Katie in, my number one priority became to act as a <strong>bridge</strong>. Katie was new to Gap Inc. and hadn't yet built the relationships across Brand, Product, and UX leadership that I'd spent years developing. I used those relationships to make her path easier:
              </P>
              <ul className="body-text flex list-disc flex-col pl-6 text-[16px] leading-[1.4] md:text-[17px] [&_strong]:font-semibold [&_strong]:text-title">
                <li>Made sure she <strong>walked into rooms already warmed up</strong> to her.</li>
                <li><strong>Translated the political subtext</strong> when she needed it.</li>
                <li><strong>Backed her up</strong> when stakeholders pushed back on a recommendation we knew was right.</li>
              </ul>

              <P>
                In addition to selecting the right designer, I knew a project like this <strong>lives or dies on cross-functional execution</strong>. The org map for this project was also especially broad: Data Science (running the model), AI/ML Engineering (running the SCOUT pipeline), Brand Category Merchants across all four brands, and our standard cross-functional engineering and product managemen, content strategy and UXR partners.&nbsp;
              </P>
              <P>
                As a result, Katie and I agreed that she would run daily working sessions with the central team and twice-weekly sessions with our brand partners, in addition to as-needed huddles with anyone working on the same problem with us.
              </P>

              <H2 id="structuring-work">The Work</H2>

              <P>
                The brief came in as "pilot an AI-generated review summary." Katie's first job was to <strong>refuse that framing politely</strong>, and to back up to the underlying question: what are customers actually trying to do when they read reviews, and why might an AI summary fail them?
              </P>
              <P>
                What she found, working with UXR and looking at our existing review data, reframed the project. Customers who engage with reviews are <strong>10% more likely to convert</strong>. But on PDPs with thousands of reviews, decision fatigue causes drop-off. Customers want a synthesis. The question was not whether AI summarization was useful. It clearly was. The question was whether customers would <strong>trust an AI to do that synthesis honestly</strong>.
              </P>
              <P>
                The answer from the research was a flashing yellow light: customers do not trust AI to be neutral. They assume the company is hiding something, they suspect the AI is biased toward selling, and they second-guess any purchase decision an AI nudged them toward. This was <strong>the design problem under the design problem</strong>.
              </P>
              <Pullquote color="blush" rotate={2} kicker="The real question">
                Customers want a synthesis. The question was whether they would trust an AI to do that synthesis honestly.
              </Pullquote>

              <H3>Discovery</H3>
              <P>
                Working closely with our UXR team, Katie's next step was looking at how other retailers were handling their AI review summaries, including Amazon, Target, NewEgg, and Expedia. Rather than conduct a heuristic evaluation or standard competitive analysis, we decided to request a <strong>competitive usability test</strong>. I.e., we gave our own customers tasks on the four leading sites offering AI review summaries, and let them tell us <strong>what they thought</strong>.&nbsp;
              </P>

              <figure className="my-4">
                <ZoomableImage src={competitiveAnalysis} alt="Competitive analysis grid: the four reference retailers (Amazon, Target, NewEgg, Expedia) with annotated callouts on what each got right and where the trust gap lived." className="overflow-hidden w-full h-auto rounded-2xl" />
                <figcaption
                  className="mt-3 font-normal"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#56514D" }}
                >
                  March 2024 GenAI Reviews Summary UXR report
                </figcaption>
              </figure>

              <P>
                Among other crucial insights, this research confirmed what we suspected: <strong>customers actively look for negative reviews</strong>. They use them to test whether a product is right for them. They distrust unalloyed praise. They distrust AI. They want to see how a product fails before they trust it to succeed.
              </P>
              <ResearchQuote
                quote="I feel like this brand really is being transparent. I don't get the feeling they're only publishing certain reviews, but that they're literally taking customers' voices and putting it here."
                attribution="UX Research participant, competitive usability test — the kind of customer reaction we hoped to achieve."
              />
              <ZoomableImage src={trustFailureModes} alt="Discovery research findings card titled Trust Failure Modes: 1) Assume the company is hiding something, 2) Distrust AI as biased toward selling, 3) Second-guess any AI-influenced purchase decision." className="overflow-hidden w-full h-auto rounded-2xl my-4" />
            </Section>

            <SectionDivider />

            {/* ===================== Strategic Bets ===================== */}
            <Section id="strategic-bets">
              <H3>Defining Design Leadership Principles</H3>
              <P>
                Once we understood the trust problem, Katie and I aligned on <strong>five principles</strong> about what the design had to do, before exploring individual UI patterns. Once we agreed on their importance,&nbsp;<strong>we used them to guide the cross-functional team</strong>.&nbsp;
              </P>

              <H4>Principle 1: show negative sentiment, don't hide it</H4>
              <P>
                The instinct from Brand was understandable: an AI summary that says "customers found this product runs small" or "the fabric pills" sounds like negative marketing copy. The instinct from craft was to soften it, smooth it, surface it in the lightest possible way.
              </P>
              <P>
                Katie and I held the opposite line. The whole point of the feature was to <strong>build trust</strong>, and the research was emphatic that customers earn their trust by seeing what is wrong with a product, not by seeing what is right. We were going to surface negatives clearly, in a dedicated bucket, with the same visual weight as the positives.
              </P>
              <H4>Principle 2: be transparent about the use of AI</H4>
              <P>
                Most teams shipping AI features hide the AI. They roll out a feature labeled "summary" or "highlights" and let customers infer what is going on. We did the opposite:
              </P>
              <UL>
                <li>Told the customer this is AI.</li>
                <li>Labeled the section clearly.</li>
                <li>Used a disclaimer to acknowledge the model's limits.</li>
              </UL>
              <P>
                This is the <strong>trust-first thesis expressed in copy</strong> rather than in structure, and it drew almost no pushback, which was itself a signal that the org was further along than I had expected on the ethics of AI disclosure.
              </P>

              <H4>Principle 3: go beyond a simple paragraph</H4>
              <P>
                I pushed for this pattern over the simpler alternatives because it carried the <strong>trust philosophy in its structure</strong>, not just its content. A single summary can be edited to feel positive. A "likes / dislikes" binary feels combative. The three-bucket structure mirrors how customers actually think (there are things I love, things I am unsure about, and things I worry about), and that mirroring is what makes it land as honest.
              </P>
              <H4>Principle 4: make the AI summary scannable</H4>
              <P>
                My fifth call was one I had to make repeatedly, and one that did not come from the designer or the content strategist. I pushed for using GenAI not only to produce the text summary and the attribute table, but also to <strong>bold a few key words</strong> inside the text summary, making it even more scannable. This was not something most of our competitors were doing.
              </P>
              <P>
                The instinct behind it came from a <strong>neuroinclusive lens</strong>. Visual text scannability is a strong UX principle for everyone, but it is crucial for many folks with dyslexia, ADHD, autism, and other cognitive and reading differences. Designing for that need also tends to make text easier for everyone.
              </P>
            </Section>

            <SectionDivider />

            {/* ===================== Cross-Functional Execution ===================== */}
            {/* ===================== Launch & Reframe ===================== */}
            <Section id="launch-reframe">
              <H4>Principle 5: design for model confidence, not against it</H4>
              <P>
                The most consequential AI thinking we did on this project was <strong>designing the UI around what the model actually knew</strong>, not around what we wished it knew. AI confidence is uneven. Some products have thousands of reviews and the model is highly confident. Some have a hundred reviews split across mixed sentiment and the model is much less confident about negatives in particular. Some products have a clear pattern of negative sentiment and the model is highly confident there is a problem.
              </P>
              <H3>Design Exploration and UXR</H3>
              <figure className="my-4">
                <ZoomableImage src={keywordCollaboration} alt="Cross-functional collaboration artifact: a working session where Content Strategy, Data Science, and brand category merchants determined which review keywords mapped to positive, negative, or mixed indicators across the six attributes shown in the bucket display." className="overflow-hidden w-full h-auto rounded-2xl" />
                <figcaption
                  className="mt-3 font-normal"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#56514D" }}
                >
                  Attribute mapping worksheet we used to collaborate with our content strategy, data science and brand merchandising partners
                </figcaption>
              </figure>
              <figure className="my-4">
                <ZoomableImage src={otherExplorations3} alt="Early explorations: five card variants of the AI Review Summary showing different ways to surface customer sentiment, including review summary text, keyword pill groups (Likes, Mixed, Dislikes), attribute clusters with counts, and ratings-and-reviews-at-a-glance bar variants." className="overflow-hidden w-full h-auto rounded-2xl" />
                <figcaption
                  className="mt-3 font-normal"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#56514D" }}
                >
                  Early explorations of sentiment surfacing patterns, including exploring different presentations per brand
                </figcaption>
              </figure>
              <H3>Design Delivery</H3>
              <figure className="my-4">
                <ZoomableImage src={uiPatternsAiSummary} alt="Annotated UI patterns for the AI Summary feature: title, three keyword buckets (Likes, Mixed Reviews, Dislikes) with one line and 2–4 keywords each, a 2–3 sentence review summary capped at 350 characters with one bolded phrase per line, and an AI disclaimer." className="overflow-hidden w-full h-auto rounded-2xl" />
                <figcaption
                  className="mt-3 font-normal"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#56514D" }}
                >
                  UI patterns and content rules for the GenAI Review Summary.
                </figcaption>
              </figure>
              <P>
                Katie explored multiple ways to surface sentiment: a single paragraph summary, a list of keywords, color-coded attributes, the works. Through UXR (the July 2024 design testing study), Design 1 emerged as the strongest: a <strong>3-bucket system</strong> that separates what customers liked, what they had mixed feelings about, and what they disliked. The 3-bucket system did the most important thing the feature could do: it formally acknowledged that there are negatives, while still summarizing them concisely.
              </P>
              <P>
                There was pushback from Banana Republic and Gap on the concept. The implementation for the Gap brand ended up not including bolding for a different reason: the Gap brand design system only contains one font weight, so bolding was technically not possible in that theme. That accident gave us a natural comparison point. Across the brands that did include bolding, <strong>the feature reduced returns more</strong>. Once that data was shared with Banana Republic, they were swayed. Today, every Gap Inc. brand except Gap itself uses the bolded-keywords treatment.
              </P>
              <P>
                Katie designed three states for the UI to handle this gracefully:
              </P>
              <UL>
                <li>Full confidence across all keyword buckets.</li>
                <li>Limited negative confidence, where positives surface clearly but negatives are presented more softly.</li>
                <li>High negative confidence, where the negative pattern surfaces clearly, because hiding a real signal is worse than showing it.</li>
              </UL>
              <P>
                This is the part of the design I am most proud of from an AI standpoint. Most teams ship a single UI and let the model fight with it. We <strong>designed a UI that responds to the model</strong>. That is what AI-aware design means in practice, and it is the thing that should make any future AI work at Gap Inc. cheaper to ship.
              </P>
              <ResearchQuote
                quote="I'd want to still see the Dislikes [bucket] because if I went to another product that had Dislikes and then I go to this one and it's not there, then it's like 'are dislikes so bad they're hiding it from me?'"
                attribution="UX Research participant. The customer logic behind keeping the Dislikes bucket visible even when empty. UXR also found that keeping the Dislikes bucket and showing 'No Trending Dislikes' was interpreted as the brand maintaining integrity for their customers' product experience. And most participants perceived Mixed Reviews as a credibility signal: a brand willing to acknowledge mixed feedback was a brand they trusted more."
              />
              <figure className="my-4">
                <ZoomableImage src={modelConfidenceStates} alt="Model-confidence states diagram showing three UI variants side by side: Full Confidence (Likes, Mixed Reviews, and Dislikes buckets all populated), Limited Negatives (Dislikes shows 'No Trending Dislikes'), and High Negative Signal (review summary only, no buckets), with annotations explaining how layout, language, and emphasis shift with model confidence." className="overflow-hidden w-full h-auto rounded-2xl" />
                <figcaption
                  className="mt-3 font-normal"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#56514D" }}
                >
                  The flexible component accounted for model confidence, customer trust and brand reputation concerns.
                </figcaption>
              </figure>
              <P>
                Old Navy pushed back hardest. They were worried that letting customers easily identify what other customers disliked about their products would reflect negatively on customers' impressions of brand quality. Rather than override them, we offered a path: a feature flag that would let them turn off the bucketed keyword display and show only the text AI summary, for all products. They took the offer and launched without the buckets. Their return rate did not go down as much as the brands that showed both the attribute buckets and the AI text summary. <strong>After seeing the data, Old Navy turned the buckets back on.</strong>
              </P>
              <P>
                We made one further accommodation. For any product where the only attributes the model surfaced were negative, with no trending mixed or positive attributes, we gave brands the option to <strong>hide the buckets for that specific product</strong> and show only the text summary. It was a way to respect each brand's concern about how their own products were represented on their own site, without compromising the trust architecture for the products where the model could actually paint a balanced picture.
              </P>
              <H2 id="launch-reframe">Launch & Results</H2>
              <P>
                We launched for Athleta and Old Navy in early 2025. When the <strong>A/B test results</strong> came back, conversion was up 0.7%. Add-to-bag was up by a similar amount. By the standards most AI feature launches are evaluated against, that is <strong>essentially flat</strong>. Instead, it turned out the data we had been waiting for&nbsp;was in <strong>the returns column</strong>. Returns were down 0.9%, which on the volume Old Navy and Athleta were doing translated to <strong>roughly $2.5M in annualized value</strong>, with Athleta alone projected at ~$4.4M in returns revenue value for 2025.
              </P>
              <P>
                Reducing returns was already a top Gap Inc. priority before this project. Online return rate had been a persistent and expensive problem, and the company had attempted to bring it down through multiple prior initiatives, including different approaches to fit finders, product descriptions, and model photography. None of those had moved the number meaningfully. <strong>This was the first thing that did.</strong>
              </P>
              <P>
                That was the case I made to leadership, and the case is durable on three counts. First, reducing returns saves the company a substantial amount of money. Second, reducing returns is a <strong>major sustainability win</strong>: every avoided return is avoided waste, energy, water, and the broader environmental cost of producing and re-shipping apparel. And third, return rate is an indirect but tangible measure of whether customers got what they wanted from us. Lower returns means more customers buying things they want to keep. That is what an e-commerce experience is supposed to do.
              </P>
              <Pullquote color="sage" rotate={-3} kicker="The Reframe">
                The feature was working. It was just working on a different axis than we had initially measured.
              </Pullquote>
              <ZoomableImage src={abResults} alt="A/B results panel: 'What we expected to move' shows conversion rate +0.7% and add-to-bag +0.7% (essentially flat); 'What actually moved' shows return rate -0.9% (significant reduction), $2.5M annualized value across Athleta and Old Navy, and $4.4M projected returns value at Athleta." className="overflow-hidden w-full h-auto rounded-2xl my-4" />
            </Section>

            <SectionDivider />

            {/* ===================== Scaling ===================== */}
            <Section id="scaling">
              <H3 id="scaling">Scaling across four brands</H3>
              <P>
                Once we had the trust and returns story validated at Old Navy and Athleta, the next problem was scale. Four brands, each with its own visual identity, its own merchandising priorities, and its own opinions about what AI should and should not say to its customers.
              </P>
              <P>
                I had been here before. One thing that was clear from my 6+ years of experience at Gap Inc was that the only way to scale across four brands without burning out is to build the underlying experience as a <strong>foundational design system component</strong>, with brand expression layered on top through theming. We treated the GenAI Review Summary the same way. The trust patterns (the buckets, the disclaimer, the model-confidence states) were locked at the foundational layer, and the brand styling lived on top.
              </P>
              <P>
                That gave each brand the room to feel like itself without putting the trust architecture up for renegotiation. Brands could choose how to theme the component. They could choose, in narrow cases, to suppress the buckets for a specific product or to opt out of bolded keywords. What they could not choose was whether to disclose the AI or whether to acknowledge negatives at all. <strong>Those defaults held</strong>, and the data on returns and trust held with them.
              </P>
              <ZoomableImage src={crossBrandScale} alt="Cross-brand scale visual: the GenAI Review Summary applied across Old Navy, Gap, Banana Republic, and Athleta product pages, showing a consistent trust architecture with brand-specific theming." className="overflow-hidden w-full h-auto rounded-2xl my-4" />
            </Section>

            <SectionDivider />

            {/* ===================== Lasting Strategic Impact ===================== */}
            <Section id="lasting-impact">
              <H2 id="lasting-impact">Lasting Strategic Impact</H2>
              <P>
                What I am most proud of from this project is not the feature itself, although the business value speaks for itself. What I am most proud of is <strong>what the feature seeded</strong>.
              </P>
              <P>
                The success of this work contributed directly to the creation of Gap Inc.'s dedicated <strong>Office of AI</strong>, a function that exists, in part, because we proved out a way for AI to ship to customers responsibly and successfully. The patterns we established here (transparency, AI disclaimers, model-confidence-aware UI, sentiment buckets, returns as a leading trust signal) became <strong>the company's working reference for how AI features get built</strong>.
              </P>
              <Pullquote color="blush" rotate={2} kicker="The Compounding Effect">
                That is what foundational work is supposed to do. One project pays for the next ten.
              </Pullquote>

              <H3>The Gen AI principles we established at Gap Inc.</H3>
              <P>
                If someone wanted to know how I think about AI, this is the shortest version. These are the principles I walked into this project with, and that this project then validated in production.
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

              <P>
                Leading this initiative was especially rewarding because it allowed me to align measurable business impact with my personal commitment to sustainability: by significantly reducing returns, we were able to reduce the waste and environmental costs inherent in apparel production.
              </P>

              <P>
                If I could do one thing differently, I would use this project to formalize neuroinclusive scannability as a platform standard. Because the data collected during this project showed that the brand unable to implement the bolding of key words saw smaller reductions in returns, I wish I had proposed that the inclusion of more than one font weight should become an accessibility requirement for all brand themes.
              </P>

              <P>Other points of pride include:</P>

              <div className="mt-6 grid grid-cols-1 items-start justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3">
                <StickyNote color="sage" rotate={-4} size="md" className="w-full max-w-[260px]">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
                    TRUST ARCHITECTURE
                  </p>
                  <p className="mt-2 font-serif text-[15px] leading-snug text-title">
                    Held the line on negatives, disclaimers, and model-confidence states despite pressure to make the feature feel more positive or confident than the underlying data justified.
                  </p>
                </StickyNote>
                <StickyNote color="beige" rotate={3} size="md" className="w-full max-w-[260px]">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
                    BRAND + CUSTOMER ALIGNMENT
                  </p>
                  <p className="mt-2 font-serif text-[15px] leading-snug text-title">
                    Crafted a solution that respected each brand's fear of showing imperfect products while protecting customer trust. Brands and customers both got what they needed.
                  </p>
                </StickyNote>
                <StickyNote color="blush" rotate={-2} size="md" className="w-full max-w-[260px]">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-title/70">
                    CROSS-FUNCTIONAL TRUST
                  </p>
                  <p className="mt-2 font-serif text-[15px] leading-snug text-title">
                    When a PM felt threatened by Data Science and AI/ML voices, we empathized and kept him looped in—while still bringing all parties into the work.
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
