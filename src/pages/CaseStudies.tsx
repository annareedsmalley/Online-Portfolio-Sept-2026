import { SiteLayout } from "@/components/SiteLayout";
import { ArchCaseStudyCard } from "@/components/ArchCaseStudyCard";
import { Reveal } from "@/components/Reveal";
import { caseStudies } from "@/data/caseStudies";

const CaseStudiesIndex = () => {
  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 md:px-16 md:py-28">
          <span className="kicker">Selected Work</span>
          <h1 className="mt-3 font-serif text-[36px] leading-[1.05] text-title md:text-[64px]">
            Case studies
          </h1>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs, idx) => (
              <Reveal key={cs.to} delay={idx * 90}>
                <ArchCaseStudyCard {...cs} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </SiteLayout>
  );
};

export default CaseStudiesIndex;
