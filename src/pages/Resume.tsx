import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { ActionLink } from "@/components/ActionButton";
import resumeAsset from "@/assets/anna-smalley-resume.pdf.asset.json";

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-6 font-inter text-[18px] font-bold text-title md:text-[22px]">{children}</h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-8 font-inter text-[16px] font-bold uppercase tracking-[0.08em] text-title md:text-[18px]">
    {children}
  </h3>
);

const Org = ({ children, className = "mt-6" }: { children: React.ReactNode; className?: string }) => (
  <p className={`${className} font-inter text-[15px] font-semibold text-title md:text-[17px]`}>{children}</p>
);

const Role = ({ children }: { children: React.ReactNode }) => (
  <p className="font-inter text-[15px] font-medium text-body italic md:text-[16px]">{children}</p>
);

const P = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`mt-4 font-inter text-[15px] leading-[1.6] text-body md:text-[16px] ${className}`}>{children}</p>
);

const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="mt-1.5 mb-4 space-y-2 pl-1">{children}</ul>
);

const LI = ({ children }: { children: React.ReactNode }) => (
  <li className="relative pl-5 font-inter text-[14px] leading-[1.55] text-body md:text-[15px]">
    <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-terracotta" />
    {children}
  </li>
);

const Resume = () => {
  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="mx-auto max-w-[min(880px,92vw)] px-6 pb-20 pt-12 md:px-12 md:pt-20">
          <Reveal>
            <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.16em] md:text-[14px]" style={{ color: "#c2363a" }}>
              Resume
            </p>
            <h1 className="mt-4 font-display font-normal text-[36px] leading-[1.05] text-title md:text-[52px]">
              Anna Smalley
            </h1>
            <p className="mt-3 font-inter text-[15px] font-medium text-body md:text-[17px]">
              Human-Centered Design Leader · UX, Agentic AI and Accessibility
            </p>

            <div className="mt-2">
              <ActionLink to={resumeAsset.url} external variant="ghost" size="md">
                Download Resume (PDF)
              </ActionLink>
            </div>
          </Reveal>

          <Reveal>
            <H2>Summary</H2>
            <P className="mt-3">
              UX design leader with 17+ years of experience building high-impact digital experiences across retail and
              enterprise products. Known for leading high-performing teams, with deep expertise in eCommerce, design
              systems, accessibility, design operations, and AI-enabled product strategy. Known for human-centered,
              inclusive design leadership, design operations, and AI experimentation.
            </P>

            <H2>Core Strengths</H2>
            <P className="mt-3">
              UX and Product Strategy · Design Leadership and Mentorship · Inclusive Design and Accessibility · Design
              Operations and Governance · Omnichannel Retail and Service Design · Cross-Functional Collaboration ·
              Executive Stakeholder Management · Design Systems · Qualitative Research and Usability Testing ·
              Experimentation and Conversion Optimization · Prototyping and UI Design · Replit, Lovable and Claude
              Design · Agentic AI and GenAI Product Strategy
            </P>

            <H2>Professional Experience</H2>

<Org className="mt-3">LucidMatch</Org>
            <Role>Founding Designer · 2026</Role>
            <UL>
              <LI>
                Leading end-to-end UX strategy for a platform dedicated to solving procedural fairness in competitive
                grants, fellowships, and award nominations.
              </LI>
              <LI>
                Designing an AI-native "trust interface" focused on systemic fairness, providing human decision-makers
                with the clear rationale needed to confidently approve or adjust reviewer assignments proposed by AI.
              </LI>
            </UL>

            <Org>Gap Inc.</Org>
            <Role>Sr. Manager of Product Design, eCommerce Browse · 2024 – 2025</Role>
            <UL>
              <LI>
                Led a team of 7 product designers responsible for Gap Inc.'s web and app Browse experiences, including
                search, navigation, inspiration, PLPs, and PDPs across Gap, Old Navy, Banana Republic, and Athleta.
              </LI>
              <LI>
                Directed a major platform transformation for a new headless UI architecture, co-creating a unified
                design system with the Design Systems team.
              </LI>
              <LI>Launched Gap Inc.'s first customer-facing GenAI feature: generative AI product review summaries.</LI>
              <LI>Delivered the company's first Multi-Variant PDP experience, enabling stronger cross-merchandising opportunities.</LI>
            </UL>

            <Role>Sr. Manager of Product Design, eCommerce Buy · 2019 – 2024</Role>
            <UL>
              <LI>Led a team of 4 designers focused on cart, checkout, login, and profile experiences across all four Gap Inc. brands.</LI>
              <LI>Delivered two holistic cart and checkout redesigns that reduced friction and improved checkout speed.</LI>
              <LI>Shaped the "Four Brands, One Membership" rewards experience, contributing to major growth in loyalty enrollment.</LI>
              <LI>Improved conversion through analytics-informed UX optimization, experimentation, and customer insights.</LI>
              <LI>Introduced journey mapping, lightweight experimentation, and cross-brand patterns to improve consistency and reduce maintenance costs.</LI>
            </UL>

            <Role>Lead Product Designer, Post-Purchase Experiences · 2018 – 2019</Role>
            <UL>
              <LI>
                Led design strategy and delivered dev-ready solutions for Buy Online, Pickup in Store experiences
                across Gap, Banana Republic, Old Navy, and Athleta.
              </LI>
              <LI>Drove a content strategy overhaul for shipping and pickup communications across email, SMS, and push notifications.</LI>
            </UL>

            <Org>Salesforce</Org>
            <Role>Lead Product Designer, Salesforce Community Cloud · 2016 – 2017</Role>
            <UL>
              <LI>Designed the first version of Einstein Answers, an AI-powered answer engine that improved content discoverability and support efficiency.</LI>
              <LI>
                Led UX integration for Quip, defining collaborative document and workflow experiences within the
                Salesforce Community Cloud.
              </LI>
              <LI>
                Led the UX integration of Quip and designed AI-driven recommendation experiences that surfaced people,
                groups, and files within the Salesforce Community Cloud.
              </LI>
            </UL>

            <Org>Walmart</Org>
            <Role>
              Sr. Product Design Manager + UX Manager (2014–2016) · Sr. Product Designer + Information Architect
              (2008–2013) · Imagery Operations Specialist (2002–2007)
            </Role>
            <UL>
              <LI>
                Progressively expanded responsibilities across imagery operations, UX architecture, design, and
                leadership within Walmart's eCommerce organization.
              </LI>
              <LI>
                Led redesigns of cart, checkout, and PDP experiences, establishing scalable templates and UX
                documentation adopted across the organization.
              </LI>
              <LI>
                Drove foundational designs for Walmart's dropship marketplace and led a redesign of Walmart's photo
                product printing & shopping experience.
              </LI>
              <LI>Served on an Operational Excellence task force, presenting operational improvement proposals to executive leadership.</LI>
              <LI>
                Represented Walmart as an active contributor to BRAID (Berkeley Roundtable for Applied Innovation and
                Design), an initiative by UC Berkeley's Haas School of Business.
              </LI>
              <LI>Designed key fulfillment and payment programs including eLayaway, Site to Store FedEx, and Pay with Cash (Patent US 13/600,821).</LI>
            </UL>

            <H2>Community and Pro Bono</H2>
            <UL>
              <LI>
                Founder, Green Dot Project (Walmart) — Led a 10-year sustainability initiative connecting Walmart
                eCommerce associates with Bay Area environmental organizations.
              </LI>
              <LI>
                Provided pro-bono design support for nonprofits including OpenIDEO, Alameda Point Collaborative,
                Yerdle ReCommerce, Homebridge, and Fair Trade USA.
              </LI>
            </UL>

            <H2>Education and Certifications</H2>
            <UL>
              <LI>BA, Biopsychology (Concentration in Cognitive Science) — Oberlin College (2001)</LI>
              <LI>Design Thinking Immersive Certificate, Cooper Professional Education (2013)</LI>
              <LI>WAI0.1x Web Accessibility Certificate — W3Cx x Edx (2025)</LI>
              <LI>Agentic AI Strategy Certificate — Harvard Data Science Review (2026)</LI>
            </UL>
          </Reveal>

          <div className="mt-6">
            <ActionLink to={resumeAsset.url} external variant="ghost" size="md">
              Download Resume (PDF)
            </ActionLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Resume;
