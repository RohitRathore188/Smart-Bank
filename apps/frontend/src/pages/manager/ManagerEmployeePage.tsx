import React, { useState } from "react";
import { ManagerPortalLayout } from "../../components/layout/ManagerPortalLayout";

export const ManagerEmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState([
    { id: "emp_1", name: "David Miller", role: "Compliance Officer", cardAllowance: "$5,000 / mo", status: "ACTIVE" },
    { id: "emp_2", name: "Sarah Connor", role: "Treasury Analyst", cardAllowance: "$15,000 / mo", status: "ACTIVE" },
    { id: "emp_3", name: "Michael Vance", role: "Junior Operations", cardAllowance: "$2,500 / mo", status: "ACTIVE" },
  ]);

  return (
    <ManagerPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Employee & Role Management</h1>
            <p className="text-sm text-slate-400">Assign staff roles, set corporate card allowances, and manage RBAC access</p>
          </div>
          <button onClick={() => alert("Invite Employee Modal Opened")} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-xs rounded-xl shadow-lg">
            + Invite Staff Member
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          {employees.map((e) => (
            <div key={e.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-base">{e.name}</div>
                <div className="text-xs text-slate-400">{e.role} • Allowance: <span className="text-amber-400 font-mono font-bold">{e.cardAllowance}</span></div>
              </div>

              <div className="flex space-x-2">
                <button onClick={() => alert(`Modifying allowance for ${e.name}`)} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl text-white">
                  Edit Allowance
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ManagerPortalLayout>
  );
};
