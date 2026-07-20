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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Branch, IFSC Directory & Service Charge Management
              </h1>
              <p className="text-sm text-slate-600 font-medium">Configure IFSC Codes, Interbank Tariff Rules & Automated Backup Strategies</p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            <FloatingCard className="p-6 space-y-6">
              <h3 className="font-extrabold text-slate-900 text-base">Regional Branch & IFSC Directory</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Primary IFSC Code</label>
                  <input
                    type="text"
                    required
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm font-bold shadow-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Branch Name</label>
                  <input
                    type="text"
                    required
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-bold shadow-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="p-6 space-y-6">
              <h3 className="font-extrabold text-slate-900 text-base">Interbank Service Charge Rules (INR)</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">NEFT / UPI Service Charge (₹)</label>
                  <input
                    type="number"
                    value={neftCharge}
                    onChange={(e) => setNeftCharge(parseInt(e.target.value) || 0)}
                    className="w-full p-3.5 rounded-xl bg-white border border-slate-300 text-emerald-700 font-mono font-extrabold text-sm shadow-sm focus:border-purple-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500 font-medium">Set to 0 for RBI compliant zero-charge UPI/NEFT.</span>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">RTGS Wire Fee (₹)</label>
                  <input
                    type="number"
                    value={rtgsCharge}
                    onChange={(e) => setRtgsCharge(parseInt(e.target.value) || 0)}
                    className="w-full p-3.5 rounded-xl bg-white border border-slate-300 text-emerald-700 font-mono font-extrabold text-sm shadow-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold text-xs text-white shadow-md active:scale-95 transition-transform"
              >
                Save Global Bank Settings & Sync IFSC Directory
              </button>
            </FloatingCard>
          </form>

          {/* Success Modal */}
          {saveSuccessMsg && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white border border-purple-200 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-700 border border-purple-300 text-3xl flex items-center justify-center mx-auto">
                  🏢
                </div>
                <h3 className="text-lg font-bold text-slate-900">Settings Updated!</h3>
                <p className="text-xs text-slate-600 font-medium">{saveSuccessMsg}</p>
                <button
                  onClick={() => setSaveSuccessMsg("")}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 font-bold text-white text-xs rounded-xl shadow-md"
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
