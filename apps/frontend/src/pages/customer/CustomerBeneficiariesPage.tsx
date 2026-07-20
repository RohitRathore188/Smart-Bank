import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const CustomerBeneficiariesPage: React.FC = () => {
  const [beneficiaries, setBeneficiaries] = useState([
    { name: "Ananya Sharma", vpa: "ananya@smartbank", acc: "50100789123412", ifsc: "SBAIN000108", bank: "SmartBank India" },
    { name: "Vikramaditya Singh", vpa: "vikram@upi", acc: "50100998877665", ifsc: "HDFC0001092", bank: "HDFC Bank" },
  ]);
  const [newName, setNewName] = useState("");
  const [newVPA, setNewVPA] = useState("");
  const [newAcc, setNewAcc] = useState("");
  const [newIFSC, setNewIFSC] = useState("SBAIN000108");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || (!newVPA && !newAcc)) return;
    setBeneficiaries([
      ...beneficiaries,
      { name: newName, vpa: newVPA || `${newName.toLowerCase().replace(/\s+/g, '')}@smartbank`, acc: newAcc || "50100" + Math.floor(Math.random() * 90000000 + 10000000), ifsc: newIFSC, bank: "SmartBank India" }
    ]);
    setNewName("");
    setNewVPA("");
    setNewAcc("");
    setIsAddModalOpen(false);
  };

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Saved Beneficiaries & Payees
              </h1>
              <p className="text-sm text-slate-400">Manage Trusted Interbank Contacts, VPA Handles & Instant Transfer Rails</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95 flex items-center space-x-1.5"
            >
              <span>+ Add New Beneficiary</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beneficiaries.map((b, i) => (
              <FloatingCard key={i} className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-600 flex items-center justify-center font-bold text-lg text-white">
                      {b.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{b.name}</h3>
                      <p className="text-xs text-slate-400">{b.bank}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    VERIFIED ✓
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 space-y-1 font-mono text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">UPI VPA:</span>
                    <span className="text-emerald-400 font-bold">{b.vpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account No:</span>
                    <span className="text-white">{b.acc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">IFSC Code:</span>
                    <span className="text-cyan-300">{b.ifsc}</span>
                  </div>
                </div>

                <a
                  href="/transactions"
                  className="block w-full py-2.5 text-center bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs text-white"
                >
                  Send Money Instantly
                </a>
              </FloatingCard>
            ))}
          </div>

          {/* Add Beneficiary Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">Add New Beneficiary</h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={handleAddBeneficiary} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">UPI VPA Handle (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. priya@smartbank"
                      value={newVPA}
                      onChange={(e) => setNewVPA(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Account Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 50100489201945"
                      value={newAcc}
                      onChange={(e) => setNewAcc(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">IFSC Code</label>
                    <input
                      type="text"
                      value={newIFSC}
                      onChange={(e) => setNewIFSC(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl font-bold text-white text-xs shadow-lg"
                  >
                    Save & Add Beneficiary
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </CustomerDashboardLayout>
  );
};
