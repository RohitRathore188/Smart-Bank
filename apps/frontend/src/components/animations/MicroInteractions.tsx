import React, { useState } from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = "",
  glowColor = "rgba(0, 242, 254, 0.15)"
}) => {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)");
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        boxShadow: `0 20px 40px ${glowColor}`,
        transition: "transform 0.15s ease-out, box-shadow 0.2s ease"
      }}
      className={`rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 ${className}`}
    >
      {children}
    </div>
  );
};
