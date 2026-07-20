import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const CustomerAccountsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ACCOUNTS" | "CHEQUE_BOOK" | "NOMINEE" | "FD_RD">("ACCOUNTS");
  const [showOpenAccountModal, setShowOpenAccountModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("SAVINGS_REGULAR");

  const accountTypes = [
    { id: "SAVINGS_REGULAR", name: "Savings Vault (Regular)", rate: "3.50% p.a.", minBal: "₹10,000", desc: "Everyday banking with RuPay Debit Card & unlimited UPI." },
    { id: "CURRENT_BUSINESS", name: "Current Vault (Business)", rate: "N/A", minBal: "₹25,000", desc: "High-velocity business account with multi-user approval workflows." },
    { id: "SALARY_CORPORATE", name: "Corporate Salary Vault", rate: "4.00% p.a.", minBal: "₹0 (Zero Balance)", desc: "Zero-balance account with complimentary ₹50 L Accidental Cover." },
    { id: "SENIOR_CITIZEN", name: "Senior Citizen Priority", rate: "4.25% p.a.", minBal: "₹5,000", desc: "Priority branch queuing & 0.50% extra yield on FDs." },
    { id: "MINOR_VAULT", name: "SmartMinor Vault", rate: "3.50% p.a.", minBal: "₹1,000", desc: "Supervised account for minors under guardian control." },
    { id: "JOINT_VAULT", name: "Joint Family Vault", rate: "3.50% p.a.", minBal: "₹10,000", desc: "Shared account for joint operating instructions (Either/Survivor)." },
    { id: "NRI_NRE_NRO", name: "NRI NRE/NRO Account", rate: "4.50% p.a.", minBal: "₹25,000", desc: "Tax-free inward remittance vault with Rupee & USD multi-currency." },
    { id: "PMJDY_JAN_DHAN", name: "PMJDY Jan Dhan Vault", rate: "3.00% p.a.", minBal: "₹0 (Zero Balance)", desc: "Government Direct Benefit Transfer (DBT) enabled account." },
  ];

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Accounts & Fixed Deposits
              </h1>
              <p className="text-sm text-slate-400">RBI Regulated • Multi-Account Management, Cheque Book & Nominee Vault</p>
            </div>
            <button
              onClick={() => setShowOpenAccountModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95 flex items-center space-x-1.5"
            >
              <span>+ Open New Vault Account</span>
            </button>
          </div>

          {/* Navigation Pills */}
          <div className="flex space-x-2 border-b border-white/10 pb-3">
            {[
              { id: "ACCOUNTS", label: "Vault Accounts" },
              { id: "CHEQUE_BOOK", label: "Cheque Book & Positive Pay" },
              { id: "NOMINEE", label: "Nominee Management" },
              { id: "FD_RD", label: "Fixed Deposits (FD / RD)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Active Accounts */}
          {activeTab === "ACCOUNTS" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingCard className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      PRIMARY SAVINGS
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">Savings Vault (Regular)</h3>
                    <p className="text-xs font-mono text-slate-400">Account: 50100489201945 | IFSC: SBAIN000108</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">3.50% p.a.</span>
                </div>

                <div className="text-3xl font-black text-white font-mono">
                  ₹9,24,000.<span className="text-slate-400 text-xl">00</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-white">
                    View Passbook
                  </button>
                  <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-white">
                    Download Statement
                  </button>
                </div>
              </FloatingCard>

              <FloatingCard className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      CORPORATE SALARY
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">Salary Corporate Vault</h3>
                    <p className="text-xs font-mono text-slate-400">Account: 50100789123412 | IFSC: SBAIN000108</p>
                  </div>
                  <span className="text-xs font-bold text-amber-400">4.00% p.a.</span>
                </div>

                <div className="text-3xl font-black text-white font-mono">
                  ₹5,65,200.<span className="text-slate-400 text-xl">45</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-white">
                    View Passbook
                  </button>
                  <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-white">
                    Download Statement
                  </button>
                </div>
              </FloatingCard>
            </div>
          )}

          {/* Tab 2: Cheque Book Requisition */}
          {activeTab === "CHEQUE_BOOK" && (
            <FloatingCard className="p-6 space-y-6">
              <h3 className="text-lg font-bold text-white">Cheque Book Requisition & Positive Pay System (PPS)</h3>
              <p className="text-xs text-slate-400">Request a CTS-2010 compliant 25-leaf cheque book or register high-value cheques above ₹50,000.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h4 className="text-sm font-bold text-cyan-300">Request New Cheque Book</h4>
                  <div className="space-y-2 text-xs">
                    <label className="block text-slate-400">Select Account</label>
                    <select className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white">
                      <option>Savings Vault - 50100489201945 (₹9,24,000.00)</option>
                    </select>
                  </div>
                  <button className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl text-xs font-bold text-white">
                    Order 25-Leaf Cheque Book
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h4 className="text-sm font-bold text-amber-300">Positive Pay System (PPS) Register</h4>
                  <div className="space-y-2 text-xs">
                    <input type="text" placeholder="Cheque Number (6 digits)" className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white" />
                    <input type="number" placeholder="Amount (₹)" className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white" />
                    <input type="text" placeholder="Payee Name" className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white" />
                  </div>
                  <button className="w-full py-2.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold">
                    Submit Positive Pay Confirmation
                  </button>
                </div>
              </div>
            </FloatingCard>
          )}

          {/* Account Opening Modal */}
          {showOpenAccountModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">Open SmartBank Indian Vault Account</h3>
                  <button onClick={() => setShowOpenAccountModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {accountTypes.map((acc) => (
                    <div
                      key={acc.id}
                      onClick={() => setSelectedVariant(acc.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedVariant === acc.id
                          ? "bg-emerald-500/10 border-emerald-500/50 text-white"
                          : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between font-bold text-xs text-white">
                        <span>{acc.name}</span>
                        <span className="text-emerald-400">{acc.rate}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{acc.desc}</p>
                      <div className="text-[10px] text-slate-500 font-mono mt-2">Min Balance: {acc.minBal}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    alert("Account application submitted! Aadhaar eKYC verification initiated.");
                    setShowOpenAccountModal(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl font-bold text-white text-xs shadow-lg"
                >
                  Proceed with Aadhaar eKYC & Nominee Selection
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </CustomerDashboardLayout>
  );
};
