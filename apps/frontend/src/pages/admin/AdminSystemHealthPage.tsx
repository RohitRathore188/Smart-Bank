import React from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";

export const AdminSystemHealthPage: React.FC = () => {
  return (
    <AdminPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Infrastructure System Health</h1>
          <p className="text-sm text-slate-400">Real-time status of FastAPI workers, Supabase connection pool, and Gemini API</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { service: "FastAPI Async Cluster", status: "HEALTHY", detail: "8,420 RPS • p95 11.8ms", color: "text-emerald-400", border: "border-emerald-500/30" },
            { service: "Supabase Postgres Pool", status: "HEALTHY", detail: "20 Active / 10 Overflow", color: "text-emerald-400", border: "border-emerald-500/30" },
            { service: "Google Gemini 1.5 Pro", status: "HEALTHY", detail: "Tokens: 1.2M • Safety: 99.8%", color: "text-emerald-400", border: "border-emerald-500/30" },
          ].map((item, i) => (
            <div key={i} className={`p-6 rounded-3xl bg-slate-900/60 border ${item.border} space-y-2`}>
              <div className="text-xs text-slate-400 font-mono uppercase">{item.service}</div>
              <div className={`text-xl font-bold font-mono ${item.color}`}>{item.status}</div>
              <div className="text-xs text-slate-300 font-mono">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </AdminPortalLayout>
  );
};
