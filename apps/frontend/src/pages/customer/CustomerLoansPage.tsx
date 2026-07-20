import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const CustomerLoansPage: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenureMonths, setTenureMonths] = useState(36);
  const [interestRate] = useState(10.5);
  const [isClaimed, setIsClaimed] = useState(false);

  // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const monthlyRate = interestRate / (12 * 100);
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Pre-Approved Instant Credit & Loans
              </h1>
              <p className="text-sm text-slate-400">100% Paperless • Personal Loans, Gold Loans & Credit Against Mutual Funds (CAMF)</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Credit Rating: 785 / 850 (Tier 1 Premier)
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive EMI Loan Calculator (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="font-bold text-white text-base">Instant Credit Line Calculator</h3>
                  <span className="text-xs font-bold text-emerald-400 font-mono">Pre-Approved Limit: ₹15,00,000</span>
                </div>

                <div className="space-y-6">
                  {/* Loan Amount Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                      <span>Loan Principal Amount</span>
                      <span className="text-emerald-400 font-mono text-base font-extrabold">₹{loanAmount.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="1500000"
                      step="25000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  {/* Tenure Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                      <span>Repayment Tenure</span>
                      <span className="text-cyan-400 font-mono text-base font-extrabold">{tenureMonths} Months ({Math.round(tenureMonths / 12 * 10) / 10} Years)</span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="60"
                      step="6"
                      value={tenureMonths}
                      onChange={(e) => setTenureMonths(parseInt(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  {/* Interest Rate Display */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-center font-mono">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Interest Rate</div>
                      <div className="text-sm font-bold text-amber-300">{interestRate}% p.a.</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Monthly EMI</div>
                      <div className="text-sm font-bold text-emerald-400">₹{emi.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Processing Fee</div>
                      <div className="text-sm font-bold text-slate-300">₹0 (Waived)</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsClaimed(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    Claim 1-Tap Disbursement into Savings Vault
                  </button>
                </div>
              </FloatingCard>
            </div>

            {/* Loan Options Column (1 Col) */}
            <div className="space-y-6">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-sm">Other Credit Products</h3>
                
                {[
                  { name: "Credit Against Mutual Funds", rate: "8.75% p.a.", max: "Up to ₹50 Lakhs", desc: "Lien mark CAMS/KFintech folios without breaking SIPs." },
                  { name: "Doorstep Gold Loan", rate: "7.90% p.a.", max: "Up to ₹25 Lakhs", desc: "Instant evaluation with bullet principal repayment." },
                  { name: "Tax-Saver FD Overdraft", rate: "1.00% over FD", max: "Up to 90% of FD", desc: "Keep earning FD yield while enjoying instant credit." },
                ].map((prod, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between text-xs font-bold text-white">
                      <span>{prod.name}</span>
                      <span className="text-emerald-400 font-mono">{prod.rate}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{prod.desc}</p>
                  </div>
                ))}
              </FloatingCard>
            </div>
          </div>

          {/* Disbursement Success Modal */}
          {isClaimed && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  🎉
                </div>
                <h3 className="text-xl font-bold text-white">Loan Credited Instantly!</h3>
                <p className="text-xs text-slate-300">
                  ₹{loanAmount.toLocaleString()} has been disbursed into your Primary Savings Vault (Account 50100489201945).
                </p>
                <div className="p-3 rounded-xl bg-white/5 font-mono text-[11px] text-slate-400 text-left space-y-1">
                  <div>Monthly EMI: <span className="text-emerald-400 font-bold">₹{emi.toLocaleString()}</span></div>
                  <div>First EMI Date: <span className="text-white">August 5, 2026</span></div>
                </div>
                <button
                  onClick={() => setIsClaimed(false)}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 font-bold text-white text-xs rounded-xl"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </CustomerDashboardLayout>
  );
};
