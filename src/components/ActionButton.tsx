import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { forwardRef } from "react";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

const sizeClasses = {
  md: "px-7 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const variantClasses = {
  primary:
    "bg-terracotta text-white hover:bg-terracotta-hover hover:-translate-y-0.5 shadow-sm",
  ghost:
    "border-[1.5px] border-terracotta text-terracotta hover:bg-terracotta/10",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}
interface LinkProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  to: string;
  external?: boolean;
}

export const ActionButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, sizeClasses[size], variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  ),
);
ActionButton.displayName = "ActionButton";

export const ActionLink = ({
  variant = "primary",
  size = "md",
  className,
  children,
  to,
  external,
}: LinkProps) => {
  const cls = cn(base, sizeClasses[size], variantClasses[variant], className);
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
};
