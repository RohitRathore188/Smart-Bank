import React from "react";
import { Link } from "react-router-dom";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";

export const EmployeeDashboardPage: React.FC = () => {
  return (
    <EmployeePortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Staff Operations Cockpit</h1>
            <p className="text-sm text-slate-400">KYC verification, transaction risk scoring, and customer support portal</p>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Pending KYC Applications", count: "14", color: "text-amber-400", border: "border-amber-500/30", icon: "🆔", path: "/employee/kyc" },
            { label: "Flagged High-Risk Transfers", count: "3", color: "text-red-400", border: "border-red-500/30", icon: "⚠️", path: "/employee/transactions" },
            { label: "Unresolved Support Tickets", count: "8", color: "text-purple-400", border: "border-purple-500/30", icon: "🎧", path: "/employee/complaints" },
            { label: "Frozen Customer Vaults", count: "2", color: "text-cyan-400", border: "border-cyan-500/30", icon: "🧊", path: "/employee/accounts" },
          ].map((kpi, i) => (
            <Link key={i} to={kpi.path} className={`p-5 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border ${kpi.border} hover:bg-white/5 transition-all`}>
              <div className="flex justify-between items-start">
                <span className="text-2xl">{kpi.icon}</span>
                <span className={`text-3xl font-black font-mono ${kpi.color}`}>{kpi.count}</span>
              </div>
              <div className="text-xs font-bold text-slate-300 mt-3">{kpi.label}</div>
            </Link>
          ))}
        </div>

        {/* Pending Action Queues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KYC Review Queue */}
          <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-base">Pending eKYC Verification Queue</h3>
              <Link to="/employee/kyc" className="text-xs text-purple-400 font-semibold hover:underline">View All (14) →</Link>
            </div>

            <div className="space-y-3">
              {[
                { name: "John H. Miller", doc: "US Passport", country: "USA", status: "PENDING_REVIEW" },
                { name: "Elena Rostova", doc: "EU National ID", country: "DEU", status: "PENDING_REVIEW" },
                { name: "Kenji Sato", doc: "JP Residence Permit", country: "JPN", status: "PENDING_REVIEW" },
              ].map((applicant, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white text-sm">{applicant.name}</div>
                    <div className="text-xs text-slate-400">{applicant.doc} • {applicant.country}</div>
                  </div>
                  <Link to="/employee/kyc" className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl border border-purple-500/30">
                    Review ID
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Suspicious Activity Alerts */}
          <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-base">AML High-Risk Wire Alerts</h3>
              <Link to="/employee/transactions" className="text-xs text-red-400 font-semibold hover:underline">Review All (3) →</Link>
            </div>

            <div className="space-y-3">
              {[
                { user: "User #90123", amount: "$85,000.00", score: 94, reason: "Rapid velocity wire to unverified IBAN" },
                { user: "User #48192", amount: "$12,400.00", score: 88, reason: "Structuring threshold anomaly" },
              ].map((alert, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white text-sm">{alert.user} — {alert.amount}</div>
                    <div className="text-xs text-red-300">{alert.reason}</div>
                  </div>
                  <span className="font-mono font-bold text-red-400 text-xs bg-red-500/20 px-2.5 py-1 rounded-full border border-red-500/30">
                    Risk {alert.score}/100
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </EmployeePortalLayout>
  );
};
