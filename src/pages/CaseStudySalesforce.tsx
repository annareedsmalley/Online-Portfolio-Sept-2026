import { SiteLayout } from "@/components/SiteLayout";
import { Pill } from "@/components/Pill";
import { ImpactItem } from "@/components/ImpactItem";
import { Reveal } from "@/components/Reveal";
import { ArchCaseStudyCard } from "@/components/ArchCaseStudyCard";
import { CtaSection } from "@/components/CtaSection";

import { CaseStudyBody02 } from "@/components/CaseStudyBody02";
import { ArrowLeft, Briefcase, Calendar, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import heroVisual from "@/assets/cs02/hero-timeline.png";
import impactVisual from "@/assets/cs02/impact-at-a-glance.png";
import { caseStudies } from "@/data/caseStudies";

const otherCaseStudies = caseStudies.filter((c) => c.to !== "/work/four-brands-one-membership");

const impacts = [
  {
    label: "19M new loyalty accounts",
    body: "Created after the unified program launched in 2021",
  },
  {
    label: "604% SPIKE IN CREDIT CARD APPLICATIONS",
    body: "From a single product gating campaign enabled by the platform Anna's team built",
  },
  {
    label: "75% OF THE HEADLESS UI MIGRATION COMPLETED IN 10 MONTHS",
    body: "Including 100% of PLP and PDP pages",
  },
  {
    label: "TWO GAP INC. FIRSTS:",
    body: "First free shipping benefit for loyalty members, and first email-based account recognition at login",
  },
  {
    label: "25% OF ENGINEERING AND DESIGN TIME",
    body: "Is all it now takes to propagate a new experience across all four brands, compared to rebuilding it four times",
  },
];

const CaseStudySalesforce = () => {
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
            <h1 className="font-serif text-[38px] leading-[1.1] text-title md:text-[44px] lg:text-[48px]">
              Building a unified membership platform{" "}
              <span className="text-terracotta">
                for four brands at Gap Inc.
              </span>
            </h1>
            <p className="body-text max-w-xl text-base md:text-lg">
              Unlocking Brand Loyalty at Gap Inc.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { icon: Briefcase, label: "Design Leader · Gap Inc." },
                { icon: Calendar, label: "4 Years" },
                { icon: Layers, label: "4 Brands on One Shared Platform" },
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
              alt="Integrated Loyalty across all four Gap Inc. brands"
              width={500}
              height={724}
              className="rounded-2xl shrink-0 object-cover"
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

          <Reveal className="mt-16">
            <p className="body-text mb-6 text-[16px] font-semibold text-title md:text-[17px]">
              During my tenure at Gap, Inc., I focused on each step of the eCommerce shopping journey, for all four brands.
            </p>
            <figure className="flex flex-col">
              <img
                src={impactVisual}
                alt="Built once, themed for all four brands — shared Headless UI components"
                className="block w-full h-auto rounded-xl"
              />
              <figcaption
                className="mt-2 font-normal"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "12px",
                  color: "#56514D",
                  marginTop: "8px",
                }}
              >
                I didn't just work on loyalty in isolation; I touched every part of the journey, which gave me a unique perspective on how loyalty connects to the full shopping experience.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* CASE STUDY BODY */}
      <CaseStudyBody02 />

      {/* OTHER CASE STUDIES */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-24 md:px-16">
          <Reveal>
            <h2 className="mb-10 font-serif text-[36px] text-title md:text-[44px]">
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

      {/* CTA */}
      <CtaSection />
    </SiteLayout>
  );
};

export default CaseStudySalesforce;
