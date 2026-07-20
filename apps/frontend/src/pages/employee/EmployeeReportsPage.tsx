import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const EmployeeReportsPage: React.FC = () => {
  const [exportMsg, setExportMsg] = useState("");

  const reports = [
    { title: "Customer Portfolio Report", desc: "Complete active/inactive customer account statement and eKYC status.", cat: "Customer" },
    { title: "Branch Treasury & Liquidity Report", desc: "Daily branch vault cash balance and reserve ratio statement.", cat: "Branch" },
    { title: "Loan Sanction & NPA Report", desc: "Active credit lines, EMI repayment schedules, and NPA provisioning.", cat: "Loan" },
    { title: "High-Velocity Transaction Report", desc: "Interbank RTGS, NEFT, IMPS, and UPI settlement ledger.", cat: "Transaction" },
    { title: "RBI Grievance & Complaint Report", desc: "Log of customer complaints, resolution status, and Ombudsman SLA.", cat: "Complaint" },
    { title: "Immutable CDC Audit Trail Report", desc: "Cryptographically sealed log of schema modifications and IP logs.", cat: "Audit" },
    { title: "Net Interest Margin (NIM) Report", desc: "Interest income, yield payouts, and asset liability management.", cat: "Interest" },
    { title: "Fixed Deposit (FD) Ledger Report", desc: "Tax-Saver 80C and regular FDs maturity schedule.", cat: "FD" },
    { title: "Recurring Deposit (RD) Milestone Report", desc: "Monthly RD installment tracking and milestone boosters.", cat: "RD" },
    { title: "Employee Performance & Roster Report", desc: "Staff teller transaction caps, attendance, and audit activity.", cat: "Employee" },
    { title: "Executive Manager P&L Report", desc: "Branch net revenue, operating profit, and customer growth trends.", cat: "Manager" },
  ];

  const handleExport = (reportTitle: string, format: "PDF" | "EXCEL") => {
    setExportMsg(`${reportTitle} has been compiled and downloaded as ${format}!`);
  };

  return (
    <EmployeePortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Enterprise Banking Reports Engine
              </h1>
              <p className="text-sm text-slate-400">Export PDF & Excel Financial Intelligence Packages</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((r, i) => (
              <FloatingCard key={i} className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {r.cat} Report
                    </span>
                    <h3 className="font-bold text-white text-base mt-1">{r.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{r.desc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleExport(r.title, "PDF")}
                    className="py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl font-bold text-xs text-white shadow-md"
                  >
                    📄 Export PDF
                  </button>
                  <button
                    onClick={() => handleExport(r.title, "EXCEL")}
                    className="py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold text-xs text-white"
                  >
                    📊 Export Excel (.xlsx)
                  </button>
                </div>
              </FloatingCard>
            ))}
          </div>

          {/* Export Success Modal */}
          {exportMsg && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  📊
                </div>
                <h3 className="text-lg font-bold text-white">Report Exported!</h3>
                <p className="text-xs text-slate-300">{exportMsg}</p>
                <button
                  onClick={() => setExportMsg("")}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 font-bold text-white text-xs rounded-xl"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </EmployeePortalLayout>
  );
};
