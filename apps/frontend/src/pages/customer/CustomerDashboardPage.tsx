import React from "react";
import { Link } from "react-router-dom";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";
import { CreditCard3DCanvas } from "../../components/3d/CreditCard3DCanvas";
import { Vault3DCanvas } from "../../components/3d/Vault3DCanvas";
import { FloatingCoinsCanvas } from "../../components/3d/FloatingCoinsCanvas";
import { AnimatedCashflowChart } from "../../components/charts/AnimatedCashflowChart";

export const CustomerDashboardPage: React.FC = () => {
  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🇮🇳</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  SmartBank Bharat Vault
                </h1>
              </div>
              <p className="text-sm text-slate-400">RBI Regulated • Autonomous UPI & Wealth Management</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/transfers"
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95 flex items-center space-x-1.5"
              >
                <span>⚡ Pay via UPI</span>
              </Link>
            </div>
          </div>

          {/* 3D Floating Gold Coins Yield Bar */}
          <FloatingCoinsCanvas />

          {/* Main 2-Column Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2 Cols): Net Worth Hero, Chart & Ledger */}
            <div className="lg:col-span-2 space-y-6">
              {/* Floating Net Worth Hero Card */}
              <FloatingCard className="p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Total Portfolio Value (INR)
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 font-mono">
                  ₹14,89,200.<span className="text-slate-400 text-3xl">45</span>
                  <span className="inline-block ml-3 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    ▲ +12.4% this month
                  </span>
                </div>

                {/* Animated Cashflow Wave Chart */}
                <div className="mb-6">
                  <AnimatedCashflowChart />
                </div>

                {/* Multi-Currency & Fixed Deposit Breakout Pills */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">INR Primary Account</div>
                    <div className="text-sm font-bold text-white font-mono">₹9,24,000.00</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Fixed Deposits (FD)</div>
                    <div className="text-sm font-bold text-white font-mono">₹5,65,200.00</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] font-semibold text-amber-400 uppercase">RupeeFD Yield</div>
                    <div className="text-sm font-bold text-amber-300 font-mono">7.85% p.a.</div>
                  </div>
                </div>
              </FloatingCard>

              {/* Quick Action Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "UPI Transfer", icon: "⚡", path: "/transfers" },
                  { label: "NEFT / RTGS", icon: "🏦", path: "/vaults" },
                  { label: "RuPay Card", icon: "💳", path: "/cards" },
                  { label: "Instant Credit Line", icon: "💎", path: "/loans" },
                ].map((action, i) => (
                  <Link
                    key={i}
                    to={action.path}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center space-y-2 transition-all duration-200 hover:-translate-y-1 active:scale-95 shadow-lg"
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-xs font-semibold text-slate-300">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column (1 Col): 3D RuPay Card & 3D Vault Lock Canvas */}
            <div className="space-y-6">
              {/* 3D RuPay Metal Card Canvas */}
              <CreditCard3DCanvas cardholderName="ROHIT RATHORE" lastFour="9102" expiry="07/29" tier="RUPAY_PLATINUM" />

              {/* 3D Vault Lock Canvas */}
              <Vault3DCanvas isLocked={true} />
            </div>
          </div>
        </div>
      </PageTransition>
    </CustomerDashboardLayout>
  );
};
