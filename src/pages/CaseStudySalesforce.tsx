import { SiteLayout } from "@/components/SiteLayout";
import { Pill } from "@/components/Pill";
import { ImpactItem } from "@/components/ImpactItem";
import { Reveal } from "@/components/Reveal";
import { ArchCaseStudyCard } from "@/components/ArchCaseStudyCard";

import { CaseStudyBody02 } from "@/components/CaseStudyBody02";
import { ArrowLeft, Briefcase, Calendar, Layers } from "lucide-react";
import { Link } from "react-router-dom";

import { caseStudies } from "@/data/caseStudies";
import { useSetCaseStudyTitle } from "@/context/CaseStudyTitleContext";

const otherCaseStudies = caseStudies.filter((c) => c.to !== "/work/four-brands-one-membership");

const impacts = [
  {
    label: "19M new loyalty accounts",
    body: "Created after the Integrated Loyalty Initiative launched in 2021",
  },
  {
    label: "604% SPIKE IN CREDIT CARD APPLICATIONS",
    body: "From a single product gating campaign enabled by the platform Anna's team built",
  },
  {
    label: "75% OF THE BRANDABLE FOUNDATION (HEADLESS UI) MIGRATION COMPLETED IN 10 MONTHS",
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
  useSetCaseStudyTitle("Building a unified membership platform");
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

            <h3 className="font-label text-sm font-semibold uppercase tracking-[0.15em] text-terracotta md:text-base">
              Brandable Foundation (Headless UI) & UX Strategy · 2020–2025
            </h3>
            <h1 className="font-serif text-[28px] leading-[1.1] text-title md:text-[44px] lg:text-[48px]">
              Building a unified membership platform{" "}
              <span className="text-terracotta">
                for four brands at Gap Inc.
              </span>
            </h1>
            <p className="body-text max-w-xl text-base md:text-lg">
              Led the design team that unified Gap Inc.'s fragmented loyalty programs across four brands—then led the Brandable Foundation (Headless UI) transformation that unlocked a product gating strategy so successful, the other three brands could replicate it at a fraction of the original effort.
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

        </div>
      </section>

      {/* ROLE / TEAM / TIMELINE */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-12 md:px-16 md:pb-20">
          <Reveal className="mt-12 pt-2">
            <h4 className="font-label text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
              Timeline
            </h4>
            <ol className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-3 md:grid-cols-6 md:gap-y-0">
              {[
                { year: "2018", label: "Joined Gap Inc." },
                { year: "2020", label: "Integrated Loyalty Initiative" },
                { year: "2021", label: "Integrated Loyalty Launch" },
                { year: "2022", label: "19M New Accounts" },
                { year: "2024", label: "Brandable Foundation (Headless UI)" },
                { year: "2025", label: "Product Gating" },
              ].map((m, i, arr) => (
                <li key={m.year} className="relative flex flex-col pl-0 pr-4">
                  <div className="relative mb-4 flex items-center">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-terracotta" />
                    {i < arr.length - 1 ? (
                      <span className="ml-0 h-px flex-1 bg-border" />
                    ) : null}
                  </div>
                  <span className="font-serif text-[24px] text-title md:text-[28px]">
                    {m.year}
                  </span>
                  <span className="body-text mt-1 text-[14px]">{m.label}</span>
                </li>
              ))}
            </ol>
          </Reveal>
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
      <CaseStudyBody02 studyTitle="Building a unified membership platform" />

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

export default CaseStudySalesforce;
