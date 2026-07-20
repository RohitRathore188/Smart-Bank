import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";

export const CustomerLoansPage: React.FC = () => {
  const [amount, setAmount] = useState("15000");
  const [term, setTerm] = useState(24);

  const monthlyPayment = ((parseFloat(amount) * 1.054) / term).toFixed(2);

  return (
    <CustomerDashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div>
          <h1 className="text-3xl font-extrabold text-white">AI Credit & Instant Loans</h1>
          <p className="text-sm text-slate-400">Pre-approved zero-paperwork automated liquidity line</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Credit Rating Card */}
          <div className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 text-center space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">SmartBank Credit Rating</h3>
            <div className="w-36 h-36 rounded-full border-8 border-cyan-400 border-t-emerald-400 flex items-center justify-center mx-auto text-4xl font-black font-mono text-cyan-300 shadow-xl shadow-cyan-500/20">
              785
            </div>
            <div className="text-xs text-emerald-400 font-bold bg-emerald-500/10 py-1.5 px-3 rounded-full border border-emerald-500/20 inline-block">
              Tier 1 Premier Credit Rating
            </div>
            <p className="text-xs text-slate-400">
              Evaluated by Gemini AI based on your cashflow stability, zero overdraft history, and USD vault liquidity.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 space-y-6">
            <h3 className="font-bold text-white text-lg">Instant Loan Calculator</h3>

            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-300 mb-2">
                <span>Requested Amount:</span>
                <span className="font-mono text-cyan-400 text-xl font-bold">${amount}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Repayment Term</label>
              <div className="flex space-x-3">
                {[6, 12, 24, 36, 48].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTerm(m)}
                    className={`flex-1 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                      term === m ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg" : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[10px] text-slate-400 uppercase">Fixed APR</div>
                <div className="text-lg font-mono font-bold text-emerald-400">5.40%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase">Monthly Payment</div>
                <div className="text-lg font-mono font-bold text-cyan-400">${monthlyPayment}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase">Disbursement</div>
                <div className="text-lg font-mono font-bold text-white">Instant</div>
              </div>
            </div>

            <button
              onClick={() => alert(`Successfully disbursed $${amount} to your USD Vault!`)}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 font-extrabold text-white text-base rounded-2xl shadow-xl shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500"
            >
              Claim Instant ${amount} Loan to USD Vault
            </button>
          </div>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};
