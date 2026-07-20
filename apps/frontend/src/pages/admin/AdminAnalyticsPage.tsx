import React from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";

export const AdminAnalyticsPage: React.FC = () => {
  return (
    <AdminPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Platform Growth & Executive Analytics</h1>
          <p className="text-sm text-slate-400">Global user onboarding velocity, vault deposit expansion, and net revenue</p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <div className="text-xs text-slate-400 font-mono">GLOBAL PLATFORM REVENUE (ARR)</div>
          <div className="text-4xl font-extrabold text-cyan-400 font-mono">$18.4M <span className="text-xs text-emerald-400">▲ +24% YoY</span></div>
          <div className="h-40 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-xs text-slate-500 font-mono">
            [ INTERACTIVE 3D PLATFORM GROWTH CANVAS CHART ]
          </div>
        </div>
      </div>
    </AdminPortalLayout>
  );
};
