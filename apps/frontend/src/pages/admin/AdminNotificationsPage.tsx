import React, { useState } from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";

export const AdminNotificationsPage: React.FC = () => {
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const handleBroadcast = () => {
    if (!broadcastMessage.trim()) return;
    alert(`Broadcast dispatched to all active users: "${broadcastMessage}"`);
    setBroadcastMessage("");
  };

  return (
    <AdminPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Global System Broadcasts</h1>
          <p className="text-sm text-slate-400">Push real-time system alerts, maintenance notices, and security advisories to all users</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <div>
            <label className="text-xs text-slate-400 uppercase font-semibold">Broadcast Message</label>
            <textarea
              rows={3}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="e.g. Scheduled maintenance on USD Vault transfers tonight at 02:00 UTC."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white mt-1 outline-none focus:border-cyan-400"
            />
          </div>

          <button
            onClick={handleBroadcast}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-sm text-white rounded-xl shadow-lg"
          >
            📢 Dispatch System Broadcast Alert
          </button>
        </div>
      </div>
    </AdminPortalLayout>
  );
};
