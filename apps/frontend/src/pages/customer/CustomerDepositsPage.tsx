import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const CustomerDepositsPage: React.FC = () => {
  const [fdAmount, setFdAmount] = useState(150000);
  const [tenureYears, setTenureYears] = useState(5);
  const [is80C, setIs80C] = useState(true);
  const [isFdCreatedModal, setIsFdCreatedModal] = useState(false);

  const yieldRate = is80C ? 7.85 : 7.25;
  const estimatedMaturityValue = Math.round(fdAmount * Math.pow(1 + yieldRate / 100, tenureYears));

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Fixed Deposits (FD) & Tax-Saver Vaults
              </h1>
              <p className="text-sm text-slate-400">Guaranteed Yield up to 7.85% p.a. • DICGC Insured up to ₹5 Lakhs per depositor</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create FD Studio (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-6">
                <h3 className="font-bold text-white text-base">Open High-Yield Fixed Deposit</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Deposit Principal (₹ INR)</label>
                    <input
                      type="number"
                      min="5000"
                      step="5000"
                      value={fdAmount}
                      onChange={(e) => setFdAmount(parseInt(e.target.value) || 0)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-lg font-bold"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>Maturity Tenure ({tenureYears} Years)</span>
                      <span className="text-emerald-400 font-mono">Yield: {yieldRate}% p.a.</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={tenureYears}
                      onChange={(e) => setTenureYears(parseInt(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-amber-300">Section 80C Tax Saver FD</div>
                      <div className="text-[10px] text-slate-400">5-Year lock-in eligible for income tax exemption under 80C</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={is80C}
                      onChange={(e) => setIs80C(e.target.checked)}
                      className="w-5 h-5 accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex justify-between items-center font-mono">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Estimated Maturity Value</div>
                      <div className="text-xl font-extrabold text-emerald-400">₹{estimatedMaturityValue.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase">Total Interest Earned</div>
                      <div className="text-sm font-bold text-amber-300">+₹{(estimatedMaturityValue - fdAmount).toLocaleString()}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFdCreatedModal(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    Open Fixed Deposit & Generate Digital FD Advice
                  </button>
                </div>
              </FloatingCard>
            </div>

            {/* Active FDs Column (1 Col) */}
            <div className="space-y-6">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-sm">Active Fixed Deposits</h3>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 font-mono">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>FD/8192049182</span>
                    <span className="text-emerald-400">7.85% p.a.</span>
                  </div>
                  <div className="text-lg font-bold text-white">₹5,65,200.00</div>
                  <div className="text-[10px] text-slate-400">Maturity Date: July 15, 2031 (Section 80C)</div>
                </div>
              </FloatingCard>
            </div>
          </div>

          {/* FD Creation Confirmation Modal */}
          {isFdCreatedModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  📄
                </div>
                <h3 className="text-xl font-bold text-white">Fixed Deposit Created!</h3>
                <p className="text-xs text-slate-300">
                  ₹{fdAmount.toLocaleString()} has been locked into a <strong>{tenureYears}-Year Fixed Deposit ({yieldRate}% p.a.)</strong>.
                </p>
                <div className="p-3 rounded-xl bg-white/5 font-mono text-[11px] text-slate-400 text-left space-y-1">
                  <div>FD Receipt No: <span className="text-white">FDR{Math.floor(Math.random() * 900000000 + 100000000)}</span></div>
                  <div>Estimated Value on Maturity: <span className="text-emerald-400 font-bold">₹{estimatedMaturityValue.toLocaleString()}</span></div>
                </div>
                <button
                  onClick={() => setIsFdCreatedModal(false)}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 font-bold text-white text-xs rounded-xl"
                >
                  Download Digital FD Certificate PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </CustomerDashboardLayout>
  );
};
