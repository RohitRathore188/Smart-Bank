import React from "react";
import { ManagerPortalLayout } from "../../components/layout/ManagerPortalLayout";

export const ManagerReportsPage: React.FC = () => {
  return (
    <ManagerPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Branch Treasury & Financial Reports</h1>
          <p className="text-sm text-slate-400">Generate executive P&L, loan portfolio yield, and regulatory reserve reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Branch Profit & Loss (P&L) Statement", desc: "Consolidated revenue from vault yields, loan interest, and FX spreads.", icon: "📈" },
            { title: "Loan Underwriting Risk Summary", desc: "Detailed portfolio breakdown across credit risk tiers (Tiers 1-4).", icon: "💎" },
            { title: "Corporate Expense Allowance Audit", desc: "Department spend audit across all staff virtual cards.", icon: "💳" },
            { title: "Federal Reserve Ratio Compliance", desc: "Branch liquidity reserve verification against regulatory baseline.", icon: "🏛️" },
          ].map((report, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
              <div className="text-3xl">{report.icon}</div>
              <h3 className="font-bold text-white text-base">{report.title}</h3>
              <p className="text-xs text-slate-400">{report.desc}</p>
              <button
                onClick={() => alert(`Downloading ${report.title}...`)}
                className="w-full py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/30"
              >
                Download Executive Report PDF / CSV 📥
              </button>
            </div>
          ))}
        </div>
      </div>
    </ManagerPortalLayout>
  );
};
