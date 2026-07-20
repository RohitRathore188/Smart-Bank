import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const EmployeeAccountsPage: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  const customers = [
    { name: "Rohit Rathore", acc: "50100489201945", pan: "ABCDE1234F", bal: "₹9,24,000.00", status: "ACTIVE", type: "Savings Regular", locker: "Locker #B-104 (Active)" },
    { name: "Ananya Sharma", acc: "50100789123412", pan: "FGHIJ5678K", bal: "₹5,65,200.00", status: "ACTIVE", type: "Corporate Salary", locker: "Unallocated" },
    { name: "Vikramaditya Singh", acc: "50100998877665", pan: "LMNOP9012Q", bal: "₹14,50,000.00", status: "SUSPICIOUS_HOLD", type: "Current Business", locker: "Locker #A-12 (Frozen)" },
  ];

  const triggerAction = (actionName: string) => {
    setActionSuccessMsg(`${actionName} completed successfully for Account ${selectedCustomer.acc}!`);
  };

  return (
    <EmployeePortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Customer Directory, Account Operations & Lockers
              </h1>
              <p className="text-sm text-slate-400">Issue Cards, Passbooks, Cheque Books & Allocate Safe Deposit Lockers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customer Directory List (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-base">Select Customer Account</h3>

                <div className="space-y-3">
                  {customers.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedCustomer(c)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedCustomer?.acc === c.acc
                          ? "bg-emerald-500/10 border-emerald-500/50 text-white"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between font-bold text-sm">
                        <span>{c.name} ({c.type})</span>
                        <span className="font-mono text-emerald-400">{c.bal}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
                        <span>Acc: {c.acc} | PAN: {c.pan}</span>
                        <span className={c.status === "ACTIVE" ? "text-emerald-400" : "text-red-400 font-bold"}>
                          {c.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>

            {/* Account Staff Action Hub (1 Col) */}
            <div className="space-y-6">
              {selectedCustomer ? (
                <FloatingCard className="p-6 space-y-4">
                  <h3 className="font-bold text-white text-base">Staff Operations Hub</h3>
                  <div className="text-xs text-slate-400 font-mono">Selected: <strong className="text-white">{selectedCustomer.name}</strong></div>

                  <div className="space-y-2">
                    <button
                      onClick={() => triggerAction("RuPay Platinum Debit Card Issued")}
                      className="w-full py-2.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold text-left px-3"
                    >
                      💳 Issue RuPay Platinum Card
                    </button>
                    <button
                      onClick={() => triggerAction("Physical Passbook Print Job Sent")}
                      className="w-full py-2.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-bold text-left px-3"
                    >
                      📄 Issue Physical Passbook
                    </button>
                    <button
                      onClick={() => triggerAction("25-Leaf CTS Cheque Book Dispatched")}
                      className="w-full py-2.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold text-left px-3"
                    >
                      ✉️ Issue CTS-2010 Cheque Book
                    </button>
                    <button
                      onClick={() => triggerAction("Safe Deposit Locker Assigned")}
                      className="w-full py-2.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold text-left px-3"
                    >
                      🔒 Allocate Safe Deposit Locker
                    </button>
                    <button
                      onClick={() => triggerAction(selectedCustomer.status === "ACTIVE" ? "Account Frozen" : "Account Unfrozen")}
                      className="w-full py-2.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl text-xs font-bold text-left px-3"
                    >
                      ⛔ {selectedCustomer.status === "ACTIVE" ? "Freeze Account (AML Hold)" : "Unfreeze Account"}
                    </button>
                  </div>
                </FloatingCard>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 text-center text-xs text-slate-400">
                  Select a customer account to perform staff operations.
                </div>
              )}
            </div>
          </div>

          {/* Action Success Modal */}
          {actionSuccessMsg && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-white">Staff Action Executed!</h3>
                <p className="text-xs text-slate-300">{actionSuccessMsg}</p>
                <button
                  onClick={() => setActionSuccessMsg("")}
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
