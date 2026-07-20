import React, { useState } from "react";

interface CreditCard3DProps {
  cardholderName?: string;
  lastFour?: string;
  expiry?: string;
  tier?: "RUPAY_PLATINUM" | "VISA_SIGNATURE" | "SELECT_CREDIT";
}

export const CreditCard3DCanvas: React.FC<CreditCard3DProps> = ({
  cardholderName = "ROHIT RATHORE",
  lastFour = "9102",
  expiry = "07/29",
  tier = "RUPAY_PLATINUM"
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotation({ x: (-y / rect.height) * 20, y: (x / rect.width) * 20 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.15s ease-out"
      }}
      className="w-full h-56 rounded-3xl p-6 bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-900 text-white shadow-2xl border border-white/20 relative overflow-hidden flex flex-col justify-between cursor-pointer group"
    >
      {/* Specular Liquid Glass Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      {/* Top Card Header */}
      <div className="flex justify-between items-start z-10">
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-blue-200 uppercase font-mono">
            SMARTBANK INDIA • RUPAY 🇮🇳
          </span>
          <div className="text-xs font-bold text-slate-300">SELECT PLATINUM DEBIT</div>
        </div>
        <div className="w-10 h-8 rounded-lg bg-amber-400/90 border border-amber-300 shadow-inner flex items-center justify-center font-bold text-[10px] text-slate-900 font-mono">
          EMV
        </div>
      </div>

      {/* Card Number */}
      <div className="z-10 tracking-widest font-mono text-xl sm:text-2xl font-bold text-slate-100 drop-shadow-md">
        6521 •••• •••• {lastFour}
      </div>

      {/* Card Bottom Metadata */}
      <div className="flex justify-between items-end z-10 font-mono">
        <div>
          <div className="text-[9px] text-blue-200 uppercase tracking-wider">Cardholder</div>
          <div className="text-xs font-bold text-white tracking-wide">{cardholderName}</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] text-blue-200 uppercase tracking-wider">Expires / CVV</div>
          <div className="text-xs font-bold text-white">{expiry} / •••</div>
        </div>
      </div>
    </div>
  );
};
