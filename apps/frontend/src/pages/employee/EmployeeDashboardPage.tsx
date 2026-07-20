import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const EmployeeDashboardPage: React.FC = () => {
  const [cashDepositAmount, setCashDepositAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isDepositDone, setIsDepositDone] = useState(false);

  const handleCashDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cashDepositAmount || !accountNumber) return;
    setIsDepositDone(true);
  };

  return (
    <EmployeePortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Branch Staff Cockpit & Cash Counter
              </h1>
              <p className="text-sm text-slate-400">SmartBank Branch Code: SBAIN000108 (Mumbai Main Branch)</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Teller Cash Balance: ₹45,00,000.00
            </div>
          </div>

          {/* KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Pending KYC Approvals", val: "14 Queue Items", color: "text-amber-400", bg: "bg-amber-500/10" },
              { label: "Account Freeze Alerts", val: "2 Suspicious", color: "text-red-400", bg: "bg-red-500/10" },
              { label: "High-Value Beneficiary Requests", val: "8 Pending", color: "text-cyan-400", bg: "bg-cyan-500/10" },
              { label: "Cash Counter Txns Today", val: "142 Processed", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            ].map((kpi, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-1">
                <div className="text-xs text-slate-400">{kpi.label}</div>
                <div className={`text-xl font-bold font-mono ${kpi.color}`}>{kpi.val}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cash Counter Teller Studio (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="font-bold text-white text-base">Cash Counter Teller Deposit / Withdrawal</h3>
                  <span className="text-xs font-mono text-emerald-400">Vault Balance Verified ✓</span>
                </div>

                <form onSubmit={handleCashDeposit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Customer Account Number</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 50100489201945"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Cash Amount (₹ INR)</label>
                      <input
                        type="number"
                        required
                        placeholder="Enter amount (₹)"
                        value={cashDepositAmount}
                        onChange={(e) => setCashDepositAmount(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-lg font-bold"
                      />
                    </div>
                  </div>

                  {/* Physical Denomination Tally */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 font-mono text-xs">
                    <div className="text-slate-400 font-bold uppercase">Physical Cash Denomination Tally</div>
                    <div className="grid grid-cols-3 gap-2 text-slate-300">
                      <div>₹500 Notes: <span className="text-white font-bold">8,000 (₹40,00,000)</span></div>
                      <div>₹200 Notes: <span className="text-white font-bold">2,500 (₹5,00,000)</span></div>
                      <div>₹100 Notes: <span className="text-white font-bold">0 (₹0)</span></div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20"
                  >
                    Authorize Cash Counter Deposit & Print Receipt
                  </button>
                </form>
              </FloatingCard>
            </div>

            {/* Side Operations Queue (1 Col) */}
            <div className="space-y-6">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-sm">Quick Staff Dispatch Tasks</h3>
                <div className="space-y-2 text-xs">
                  <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left font-bold text-white flex justify-between">
                    <span>eKYC Inspection Queue</span>
                    <span className="text-amber-400 font-mono">14</span>
                  </button>
                  <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left font-bold text-white flex justify-between">
                    <span>Issue RuPay Debit Card</span>
                    <span className="text-emerald-400">Dispatch</span>
                  </button>
                  <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left font-bold text-white flex justify-between">
                    <span>Print Physical Passbook</span>
                    <span className="text-cyan-400">Print</span>
                  </button>
                </div>
              </FloatingCard>
            </div>
          </div>

          {/* Deposit Confirmation Modal */}
          {isDepositDone && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  💵
                </div>
                <h3 className="text-xl font-bold text-white">Cash Deposit Processed!</h3>
                <p className="text-xs text-slate-300">
                  ₹{parseFloat(cashDepositAmount).toLocaleString()} has been credited into Account <strong>{accountNumber}</strong>.
                </p>
                <button
                  onClick={() => setIsDepositDone(false)}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 font-bold text-white text-xs rounded-xl"
                >
                  Print Teller Slip & Done
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </EmployeePortalLayout>
  );
};
