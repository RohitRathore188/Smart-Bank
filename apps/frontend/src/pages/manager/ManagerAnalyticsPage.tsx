import React from "react";
import { ManagerPortalLayout } from "../../components/layout/ManagerPortalLayout";

export const ManagerAnalyticsPage: React.FC = () => {
  return (
    <ManagerPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Advanced Financial Analytics & 3D Visualizer</h1>
          <p className="text-sm text-slate-400">Multi-axis liquidity forecasting, category breakdown, and yield performance</p>
        </div>

        {/* 3D Analytics Canvas Simulation */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-white text-base">Interactive Multi-Axis Cashflow Canvas</h3>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              3D Render Shader Active
            </span>
          </div>

          <div className="h-64 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/20 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>PROJECTED LIQUIDITY CURVE (90 DAYS)</span>
              <span className="text-emerald-400">▲ +18.4% Forecast</span>
            </div>

            {/* Simulating 3D Wave Bars */}
            <div className="flex items-end justify-between h-36 px-4 space-x-2">
              {[45, 60, 52, 78, 85, 92, 110, 95, 120, 135, 148].map((h, idx) => (
                <div key={idx} className="flex-1 bg-gradient-to-t from-amber-500 to-orange-400 rounded-t-lg transition-all duration-500 hover:opacity-80" style={{ height: `${h}px` }} />
              ))}
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>MAY 2026</span>
              <span>JUN 2026</span>
              <span>JUL 2026</span>
              <span>AUG 2026 (PROJECTED)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-xs">
            <div className="p-3 bg-white/5 rounded-2xl">
              <div className="text-slate-400">Average Net Monthly Inflow</div>
              <div className="text-lg font-mono font-bold text-emerald-400 mt-1">+$4.28M</div>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl">
              <div className="text-slate-400">Average Operational Burn</div>
              <div className="text-lg font-mono font-bold text-white mt-1">-$1.84M</div>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl">
              <div className="text-slate-400">Reserve Coverage Ratio</div>
              <div className="text-lg font-mono font-bold text-amber-400 mt-1">2.33x</div>
            </div>
          </div>
        </div>
      </div>
    </ManagerPortalLayout>
  );
};
