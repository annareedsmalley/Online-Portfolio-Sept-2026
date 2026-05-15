import { SiteLayout } from "@/components/SiteLayout";
import { Pill } from "@/components/Pill";
import { ImpactItem } from "@/components/ImpactItem";
import { Reveal } from "@/components/Reveal";
import { ArchCaseStudyCard } from "@/components/ArchCaseStudyCard";
import { CtaSection } from "@/components/CtaSection";
import { CaseStudyBodyAI } from "@/components/CaseStudyBodyAI";
import { PlaceholderVisual } from "@/components/PlaceholderVisual";
import { ArrowLeft, Briefcase, Calendar, Layers, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";

const otherCaseStudies = caseStudies.filter((c) => c.to !== "/work/ai-reviews");

const impacts = [
  {
    label: "A COMPANY FIRST",
    body: "Shipped Gap Inc.'s first customer-facing Generative AI feature on Athleta and Old Navy in early 2025, with Gap rollout slated based on the success of the launch.",
  },
  {
    label: "$2.5M IN TRUST",
    body: "A 0.9% reduction in returns at Old Navy and Athleta translated to ~$2.5M in annualized value, with Athleta alone projected at ~$4.4M in returns revenue value for 2025.",
  },
  {
    label: "A FOUNDATION, NOT A FEATURE",
    body: "Patterns established (transparency, AI disclaimers, model-confidence-aware UI, sentiment buckets) became the company standard for shipping customer-facing AI.",
  },
  {
    label: "THE OFFICE OF AI",
    body: "The success of this work contributed to the creation of Gap Inc.'s dedicated Office of AI, formalizing AI as a strategic capability.",
  },
  {
    label: "CROSS-FUNCTIONAL ALIGNMENT AT SCALE",
    body: "Coordinated Data Science, AI/ML Engineering, Product, Engineering, UX, UXR, Content Strategy, Brand, and Design Systems around a single customer-facing AI experience.",
  },
  {
    label: "CUSTOMER TRUST, VALIDATED",
    body: "Qualitatively confirmed in moderated UX research, with participants describing the experience as transparent and 'more accurate' than universally positive review summaries elsewhere.",
  },
];

const CaseStudyAIReviews = () => {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="bg-background hero-enter">
        <div className="mx-auto max-w-content px-16 pt-12 md:pt-16">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-wider text-title transition-colors hover:text-terracotta"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to work
          </Link>
        </div>

        <div className="mx-auto grid max-w-content items-center gap-y-12 px-16 pt-10 pb-24 md:grid-cols-[748fr_1fr] md:gap-x-16">
          <div className="flex flex-col gap-7">
            <span className="kicker">Case Study 03</span>
            <h1 className="font-serif text-[42px] leading-[1.1] text-title md:text-[52px] lg:text-[58px]">
              Designing Trust into{" "}
              <span className="text-terracotta">
                Gap Inc.'s First Customer-Facing AI Feature
              </span>
            </h1>
            <p className="body-text max-w-xl text-base md:text-lg">
              The GenAI Review Summary, scaled across all four brands.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { icon: Briefcase, label: "UX Design Manager · Gap Inc." },
                { icon: Calendar, label: "~6 months" },
                { icon: Layers, label: "7 direct reports" },
                { icon: Target, label: "Scope: Gap Inc.'s first customer-facing GenAI feature, scaled across all four brands" },
              ].map((p, i) => (
                <Reveal key={p.label} delay={i * 90}>
                  <Pill icon={p.icon}>{p.label}</Pill>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full md:w-[500px]">
              <PlaceholderVisual
                description="Hero composite: the GenAI Review Summary feature live on Athleta and Old Navy PDPs side by side, with the four brand wordmarks beneath."
                aspect="tall"
              />
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-sand">
        <div className="mx-auto max-w-content px-16 py-24">
          <div className="grid gap-12 md:grid-cols-[max-content_1fr] md:gap-x-10">
            <div>
              <Reveal>
                <h2 className="font-serif text-[36px] text-title md:text-[44px]">
                  Outcomes
                </h2>
              </Reveal>
            </div>
            <div>
              <div className="grid gap-10 sm:grid-cols-2">
                {impacts.map((i, idx) => (
                  <Reveal key={i.label} delay={idx * 90}>
                    <ImpactItem label={i.label} body={i.body} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY BODY */}
      <CaseStudyBodyAI />

      {/* CTA */}
      <CtaSection />

      {/* OTHER CASE STUDIES */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-24 md:px-16">
          <Reveal>
            <h2 className="mb-10 font-serif text-[36px] text-title md:text-[44px]">
              Other Case Studies
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {otherCaseStudies.map((cs, idx) => (
              <Reveal key={cs.to} delay={idx * 100}>
                <ArchCaseStudyCard {...cs} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default CaseStudyAIReviews;
