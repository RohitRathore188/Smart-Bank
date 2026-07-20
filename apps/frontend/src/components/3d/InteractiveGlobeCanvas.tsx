import React from "react";

export const InteractiveGlobeCanvas: React.FC = () => {
  return (
    <div className="w-full h-48 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between group cursor-pointer">
      {/* Specular Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

      <div className="flex justify-between items-start z-10">
        <div>
          <div className="text-[10px] font-bold tracking-widest text-blue-200 uppercase font-mono">
            NPCI & SWIFT GLOBAL INTERBANK NETWORK
          </div>
          <h3 className="text-xl font-extrabold tracking-tight mt-0.5">
            Real-Time Wire Settlement Mesh
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold font-mono">
          24x7 Cleared
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 z-10 font-mono text-xs pt-2">
        <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <div className="text-[9px] text-blue-100 uppercase">Settlement Time</div>
          <div className="font-extrabold text-sm text-emerald-300">0.08 Sec (Instant)</div>
        </div>
        <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <div className="text-[9px] text-blue-100 uppercase">Interbank Rails</div>
          <div className="font-extrabold text-sm text-white">UPI 2.0 / RTGS</div>
        </div>
        <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <div className="text-[9px] text-blue-100 uppercase">Encrypted Channel</div>
          <div className="font-extrabold text-sm text-amber-300">256-bit TLS 1.3</div>
        </div>
      </div>
    </div>
  );
};
