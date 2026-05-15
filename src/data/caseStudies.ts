import fourBrandsImg from "@/assets/case-study-gap-thumbnail.png";
import salesforceImg from "@/assets/case-salesforce-einstein.png";
import cartCheckoutImg from "@/assets/case-cart-checkout.png";

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
    to: "/work/cross-brand-product-experience",
    title: "Leading a cross-brand product experience strategy through organizational change at Gap Inc.",
    tags: "Cross-Brand Product Strategy",
    image: fourBrandsImg,
    imageAlt: "Athleta, Old Navy, Banana Republic, and Gap mobile product pages side by side",
    arrowColor: "#1B1918",
    titleColor: "#1B1918",
  },
  {
    to: "/work/four-brands-one-membership",
    title: "Four brands, one membership",
    tags: "AI & Customer Experience",
    image: salesforceImg,
    imageAlt: "LogiBot chatbot conversation on a smartphone",
    arrowColor: "#1B1918",
    titleColor: "#1B1918",
  },
  {
    to: "/work/designing-trust-into-ai-feature",
    title: "Designing trust into Gap Inc.'s first customer-facing AI feature",
    tags: "Customer-Facing GenAI",
    image: cartCheckoutImg,
    imageAlt: "Placeholder thumbnail for the GenAI Review Summary case study",
    arrowColor: "#1B1918",
    titleColor: "#1B1918",
  },
];
