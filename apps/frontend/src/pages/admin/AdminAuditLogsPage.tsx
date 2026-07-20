import React from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const AdminAuditLogsPage: React.FC = () => {
  const auditLogs = [
    { timestamp: "2026-07-20 14:52:19", actor: "SUPER_ADMIN", action: "UPDATE_INTEREST_RATE", table: "rates_config", ip: "103.21.124.9" },
    { timestamp: "2026-07-20 14:45:10", actor: "TELLER_1082", action: "CASH_DEPOSIT_AUTH", table: "double_entry_ledger", ip: "192.168.1.45" },
    { timestamp: "2026-07-20 14:20:05", actor: "CUSTOMER_9102", action: "UPI_TRANSFER_EXECUTED", table: "transactions", ip: "49.207.182.11" },
  ];

  return (
    <AdminPortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Immutable Change Data Capture (CDC) Audit Logs
              </h1>
              <p className="text-sm text-slate-600 font-medium">Cryptographically Sealed Audit Trail & IP Security Logs</p>
            </div>
          </div>

          <FloatingCard className="p-6 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">Live CDC Audit Log Stream</h3>

            <div className="space-y-3 font-mono text-xs">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
                  <div>
                    <span className="text-emerald-700 font-bold">[{log.timestamp}]</span>{" "}
                    <span className="text-slate-900 font-extrabold">{log.actor}</span> performed{" "}
                    <span className="text-purple-700 font-bold">{log.action}</span> on <span className="text-amber-700 font-bold">{log.table}</span>
                  </div>
                  <div className="text-slate-500 font-medium">IP: {log.ip}</div>
                </div>
              ))}
            </div>
          </FloatingCard>
        </div>
      </PageTransition>
    </AdminPortalLayout>
  );
};
