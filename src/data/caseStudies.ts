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
    to: "/work/case-study-02",
    title: "Four Brands, One Membership.",
    tags: "AI & Customer Experience · 2017–2018",
    image: salesforceImg,
    imageAlt: "LogiBot chatbot conversation on a smartphone",
    arrowColor: "#1B1918",
    titleColor: "#1B1918",
  },
  {
    to: "/work/gap-inc",
    title: "Leading a Cross-Brand Product Experience Strategy Through Organizational Change at Gap Inc.",
    tags: "Cross-Brand Product Strategy · 2022–2024",
    image: fourBrandsImg,
    imageAlt: "Athleta, Old Navy, Banana Republic, and Gap mobile product pages side by side",
    arrowColor: "#1B1918",
    titleColor: "#1B1918",
  },
  {
    to: "/work/case-study-03",
    title: "Supercharging Cart & Checkout",
    tags: "Operational Excellence · 2019",
    image: cartCheckoutImg,
    imageAlt: "Walmart mobile checkout — Ready to check out screen",
    arrowColor: "#FFFFFF",
    titleColor: "#1B1918",
  },
];
