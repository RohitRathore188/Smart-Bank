import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";

export const AdminDashboardPage: React.FC = () => {
  const [killSwitchActive, setKillSwitchActive] = useState(false);

  return (
    <AdminPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Global Command Cockpit</h1>
            <p className="text-sm text-slate-400">Platform-wide system health, tenant isolation, and emergency controls</p>
          </div>
          <button
            onClick={() => {
              const newState = !killSwitchActive;
              setKillSwitchActive(newState);
              alert(newState ? "EMERGENCY KILL-SWITCH ACTIVATED! All outbound wires paused." : "Global Wire Processing Resumed.");
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all ${
              killSwitchActive
                ? "bg-red-500 text-white animate-pulse"
                : "bg-white/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            {killSwitchActive ? "🚨 EMERGENCY LOCKDOWN ACTIVE" : "🛑 Global Emergency Wire Lock"}
          </button>
        </div>

        {/* Global Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Platform Users", value: "142,890", change: "+12% this week", color: "text-cyan-400", icon: "👥" },
            { label: "Global Vault Liquidity", value: "$1.42B", change: "Multi-Currency", color: "text-emerald-400", icon: "🏛️" },
            { label: "FastAPI Throughput", value: "8,420 RPS", change: "p95 < 12ms", color: "text-purple-400", icon: "⚡" },
            { label: "Gemini AI Token Meter", value: "1.2M", change: "99.8% Safety", color: "text-amber-400", icon: "🤖" },
          ].map((m, i) => (
            <div key={i} className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-2xl">{m.icon}</span>
                <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">{m.change}</span>
              </div>
              <div className={`text-2xl sm:text-3xl font-black font-mono ${m.color}`}>{m.value}</div>
              <div className="text-xs font-bold text-slate-300">{m.label}</div>
            </div>
          ))}
        </div>

        {/* System Command Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick System Action Panel */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">Platform Quick Controls</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/users" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-slate-200">
                👤 User Management & Tenant Matrix
              </Link>
              <Link to="/admin/rates" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-slate-200">
                📈 Adjust Global Yield & Credit APR
              </Link>
              <Link to="/admin/health" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-slate-200">
                🟢 Infrastructure Health Metrics
              </Link>
              <Link to="/admin/audit-logs" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-slate-200">
                📑 System CDC Audit Trail Stream
              </Link>
            </div>
          </div>

          {/* System Event Logs */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">Real-Time System Log Stream</h3>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 bg-white/5 rounded-xl flex justify-between">
                <span className="text-emerald-400">[INFO] Supabase Postgres Connection Pool Healthy</span>
                <span className="text-slate-500">10:52:00</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl flex justify-between">
                <span className="text-cyan-400">[JWT] Rotated session secret for Tenant #110ec</span>
                <span className="text-slate-500">10:50:12</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl flex justify-between">
                <span className="text-amber-400">[AI] Gemini-1.5-Pro executed FX rebalance prompt</span>
                <span className="text-slate-500">10:48:45</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPortalLayout>
  );
};
