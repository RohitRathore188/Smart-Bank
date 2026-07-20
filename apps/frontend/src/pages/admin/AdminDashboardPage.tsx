import React, { useState } from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const AdminDashboardPage: React.FC = () => {
  const [isEmergencyLockActive, setIsEmergencyLockActive] = useState(false);

  return (
    <AdminPortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Super Admin Global Command Center
              </h1>
              <p className="text-sm text-slate-400">SmartBank Bharat AI Global Platform Telemetry & Governance</p>
            </div>

            <button
              onClick={() => setIsEmergencyLockActive(!isEmergencyLockActive)}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-lg ${
                isEmergencyLockActive
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
              }`}
            >
              {isEmergencyLockActive ? "⚠️ EMERGENCY WIRE LOCKOUT ACTIVE" : "🚨 EMERGENCY WIRE KILL-SWITCH"}
            </button>
          </div>

          {/* Global Platform KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Global Platform Accounts", val: "1,48,200 Active", color: "text-emerald-400" },
              { label: "Total Assets Under Custody", val: "₹4,820 Crores", color: "text-cyan-400" },
              { label: "Active Regional Branches", val: "142 Branches (IFSC)", color: "text-amber-300" },
              { label: "System API Throughput", val: "8,400 RPS (99.99%)", color: "text-purple-400" },
            ].map((kpi, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-1">
                <div className="text-xs text-slate-400">{kpi.label}</div>
                <div className={`text-xl font-bold font-mono ${kpi.color}`}>{kpi.val}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Realtime System Telemetry (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-base">Platform Infrastructure Health Telemetry</h3>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-slate-400">FastAPI ASGI Cluster:</span>
                    <div className="font-bold text-emerald-400 text-sm mt-1">4 Workers • 0% Error Rate</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-slate-400">Supabase Connection Pool:</span>
                    <div className="font-bold text-cyan-300 text-sm mt-1">18 / 20 Connections Active</div>
                  </div>
                </div>
              </FloatingCard>
            </div>

            {/* Quick Admin Actions (1 Col) */}
            <div className="space-y-6">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-sm">Global Administrative Tasks</h3>
                <div className="space-y-2 text-xs">
                  <a href="/admin/bank-settings" className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-white">
                    🏢 Branch & IFSC Management
                  </a>
                  <a href="/admin/rates" className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-white">
                    📈 Interest Rate & Service Charge Configurator
                  </a>
                  <a href="/admin/audit-logs" className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-white">
                    🔒 Immutable CDC Audit & Security Logs
                  </a>
                  <a href="/admin/health" className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-white">
                    💾 Database Backup & System Recovery
                  </a>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </PageTransition>
    </AdminPortalLayout>
  );
};
