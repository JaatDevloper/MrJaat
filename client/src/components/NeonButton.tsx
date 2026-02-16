import React from 'react';
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = 'primary', isLoading, children, disabled, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-display font-bold uppercase tracking-wider text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden";
    
    const variants = {
      primary: `
        bg-primary text-black
        hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(255,80,0,0.6)]
        border border-primary
        clip-path-slant
      `,
      outline: `
        bg-transparent text-primary border border-primary
        hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(255,80,0,0.3)]
        clip-path-slant
      `,
      ghost: `
        bg-transparent text-muted-foreground hover:text-primary hover:bg-white/5
      `
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {/* Glitch effect overlay for primary buttons */}
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out skew-y-12" />
        )}
        
        <span className="relative z-10 flex items-center gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {children}
        </span>
      </button>
    );
  }
);
NeonButton.displayName = "NeonButton";
