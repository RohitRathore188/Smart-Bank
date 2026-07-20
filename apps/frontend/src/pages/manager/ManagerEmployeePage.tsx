import React, { useState } from "react";
import { ManagerPortalLayout } from "../../components/layout/ManagerPortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const ManagerEmployeePage: React.FC = () => {
  const [staffMsg, setStaffMsg] = useState("");

  const staffList = [
    { name: "Priya Sharma", role: "Head Cashier & Teller", empId: "EMP-1082", limit: "₹50,00,000", status: "ACTIVE" },
    { name: "Rajesh Verma", role: "KYC Compliance Officer", empId: "EMP-1084", limit: "₹10,00,000", status: "ACTIVE" },
    { name: "Sunil Mehta", role: "Loan Processing Officer", empId: "EMP-1089", limit: "₹25,00,000", status: "ACTIVE" },
  ];

  return (
    <ManagerPortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Branch Employee Management & Cash Limits
              </h1>
              <p className="text-sm text-slate-400">Staff Permission Provisioning & Daily Teller Transaction Caps</p>
            </div>
          </div>

          <FloatingCard className="p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Active Branch Staff Roster</h3>

            <div className="space-y-3">
              {staffList.map((emp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-white text-sm">{emp.name} ({emp.empId})</div>
                    <div className="text-xs text-slate-400">{emp.role}</div>
                  </div>

                  <div className="flex items-center space-x-3 font-mono text-xs">
                    <span className="text-slate-400">Teller Limit: <strong className="text-emerald-400">{emp.limit}</strong></span>
                    <button
                      onClick={() => setStaffMsg(`Updated permissions for ${emp.name}`)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold"
                    >
                      Configure Limits
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </FloatingCard>

          {/* Action Success Modal */}
          {staffMsg && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  👤
                </div>
                <h3 className="text-lg font-bold text-white">Staff Roster Updated!</h3>
                <p className="text-xs text-slate-300">{staffMsg}</p>
                <button
                  onClick={() => setStaffMsg("")}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 font-bold text-white text-xs rounded-xl"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </ManagerPortalLayout>
  );
};
