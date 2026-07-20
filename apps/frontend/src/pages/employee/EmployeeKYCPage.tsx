import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";

export const EmployeeKYCPage: React.FC = () => {
  const [selectedApplicant, setSelectedApplicant] = useState({
    id: "kyc_101",
    name: "John H. Miller",
    email: "john.miller@example.com",
    documentType: "US Passport",
    documentNumber: "P910283419",
    livenessScore: 99.4,
    status: "PENDING_REVIEW"
  });

  const [applicants, setApplicants] = useState([
    { id: "kyc_101", name: "John H. Miller", doc: "US Passport", country: "USA" },
    { id: "kyc_102", name: "Elena Rostova", doc: "EU National ID", country: "DEU" },
    { id: "kyc_103", name: "Kenji Sato", doc: "JP Residence Permit", country: "JPN" },
  ]);

  const handleApprove = () => {
    alert(`Approved eKYC Verification for ${selectedApplicant.name}. Account unlocked!`);
    setApplicants(applicants.filter(a => a.id !== selectedApplicant.id));
  };

  const handleReject = () => {
    alert(`Rejected eKYC for ${selectedApplicant.name}. Re-upload request dispatched.`);
    setApplicants(applicants.filter(a => a.id !== selectedApplicant.id));
  };

  return (
    <EmployeePortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">eKYC & Identity Verification Queue</h1>
          <p className="text-sm text-slate-400">Review passport document captures and biometric liveness scores</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applicants List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Applicants</h3>
            {applicants.map((a) => (
              <div
                key={a.id}
                onClick={() => setSelectedApplicant({ ...selectedApplicant, id: a.id, name: a.name })}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedApplicant.id === a.id ? "bg-purple-500/20 border-purple-500/50" : "bg-slate-900/60 border-white/10 hover:bg-white/5"
                }`}
              >
                <div className="font-bold text-white text-sm">{a.name}</div>
                <div className="text-xs text-slate-400">{a.doc} • {a.country}</div>
              </div>
            ))}
          </div>

          {/* Applicant Inspection View */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedApplicant.name}</h3>
                <div className="text-xs text-slate-400 font-mono">{selectedApplicant.email}</div>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Biometric Liveness: {selectedApplicant.livenessScore}%
              </span>
            </div>

            {/* Document Preview Box */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 h-48 flex flex-col justify-between relative overflow-hidden">
              <div className="text-xs font-mono text-purple-400 uppercase">Document Inspection: {selectedApplicant.documentType}</div>
              <div className="text-center font-mono text-slate-500 text-sm">
                [ ENCRYPTED HIGH-RES PASSPORT IMAGE CAPTURE ]
                <div className="text-xs text-slate-400 mt-1">Doc #: {selectedApplicant.documentNumber}</div>
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">OCR Edge Detection: PASSED • Sanctions Check: CLEAR</div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleReject}
                className="py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold text-sm rounded-xl border border-red-500/30"
              >
                Reject & Request Re-upload
              </button>
              <button
                onClick={handleApprove}
                className="py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-500/20"
              >
                Approve & Unlock Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </EmployeePortalLayout>
  );
};
