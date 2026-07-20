import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";
import { useAuth } from "../../context/AuthContext";

export const CustomerSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [panNumber] = useState("ABCDE1234F");
  const [ckycNumber] = useState("2009182049182");
  const [complaintText, setComplaintText] = useState("");
  const [isComplaintSubmitted, setIsComplaintSubmitted] = useState(false);

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText) return;
    setIsComplaintSubmitted(true);
  };

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Profile, eKYC & RBI Dispute Grievance
              </h1>
              <p className="text-sm text-slate-400">Manage Identity Credentials, Central KYC (CKYC) & RBI Ombudsman Complaints</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Identity & eKYC Details (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-6">
                <h3 className="font-bold text-white text-base">KYC Credentials & Identity Status</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-slate-400">Account Holder Name</span>
                    <div className="font-bold text-white text-sm">{user?.first_name || "Rohit"} {user?.last_name || "Rathore"}</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-slate-400">PAN Card Number</span>
                    <div className="font-bold text-cyan-300 text-sm">{panNumber} (VERIFIED ✓)</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-slate-400">Aadhaar eKYC Vault</span>
                    <div className="font-bold text-emerald-400 text-sm">•••• •••• 9102 (VERIFIED ✓)</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-slate-400">Central KYC (CKYC) Registry ID</span>
                    <div className="font-bold text-amber-300 text-sm">{ckycNumber}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🆔</span>
                    <div>
                      <div className="text-xs font-bold text-emerald-300">Video KYC (V-KYC) Status: Fully Verified</div>
                      <p className="text-[10px] text-slate-400">Your account enjoys unlimited daily transaction velocity limits under RBI guidelines.</p>
                    </div>
                  </div>
                </div>
              </FloatingCard>

              {/* RBI Ombudsman Dispute Form */}
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-base">Register Grievance / RBI Ombudsman Dispute</h3>
                <p className="text-xs text-slate-400">If your query is unaddressed within 30 days, tickets are auto-escalated to the RBI Integrated Ombudsman Scheme.</p>

                <form onSubmit={handleComplaintSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Dispute Category</label>
                    <select className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs">
                      <option>UPI / Interbank Failed Transaction</option>
                      <option>Unauthorized Card Transaction</option>
                      <option>Fixed Deposit Interest Variance</option>
                      <option>Loan EMI & Credit Score Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Complaint Description</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your issue with transaction reference details..."
                      value={complaintText}
                      onChange={(e) => setComplaintText(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl font-bold text-xs text-white shadow-lg"
                  >
                    Register Official Grievance Ticket
                  </button>
                </form>
              </FloatingCard>
            </div>

            {/* Side Info */}
            <div className="space-y-6">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-sm">Nominee Details</h3>
                <div className="p-3 rounded-xl bg-white/5 font-mono text-xs space-y-1">
                  <div className="text-slate-400">Nominee Name: <span className="text-white font-bold">SAVITRI RATHORE</span></div>
                  <div className="text-slate-400">Relationship: <span className="text-white">MOTHER</span></div>
                  <div className="text-slate-400">Allocation: <span className="text-emerald-400 font-bold">100%</span></div>
                </div>
              </FloatingCard>
            </div>
          </div>

          {/* Dispute Ticket Confirmation Modal */}
          {isComplaintSubmitted && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  🎫
                </div>
                <h3 className="text-xl font-bold text-white">Grievance Ticket Registered!</h3>
                <p className="text-xs text-slate-300">
                  Your ticket has been logged. Our Grievance Nodal Officer will address this within 24 hours.
                </p>
                <div className="p-3 rounded-xl bg-white/5 font-mono text-[11px] text-slate-400 text-left space-y-1">
                  <div>Ticket ID: <span className="text-white">GRV-{Math.floor(Math.random() * 900000 + 100000)}</span></div>
                  <div>RBI Ombudsman Escalation SLA: <span className="text-amber-300 font-bold">30 Days</span></div>
                </div>
                <button
                  onClick={() => setIsComplaintSubmitted(false)}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 font-bold text-white text-xs rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </CustomerDashboardLayout>
  );
};
