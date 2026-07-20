import React from "react";
import { ManagerPortalLayout } from "../../components/layout/ManagerPortalLayout";

export const ManagerFraudPage: React.FC = () => {
  return (
    <ManagerPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Real-Time Fraud & Anomaly Shield</h1>
          <p className="text-sm text-slate-400">Gemini AI transaction risk scoring, velocity checks, and card chargeback monitoring</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-white text-base">Active Fraud Shield Anomalies</h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              AI Guardian Active
            </span>
          </div>

          <div className="space-y-3">
            {[
              { id: "anom_1", rule: "Card Velocity Anomaly", desc: "4 transactions within 12 seconds from 3 distinct geolocations", risk: "HIGH (92)", action: "Auto-Blocked Card" },
              { id: "anom_2", rule: "Device Fingerprint Mismatch", desc: "Login attempt from unverified IP range in Eastern Europe", risk: "MEDIUM (74)", action: "MFA Required" },
              { id: "anom_3", rule: "Unusual FX Wire Volume", desc: "$85,000 transfer requested outside normal business operating hours", risk: "HIGH (88)", action: "Manager Review Required" },
            ].map((anom) => (
              <div key={anom.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white text-sm">{anom.rule} — <span className="text-red-400 font-mono">{anom.risk}</span></div>
                  <div className="text-xs text-slate-400">{anom.desc}</div>
                </div>
                <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  {anom.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ManagerPortalLayout>
  );
};
