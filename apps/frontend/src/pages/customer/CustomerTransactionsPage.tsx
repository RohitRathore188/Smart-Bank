import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const CustomerTransactionsPage: React.FC = () => {
  const [paymentType, setPaymentType] = useState<"UPI" | "IMPS" | "NEFT" | "RTGS" | "INTERNAL" | "UPI_LITE" | "SCHEDULED">("UPI");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"FORM" | "OTP" | "SUCCESS">("FORM");
  const [utrNumber, setUtrNumber] = useState("");

  const dailySpent = 45000;
  const dailyLimit = 200000;

  const handleInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    if (paymentType === "UPI_LITE" && parseFloat(amount) <= 500) {
      // UPI Lite bypasses OTP
      const newUtr = "UPIL" + Math.floor(Math.random() * 9000000000 + 1000000000);
      setUtrNumber(newUtr);
      setStep("SUCCESS");
    } else {
      setStep("OTP");
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    const prefix = paymentType === "UPI" ? "UPI" : paymentType === "NEFT" ? "NEFT" : paymentType === "RTGS" ? "RTGS" : "IMPS";
    const newUtr = prefix + Math.floor(Math.random() * 9000000000 + 1000000000);
    setUtrNumber(newUtr);
    setStep("SUCCESS");
  };

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Indian Payment & Settlement Engine
              </h1>
              <p className="text-sm text-slate-400">UPI 2.0, IMPS, NEFT, RTGS, Internal Wire & UPI Lite Zero-PIN Wallet</p>
            </div>

            {/* Daily Limit Telemetry */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-right font-mono text-xs">
              <div className="text-slate-400 text-[10px] uppercase">Daily Limit Velocity</div>
              <div className="text-emerald-400 font-bold">₹{dailySpent.toLocaleString()} / ₹{dailyLimit.toLocaleString()} Spent</div>
              <div className="w-48 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(dailySpent / dailyLimit) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Payment Studio (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="font-bold text-white text-base">Select Payment Instrument</h3>
                  <span className="text-xs font-mono text-emerald-400">24x7 RBI & NPCI Cleared</span>
                </div>

                {/* 7 Payment Modes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { type: "UPI", label: "⚡ UPI 2.0", desc: "Instant VPA/QR" },
                    { type: "UPI_LITE", label: "🚀 UPI Lite", desc: "Zero-PIN < ₹500" },
                    { type: "IMPS", label: "📲 IMPS", desc: "Instant Account" },
                    { type: "NEFT", label: "🏦 NEFT", desc: "24x7 Batched" },
                    { type: "RTGS", label: "💎 RTGS", desc: "Above ₹2 Lakhs" },
                    { type: "INTERNAL", label: "🔄 Internal", desc: "SmartBank Zero-Fee" },
                    { type: "SCHEDULED", label: "📅 Scheduled", desc: "Standing Orders" },
                  ].map((m) => (
                    <button
                      key={m.type}
                      onClick={() => {
                        setPaymentType(m.type as any);
                        setStep("FORM");
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        paymentType === m.type
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-lg"
                          : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      <div className="text-xs font-bold">{m.label}</div>
                      <div className="text-[9px] text-slate-400">{m.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Payment Form */}
                {step === "FORM" && (
                  <form onSubmit={handleInitiate} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {paymentType === "UPI" || paymentType === "UPI_LITE"
                          ? "UPI VPA / Mobile Handle"
                          : paymentType === "INTERNAL"
                          ? "SmartBank Account Number"
                          : "Beneficiary Account Number & IFSC"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={paymentType === "UPI" ? "e.g. rohit@smartbank" : "e.g. 50100489201945"}
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Amount (₹ INR)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        max={paymentType === "UPI_LITE" ? 500 : undefined}
                        placeholder={paymentType === "UPI_LITE" ? "Max ₹500 for UPI Lite" : "Enter amount (₹)"}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-lg font-bold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                    >
                      {paymentType === "UPI_LITE" ? "Pay Instantly without PIN (UPI Lite)" : "Send OTP & Authorize Payment"}
                    </button>
                  </form>
                )}

                {/* OTP Verification Step */}
                {step === "OTP" && (
                  <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xl flex items-center justify-center mx-auto">
                      🔑
                    </div>
                    <h4 className="font-bold text-white text-base">Enter 6-Digit SMS OTP</h4>
                    <p className="text-xs text-slate-400">
                      Sent to registered mobile +91 ••••• ••108 for transfer of ₹{parseFloat(amount).toLocaleString()}.
                    </p>

                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="• • • • • •"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-48 mx-auto text-center tracking-widest text-2xl font-mono p-3 rounded-xl bg-slate-900 border border-emerald-500/50 text-white font-bold"
                    />

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl"
                    >
                      Verify OTP & Authorize Transfer
                    </button>
                  </form>
                )}
              </FloatingCard>
            </div>

            {/* Passbook Feed (1 Col) */}
            <div className="space-y-6">
              <FloatingCard className="p-6 space-y-4">
                <h3 className="font-bold text-white text-sm">Passbook Transaction History</h3>
                <div className="space-y-3">
                  {[
                    { utr: "UPI/61920491820", name: "Zomato UPI", amount: "-₹850.00", status: "NPCI SETTLED" },
                    { utr: "NEFT/N1920491821", name: "TCS Salary Credit", amount: "+₹1,85,000.00", status: "RBI SETTLED" },
                    { utr: "UPIL/L9102849182", name: "Chai Point UPI Lite", amount: "-₹40.00", status: "ZERO PIN" },
                  ].map((tx, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs">
                      <div className="flex justify-between font-bold text-white">
                        <span>{tx.name}</span>
                        <span className={tx.amount.startsWith("+") ? "text-emerald-400" : "text-white"}>{tx.amount}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>{tx.utr}</span>
                        <span className="text-emerald-400 font-bold">{tx.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>
          </div>

          {/* Payment Success Modal */}
          {step === "SUCCESS" && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-3xl flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white">Payment Authorized!</h3>
                <p className="text-xs text-slate-300">
                  ₹{parseFloat(amount).toLocaleString()} sent via <strong>{paymentType}</strong> to {recipient}.
                </p>
                <div className="p-3 rounded-xl bg-white/5 font-mono text-[11px] text-slate-400 text-left space-y-1">
                  <div>UTR Reference: <span className="text-white font-bold">{utrNumber}</span></div>
                  <div>Settlement Status: <span className="text-emerald-400 font-bold">COMPLETED (NPCI / RBI)</span></div>
                </div>
                <button
                  onClick={() => {
                    setStep("FORM");
                    setAmount("");
                    setRecipient("");
                    setOtp("");
                  }}
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
