import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";

export const CustomerBeneficiariesPage: React.FC = () => {
  const [name, setName] = useState("");
  const [iban, setIban] = useState("");

  const beneficiaries = [
    { id: "1", name: "Stripe Operations Europe", iban: "DE89370400440532013000", swift: "DBEKDE33XXX", flag: "🇩🇪" },
    { id: "2", name: "Sarah Connor (Personal)", iban: "US89SMAR90123849102384", swift: "SMARUS33XXX", flag: "🇺🇸" },
    { id: "3", name: "AWS Cloud Infrastructure", iban: "GB89SMAR48192049182394", swift: "BARCGB22XXX", flag: "🇬🇧" },
  ];

  return (
    <CustomerDashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Beneficiaries & Transfer Contacts</h1>
            <p className="text-sm text-slate-400">Verified wire and internal peer-to-peer recipients</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saved Beneficiaries List */}
          <div className="lg:col-span-2 space-y-4">
            {beneficiaries.map((b) => (
              <div key={b.id} className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{b.flag}</span>
                  <div>
                    <div className="font-bold text-white text-base">{b.name}</div>
                    <div className="text-xs font-mono text-slate-400">{b.iban} • {b.swift}</div>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Transfer initiated to ${b.name}`)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold rounded-xl"
                >
                  Send Wire
                </button>
              </div>
            ))}
          </div>

          {/* Add Beneficiary Form */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">Add Wire Beneficiary</h3>
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase">Recipient Full Name / Org</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Acme Global LTD"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white mt-1 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase">IBAN / Account Number</label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                placeholder="DE89 3704 0044 0532 0130 00"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white mt-1 outline-none"
              />
            </div>
            <button
              onClick={() => {
                alert(`Added ${name} to saved beneficiaries!`);
                setName("");
                setIban("");
              }}
              className="w-full py-3 bg-white/10 hover:bg-white/20 font-bold text-xs rounded-xl"
            >
              Verify & Save Beneficiary
            </button>
          </div>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};
