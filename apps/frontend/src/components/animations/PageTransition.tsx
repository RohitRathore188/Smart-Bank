import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <div className="w-full h-full animate-fade-in transition-all duration-300">
      {children}
    </div>
  );
};
