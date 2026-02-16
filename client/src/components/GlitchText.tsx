import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "", as: Component = "h2" }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <Component className="relative z-10">
        {text}
      </Component>
      <Component className="absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-70 text-primary translate-x-[2px] animate-pulse">
        {text}
      </Component>
      <Component className="absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-70 text-blue-500 -translate-x-[2px] animate-pulse delay-75">
        {text}
      </Component>
    </div>
  );
};
