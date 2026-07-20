import React, { useState } from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = "",
  glowColor = "rgba(37, 99, 235, 0.08)"
}) => {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 8;
    const rotateY = (x / rect.width) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`);
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
        boxShadow: `0 20px 40px ${glowColor}, 0 2px 6px rgba(0,0,0,0.02)`,
        transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease"
      }}
      className={`rounded-[24px] bg-white/55 backdrop-blur-[20px] border border-white/85 p-6 ${className}`}
    >
      {children}
    </div>
  );
};
