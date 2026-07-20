import React from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";

export const AdminEmployeesPage: React.FC = () => {
  return (
    <AdminPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Staff & Employee Directory</h1>
            <p className="text-sm text-slate-400">Global staff access, operations permissions, and compliance auditing</p>
          </div>
          <button onClick={() => alert("Staff member provisioned!")} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs rounded-xl shadow-lg">
            + Provision Staff Access
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
          {[
            { name: "David Miller", title: "Compliance Lead", email: "david.miller@smartbank.ai", access: "FULL_AUDIT" },
            { name: "Sarah Connor", title: "Treasury Manager", email: "sarah.connor@smartbank.ai", access: "TREASURY_WRITE" },
            { name: "Alex Morgan", title: "Platform Super Admin", email: "alex.morgan@enterprise.com", access: "ROOT_SUPER_ADMIN" },
          ].map((emp, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-base">{emp.name}</div>
                <div className="text-xs text-slate-400">{emp.title} • {emp.email}</div>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                {emp.access}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminPortalLayout>
  );
};
