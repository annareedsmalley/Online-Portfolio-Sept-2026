import { SiteLayout } from "@/components/SiteLayout";
import { Pill } from "@/components/Pill";
import { ImpactItem } from "@/components/ImpactItem";
import { Reveal } from "@/components/Reveal";
import { ArchCaseStudyCard } from "@/components/ArchCaseStudyCard";
import { CaseStudyBodyAI } from "@/components/CaseStudyBodyAI";
import { ArrowLeft, Briefcase, Calendar, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";
import heroVisual from "@/assets/cs03/hero.png";

const otherCaseStudies = caseStudies.filter((c) => c.to !== "/work/designing-trust-into-ai-feature");

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
    label: "TEAM ALIGNMENT AT SCALE",
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
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pt-12 md:px-16 md:pt-16">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-wider text-title transition-colors hover:text-terracotta"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to work
          </Link>
        </div>

        <div className="mx-auto grid max-w-content items-start gap-y-12 px-6 pt-10 pb-24 md:px-16 md:grid-cols-[748fr_1fr] md:gap-x-16">
          <div className="flex flex-col gap-7">
            <Reveal>
              <h1 className="font-serif text-[32px] leading-[1.1] text-title md:text-[44px] lg:text-[48px]">
                Designing trust into{" "}
                <span className="text-terracotta">
                  Gap Inc.'s first customer-facing AI feature
                </span>
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="body-text max-w-xl text-base md:text-lg">
                The GenAI Review Summary, scaled across all four brands.
              </p>
            </Reveal>
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { icon: Briefcase, label: "UX Design Manager · Gap Inc." },
                { icon: Calendar, label: "~6 months" },
                { icon: Layers, label: "7 direct reports" },
              ].map((p, i) => (
                <Reveal key={p.label} delay={160 + i * 90}>
                  <Pill icon={p.icon}>{p.label}</Pill>
                </Reveal>
              ))}
            </div>
            <Reveal delay={240}>
              <p className="max-w-xl text-xs text-body leading-relaxed">
                Cross-functional partners: Data Science, AI/ML Engineering, Product, Platform Engineering, Brand Producers and Category Merchants (×4), UX Research, Content Strategy, Design Systems, UX Leadership
              </p>
            </Reveal>
          </div>

          <div className="flex justify-center md:justify-end">
            <Reveal delay={120}>
              <div className="w-full md:w-[500px]">
                <img
                  src={heroVisual}
                  alt="The GenAI Review Summary feature on Athleta and Old Navy product pages, with the four Gap Inc. brand wordmarks beneath."
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-sand">
        <div className="mx-auto max-w-content px-6 py-24 md:px-16">
          <div className="grid gap-12 md:grid-cols-[max-content_1fr] md:gap-x-10">
            <div>
              <Reveal>
                <h2 className="font-serif text-[32px] text-title md:text-[44px]">
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
      <CaseStudyBodyAI studyTitle="Designing trust into Gap Inc.'s first customer-facing AI feature" />

      {/* OTHER CASE STUDIES */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-24 md:px-16">
          <Reveal>
            <h2 className="mb-10 font-serif text-[32px] text-title md:text-[44px]">
              Other case studies
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
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
