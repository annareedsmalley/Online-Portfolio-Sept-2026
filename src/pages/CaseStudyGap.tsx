import { SiteLayout } from "@/components/SiteLayout";
import { Pill } from "@/components/Pill";
import { ImpactItem } from "@/components/ImpactItem";
import { Reveal } from "@/components/Reveal";
import { ArchCaseStudyCard } from "@/components/ArchCaseStudyCard";
import { CtaSection } from "@/components/CtaSection";

import { CaseStudyBody } from "@/components/CaseStudyBody";
import { ArrowLeft, Briefcase, Building2, Clock, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import heroVisual from "@/assets/case-study-01-hero.png";
import impactVisual from "@/assets/impact-at-a-glance.png";
import { caseStudies } from "@/data/caseStudies";

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
    label: "Reduced design cycle time 40%",
    body: "Stood up a shared component model so teams stopped re-solving the same problems quarter to quarter.",
  },
  {
    label: "Coached 12 senior designers",
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
            <span className="kicker">Case Study 01</span>
            <h1 className="font-serif text-[42px] leading-[1.1] text-title md:text-[52px] lg:text-[58px]">
              Leading a Cross-Brand Product Experience Strategy Through{" "}
              <span className="text-terracotta">Organizational Change at Gap Inc.</span>
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

          <div className="flex justify-center md:justify-end">
            <img
              src={heroVisual}
              alt="Gap Inc. brand portfolio: Gap, Old Navy, Athleta, Banana Republic"
              width={500}
              height={724}
              className="rounded-2xl shrink-0"
              style={{ width: 500, height: 724, flexShrink: 0 }}
            />
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
                  Impact at a Glance
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

          <Reveal className="mt-16">
            <img
              src={impactVisual}
              alt="Athleta, Old Navy, Banana Republic and Gap product screens shown on iPhones"
              className="block w-full h-auto"
            />
          </Reveal>
        </div>
      </section>

      {/* CASE STUDY BODY */}
      <CaseStudyBody />

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

export default CaseStudyGap;
