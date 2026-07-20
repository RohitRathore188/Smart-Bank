import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const CustomerTransactionsPage: React.FC = () => {
  const [transferMode, setTransferMode] = useState<"UPI" | "IMPS" | "NEFT" | "RTGS">("UPI");
  const [recipientVPA, setRecipientVPA] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferAmount || parseFloat(transferAmount) <= 0) return;
    setIsSuccessModalOpen(true);
  };

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                UPI & Interbank Money Transfer
              </h1>
              <p className="text-sm text-slate-400">24x7 Instant Settlements • NPCI Unified Payments Interface & RBI Clearing Rails</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transfer Studio (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="font-bold text-white text-base">Send Money (INR)</h3>
                  <span className="text-xs text-emerald-400 font-mono">Zero Charges on UPI & NEFT</span>
                </div>

                {/* Mode Selector */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { mode: "UPI", label: "⚡ UPI 2.0", desc: "Instant VPA/QR" },
                    { mode: "IMPS", label: "🚀 IMPS", desc: "Instant Account" },
                    { mode: "NEFT", label: "🏦 NEFT", desc: "24x7 Batched" },
                    { mode: "RTGS", label: "💎 RTGS", desc: "Above ₹2 Lakhs" },
                  ].map((m) => (
                    <button
                      key={m.mode}
                      onClick={() => setTransferMode(m.mode as any)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        transferMode === m.mode
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-lg"
                          : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      <div className="text-xs font-bold">{m.label}</div>
                      <div className="text-[9px] text-slate-400">{m.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleTransfer} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      {transferMode === "UPI" ? "Virtual Payment Address (VPA) / UPI ID" : "Beneficiary Account Number & IFSC"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={transferMode === "UPI" ? "e.g. rohit@smartbank or 9876543210@upi" : "e.g. 50100489201945 (IFSC: SBAIN000108)"}
                      value={recipientVPA}
                      onChange={(e) => setRecipientVPA(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Amount (₹ INR)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="Enter amount (₹)"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Payment Remarks (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Rent payment / Salary credit"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    Confirm & Authorize Transfer via {transferMode}
                  </button>
                </form>
              </FloatingCard>
            </div>

            {/* Side Passbook Quick View */}
            <div className="space-y-6">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-sm">Passbook Digital Statement</h3>
                <div className="space-y-3">
                  {[
                    { utr: "UPI/61920491820", name: "Zomato Ltd", amount: "-₹850.00", date: "Today" },
                    { utr: "NEFT/N1920491821", name: "TCS Salary Credit", amount: "+₹1,85,000.00", date: "Jul 1" },
                    { utr: "IMPS/I1920491822", name: "Electricity BESCOM", amount: "-₹2,340.00", date: "Jul 18" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs">
                      <div className="flex justify-between font-bold text-white">
                        <span>{item.name}</span>
                        <span className={item.amount.startsWith("+") ? "text-emerald-400" : "text-white"}>{item.amount}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>{item.utr}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>
          </div>

          {/* Success Modal */}
          {isSuccessModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white">Transfer Successful!</h3>
                <p className="text-xs text-slate-300">
                  ₹{parseFloat(transferAmount).toLocaleString()} was transferred via <strong>{transferMode}</strong> to {recipientVPA}.
                </p>
                <div className="p-3 rounded-xl bg-white/5 font-mono text-[11px] text-slate-400 text-left space-y-1">
                  <div>UTR Ref No: <span className="text-white">SBIN{Math.floor(Math.random() * 9000000000 + 1000000000)}</span></div>
                  <div>Status: <span className="text-emerald-400 font-bold">COMPLETED (NPCI SETTLED)</span></div>
                </div>
                <button
                  onClick={() => setIsSuccessModalOpen(false)}
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
