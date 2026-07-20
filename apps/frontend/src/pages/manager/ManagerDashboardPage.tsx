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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Branch Treasury & Command Cockpit
              </h1>
              <p className="text-sm text-slate-400">Branch Code: SBAIN000108 • Mumbai Main Regional Hub</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
              Branch Net Revenue: ₹1.84 Crores (Q2 FY26)
            </div>
          </div>

          {/* Key Branch Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Branch Total Deposits", val: "₹48.2 Crores", color: "text-emerald-400" },
              { label: "Vault Cash Reserve", val: "₹12.4 Crores", color: "text-cyan-400" },
              { label: "Customer MoM Growth", val: "+18.4% (12,450 Users)", color: "text-amber-300" },
              { label: "Locker Occupancy", val: "94.2% (188/200 Lockers)", color: "text-purple-400" },
            ].map((metric, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-1">
                <div className="text-xs text-slate-400">{metric.label}</div>
                <div className={`text-xl font-bold font-mono ${metric.color}`}>{metric.val}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Branch Cashflow & Revenue Graph (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white text-base">Branch Liquidity & Cashflow Canvas</h3>
                  <span className="text-xs text-emerald-400 font-mono">NIM: 3.85% p.a.</span>
                </div>
                <AnimatedCashflowChart />
              </FloatingCard>

              {/* High Value Transaction Approvals (> ₹25 Lakhs) */}
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-base">High-Value Wire Approvals (&gt; ₹25 Lakhs)</h3>

                <div className="space-y-3">
                  {highValueWires.map((wire, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedWire(wire)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedWire?.id === wire.id
                          ? "bg-amber-500/10 border-amber-500/50 text-white"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between font-bold text-sm">
                        <span>{wire.id} — {wire.sender}</span>
                        <span className="font-mono text-emerald-400">{wire.amount}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
                        <span>Beneficiary: {wire.beneficiary}</span>
                        <span className="text-amber-300 font-bold">{wire.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>

            {/* Manager Approval Actions Column (1 Col) */}
            <div className="space-y-6">
              {selectedWire ? (
                <FloatingCard className="p-6 space-y-4">
                  <h3 className="font-bold text-white text-base">Authorize High-Value Wire</h3>
                  <div className="p-3 rounded-xl bg-white/5 font-mono text-xs space-y-1">
                    <div>Wire ID: <span className="text-white font-bold">{selectedWire.id}</span></div>
                    <div>Amount: <span className="text-emerald-400 font-bold">{selectedWire.amount}</span></div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setWireActionDone(`Wire ${selectedWire.id} Authorized & Dispatched`)}
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl font-bold text-xs text-white"
                    >
                      Authorize Wire Disbursement
                    </button>
                    <button
                      onClick={() => setWireActionDone(`Wire ${selectedWire.id} Rejected & Frozen`)}
                      className="w-full py-3 bg-red-500/20 text-red-300 border border-red-500/40 rounded-xl font-bold text-xs"
                    >
                      Reject & Escalate to Fraud Board
                    </button>
                  </div>
                </FloatingCard>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 text-center text-xs text-slate-400">
                  Select a high-value wire transaction to inspect and authorize.
                </div>
              )}
            </div>
          </div>

          {/* Action Success Modal */}
          {wireActionDone && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-3xl flex items-center justify-center mx-auto">
                  🏛️
                </div>
                <h3 className="text-lg font-bold text-white">Manager Action Executed!</h3>
                <p className="text-xs text-slate-300">{wireActionDone}</p>
                <button
                  onClick={() => setWireActionDone("")}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 font-bold text-white text-xs rounded-xl"
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
