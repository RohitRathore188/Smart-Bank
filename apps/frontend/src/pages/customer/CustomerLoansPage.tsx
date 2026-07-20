import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const CustomerLoansPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<"PERSONAL" | "HOME" | "VEHICLE" | "GOLD" | "EDUCATION" | "BUSINESS" | "LAP">("PERSONAL");
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenureMonths, setTenureMonths] = useState(36);
  const [activeTab, setActiveTab] = useState<"CALCULATOR" | "DOCUMENTS" | "FORECLOSURE">("CALCULATOR");
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  const loanProducts = {
    PERSONAL: { name: "Personal Loan", rate: 10.5, maxAmt: 1500000, maxTenure: 60, desc: "100% Paperless 1-Tap credit into vault." },
    HOME: { name: "Home Loan (Mortgage)", rate: 8.4, maxAmt: 50000000, maxTenure: 360, desc: "30-Year flexible step-up EMI with zero foreclosure charges." },
    VEHICLE: { name: "EV & Vehicle Loan", rate: 8.9, maxAmt: 5000000, maxTenure: 84, desc: "Instant EV financing with RTO digital lien marking." },
    GOLD: { name: "Doorstep Gold Loan", rate: 7.9, maxAmt: 2500000, maxTenure: 24, desc: "Bullet principal repayment with 24K gold collateral." },
    EDUCATION: { name: "Global Education Loan", rate: 9.2, maxAmt: 10000000, maxTenure: 180, desc: "Moratorium grace period until course completion + 1 year." },
    BUSINESS: { name: "MSME Business Credit", rate: 9.5, maxAmt: 20000000, maxTenure: 120, desc: "Working capital CGTMSE collateral-free loan." },
    LAP: { name: "Loan Against Property (LAP)", rate: 9.0, maxAmt: 30000000, maxTenure: 180, desc: "High-value liquidity against residential/commercial property." },
  };

  const product = loanProducts[selectedProduct];
  const monthlyRate = product.rate / (12 * 100);
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
  const totalPayable = emi * tenureMonths;
  const totalInterest = totalPayable - loanAmount;

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Enterprise Credit & Loan Management System
              </h1>
              <p className="text-sm text-slate-400">7 Credit Facilities • AI Amortization, Document Vault & Zero-Penalty Foreclosure</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Credit Score: 785 / 850 (Tier 1 Sanction Eligible)
            </div>
          </div>

          {/* Product Selector Pills */}
          <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-white/10">
            {Object.keys(loanProducts).map((key) => {
              const p = loanProducts[key as keyof typeof loanProducts];
              const isSelected = selectedProduct === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedProduct(key as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg"
                      : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 border-b border-white/10 pb-3">
            {[
              { id: "CALCULATOR", label: "EMI & Amortization Calculator" },
              { id: "DOCUMENTS", label: "Document Vault Upload" },
              { id: "FORECLOSURE", label: "Foreclosure & Penalty Schedule" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: EMI Calculator */}
          {activeTab === "CALCULATOR" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <FloatingCard className="p-6 space-y-6">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div>
                      <h3 className="font-bold text-white text-base">{product.name}</h3>
                      <p className="text-xs text-slate-400">{product.desc}</p>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-400 font-mono">{product.rate}% p.a.</span>
                  </div>

                  <div className="space-y-6">
                    {/* Amount Slider */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>Loan Principal Amount</span>
                        <span className="text-emerald-400 font-mono text-lg font-extrabold">₹{loanAmount.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="50000"
                        max={product.maxAmt}
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
                        <span className="text-cyan-400 font-mono text-lg font-extrabold">{tenureMonths} Months ({Math.round(tenureMonths / 12 * 10) / 10} Yrs)</span>
                      </div>
                      <input
                        type="range"
                        min="12"
                        max={product.maxTenure}
                        step="6"
                        value={tenureMonths}
                        onChange={(e) => setTenureMonths(parseInt(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    {/* Amortization Summary */}
                    <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-white/10 text-center font-mono">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase">Monthly EMI</div>
                        <div className="text-base font-extrabold text-emerald-400">₹{emi.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase">Total Interest</div>
                        <div className="text-base font-bold text-amber-300">₹{totalInterest.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase">Total Payable</div>
                        <div className="text-base font-bold text-white">₹{totalPayable.toLocaleString()}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsApplicationSubmitted(true)}
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                    >
                      Submit Credit Application for Branch Manager Sanction
                    </button>
                  </div>
                </FloatingCard>
              </div>

              {/* Side Info */}
              <div className="space-y-6">
                <FloatingCard className="p-6 space-y-4">
                  <h3 className="font-bold text-white text-sm">Underwriting Rules & Fees</h3>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between p-2 rounded-xl bg-white/5">
                      <span>Processing Fee:</span>
                      <span className="font-bold text-emerald-400">₹0 (Waived)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-xl bg-white/5">
                      <span>Foreclosure Charges:</span>
                      <span className="font-bold text-emerald-400">0% (Nil)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-xl bg-white/5">
                      <span>Late EMI Penalty:</span>
                      <span className="font-bold text-red-400">2% per month</span>
                    </div>
                  </div>
                </FloatingCard>
              </div>
            </div>
          )}

          {/* Tab 2: Document Vault */}
          {activeTab === "DOCUMENTS" && (
            <FloatingCard className="p-6 space-y-6">
              <h3 className="font-bold text-white text-base">Digital Document Vault Upload</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Salary Slips (3 Months)", desc: "PDF format from employer" },
                  { title: "ITR Returns (2 Years)", desc: "Form 16 or Tax Computation" },
                  { title: "Bank Passbook Statement", desc: "6-Month ledger statement" },
                  { title: "Property Deed / Vehicle RC", desc: "Collateral ownership document" },
                ].map((doc, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-xs font-bold text-white">{doc.title}</div>
                      <div className="text-[10px] text-slate-400">{doc.desc}</div>
                    </div>
                    <button className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold">
                      Upload PDF
                    </button>
                  </div>
                ))}
              </div>
            </FloatingCard>
          )}

          {/* Tab 3: Foreclosure Schedule */}
          {activeTab === "FORECLOSURE" && (
            <FloatingCard className="p-6 space-y-4">
              <h3 className="font-bold text-white text-base">Early Loan Closure & Foreclosure Schedule</h3>
              <p className="text-xs text-slate-400">Under RBI guidelines, zero foreclosure penalty applies to all floating-rate retail loans.</p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Outstanding Loan Principal:</span>
                  <span className="font-bold text-white">₹8,45,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Foreclosure Penalty (0%):</span>
                  <span className="font-bold text-emerald-400">₹0.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="text-slate-300 font-bold">Total Foreclosure Amount:</span>
                  <span className="font-bold text-emerald-400 text-sm">₹8,45,000.00</span>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl font-bold text-xs text-white">
                Pay Foreclosure Amount & Issue No-Dues Certificate (NOC)
              </button>
            </FloatingCard>
          )}

          {/* Application Submitted Modal */}
          {isApplicationSubmitted && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  💎
                </div>
                <h3 className="text-xl font-bold text-white">Credit Application Submitted!</h3>
                <p className="text-xs text-slate-300">
                  Application for <strong>{product.name} (₹{loanAmount.toLocaleString()})</strong> has been routed to the Branch Manager for underwriting signoff.
                </p>
                <div className="p-3 rounded-xl bg-white/5 font-mono text-[11px] text-slate-400 text-left space-y-1">
                  <div>Loan Application ID: <span className="text-white">LN-{Math.floor(Math.random() * 900000 + 100000)}</span></div>
                  <div>Estimated Monthly EMI: <span className="text-emerald-400 font-bold">₹{emi.toLocaleString()}</span></div>
                </div>
                <button
                  onClick={() => setIsApplicationSubmitted(false)}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 font-bold text-white text-xs rounded-xl"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </CustomerDashboardLayout>
  );
};
