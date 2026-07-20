import React from "react";

export const FloatingCoinsCanvas: React.FC = () => {
  return (
    <div className="w-full h-40 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 flex items-center justify-around relative overflow-hidden shadow-xl">
      {/* Specular Amber Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent pointer-events-none" />

      {[
        { symbol: "🪙", label: "Gold 24K", val: "₹74,200", delay: "animate-bounce" },
        { symbol: "💎", label: "Yield Vault", val: "7.85% p.a.", delay: "animate-pulse" },
        { symbol: "🏛️", label: "SBI MODS", val: "Auto-Sweep", delay: "animate-bounce" },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center justify-center space-y-1 group cursor-pointer">
          <div className={`text-4xl transform group-hover:scale-125 transition-transform duration-300 ${item.delay}`}>
            {item.symbol}
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</div>
          <div className="text-xs font-bold font-mono text-amber-300">{item.val}</div>
        </div>
      ))}
    </div>
  );
};
