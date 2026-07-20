import React from "react";
import { Link } from "react-router-dom";
import { ManagerPortalLayout } from "../../components/layout/ManagerPortalLayout";

export const ManagerDashboardPage: React.FC = () => {
  return (
    <ManagerPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Branch & Treasury Overview</h1>
            <p className="text-sm text-slate-400">High-level liquidity monitoring, loan approvals, and staff expense controls</p>
          </div>
        </div>

        {/* Treasury Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Branch Reserve Liquidity", value: "$48.2M", change: "+4.2%", color: "text-amber-400", icon: "🏛️" },
            { label: "Loan Portfolio Outstandings", value: "$14.5M", change: "5.4% APR Avg", color: "text-emerald-400", icon: "💎" },
            { label: "Department Budget Allocations", value: "$2.4M", change: "68% Utilized", color: "text-cyan-400", icon: "📊" },
            { label: "Fraud Threat Index", value: "LOW (2.1%)", change: "Shield Active", color: "text-purple-400", icon: "🛡️" },
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

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Loan Approvals Queue */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-base">Pending Credit & Loan Applications</h3>
              <Link to="/manager/loans" className="text-xs text-amber-400 font-semibold hover:underline">View All Queue →</Link>
            </div>

            <div className="space-y-3">
              {[
                { applicant: "Acme Logistics Corp", amount: "$250,000", score: "810/850", term: "36 mos" },
                { applicant: "Cybernet Systems Inc", amount: "$120,000", score: "790/850", term: "24 mos" },
                { applicant: "Elena Rostova (VIP)", amount: "$45,000", score: "775/850", term: "12 mos" },
              ].map((loan, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white text-sm">{loan.applicant} — <span className="font-mono text-amber-400">{loan.amount}</span></div>
                    <div className="text-xs text-slate-400">Score: {loan.score} • Term: {loan.term}</div>
                  </div>
                  <Link to="/manager/loans" className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold rounded-xl border border-amber-500/30">
                    Review Loan
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Department Expense Breakdown */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">Department Budget Allocation</h3>
            <div className="space-y-3">
              {[
                { dept: "Engineering & Cloud Infra", spent: "$840,000 / $1,000,000", pct: 84 },
                { dept: "Marketing & Acquisition", spent: "$420,000 / $600,000", pct: 70 },
                { dept: "Operations & Compliance", spent: "$290,000 / $500,000", pct: 58 },
                { dept: "Legal & Auditing", spent: "$120,000 / $300,000", pct: 40 },
              ].map((d, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>{d.dept}</span>
                    <span className="font-mono text-amber-400">{d.spent}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ManagerPortalLayout>
  );
};
