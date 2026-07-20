import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const EmployeeDashboardPage: React.FC = () => {
  const [cash500, setCash500] = useState(8000); // 8000 notes = 40,00,000
  const [cash200, setCash200] = useState(2500); // 2500 notes = 5,00,000
  const [isCashTallySaved, setIsCashTallySaved] = useState(false);

  const totalVaultCash = cash500 * 500 + cash200 * 200;

  return (
    <EmployeePortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Cash Counter Teller Cockpit
              </h1>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Physical Cash Denomination Tally & Counter Vault Balance</p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold font-mono">
              Teller Limit: ₹50,00,000.00
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cash Tally Engine (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-6 bg-white border border-slate-200 shadow-md">
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <h3 className="font-extrabold text-slate-900 text-base">Physical Cash Denomination Counter</h3>
                  <span className="text-xs font-extrabold text-emerald-700 font-mono">Vault Balanced ✓</span>
                </div>

                <div className="space-y-4">
                  {/* ₹500 Notes */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">₹500 Currency Notes</div>
                      <div className="text-[11px] text-slate-500 font-medium">Mahatma Gandhi New Series</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        value={cash500}
                        onChange={(e) => setCash500(parseInt(e.target.value) || 0)}
                        className="w-28 p-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-xs font-bold text-center"
                      />
                      <span className="text-xs font-mono font-extrabold text-slate-900 w-32 text-right">
                        ₹{(cash500 * 500).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* ₹200 Notes */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">₹200 Currency Notes</div>
                      <div className="text-[11px] text-slate-500 font-medium">Sanchi Stupa Series</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        value={cash200}
                        onChange={(e) => setCash200(parseInt(e.target.value) || 0)}
                        className="w-28 p-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-xs font-bold text-center"
                      />
                      <span className="text-xs font-mono font-extrabold text-slate-900 w-32 text-right">
                        ₹{(cash200 * 200).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Tally Summary */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex justify-between items-center font-mono">
                  <span className="text-xs font-bold text-slate-700">Total Counter Cash Balance:</span>
                  <span className="text-xl font-extrabold text-blue-700">₹{totalVaultCash.toLocaleString()}.00</span>
                </div>

                <button
                  onClick={() => setIsCashTallySaved(true)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-bold text-xs text-white shadow-md active:scale-95 transition-transform"
                >
                  Save Counter Cash Tally & Submit EOD Slip
                </button>
              </FloatingCard>
            </div>

            {/* Side Operations (1 Col) */}
            <div className="space-y-6">
              <FloatingCard className="p-6 space-y-4 bg-white border border-slate-200 shadow-md">
                <h3 className="font-extrabold text-slate-900 text-sm">Teller Counter Operations</h3>
                <div className="space-y-2 text-xs">
                  <a href="/employee/kyc" className="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 font-bold text-slate-900">
                    🆔 Aadhaar eKYC Inspection Queue
                  </a>
                  <a href="/employee/accounts" className="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 font-bold text-slate-900">
                    🔐 Locker Allocation & Freeze Controls
                  </a>
                  <a href="/employee/transactions" className="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 font-bold text-slate-900">
                    ⚖️ AML High-Risk Transaction Queue
                  </a>
                </div>
              </FloatingCard>
            </div>
          </div>

          {/* Tally Saved Modal */}
          {isCashTallySaved && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white border border-blue-200 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 border border-blue-300 text-3xl flex items-center justify-center mx-auto">
                  💵
                </div>
                <h3 className="text-lg font-bold text-slate-900">Counter Tally Verified!</h3>
                <p className="text-xs text-slate-600 font-medium">
                  End-of-day teller cash balance of ₹{totalVaultCash.toLocaleString()} has been reconciled with the main vault.
                </p>
                <button
                  onClick={() => setIsCashTallySaved(false)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs rounded-xl shadow-md"
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
