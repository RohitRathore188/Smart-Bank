import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";

export const CustomerAccountsPage: React.FC = () => {
  const [isFXModalOpen, setIsFXModalOpen] = useState(false);
  const [sourceAmount, setSourceAmount] = useState("1000");

  const vaults = [
    { currency: "USD", name: "Primary USD Vault", balance: "92,400.00", symbol: "$", apy: "5.20%", flag: "🇺🇸" },
    { currency: "EUR", name: "European Treasury Vault", balance: "34,120.00", symbol: "€", apy: "3.80%", flag: "🇪🇺" },
    { currency: "GBP", name: "British Sovereign Vault", balance: "18,200.00", symbol: "£", apy: "4.10%", flag: "🇬🇧" },
    { currency: "JPY", name: "Asian FX Vault", balance: "2,450,000.00", symbol: "¥", apy: "1.50%", flag: "🇯🇵" },
  ];

  return (
    <CustomerDashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Multi-Currency Vaults</h1>
            <p className="text-sm text-slate-400">Manage global fiat accounts and automated FX yield routing</p>
          </div>
          <button
            onClick={() => setIsFXModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-500/20"
          >
            ⚡ Convert Currency (FX)
          </button>
        </div>

        {/* Vault Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vaults.map((vault, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-xl space-y-4 hover:border-cyan-500/40 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{vault.flag}</span>
                  <div>
                    <h3 className="font-bold text-white text-base">{vault.name}</h3>
                    <span className="text-xs text-slate-400 font-mono">{vault.currency} • IBAN Verified</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {vault.apy} Yield
                </span>
              </div>

              <div className="text-3xl font-black text-white font-mono">
                {vault.symbol} {vault.balance}
              </div>

              <div className="flex space-x-2 pt-2">
                <button onClick={() => setIsFXModalOpen(true)} className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-slate-300">
                  Exchange
                </button>
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-slate-300">
                  Statement
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FX Modal */}
        {isFXModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-white/10 p-6 rounded-3xl space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white text-lg">Instant FX Currency Exchange</h3>
                <button onClick={() => setIsFXModalOpen(false)} className="text-slate-400 text-lg">✕</button>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase">Convert From USD</label>
                <input
                  type="number"
                  value={sourceAmount}
                  onChange={(e) => setSourceAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-mono text-white mt-1 outline-none"
                />
              </div>

              <div className="p-3 bg-white/5 rounded-2xl text-xs space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span>Exchange Rate:</span>
                  <span className="font-mono text-cyan-400">1 USD = 0.918 EUR</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Output:</span>
                  <span className="font-mono font-bold text-white">€{(parseFloat(sourceAmount || "0") * 0.918).toFixed(2)} EUR</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert(`Exchanged $${sourceAmount} USD to EUR successfully!`);
                  setIsFXModalOpen(false);
                }}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white text-sm rounded-xl shadow-lg"
              >
                Confirm Instant FX Conversion
              </button>
            </div>
          </div>
        )}
      </div>
    </CustomerDashboardLayout>
  );
};
