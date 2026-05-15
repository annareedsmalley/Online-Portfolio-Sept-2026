import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-[#32101B]">
    <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-4 px-6 py-10 md:flex-row md:items-center">
      <p className="font-serif text-lg text-[#FAF8F5]">Anna Smalley</p>
      <p className="body-text text-sm text-[#FAF8F5]/80">© {new Date().getFullYear()} — UX Design Leadership</p>
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
