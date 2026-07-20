import React from "react";

export const Server3DCanvas: React.FC = () => {
  return (
    <div className="w-full h-56 rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-950 p-6 text-white shadow-2xl border border-white/20 relative overflow-hidden flex flex-col justify-between group cursor-pointer">
      {/* Specular Ambient Cyan/Purple Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* 3D Server Blades Illustration */}
      <div className="flex justify-between items-start z-10">
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-cyan-300 uppercase font-mono">
            FASTAPI ASGI CLUSTER & SUPABASE POSTGRES WAL
          </span>
          <h3 className="text-xl font-extrabold tracking-tight text-white mt-0.5">
            Production High-Availability Node
          </h3>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>99.99% Uptime</span>
        </div>
      </div>

      {/* 3D Server Rack Visual Stack */}
      <div className="space-y-2 z-10 my-2">
        {[1, 2, 3].map((rack) => (
          <div key={rack} className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between font-mono text-xs shadow-inner">
            <div className="flex items-center space-x-2">
              <span className="text-cyan-400">🖥️ NODE-0{rack}</span>
              <span className="text-slate-300 text-[11px]">Primary ASGI Worker Cluster</span>
            </div>
            <div className="flex items-center space-x-3 text-[10px]">
              <span className="text-emerald-400 font-bold">CPU: 12%</span>
              <span className="text-purple-300 font-bold">RAM: 4.2GB</span>
              <span className="text-amber-300 font-bold">14ms Latency</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center z-10 text-[10px] font-mono text-slate-400">
        <span>Connection Pool: <strong className="text-cyan-300">18 / 20 Active</strong></span>
        <span>Cache Hit Ratio: <strong className="text-emerald-400">99.4%</strong></span>
      </div>
    </div>
  );
};
