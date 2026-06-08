import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCaseStudyTitle } from "@/context/CaseStudyTitleContext";

const links: { label: string; to: string; hashTarget?: string; external?: boolean }[] = [
  { label: "Case Studies", to: "/#work", hashTarget: "work" },
  { label: "About", to: "/#about", hashTarget: "about" },
  { label: "Contact", to: "/#contact", hashTarget: "contact" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [hideMainBar, setHideMainBar] = useState(false);
  const lastYRef = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const caseStudyTitle = useCaseStudyTitle();

  const isHome = location.pathname === "/";
  const onHero = isHome && !scrolled && !open;
  const showCaseStudyTitle = !!caseStudyTitle && pastHero && !open;
  const collapseMainBar = showCaseStudyTitle && hideMainBar;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 0);
      setPastHero(y > 240);
      const delta = y - lastYRef.current;
      if (Math.abs(delta) > 4) {
        if (delta > 0 && y > 240) {
          setHideMainBar(true);
        } else if (delta < 0) {
          setHideMainBar(false);
        }
        lastYRef.current = y;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const prevOverflow = document.body.style.overflow;
      const prevPaddingRight = document.body.style.paddingRight;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.paddingRight = prevPaddingRight;
      };
    }
  }, [open]);

  const isActive = (to: string) => {
    if (to.startsWith("/#")) return location.pathname === "/" && location.hash === to.slice(1);
    return location.pathname === to;
  };

  const handleHashClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `/#${target}`);
    } else {
      navigate(`/#${target}`);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-sm",
        onHero ? "border-transparent" : "border-border",
      )}
      style={{
        backgroundColor: onHero ? "transparent" : "#FAF8F5",
        transition: open ? "none" : "background-color 300ms ease, color 300ms ease, border-color 300ms ease",
      }}
    >
      <div
        className={cn(
          "relative z-50 mx-auto flex max-w-content items-center justify-between overflow-hidden px-6 md:px-16 transition-[height,opacity] duration-300 ease-out",
          collapseMainBar ? "h-0 opacity-0 md:h-16 md:opacity-100" : "h-16 opacity-100"
        )}
        aria-hidden={collapseMainBar ? true : undefined}
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (open) {
              setOpen(false);
              return;
            }
            if (isHome) {
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.replaceState(null, "", "/");
            } else {
              navigate("/");
            }
          }}
          className={cn(
            "inline-block text-title hover:text-terracotta",
            "pl-0 pr-4 py-1.5"
          )}
          aria-label="Anna Smalley — home"
          style={{ transition: "color 300ms ease, opacity 200ms ease" }}
        >
          <span className="font-serif text-xl font-bold md:text-2xl">Anna Smalley</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = isActive(l.to);
            const ringClass = active ? "border-terracotta" : "border-transparent";
            const colorClass = active
              ? "text-terracotta"
              : "text-title hover:text-terracotta";
            const baseClasses = cn(
              "font-sans text-sm font-bold inline-flex items-center rounded-full border-[1.5px] px-4 py-1.5",
              colorClass,
              ringClass,
            );
            return l.external ? (
              <a
                key={l.to}
                href={l.to}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "font-sans text-sm font-bold inline-flex items-center rounded-full border-[1.5px] px-4 py-1.5 border-transparent",
                  "text-title hover:text-terracotta",
                )}
                style={{ transition: "color 300ms ease, opacity 200ms ease, border-color 300ms ease" }}
              >
                {l.label}
              </a>
            ) : l.to.startsWith("/#") ? (
              <a
                key={l.to}
                href={l.to}
                onClick={(e) => handleHashClick(e, l.hashTarget!)}
                className={baseClasses}
                style={{ transition: "color 300ms ease, opacity 200ms ease, border-color 300ms ease" }}
              >
                {l.label}
              </a>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "font-sans text-sm font-bold inline-flex items-center rounded-full border-[1.5px] px-4 py-1.5",
                    isActive ? "text-terracotta" : "text-title hover:text-terracotta",
                    isActive ? "border-terracotta" : "border-transparent",
                  )
                }
                style={{ transition: "color 300ms ease, opacity 200ms ease, border-color 300ms ease" }}
              >
                {l.label}
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          className={cn(
            "rounded-full p-2 md:hidden",
            "text-title"
          )}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {showCaseStudyTitle ? (
        <div className="border-t border-border bg-background md:hidden">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={`${caseStudyTitle} — scroll to top`}
            className="mx-auto flex h-10 w-full max-w-content items-center px-6 text-left"
          >
            <span className="truncate font-serif text-[14px] font-semibold text-title">
              {caseStudyTitle}
            </span>
          </button>
        </div>
      ) : null}

      {open ? (
        <div className="md:hidden">
          <nav
            className={cn(
              "relative z-50 flex flex-col gap-2 px-6 py-6",
              onHero ? "border-border bg-background" : "border-border bg-background",
            )}
          >
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.to}
                  href={l.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                className="font-serif text-[20px] text-title py-3 hover:text-terracotta"
                >
                  {l.label}
                </a>
              ) : l.to.startsWith("/#") ? (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={(e) => handleHashClick(e, l.hashTarget!)}
                  className="font-serif text-[20px] text-title py-3 hover:text-terracotta"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  className="font-serif text-[20px] text-title py-3 hover:text-terracotta"
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      ) : null}
      {open
        ? createPortal(
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setOpen(false)}
            />,
            document.body,
          )
        : null}
    </header>
  );
};
