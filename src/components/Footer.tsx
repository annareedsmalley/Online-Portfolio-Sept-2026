import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-[#1E0A11]">
    <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-10">
      <div className="flex gap-6">
        <Link to="/contact" className="font-sans text-sm text-[#FAF8F5] hover:text-terracotta">
          Contact
        </Link>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm text-[#FAF8F5] hover:text-terracotta"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);
