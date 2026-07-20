import React from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";

export const AdminAuditLogsPage: React.FC = () => {
  const auditLogs = [
    { id: "aud_901", table: "accounts", action: "UPDATE", actor: "usr_101", ip: "192.168.1.1", timestamp: "2026-07-20 10:52:01" },
    { id: "aud_902", table: "journals", action: "INSERT", actor: "usr_102", ip: "10.0.0.42", timestamp: "2026-07-20 10:48:14" },
    { id: "aud_903", table: "cards", action: "UPDATE", actor: "usr_101", ip: "192.168.1.1", timestamp: "2026-07-20 10:42:00" },
  ];

  return (
    <AdminPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">System CDC Audit Trail</h1>
            <p className="text-sm text-slate-400">Immutable Change Data Capture log stream across all database tables</p>
          </div>
          <button onClick={() => alert("Exporting audit trail CSV...")} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl text-white">
            📥 Export Audit Log
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3 font-mono text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-bold text-cyan-400">[{log.action}]</span> <span className="text-white font-bold">{log.table}</span> — Actor: {log.actor} ({log.ip})
              </div>
              <span className="text-slate-500">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminPortalLayout>
  );
};
