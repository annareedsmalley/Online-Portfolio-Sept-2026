import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Case Studies", to: "/#work", hashTarget: "work" },
  { label: "About", to: "/#about", hashTarget: "about" },
  { label: "Contact", to: "/contact" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  // Transparent terracotta state only on the homepage at scroll = 0.
  const onHero = isHome && !scrolled;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  // Track scroll position to swap nav theme on the homepage.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update(); // sync on route change
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [location.pathname]);

  const isActive = (to: string) => {
    if (to.startsWith("/#")) return location.pathname === "/" && location.hash === to.slice(1);
    return location.pathname === to;
  };

  const handleHashClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
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
        transition: "background-color 300ms ease, color 300ms ease, border-color 300ms ease",
      }}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Link
          to="/"
          className={cn(
            "inline-block transition-opacity hover:opacity-80",
            onHero ? "text-white" : "text-title",
          )}
          style={{ transition: "color 300ms ease, opacity 200ms ease" }}
          aria-label="Anna Smalley — home"
        >
          <span className="font-serif text-lg font-bold md:text-xl">Anna Smalley</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = isActive(l.to);
            const ringClass = active
              ? onHero
                ? "border-white/80"
                : "border-terracotta"
              : "border-transparent";
            const colorClass = onHero
              ? "text-white hover:opacity-80"
              : active
                ? "text-terracotta"
                : "text-title hover:text-terracotta";
            const baseClasses = cn(
              "font-sans text-sm font-bold inline-flex items-center rounded-full border-[1.5px] px-4 py-1.5",
              colorClass,
              ringClass,
            );
            return l.to.startsWith("/#") ? (
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
                    onHero
                      ? "text-white hover:opacity-80"
                      : isActive
                        ? "text-terracotta"
                        : "text-title hover:text-terracotta",
                    isActive
                      ? onHero
                        ? "border-white/80"
                        : "border-terracotta"
                      : "border-transparent",
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
          className={cn("rounded-full p-2 md:hidden", onHero ? "text-white" : "text-title")}
          style={{ transition: "color 300ms ease" }}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="md:hidden">
          <nav
            className={cn(
              "flex flex-col gap-2 border-t px-6 py-6",
              onHero ? "border-white/20" : "border-border bg-background",
            )}
            style={{ backgroundColor: onHero ? "transparent" : undefined }}
          >
            {links.map((l) =>
              l.to.startsWith("/#") ? (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={(e) => handleHashClick(e, l.hashTarget!)}
                  className={cn(
                    "font-serif text-2xl",
                    onHero ? "text-white hover:opacity-80" : "text-title hover:text-terracotta",
                  )}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "font-serif text-2xl",
                    onHero ? "text-white hover:opacity-80" : "text-title hover:text-terracotta",
                  )}
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
};
