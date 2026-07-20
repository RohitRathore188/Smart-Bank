import React, { useState } from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";

export const AdminBankSettingsPage: React.FC = () => {
  const [maintenance, setMaintenance] = useState(false);
  const [wireLimit, setWireLimit] = useState("250000");

  return (
    <AdminPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Global Bank Settings & Feature Flags</h1>
          <p className="text-sm text-slate-400">Configure global transaction limits, maintenance windows, and compliance baselines</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
            <div>
              <div className="font-bold text-white text-base">Global Maintenance Mode</div>
              <div className="text-xs text-slate-400">Restricts user transactions while keeping read-only ledger access</div>
            </div>
            <button
              onClick={() => {
                setMaintenance(!maintenance);
                alert(`Maintenance Mode updated: ${!maintenance}`);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                maintenance ? "bg-red-500 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              {maintenance ? "MAINTENANCE ACTIVE" : "Normal Operation"}
            </button>
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase font-semibold">Maximum Unverified Wire Limit ($ USD)</label>
            <input
              type="number"
              value={wireLimit}
              onChange={(e) => setWireLimit(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white mt-1 outline-none"
            />
          </div>

          <button onClick={() => alert("Bank settings saved successfully!")} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-sm text-white rounded-xl shadow-lg">
            Save Global System Settings
          </button>
        </div>
      </div>
    </AdminPortalLayout>
  );
};
