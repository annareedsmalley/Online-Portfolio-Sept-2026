import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-4 px-6 py-10 md:flex-row md:items-center">
      <p className="font-serif text-lg text-title">Anna Smalley</p>
      <p className="body-text text-sm">© {new Date().getFullYear()} — UX Design Leadership</p>
      <div className="flex gap-6">
        <Link to="/contact" className="font-sans text-sm text-title hover:text-terracotta">
          Contact
        </Link>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm text-title hover:text-terracotta"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);
