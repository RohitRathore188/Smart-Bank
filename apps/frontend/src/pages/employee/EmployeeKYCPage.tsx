import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const EmployeeKYCPage: React.FC = () => {
  const [selectedKyc, setSelectedKyc] = useState<any>(null);
  const [approvalDecision, setApprovalDecision] = useState("");

  const kycQueue = [
    { id: "KYC-91024", name: "Rohit Rathore", pan: "ABCDE1234F", aadhaar: "•••• •••• 9102", liveness: "98.4% Match", status: "PENDING_VERIFICATION" },
    { id: "KYC-81920", name: "Priya Sharma", pan: "JKLMN5678P", aadhaar: "•••• •••• 4812", liveness: "96.2% Match", status: "PENDING_VERIFICATION" },
  ];

  return (
    <EmployeePortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Central KYC (CKYC) & Aadhaar eKYC Verification Queue
              </h1>
              <p className="text-sm text-slate-400">Video KYC (V-KYC) Liveness Score Inspection & Document Authorization</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inspection Queue List (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-base">Pending eKYC Verification Queue</h3>

                <div className="space-y-3">
                  {kycQueue.map((k, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedKyc(k)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedKyc?.id === k.id
                          ? "bg-emerald-500/10 border-emerald-500/50 text-white"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between font-bold text-sm">
                        <span>{k.id} — {k.name}</span>
                        <span className="text-emerald-400 font-mono">{k.liveness}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
                        <span>PAN: {k.pan} | Aadhaar: {k.aadhaar}</span>
                        <span className="text-amber-300 font-bold">{k.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>

            {/* Verification Actions (1 Col) */}
            <div className="space-y-6">
              {selectedKyc ? (
                <FloatingCard className="p-6 space-y-4">
                  <h3 className="font-bold text-white text-base">Verify Applicant Credentials</h3>

                  <div className="p-3 rounded-xl bg-white/5 font-mono text-xs space-y-1">
                    <div>Applicant: <span className="text-white font-bold">{selectedKyc.name}</span></div>
                    <div>PAN Card: <span className="text-cyan-300">{selectedKyc.pan}</span></div>
                    <div>Liveness Score: <span className="text-emerald-400 font-bold">{selectedKyc.liveness}</span></div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setApprovalDecision(`eKYC Approved & CKYC Number Issued for ${selectedKyc.name}!`)}
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl font-bold text-xs text-white"
                    >
                      Approve eKYC & Activate Vault
                    </button>
                    <button
                      onClick={() => setApprovalDecision(`eKYC Application Rejected for ${selectedKyc.name}`)}
                      className="w-full py-3 bg-red-500/20 text-red-300 border border-red-500/40 rounded-xl font-bold text-xs"
                    >
                      Reject Application (Request Resubmission)
                    </button>
                  </div>
                </FloatingCard>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 text-center text-xs text-slate-400">
                  Select an eKYC applicant to inspect documents and authorize.
                </div>
              )}
            </div>
          </div>

          {/* Decision Confirmation Modal */}
          {approvalDecision && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  🆔
                </div>
                <h3 className="text-lg font-bold text-white">eKYC Decision Logged!</h3>
                <p className="text-xs text-slate-300">{approvalDecision}</p>
                <button
                  onClick={() => setApprovalDecision("")}
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
