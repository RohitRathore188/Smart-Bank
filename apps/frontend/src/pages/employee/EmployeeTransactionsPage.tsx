import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const EmployeeTransactionsPage: React.FC = () => {
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [actionDone, setActionDone] = useState("");

  const transactions = [
    { utr: "RTGS/SBIN91028401", sender: "Vikramaditya Singh", amount: "₹48,50,000.00", mode: "RTGS", risk: "HIGH RISK (Geolocation Anomaly)", beneficiary: "HDFC0001092" },
    { utr: "NEFT/SBIN18204918", sender: "Global Infra Ltd", amount: "₹12,00,000.00", mode: "NEFT", risk: "MEDIUM RISK (High Volume)", beneficiary: "ICIC0000182" },
    { utr: "UPI/SBIN98204911", sender: "Savitri Rathore", amount: "₹1,50,000.00", mode: "UPI", risk: "LOW RISK (Normal)", beneficiary: "rohit@smartbank" },
  ];

  return (
    <EmployeePortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AML Transaction Monitoring & Beneficiary Approval Queue
              </h1>
              <p className="text-sm text-slate-400">High-Velocity Wire Audit, Suspicious Transaction Hold & Interbank Approvals</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transaction Queue (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-base">Flagged Transaction Review Queue</h3>

                <div className="space-y-3">
                  {transactions.map((tx, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedTx(tx)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedTx?.utr === tx.utr
                          ? "bg-emerald-500/10 border-emerald-500/50 text-white"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between font-bold text-sm">
                        <span>{tx.sender} ({tx.mode})</span>
                        <span className="font-mono text-emerald-400">{tx.amount}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono mt-1">
                        <span className="text-slate-400">UTR: {tx.utr}</span>
                        <span className={tx.risk.includes("HIGH") ? "text-red-400 font-bold" : "text-amber-300"}>
                          {tx.risk}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>

            {/* Staff Review Actions (1 Col) */}
            <div className="space-y-6">
              {selectedTx ? (
                <FloatingCard className="p-6 space-y-4">
                  <h3 className="font-bold text-white text-base">Review & Action Hub</h3>
                  <div className="p-3 rounded-xl bg-white/5 font-mono text-xs space-y-1">
                    <div>Sender: <span className="text-white font-bold">{selectedTx.sender}</span></div>
                    <div>Beneficiary: <span className="text-white font-bold">{selectedTx.beneficiary}</span></div>
                    <div>Amount: <span className="text-emerald-400 font-bold">{selectedTx.amount}</span></div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setActionDone(`Transaction ${selectedTx.utr} Released & Settled`)}
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl font-bold text-xs text-white"
                    >
                      Release & Settle Wire
                    </button>
                    <button
                      onClick={() => setActionDone(`Transaction ${selectedTx.utr} Placed on AML Hold`)}
                      className="w-full py-3 bg-red-500/20 text-red-300 border border-red-500/40 rounded-xl font-bold text-xs"
                    >
                      Hold Wire & Flag Suspicious (STR)
                    </button>
                    <button
                      onClick={() => setActionDone(`Beneficiary ${selectedTx.beneficiary} Approved`)}
                      className="w-full py-3 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-xl font-bold text-xs"
                    >
                      Approve Beneficiary Request
                    </button>
                  </div>
                </FloatingCard>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 text-center text-xs text-slate-400">
                  Select a transaction to perform AML monitoring actions.
                </div>
              )}
            </div>
          </div>

          {/* Action Success Modal */}
          {actionDone && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  ⚖️
                </div>
                <h3 className="text-lg font-bold text-white">AML Review Recorded!</h3>
                <p className="text-xs text-slate-300">{actionDone}</p>
                <button
                  onClick={() => setActionDone("")}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 font-bold text-white text-xs rounded-xl"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </EmployeePortalLayout>
  );
};
