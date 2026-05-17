import { SiteLayout } from "@/components/SiteLayout";
import { Pill } from "@/components/Pill";
import { ImpactItem } from "@/components/ImpactItem";
import { Reveal } from "@/components/Reveal";
import { ArchCaseStudyCard } from "@/components/ArchCaseStudyCard";

import { CaseStudyBody } from "@/components/CaseStudyBody";
import { ArrowLeft, Briefcase, Building2, Clock, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";
import { useSetCaseStudyTitle } from "@/context/CaseStudyTitleContext";

const otherCaseStudies = caseStudies.filter((c) => c.to !== "/work/cross-brand-product-experience");

const impacts = [
  {
    label: "Prevented a $17M launch failure",
    body: "Surfaced a misaligned product assumption before kickoff and re-scoped the rollout plan with execs.",
  },
  {
    label: "Unified 4 brand experiences",
    body: "Established a shared product language across Athleta, Old Navy, Banana Republic, and Gap.",
  },
  {
    label: "WON A PROMOTION FOR A SR. DESIGNER",
    body: "Mentored cross-brand leads through a year of org redesign without losing strategic momentum.",
  },
  {
    label: "Defined a measurable north star",
    body: "Replaced opinion-based reviews with shared, observable success metrics tied to revenue.",
  },
  {
    label: "Built executive design fluency",
    body: "Created a recurring forum where product execs reviewed experience tradeoffs alongside roadmap.",
  },
];

const CaseStudyGap = () => {
  useSetCaseStudyTitle("Leading a cross-brand product experience strategy");
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-content items-start gap-y-6 px-6 pt-6 pb-12 md:grid-cols-[3fr_2fr] md:gap-x-16 md:px-16 md:pt-16 md:pb-24">
          <div className="flex flex-col gap-7 md:col-start-1">
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-wider text-title transition-colors hover:text-terracotta"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to work
            </Link>

            <h1 className="font-serif text-[28px] leading-[1.1] text-title md:text-[44px] lg:text-[48px]">
              Leading a cross-brand product experience strategy through{" "}
              <span className="text-terracotta">organizational change at Gap Inc.</span>
            </h1>
            <p className="body-text max-w-xl text-base md:text-lg">
              How my team turned an under-scoped, politically complex initiative into a validated design framework used across four brands, and prevented a major launch failure along the way.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { icon: Briefcase, label: "Lead UX Strategist" },
                { icon: Building2, label: "Gap Inc." },
                { icon: Layers, label: "4 brand surfaces" },
                { icon: Clock, label: "18 months" },
              ].map((p, i) => (
                <Reveal key={p.label} delay={i * 90}>
                  <Pill icon={p.icon}>{p.label}</Pill>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-sand">
        <div className="mx-auto max-w-content px-6 py-12 md:px-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-[max-content_1fr] md:gap-x-10">
            <div>
              <Reveal>
                <h2 className="font-serif text-[28px] text-title md:text-[44px]">
                  Impact at a glance
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
      <CaseStudyBody studyTitle="Leading a cross-brand product experience strategy" />

      {/* OTHER CASE STUDIES */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-12 md:px-16 md:py-24">
          <Reveal>
            <h2 className="mb-10 font-serif text-[28px] text-title md:text-[44px]">
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

export default CaseStudyGap;
