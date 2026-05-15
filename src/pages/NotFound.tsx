import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ActionLink } from "@/components/ActionButton";
import { StickyNote } from "@/components/StickyNote";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="mx-auto flex max-w-content flex-col items-center px-6 py-32 text-center">
          <span className="kicker">404</span>
          <h1 className="mt-4 font-serif text-[32px] text-title md:text-[72px]">
            Page <span className="text-terracotta">not found</span>
          </h1>
          <p className="body-text mt-5 max-w-md">
            The page you were looking for isn't here. Let's get you back to something useful.
          </p>

          <StickyNote color="yellow" rotate={-4} size="lg" className="mt-10 max-w-[280px] text-left">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-title/70">
              Note to self
            </p>
            <p className="mt-2 font-serif text-[18px] leading-snug text-title">
              This page got moved during a workshop 🤷‍♀️
            </p>
          </StickyNote>

          <div className="mt-10">
            <ActionLink to="/" variant="primary" size="lg">
              Return home
            </ActionLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
