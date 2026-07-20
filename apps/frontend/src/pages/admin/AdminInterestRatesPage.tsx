import React, { useState } from "react";
import { AdminPortalLayout } from "../../components/layout/AdminPortalLayout";

export const AdminInterestRatesPage: React.FC = () => {
  const [usdYield, setUsdYield] = useState("5.20");
  const [eurYield, setEurYield] = useState("3.80");
  const [creditApr, setCreditApr] = useState("5.40");

  return (
    <AdminPortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Global Yield & Interest Rates Configurator</h1>
          <p className="text-sm text-slate-400">Set base yield APYs for multi-currency vaults and standard credit APRs</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-6">
          <div>
            <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
              <span>USD High-Yield Vault APY:</span>
              <span className="font-mono text-cyan-400 font-bold">{usdYield}%</span>
            </div>
            <input type="range" min="1.0" max="10.0" step="0.1" value={usdYield} onChange={(e) => setUsdYield(e.target.value)} className="w-full accent-cyan-400 cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
              <span>EUR Treasury Vault APY:</span>
              <span className="font-mono text-cyan-400 font-bold">{eurYield}%</span>
            </div>
            <input type="range" min="1.0" max="10.0" step="0.1" value={eurYield} onChange={(e) => setEurYield(e.target.value)} className="w-full accent-cyan-400 cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
              <span>Base Credit Line APR:</span>
              <span className="font-mono text-emerald-400 font-bold">{creditApr}%</span>
            </div>
            <input type="range" min="2.0" max="18.0" step="0.1" value={creditApr} onChange={(e) => setCreditApr(e.target.value)} className="w-full accent-emerald-400 cursor-pointer" />
          </div>

          <button onClick={() => alert("Updated global yield APYs across all vaults!")} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-sm text-white rounded-xl shadow-lg">
            Broadcast Rates to SmartBank Engine
          </button>
        </div>
      </div>
    </AdminPortalLayout>
  );
};
