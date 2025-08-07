import React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "icon" | "floating";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseClasses = "glass-button smooth-transition active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      default: "px-6 py-3 font-medium text-glass-card-foreground hover:text-primary",
      icon: "p-3 text-glass-card-foreground hover:text-primary flex items-center justify-center",
      floating: "p-4 text-primary-foreground bg-primary/90 hover:bg-primary border-primary/20 shadow-button"
    };

    const sizes = {
      sm: "text-sm",
      md: "text-base", 
      lg: "text-lg"
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";