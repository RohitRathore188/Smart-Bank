import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";

export const EmployeeTransactionsPage: React.FC = () => {
  const [flaggedTxs, setFlaggedTxs] = useState([
    { id: "aml_901", user: "Alex Morgan", amount: "$85,000.00", recipient: "DE89 3704 0044 0532 0130 00", riskScore: 94, reason: "Rapid velocity transfer to unverified international IBAN" },
    { id: "aml_902", user: "Sarah Connor", amount: "$12,400.00", recipient: "US89 SMAR 9012 3849 1023 84", riskScore: 88, reason: "Structuring threshold anomaly detected by Gemini AI" },
    { id: "aml_903", user: "Michael Vance", amount: "$4,500.00", recipient: "GB89 SMAR 4819 2049 1823 94", riskScore: 76, reason: "First-time wire to high-risk jurisdiction" },
  ]);

  const handleAction = (id: string, action: "RELEASE" | "HOLD") => {
    alert(`Transaction ${id} action performed: ${action}`);
    setFlaggedTxs(flaggedTxs.filter(t => t.id !== id));
  };

  return (
    <EmployeePortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">AML Transaction Review & Hold Queue</h1>
            <p className="text-sm text-slate-400">High-risk transaction evaluations flagged by Gemini AI Fraud Shield</p>
          </div>
        </div>

        <div className="space-y-4">
          {flaggedTxs.map((tx) => (
            <div key={tx.id} className="p-6 rounded-3xl bg-slate-900/60 border border-red-500/30 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-white text-lg">{tx.user} — <span className="font-mono text-cyan-400">{tx.amount}</span></div>
                  <div className="text-xs text-slate-400">Recipient IBAN: {tx.recipient}</div>
                </div>
                <span className="font-mono font-bold text-xs bg-red-500/20 text-red-300 px-3 py-1 rounded-full border border-red-500/40">
                  Risk Score: {tx.riskScore}/100
                </span>
              </div>

              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300">
                🚨 <span className="font-semibold">Gemini Flag Reason:</span> {tx.reason}
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => handleAction(tx.id, "HOLD")}
                  className="flex-1 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold text-xs rounded-xl border border-red-500/30"
                >
                  Block Transaction & Freeze Vault
                </button>
                <button
                  onClick={() => handleAction(tx.id, "RELEASE")}
                  className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 font-bold text-xs rounded-xl shadow-lg"
                >
                  Clear & Release Funds
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EmployeePortalLayout>
  );
};
