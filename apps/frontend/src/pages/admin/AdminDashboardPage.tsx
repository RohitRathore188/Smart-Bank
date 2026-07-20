import React, { useState } from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";
import { Server3DCanvas } from "../../components/3d/Server3DCanvas";

export const AdminDashboardPage: React.FC = () => {
  const [isEmergencyLockActive, setIsEmergencyLockActive] = useState(false);

  const summaryCards = [
    { title: "Active Customers", val: "1,48,200", badge: "+14.2% MoM", desc: "Across 9 Account Types", icon: "👥", color: "from-blue-500 to-indigo-600" },
    { title: "Assets Under Custody", val: "₹4,820 Crores", badge: "+18.4% YoY", desc: "Total Bank Liquidity", icon: "💎", color: "from-purple-500 to-indigo-600" },
    { title: "Active Regional Branches", val: "142 Branches", badge: "100% IFSC Sync", desc: "Pan-India Network", icon: "🏢", color: "from-cyan-500 to-blue-600" },
    { title: "System API Throughput", val: "8,400 RPS", badge: "99.99% Uptime", desc: "FastAPI + Supabase Pool", icon: "⚡", color: "from-emerald-500 to-teal-600" },
  ];

  const branchRankings = [
    { name: "Mumbai Main Hub", ifsc: "SBAIN000108", revenue: "₹1.84 Crores", growth: "+18.4%", pct: 94 },
    { name: "Connaught Place Delhi", ifsc: "SBAIN000210", revenue: "₹1.42 Crores", growth: "+14.2%", pct: 82 },
    { name: "Bengaluru Tech Park", ifsc: "SBAIN000304", revenue: "₹1.15 Crores", growth: "+22.1%", pct: 76 },
  ];

  const alertCenter = [
    { title: "High-Value RTGS Wire Pending", desc: "Reliance Retail Ltd (₹1.25 Crore) awaiting sanction.", type: "WARNING", badge: "HIGH PRIORITY", time: "12m ago", color: "border-amber-200 bg-amber-50/80 text-amber-900" },
    { title: "Aadhaar eKYC Verification Spike", desc: "1,450 new KYC applications processed in 1 hour.", type: "INFO", badge: "NORMAL", time: "28m ago", color: "border-blue-200 bg-blue-50/80 text-blue-900" },
    { title: "FIU-IND STR Report Compiled", desc: "Monthly Suspicious Transaction Report exported.", type: "SUCCESS", badge: "COMPLIANT", time: "1h ago", color: "border-emerald-200 bg-emerald-50/80 text-emerald-900" },
  ];

  return (
    <AdminPortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Hero Greeting Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-[24px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1 z-10">
              <div className="text-xs font-mono font-bold text-blue-200 uppercase tracking-widest">
                SMARTBANK BHARAT AI • GLOBAL COMMAND CENTER
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Welcome back, Super Administrator 👋
              </h1>
              <p className="text-xs text-blue-100 font-medium max-w-xl">
                Real-time governance telemetry across 142 regional branches, 1,48,200 active customers, and ₹4,820 Crores assets under custody.
              </p>
            </div>

            <div className="flex items-center space-x-3 z-10 shrink-0">
              <button
                onClick={() => setIsEmergencyLockActive(!isEmergencyLockActive)}
                className={`px-5 py-3 rounded-2xl font-extrabold text-xs transition-all shadow-lg active:scale-95 ${
                  isEmergencyLockActive
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-red-500/20 text-red-100 border border-red-400/40 hover:bg-red-500/30"
                }`}
              >
                {isEmergencyLockActive ? "⚠️ WIRE LOCKOUT ACTIVE" : "🚨 EMERGENCY LOCKDOWN"}
              </button>
            </div>
          </div>

          {/* Summary Cards (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card, i) => (
              <FloatingCard key={i} className="p-6 space-y-3 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center text-xl shadow-md`}>
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-500">{card.title}</div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight mt-0.5">{card.val}</div>
                  <div className="text-[10px] text-slate-400 font-medium mt-1">{card.desc}</div>
                </div>
              </FloatingCard>
            ))}
          </div>

          {/* Infrastructure 3D Node & Real-Time Chart (2 Cols + 1 Col) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* 3D Server Infrastructure Node */}
              <Server3DCanvas />

              {/* Real-time Line Chart */}
              <FloatingCard className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Real-Time System API Throughput & Load</h3>
                    <p className="text-xs text-slate-500">FastAPI Async Engine • 8,400 Requests Per Second Peak</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700">Latency: 14ms</span>
                </div>

                <div className="h-44 w-full bg-slate-50 rounded-2xl border border-slate-200 p-4 relative overflow-hidden">
                  <svg viewBox="0 0 500 120" className="w-full h-full">
                    <defs>
                      <linearGradient id="chartGradientOS" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M 0,120 L 0,100 Q 100,70 200,85 T 400,20 T 500,10 L 500,120 Z" fill="url(#chartGradientOS)" />
                    <path d="M 0,100 Q 100,70 200,85 T 400,20 T 500,10" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </FloatingCard>
            </div>

            {/* Right Column (1 Col): Branch Performance & Alerts */}
            <div className="space-y-6">
              {/* Branch Performance Rankings */}
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base">Top Regional Branch Rankings</h3>
                <div className="space-y-3">
                  {branchRankings.map((b, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-sm">
                      <div className="flex justify-between text-xs font-bold text-slate-900">
                        <span>{b.name} ({b.ifsc})</span>
                        <span className="text-emerald-700 font-mono">{b.revenue}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" style={{ width: `${b.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </FloatingCard>

              {/* Priority Alert Center */}
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base">Priority Security & Alert Center</h3>
                <div className="space-y-3">
                  {alertCenter.map((a, i) => (
                    <div key={i} className={`p-3.5 rounded-2xl border ${a.color} space-y-1 text-xs shadow-sm`}>
                      <div className="flex justify-between font-bold">
                        <span>{a.title}</span>
                        <span className="font-mono text-[10px]">{a.time}</span>
                      </div>
                      <div className="text-[11px] opacity-80">{a.desc}</div>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </PageTransition>
    </AdminPortalLayout>
  );
};
