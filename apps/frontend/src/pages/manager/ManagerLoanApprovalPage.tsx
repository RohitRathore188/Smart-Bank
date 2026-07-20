import React, { useState } from "react";
import { ManagerPortalLayout } from "../../components/layout/ManagerPortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const ManagerLoanApprovalPage: React.FC = () => {
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [loanDecisionMsg, setLoanDecisionMsg] = useState("");

  const loanQueue = [
    { id: "LN-910284", applicant: "Global Infra Solutions Pvt Ltd", amount: "₹1,50,00,000.00", type: "MSME Supply Chain Credit", score: 820, risk: "LOW RISK (CGTMSE Collateral)" },
    { id: "LN-481920", applicant: "Dr. Vikramaditya Singh", amount: "₹45,00,000.00", type: "Home Loan Top-Up", score: 785, risk: "MEDIUM RISK" },
  ];

  return (
    <ManagerPortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                High-Value Credit Line Underwriting Queue
              </h1>
              <p className="text-sm text-slate-400">Branch Credit Sanctions Above ₹10 Lakhs • CIBIL & AI Cashflow Evaluation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Credit Queue (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-base">Underwriting Applications Queue</h3>

                <div className="space-y-3">
                  {loanQueue.map((loan, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedLoan(loan)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedLoan?.id === loan.id
                          ? "bg-emerald-500/10 border-emerald-500/50 text-white"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between font-bold text-sm">
                        <span>{loan.id} — {loan.applicant}</span>
                        <span className="font-mono text-emerald-400">{loan.amount}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
                        <span>{loan.type} | CIBIL: {loan.score}</span>
                        <span className="text-emerald-400 font-bold">{loan.risk}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>

            {/* Decision Hub (1 Col) */}
            <div className="space-y-6">
              {selectedLoan ? (
                <FloatingCard className="p-6 space-y-4">
                  <h3 className="font-bold text-white text-base">Manager Sanction Signoff</h3>
                  <div className="p-3 rounded-xl bg-white/5 font-mono text-xs space-y-1">
                    <div>Applicant: <span className="text-white font-bold">{selectedLoan.applicant}</span></div>
                    <div>Facility: <span className="text-white">{selectedLoan.type}</span></div>
                    <div>Sanction Amount: <span className="text-emerald-400 font-bold">{selectedLoan.amount}</span></div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setLoanDecisionMsg(`Loan ${selectedLoan.id} Sanctioned & Disbursed!`)}
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl font-bold text-xs text-white"
                    >
                      Approve & Sanction Credit Line
                    </button>
                    <button
                      onClick={() => setLoanDecisionMsg(`Loan ${selectedLoan.id} Rejected`)}
                      className="w-full py-3 bg-red-500/20 text-red-300 border border-red-500/40 rounded-xl font-bold text-xs"
                    >
                      Reject Application
                    </button>
                  </div>
                </FloatingCard>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 text-center text-xs text-slate-400">
                  Select a credit application to inspect score and sanction.
                </div>
              )}
            </div>
          </div>

          {/* Decision Confirmation Modal */}
          {loanDecisionMsg && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  💎
                </div>
                <h3 className="text-lg font-bold text-white">Underwriting Decision Logged!</h3>
                <p className="text-xs text-slate-300">{loanDecisionMsg}</p>
                <button
                  onClick={() => setLoanDecisionMsg("")}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 font-bold text-white text-xs rounded-xl"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </ManagerPortalLayout>
  );
};
