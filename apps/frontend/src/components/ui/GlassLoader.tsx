import React from "react";

interface GlassLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export const GlassLoader: React.FC<GlassLoaderProps> = ({
  message = "Loading SmartBank AI Vaults...",
  fullScreen = true
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl">
      {/* Animated Glowing Ring */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-pulse"></div>
        <div className="w-16 h-16 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin"></div>
        <div className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 blur-sm animate-ping opacity-50"></div>
      </div>
      <p className="text-sm font-bold text-white tracking-tight animate-pulse">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#080A0F]/80 backdrop-blur-xl flex items-center justify-center p-4">
        {content}
      </div>
    );
  }

  return content;
};
