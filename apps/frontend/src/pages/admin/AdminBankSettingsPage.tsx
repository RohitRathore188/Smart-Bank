import React, { useState } from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const AdminBankSettingsPage: React.FC = () => {
  const [ifscCode, setIfscCode] = useState("SBAIN000108");
  const [branchName, setBranchName] = useState("Mumbai Main Regional Hub");
  const [neftCharge, setNeftCharge] = useState(0);
  const [rtgsCharge, setRtgsCharge] = useState(0);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccessMsg("Branch Directory, IFSC Rules & Service Charges Updated Globally!");
  };

  return (
    <AdminPortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Branch, IFSC Directory & Service Charge Management
              </h1>
              <p className="text-sm text-slate-400">Configure IFSC Codes, Interbank Tariff Rules & Automated Backup Strategies</p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            <FloatingCard className="p-6 space-y-6">
              <h3 className="font-bold text-white text-base">Regional Branch & IFSC Directory</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Primary IFSC Code</label>
                  <input
                    type="text"
                    required
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Branch Name</label>
                  <input
                    type="text"
                    required
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="p-6 space-y-6">
              <h3 className="font-bold text-white text-base">Interbank Service Charge Rules (INR)</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">NEFT / UPI Service Charge (₹)</label>
                  <input
                    type="number"
                    value={neftCharge}
                    onChange={(e) => setNeftCharge(parseInt(e.target.value) || 0)}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-emerald-400 font-mono font-bold text-sm"
                  />
                  <span className="text-[10px] text-slate-400">Set to 0 for RBI compliant zero-charge UPI/NEFT.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">RTGS Wire Fee (₹)</label>
                  <input
                    type="number"
                    value={rtgsCharge}
                    onChange={(e) => setRtgsCharge(parseInt(e.target.value) || 0)}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-emerald-400 font-mono font-bold text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl font-bold text-xs text-white shadow-lg"
              >
                Save Global Bank Settings & Sync IFSC Directory
              </button>
            </FloatingCard>
          </form>

          {/* Success Modal */}
          {saveSuccessMsg && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  🏢
                </div>
                <h3 className="text-lg font-bold text-white">Settings Updated!</h3>
                <p className="text-xs text-slate-300">{saveSuccessMsg}</p>
                <button
                  onClick={() => setSaveSuccessMsg("")}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 font-bold text-white text-xs rounded-xl"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </AdminPortalLayout>
  );
};
