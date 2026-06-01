import fourBrandsImg from "@/assets/case-study-gap-thumbnail.png";
import placeholder03 from "@/assets/placeholder-featured-03.png";
import membershipImg from "@/assets/four-brands-membership-thumbnail.png";
import aiTrustImg from "@/assets/designing-trust-ai-thumbnail.png";

export interface CaseStudyEntry {
  to: string;
  title: string;
  tags: string;
  image: string;
  imageAlt: string;
  arrowColor: string;
  titleColor?: string;
}

export const caseStudies: CaseStudyEntry[] = [
  {
    to: "/work/four-brands-one-membership",
    title: "Building a unified membership platform for Old Navy, Gap, Banana Republic and Athleta",
    tags: "Loyalty & Foundational Component Design",
    image: membershipImg,
    imageAlt: "Two iPhones showing Gap product pages with size and variant selection",
    arrowColor: "#1B1918",
    titleColor: "#1B1918",
  },
  {
    to: "/work/cross-brand-product-experience",
    title: "Delivering multi-variant PDP strategy through organizational change at Gap Inc.",
    tags: "Cross-Brand Product Strategy",
    image: fourBrandsImg,
    imageAlt: "Athleta, Old Navy, Banana Republic, and Gap mobile product pages side by side",
    arrowColor: "#1B1918",
    titleColor: "#1B1918",
  },
  {
    to: "/work/designing-trust-into-ai-feature",
    title: "Designing trust into Gap Inc.'s first customer-facing AI feature",
    tags: "Customer-Facing GenAI",
    image: aiTrustImg,
    imageAlt: "iPhone showing an AI-generated 'What Customers Are Telling Us' review summary",
    arrowColor: "#1B1918",
    titleColor: "#1B1918",
  },
];
