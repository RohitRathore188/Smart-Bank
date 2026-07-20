import React, { useState } from "react";

interface Vault3DProps {
  isLocked?: boolean;
}

export const Vault3DCanvas: React.FC<Vault3DProps> = ({ isLocked = true }) => {
  const [rotationDegree, setRotationDegree] = useState(0);

  const handleWheelSpin = () => {
    setRotationDegree((prev) => prev + 360);
  };

  return (
    <div className="w-full h-64 rounded-3xl p-6 bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center space-y-4 cursor-pointer group" onClick={handleWheelSpin}>
      {/* Specular Ambient Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 3D Bank Vault Lock Fascia */}
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-slate-800 via-slate-900 to-slate-950 border-4 border-cyan-400/40 shadow-2xl flex items-center justify-center">
        {/* Rotating Locking Wheel Spokes */}
        <div
          style={{
            transform: `rotate(${rotationDegree}deg)`,
            transition: "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
          className="w-full h-full rounded-full flex items-center justify-center relative"
        >
          <div className="absolute w-28 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-80" />
          <div className="absolute w-2 h-28 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-80" />
          <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-cyan-300 shadow-inner flex items-center justify-center text-xs font-mono font-bold text-cyan-300">
            {isLocked ? "LOCK" : "OPEN"}
          </div>
        </div>
      </div>

      <div className="text-center z-10">
        <div className="text-xs font-black tracking-widest text-cyan-300 uppercase">
          SMARTBANK BHARAT 3D VAULT
        </div>
        <p className="text-[10px] text-slate-400 font-mono mt-0.5">Click wheel to spin 3D locking mechanism</p>
      </div>
    </div>
  );
};
