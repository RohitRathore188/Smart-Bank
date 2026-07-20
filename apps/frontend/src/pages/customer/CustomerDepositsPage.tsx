import React from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";

export const CustomerDepositsPage: React.FC = () => {
  return (
    <CustomerDashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Deposits & Statements</h1>
          <p className="text-sm text-slate-400">Inbound wire instructions and formal audit statement exporter</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Wire Instructions Card */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">Inbound Wire / ACH Instructions</h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-slate-400">Beneficiary Name:</span> <span className="text-white font-bold">Alex Morgan (SmartBank Vault)</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-slate-400">Routing Number (ACH / FedWire):</span> <span className="text-cyan-400 font-bold">121000358</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-slate-400">Account Number:</span> <span className="text-white font-bold">90123849102384</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <span className="text-slate-400">Bank Address:</span> <span className="text-white">SmartBank AI N.A., 100 Financial Way, NY</span>
              </div>
            </div>
            <button onClick={() => alert("Copied deposit details to clipboard!")} className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs rounded-xl">
              Copy Full Wiring Details
            </button>
          </div>

          {/* Statement Generator Card */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">Generate Monthly Statements</h3>
            <div className="space-y-2">
              {["July 2026 (Current)", "June 2026", "May 2026", "Q1 2026 Tax Audit Summary"].map((month, i) => (
                <div key={i} className="p-3 rounded-2xl bg-white/5 flex justify-between items-center text-xs">
                  <span className="text-white font-medium">{month}</span>
                  <button onClick={() => alert(`Downloading PDF Statement for ${month}...`)} className="text-cyan-400 font-bold hover:underline">
                    Download PDF 📥
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};
