import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";

export const CustomerCardsPage: React.FC = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [showPIN, setShowPIN] = useState(false);
  const [spendLimit, setSpendLimit] = useState("5000");

  return (
    <CustomerDashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Cards Management</h1>
            <p className="text-sm text-slate-400">Physical metal cards, virtual cards & single-use disposable cards</p>
          </div>
          <button
            onClick={() => alert("New Virtual Card Issued!")}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-500/20"
          >
            + Issue Virtual Card
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card Visualizer */}
          <div className="space-y-4">
            <div className={`h-64 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-500 border ${
              isFrozen
                ? "bg-slate-950 border-red-500/50 opacity-60"
                : "bg-gradient-to-tr from-slate-900 via-cyan-950 to-blue-900 border-cyan-400/40 shadow-2xl shadow-cyan-500/20"
            }`}>
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-sm text-cyan-300 tracking-wider">SMARTBANK PLATINUM METAL</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {isFrozen ? "FROZEN" : "ACTIVE"}
                </span>
              </div>

              <div className="text-2xl font-mono tracking-widest text-white font-bold my-auto">
                4891 •••• •••• 9102
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Cardholder</div>
                  <div className="text-sm font-semibold text-white">ALEX MORGAN</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Expires / CVV</div>
                  <div className="text-sm font-mono text-cyan-400 font-bold">07/29 • {showPIN ? "892" : "•••"}</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setIsFrozen(!isFrozen)}
                className={`py-3 rounded-2xl font-semibold text-xs transition-all ${
                  isFrozen ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
              >
                {isFrozen ? "Unfreeze Card" : "Freeze Card"}
              </button>

              <button
                onClick={() => setShowPIN(!showPIN)}
                className="py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-semibold text-xs text-white"
              >
                {showPIN ? "Hide CVV" : "Show CVV"}
              </button>

              <button
                onClick={() => alert("PIN reset email dispatched.")}
                className="py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-semibold text-xs text-white"
              >
                Reset PIN
              </button>
            </div>
          </div>

          {/* Security Controls */}
          <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 space-y-6">
            <h3 className="font-bold text-white text-base">Spend Security Controls</h3>

            <div>
              <div className="flex justify-between text-xs text-slate-300 font-semibold mb-2">
                <span>Monthly Spend Limit:</span>
                <span className="font-mono text-cyan-400">${spendLimit}.00</span>
              </div>
              <input
                type="range"
                min="500"
                max="20000"
                step="500"
                value={spendLimit}
                onChange={(e) => setSpendLimit(e.target.value)}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              {[
                { label: "Online Purchases", desc: "E-commerce & SaaS subscriptions", enabled: true },
                { label: "Contactless / Apple Pay", desc: "NFC terminal payments", enabled: true },
                { label: "International Swipe", desc: "Cross-border merchant lock", enabled: false },
                { label: "ATM Cash Withdrawals", desc: "Physical ATM transactions", enabled: true },
              ].map((setting, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div>
                    <div className="text-xs font-semibold text-white">{setting.label}</div>
                    <div className="text-[10px] text-slate-400">{setting.desc}</div>
                  </div>
                  <input type="checkbox" defaultChecked={setting.enabled} className="w-4 h-4 accent-cyan-400 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};
