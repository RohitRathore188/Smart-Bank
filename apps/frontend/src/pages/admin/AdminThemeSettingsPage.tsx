import React, { useState } from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";

export const AdminThemeSettingsPage: React.FC = () => {
  const [blurRadius, setBlurRadius] = useState("24");
  const [primaryAccent, setPrimaryAccent] = useState("#00F2FE");

  return (
    <AdminPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Theme & Glassmorphism Token Engine</h1>
          <p className="text-sm text-slate-400">Configure global CSS design tokens, backdrop blur radii, and liquid glow presets</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-6">
          <div>
            <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
              <span>Backdrop Blur Radius:</span>
              <span className="font-mono text-cyan-400 font-bold">{blurRadius}px</span>
            </div>
            <input type="range" min="8" max="48" value={blurRadius} onChange={(e) => setBlurRadius(e.target.value)} className="w-full accent-cyan-400 cursor-pointer" />
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase font-semibold">Primary Glass Accent Color</label>
            <div className="flex items-center space-x-3 mt-2">
              <input type="color" value={primaryAccent} onChange={(e) => setPrimaryAccent(e.target.value)} className="w-10 h-10 rounded-xl bg-transparent cursor-pointer" />
              <span className="font-mono text-sm text-white font-bold">{primaryAccent}</span>
            </div>
          </div>

          <button onClick={() => alert("Global UI glass tokens updated!")} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-sm text-white rounded-xl shadow-lg">
            Apply Theme Token Overrides
          </button>
        </div>
      </div>
    </AdminPortalLayout>
  );
};
