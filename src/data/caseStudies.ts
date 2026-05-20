import fourBrandsImg from "@/assets/case-study-gap-thumbnail.png";
import fourBrandsMembershipImg from "@/assets/four-brands-one-membership-thumbnail.png";
import placeholder03 from "@/assets/placeholder-featured-03.png";

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
    title: "Building a unified membership platform for four brands at Gap Inc.",
    tags: "AI & Customer Experience",
    image: fourBrandsMembershipImg,
    imageAlt: "Placeholder: add featured image for Building a unified membership platform for four brands at Gap Inc.",
    arrowColor: "#1B1918",
    titleColor: "#1B1918",
  },
  {
    to: "/work/cross-brand-product-experience",
    title: "Leading a cross-brand product experience strategy through organizational change at Gap Inc.",
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
    image: placeholder03,
    imageAlt: "Placeholder: add featured image for Designing trust into Gap Inc.'s first customer-facing AI feature",
    arrowColor: "#1B1918",
    titleColor: "#1B1918",
  },
];
