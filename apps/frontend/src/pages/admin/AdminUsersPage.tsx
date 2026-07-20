import React, { useState } from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState([
    { id: "usr_101", name: "Alex Morgan", email: "alex.morgan@enterprise.com", role: "BUSINESS_CFO", status: "ACTIVE" },
    { id: "usr_102", name: "Sarah Connor", email: "sarah.connor@smartbank.ai", role: "RETAIL_USER", status: "ACTIVE" },
    { id: "usr_103", name: "Michael Vance", email: "mvance@cybernet.io", role: "BUSINESS_EMPLOYEE", status: "BLOCKED" },
  ]);

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";
        alert(`User ${u.name} status updated to ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <AdminPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Global User Management</h1>
            <p className="text-sm text-slate-400">Manage all tenant users, role assignments, and account restrictions</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
          {users.map((u) => (
            <div key={u.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-base">{u.name}</div>
                <div className="text-xs text-slate-400">{u.email} • Role: <span className="text-cyan-400 font-mono font-bold">{u.role}</span></div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`text-xs font-bold font-mono ${u.status === "ACTIVE" ? "text-emerald-400" : "text-red-400"}`}>{u.status}</span>
                <button
                  onClick={() => toggleUserStatus(u.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border ${
                    u.status === "ACTIVE" ? "bg-red-500/20 text-red-300 border-red-500/30" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  }`}
                >
                  {u.status === "ACTIVE" ? "Block Access" : "Unblock Access"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminPortalLayout>
  );
};
