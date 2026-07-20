import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const EmployeeComplaintsPage: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [resolutionText, setResolutionText] = useState("");
  const [isResolvedMsg, setIsResolvedMsg] = useState("");

  const tickets = [
    { id: "GRV-910241", customer: "Rohit Rathore", category: "UPI Failed Credit", date: "Jul 20, 2026", slaHours: 22, desc: "₹850 deducted via UPI but merchant reported timeout." },
    { id: "GRV-849102", customer: "Ananya Sharma", category: "FD Maturity Payout", date: "Jul 19, 2026", slaHours: 12, desc: "FD payout interest rate variance inquiry." },
  ];

  return (
    <EmployeePortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Grievance Tickets & Customer Support
              </h1>
              <p className="text-sm text-slate-400">RBI Ombudsman Escalation SLA Clock & Support Ticket Resolution</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ticket Queue (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-base">Open Grievance Tickets</h3>

                <div className="space-y-3">
                  {tickets.map((t, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedTicket(t)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedTicket?.id === t.id
                          ? "bg-emerald-500/10 border-emerald-500/50 text-white"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between font-bold text-sm">
                        <span>{t.id} — {t.customer}</span>
                        <span className="text-amber-300 font-mono">SLA: {t.slaHours}h Remaining</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{t.category} • {t.desc}</div>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>

            {/* Ticket Resolution Studio (1 Col) */}
            <div className="space-y-6">
              {selectedTicket ? (
                <FloatingCard className="p-6 space-y-4">
                  <h3 className="font-bold text-white text-base">Resolve Ticket {selectedTicket.id}</h3>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-300">Staff Resolution Remarks</label>
                    <textarea
                      rows={4}
                      placeholder="Enter resolution details or refund confirmation UTR..."
                      value={resolutionText}
                      onChange={(e) => setResolutionText(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                    />

                    <button
                      onClick={() => setIsResolvedMsg(`Ticket ${selectedTicket.id} marked as RESOLVED!`)}
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl font-bold text-xs text-white"
                    >
                      Submit Ticket Resolution & Notify Customer
                    </button>
                  </div>
                </FloatingCard>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 text-center text-xs text-slate-400">
                  Select a grievance ticket to inspect and submit resolution.
                </div>
              )}
            </div>
          </div>

          {/* Resolution Confirmation Modal */}
          {isResolvedMsg && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  🎫
                </div>
                <h3 className="text-lg font-bold text-white">Ticket Resolved!</h3>
                <p className="text-xs text-slate-300">{isResolvedMsg}</p>
                <button
                  onClick={() => setIsResolvedMsg("")}
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
