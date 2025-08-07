import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "note" | "floating";
  children: React.ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const baseClasses = "glass-card smooth-transition";
    
    const variants = {
      default: "p-6",
      note: "p-4 hover:scale-[1.02] cursor-pointer ios-transition",
      floating: "p-6 shadow-glass hover:shadow-button"
    };

    return (
      <div
        className={cn(
          baseClasses,
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";