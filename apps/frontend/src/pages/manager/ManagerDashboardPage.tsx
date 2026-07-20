import React, { useState } from "react";
import { ManagerPortalLayout } from "../../components/layout/ManagerPortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";
import { AnimatedCashflowChart } from "../../components/charts/AnimatedCashflowChart";

export const ManagerDashboardPage: React.FC = () => {
  const [selectedWire, setSelectedWire] = useState<any>(null);
  const [wireActionDone, setWireActionDone] = useState("");

  const highValueWires = [
    { id: "RTGS-910248", sender: "Reliance Retail Ltd", amount: "₹1,25,00,000.00", beneficiary: "TCS Global", status: "PENDING_MANAGER_APPROVAL" },
    { id: "NEFT-819204", sender: "Tata Motors Commercial", amount: "₹45,00,000.00", beneficiary: "Exide Batteries", status: "PENDING_MANAGER_APPROVAL" },
  ];

  return (
    <ManagerPortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Branch Treasury & Command Cockpit
              </h1>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Branch Code: SBAIN000108 • Mumbai Main Regional Hub</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono">
              Branch Net Revenue: ₹1.84 Crores (Q2 FY26)
            </div>
          </div>

          {/* Key Branch Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Branch Total Deposits", val: "₹48.2 Crores", color: "text-emerald-700" },
              { label: "Vault Cash Reserve", val: "₹12.4 Crores", color: "text-blue-700" },
              { label: "Customer MoM Growth", val: "+18.4% (12,450 Users)", color: "text-amber-700" },
              { label: "Locker Occupancy", val: "94.2% (188/200 Lockers)", color: "text-purple-700" },
            ].map((metric, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md space-y-1">
                <div className="text-xs font-semibold text-slate-500">{metric.label}</div>
                <div className={`text-xl font-extrabold font-mono ${metric.color}`}>{metric.val}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Branch Cashflow & Revenue Graph (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-4 bg-white border border-slate-200 shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-slate-900 text-base">Branch Liquidity & Cashflow Canvas</h3>
                  <span className="text-xs text-emerald-700 font-mono font-bold">NIM: 3.85% p.a.</span>
                </div>
                <AnimatedCashflowChart />
              </FloatingCard>

              {/* High Value Transaction Approvals (> ₹25 Lakhs) */}
              <FloatingCard className="p-6 space-y-4 bg-white border border-slate-200 shadow-md">
                <h3 className="font-extrabold text-slate-900 text-base">High-Value Wire Approvals (&gt; ₹25 Lakhs)</h3>

                <div className="space-y-3">
                  {highValueWires.map((wire, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedWire(wire)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedWire?.id === wire.id
                          ? "bg-amber-50 border-amber-300 text-slate-900 shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex justify-between font-bold text-sm">
                        <span>{wire.id} — {wire.sender}</span>
                        <span className="font-mono text-emerald-700">{wire.amount}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono mt-1">
                        <span className="text-slate-500 font-medium">Beneficiary: {wire.beneficiary}</span>
                        <span className="text-amber-700 font-bold">{wire.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>

            {/* Manager Approval Actions Column (1 Col) */}
            <div className="space-y-6">
              {selectedWire ? (
                <FloatingCard className="p-6 space-y-4 bg-white border border-slate-200 shadow-md">
                  <h3 className="font-extrabold text-slate-900 text-base">Authorize High-Value Wire</h3>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1">
                    <div className="text-slate-600 font-medium">Wire ID: <span className="text-slate-900 font-bold">{selectedWire.id}</span></div>
                    <div className="text-slate-600 font-medium">Amount: <span className="text-emerald-700 font-bold">{selectedWire.amount}</span></div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setWireActionDone(`Wire ${selectedWire.id} Authorized & Dispatched`)}
                      className="w-full py-3 bg-amber-600 hover:bg-amber-700 rounded-xl font-bold text-xs text-white shadow-md active:scale-95 transition-transform"
                    >
                      Authorize Wire Disbursement
                    </button>
                    <button
                      onClick={() => setWireActionDone(`Wire ${selectedWire.id} Rejected & Frozen`)}
                      className="w-full py-3 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 rounded-xl font-bold text-xs"
                    >
                      Reject & Escalate to Fraud Board
                    </button>
                  </div>
                </FloatingCard>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 font-medium">
                  Select a high-value wire transaction to inspect and authorize.
                </div>
              )}
            </div>
          </div>

          {/* Action Success Modal */}
          {wireActionDone && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white border border-amber-200 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 border border-amber-300 text-3xl flex items-center justify-center mx-auto">
                  🏛️
                </div>
                <h3 className="text-lg font-bold text-slate-900">Manager Action Executed!</h3>
                <p className="text-xs text-slate-600 font-medium">{wireActionDone}</p>
                <button
                  onClick={() => setWireActionDone("")}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 font-bold text-white text-xs rounded-xl shadow-md"
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
