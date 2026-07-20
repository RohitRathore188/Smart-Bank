import React, { useState } from "react";

interface CreditCard3DProps {
  cardholderName?: string;
  lastFour?: string;
  expiry?: string;
  isFrozen?: boolean;
  tier?: "RUPAY_PLATINUM" | "VIP_GOLD" | "CYBER_EMERALD";
}

export const CreditCard3DCanvas: React.FC<CreditCard3DProps> = ({
  cardholderName = "ROHIT RATHORE",
  lastFour = "9102",
  expiry = "07/29",
  isFrozen = false,
  tier = "RUPAY_PLATINUM"
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotation({
      x: (-y / rect.height) * 20,
      y: (x / rect.width) * 20
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const tierGradients = {
    RUPAY_PLATINUM: "from-slate-950 via-slate-900 to-cyan-950 border-cyan-400/40 shadow-cyan-500/20",
    VIP_GOLD: "from-slate-950 via-amber-950 to-orange-950 border-amber-400/40 shadow-amber-500/20",
    CYBER_EMERALD: "from-slate-950 via-emerald-950 to-teal-950 border-emerald-400/40 shadow-emerald-500/20"
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.1s ease-out"
      }}
      className="w-full h-56 rounded-3xl p-6 relative overflow-hidden shadow-2xl cursor-pointer group"
    >
      {/* 3D Glass Metal Texture Surface */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${tierGradients[tier]} border rounded-3xl backdrop-blur-2xl transition-all duration-300`} />

      {/* Specular Shimmer Reflection Layer */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          transform: `translateX(${rotation.y * 5}px)`
        }}
      />

      {/* Card Header */}
      <div className="relative z-10 flex justify-between items-center">
        <span className="text-xs font-black tracking-widest text-cyan-300 uppercase">
          SMARTBANK INDIA • RuPay 🇮🇳
        </span>
        <div className="flex items-center space-x-2">
          {isFrozen && (
            <span className="text-[10px] font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded-full border border-red-500/40 animate-pulse">
              FROZEN
            </span>
          )}
          <span className="text-xs font-mono font-bold text-slate-400">NCMC SELECT</span>
        </div>
      </div>

      {/* Holographic EMV Chip & Contactless */}
      <div className="relative z-10 my-4 flex items-center space-x-3">
        <div className="w-11 h-8 rounded-lg bg-gradient-to-tr from-amber-300 via-amber-400 to-amber-200 border border-amber-500/50 shadow-md flex items-center justify-center relative overflow-hidden">
          <div className="w-full h-[1px] bg-amber-600/60 my-0.5"></div>
          <div className="w-full h-[1px] bg-amber-600/60 my-0.5"></div>
        </div>
        <span className="text-lg">📡</span>
        <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
          RuPay Platinum
        </span>
      </div>

      {/* Masked PAN */}
      <div className="relative z-10 text-xl sm:text-2xl font-mono tracking-widest text-white font-bold my-2 drop-shadow-md">
        6521 •••• •••• {lastFour}
      </div>

      {/* Cardholder Details */}
      <div className="relative z-10 flex justify-between items-end mt-2">
        <div>
          <div className="text-[9px] text-slate-400 uppercase tracking-wider">Cardholder</div>
          <div className="text-xs font-bold text-white tracking-wider">{cardholderName}</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] text-slate-400 uppercase tracking-wider">Expires / CVV</div>
          <div className="text-xs font-mono font-bold text-cyan-400">{expiry} • •••</div>
        </div>
      </div>
    </div>
  );
};
