import React, { useState } from "react";
import { ManagerPortalLayout } from "../../components/layout/ManagerPortalLayout";

export const ManagerLoanApprovalPage: React.FC = () => {
  const [loans, setLoans] = useState([
    { id: "ln_101", applicant: "Acme Logistics Corp", amount: "$250,000", score: "810/850", term: "36 mos", apr: "5.4%", purpose: "Fleet Expansion", status: "PENDING" },
    { id: "ln_102", applicant: "Cybernet Systems Inc", amount: "$120,000", score: "790/850", term: "24 mos", apr: "5.8%", purpose: "Server Hardware", status: "PENDING" },
    { id: "ln_103", applicant: "Elena Rostova (VIP)", amount: "$45,000", score: "775/850", term: "12 mos", apr: "4.9%", purpose: "Real Estate Liquidity", status: "PENDING" },
  ]);

  const handleDecision = (id: string, decision: "APPROVED" | "DENIED") => {
    alert(`Loan Application ${id} has been ${decision}! Disbursement instruction sent.`);
    setLoans(loans.filter(l => l.id !== id));
  };

  return (
    <ManagerPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Loan Approvals & Credit Underwriting</h1>
          <p className="text-sm text-slate-400">Review high-value corporate credit lines and override APR risk tiers</p>
        </div>

        <div className="space-y-4">
          {loans.map((l) => (
            <div key={l.id} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-white text-lg">{l.applicant} — <span className="font-mono text-amber-400">{l.amount}</span></h3>
                  <div className="text-xs text-slate-400">Purpose: {l.purpose} • Term: {l.term}</div>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  AI Score: {l.score}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <div className="text-slate-400 uppercase">Calculated APR</div>
                  <div className="text-sm font-mono font-bold text-white mt-0.5">{l.apr}</div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase">Underwriting Risk</div>
                  <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">LOW (Tier 1)</div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase">Collateral Hold</div>
                  <div className="text-sm font-mono font-bold text-amber-400 mt-0.5">USD Vault Reserve</div>
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => handleDecision(l.id, "DENIED")}
                  className="flex-1 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold text-xs rounded-xl border border-red-500/30"
                >
                  Deny Application
                </button>
                <button
                  onClick={() => handleDecision(l.id, "APPROVED")}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-xs text-white rounded-xl shadow-lg shadow-amber-500/20"
                >
                  Approve & Disburse Credit Line
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ManagerPortalLayout>
  );
};
