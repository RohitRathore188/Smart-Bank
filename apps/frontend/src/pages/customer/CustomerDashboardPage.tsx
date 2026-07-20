import React from "react";
import { Link } from "react-router-dom";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";
import { CreditCard3DCanvas } from "../../components/3d/CreditCard3DCanvas";
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

          {/* RBI & Gemini AI Insight Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-600/10 to-slate-900 border border-emerald-500/20 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl animate-bounce">🤖</span>
              <div>
                <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">SmartBank AI SmartSaver • DICGC Insured up to ₹5 Lakhs</div>
                <p className="text-xs text-slate-300">
                  Your automated ₹1,50,000 Tax-Saver Fixed Deposit is earning <strong>7.85% p.a.</strong> under Section 80C.
                </p>
              </div>
            </div>
            <Link to="/copilot" className="text-xs font-semibold text-emerald-400 hover:underline shrink-0 hidden sm:block">
              Consult AI Advisor →
            </Link>
          </div>

          {/* Main 2-Column Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2 Cols): Net Worth Hero, Chart & Vaults */}
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

              {/* Quick Action Grid for India */}
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

              {/* Live Indian Ledger Feed */}
              <FloatingCard className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">Recent Bank Transactions (INR)</h3>
                  <Link to="/transactions" className="text-xs text-cyan-400 font-semibold hover:underline">
                    View Passbook →
                  </Link>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Zomato UPI Transfer", category: "Food & Dining", amount: "-₹850.00", date: "Today, 1:24 PM", icon: "🍔", color: "text-white" },
                    { name: "Salary Payout (TCS)", category: "Salary Credit", amount: "+₹1,85,000.00", date: "Jul 1, 2026", icon: "💰", color: "text-emerald-400" },
                    { name: "Electricity Bill (BESCOM)", category: "Utilities", amount: "-₹2,340.00", date: "Jul 18, 2026", icon: "⚡", color: "text-white" },
                    { name: "Tax-Saver FD Monthly Interest", category: "Interest Credit", amount: "+₹3,690.00", date: "Jul 15, 2026", icon: "📈", color: "text-amber-400" },
                  ].map((tx, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                          {tx.icon}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{tx.name}</div>
                          <div className="text-xs text-slate-400">{tx.category} • {tx.date}</div>
                        </div>
                      </div>
                      <div className={`font-mono font-bold text-sm ${tx.color}`}>{tx.amount}</div>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>

            {/* Right Column (1 Col): 3D RuPay Card Spotlight */}
            <div className="space-y-6">
              {/* 3D RuPay Metal Card Canvas */}
              <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">Active RuPay Card</h3>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    NCMC Enabled 🇮🇳
                  </span>
                </div>

                <CreditCard3DCanvas cardholderName="ROHIT RATHORE" lastFour="9102" expiry="07/29" tier="RUPAY_PLATINUM" />

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link to="/cards" className="py-2.5 text-center text-xs font-semibold bg-white/10 hover:bg-white/20 rounded-xl text-white">
                    Freeze Card
                  </Link>
                  <Link to="/cards" className="py-2.5 text-center text-xs font-semibold bg-white/10 hover:bg-white/20 rounded-xl text-white">
                    View CVV
                  </Link>
                </div>
              </div>

              {/* Account Details & IFSC Code Card */}
              <FloatingCard className="p-6 space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center justify-between">
                  <span>Account Credentials</span>
                  <span className="text-xs text-emerald-400">KYC Verified ✓</span>
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 rounded-xl bg-white/5">
                    <span className="text-slate-400">Account No:</span>
                    <span className="font-bold text-white">50100489201945</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-white/5">
                    <span className="text-slate-400">IFSC Code:</span>
                    <span className="font-bold text-cyan-300">SBAIN000108</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-white/5">
                    <span className="text-slate-400">UPI ID:</span>
                    <span className="font-bold text-emerald-400">rohit@smartbank</span>
                  </div>
                </div>
                <Link to="/loans" className="block w-full py-3 text-center text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl shadow-md text-white">
                  Apply for Pre-Approved Personal Loan
                </Link>
              </FloatingCard>
            </div>
          </div>
        </div>
      </PageTransition>
    </CustomerDashboardLayout>
  );
};
