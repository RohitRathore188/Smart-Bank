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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Super Admin Global Command Center
              </h1>
              <p className="text-sm text-slate-600 font-medium">SmartBank Bharat AI Global Platform Telemetry & Governance</p>
            </div>

            <button
              onClick={() => setIsEmergencyLockActive(!isEmergencyLockActive)}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-md ${
                isEmergencyLockActive
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
              }`}
            >
              {isEmergencyLockActive ? "⚠️ EMERGENCY WIRE LOCKOUT ACTIVE" : "🚨 EMERGENCY WIRE KILL-SWITCH"}
            </button>
          </div>

          {/* Global Platform KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Global Platform Accounts", val: "1,48,200 Active", color: "text-emerald-700" },
              { label: "Total Assets Under Custody", val: "₹4,820 Crores", color: "text-cyan-700" },
              { label: "Active Regional Branches", val: "142 Branches (IFSC)", color: "text-amber-700" },
              { label: "System API Throughput", val: "8,400 RPS (99.99%)", color: "text-purple-700" },
            ].map((kpi, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md space-y-1">
                <div className="text-xs font-semibold text-slate-500">{kpi.label}</div>
                <div className={`text-xl font-extrabold font-mono ${kpi.color}`}>{kpi.val}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Realtime System Telemetry (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base">Platform Infrastructure Health Telemetry</h3>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 font-medium">FastAPI ASGI Cluster:</span>
                    <div className="font-extrabold text-emerald-700 text-sm mt-1">4 Workers • 0% Error Rate</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 font-medium">Supabase Connection Pool:</span>
                    <div className="font-extrabold text-cyan-700 text-sm mt-1">18 / 20 Connections Active</div>
                  </div>
                </div>
              </FloatingCard>
            </div>

            {/* Quick Admin Actions (1 Col) */}
            <div className="space-y-6">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm">Global Administrative Tasks</h3>
                <div className="space-y-2 text-xs">
                  <a href="/admin/bank-settings" className="block p-3.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 font-bold text-slate-900">
                    🏢 Branch & IFSC Directory
                  </a>
                  <a href="/admin/rates" className="block p-3.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 font-bold text-slate-900">
                    📈 Interest Rate & Service Charge Configurator
                  </a>
                  <a href="/admin/audit-logs" className="block p-3.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 font-bold text-slate-900">
                    🔒 Immutable CDC Audit & Security Logs
                  </a>
                  <a href="/admin/health" className="block p-3.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 font-bold text-slate-900">
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
