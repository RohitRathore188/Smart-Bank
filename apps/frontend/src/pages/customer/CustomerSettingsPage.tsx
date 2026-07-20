import React from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { useAuth } from "../../context/AuthContext";

export const CustomerSettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <CustomerDashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Profile & Security Settings</h1>
          <p className="text-sm text-slate-400">Manage biometrics, active sessions, and developer API credentials</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Details Card */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">User Profile Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 uppercase font-semibold">Full Name</label>
                <input type="text" readOnly value={`${user?.first_name} ${user?.last_name}`} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white mt-1 outline-none" />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase font-semibold">Email Address</label>
                <input type="email" readOnly value={user?.email || ""} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white mt-1 outline-none" />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase font-semibold">Workspace Tenant ID</label>
                <input type="text" readOnly value={user?.tenant_id || ""} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-mono text-cyan-400 mt-1 outline-none" />
              </div>
            </div>
          </div>

          {/* Developer API & Webhooks */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">API Keys & Developer Webhooks</h3>
            <div className="p-3 bg-white/5 rounded-xl">
              <div className="text-xs font-mono text-slate-400">Live API Key:</div>
              <div className="text-sm font-mono text-cyan-300 font-bold tracking-wider mt-1">sb_live_94a019283410293840192</div>
            </div>
            <button onClick={() => alert("Secret API Key regenerated!")} className="w-full py-2.5 bg-white/10 hover:bg-white/20 font-bold text-xs rounded-xl text-white">
              Roll Secret Key
            </button>
          </div>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};
