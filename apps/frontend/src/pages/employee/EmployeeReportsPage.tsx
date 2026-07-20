import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const EmployeeReportsPage: React.FC = () => {
  const [reportSuccess, setReportSuccess] = useState("");

  const reports = [
    { name: "Suspicious Transaction Report (STR)", format: "FIU-IND XML", desc: "Mandatory report for transactions flagged under AML anomaly algorithms." },
    { name: "Cash Transaction Report (CTR)", format: "Excel / CSV", desc: "Summary of single/aggregated cash deposits exceeding ₹10,00,000 in a month." },
    { name: "Form 60 / 61 Tax Compliance Exporter", format: "PDF", desc: "Tax filings for accounts without valid PAN submissions." },
    { name: "Branch Daily Balance & Reserve Report", format: "PDF", desc: "End-of-day teller vault balance reconciliation for RBI auditing." },
  ];

  return (
    <EmployeePortalLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Regulatory & Compliance Reports Generator
              </h1>
              <p className="text-sm text-slate-400">FIU-IND (Financial Intelligence Unit - India) & RBI Audit Exporter</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((r, i) => (
              <FloatingCard key={i} className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-base">{r.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{r.desc}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {r.format}
                  </span>
                </div>

                <button
                  onClick={() => setReportSuccess(`Generated & Downloaded ${r.name} (${r.format})`)}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl font-bold text-xs text-white shadow-md"
                >
                  Generate Report Package
                </button>
              </FloatingCard>
            ))}
          </div>

          {/* Download Modal */}
          {reportSuccess && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  📊
                </div>
                <h3 className="text-lg font-bold text-white">Compliance Report Exported!</h3>
                <p className="text-xs text-slate-300">{reportSuccess}</p>
                <button
                  onClick={() => setReportSuccess("")}
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
