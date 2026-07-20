import React from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";

export const EmployeeReportsPage: React.FC = () => {
  return (
    <EmployeePortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Compliance & Audit Reports</h1>
          <p className="text-sm text-slate-400">Generate regulatory SARs, daily ledger balances, and KYC audit logs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Daily Double-Entry Ledger Summary", desc: "Balanced debit/credit ledger verification across all vaults.", icon: "📑" },
            { title: "Suspicious Activity Report (SAR)", desc: "Export flagged high-risk AML transactions for FinCEN compliance.", icon: "🚨" },
            { title: "eKYC Audit Log Stream", desc: "Verification logs, passport OCR data, and liveness scores.", icon: "🆔" },
            { title: "Platform Liquidity & FX Position", desc: "Real-time position across USD, EUR, GBP, JPY reserve vaults.", icon: "🌐" },
          ].map((report, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
              <div className="text-3xl">{report.icon}</div>
              <h3 className="font-bold text-white text-base">{report.title}</h3>
              <p className="text-xs text-slate-400">{report.desc}</p>
              <button
                onClick={() => alert(`Downloading ${report.title}...`)}
                className="w-full py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-xs rounded-xl border border-purple-500/30"
              >
                Generate Report PDF / CSV 📥
              </button>
            </div>
          ))}
        </div>
      </div>
    </EmployeePortalLayout>
  );
};
