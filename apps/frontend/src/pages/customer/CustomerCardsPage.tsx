import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";
import { CreditCard3DCanvas } from "../../components/3d/CreditCard3DCanvas";

export const CustomerCardsPage: React.FC = () => {
  const [activeCardType, setActiveCardType] = useState<"DEBIT" | "CREDIT">("DEBIT");
  const [isFrozen, setIsFrozen] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [posLimit, setPosLimit] = useState(50000);
  const [onlineLimit, setOnlineLimit] = useState(100000);

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                RuPay Platinum & Credit Cards
              </h1>
              <p className="text-sm text-slate-400">NCMC Metro & Toll Transit Enabled • Contactless NFC & Dynamic Virtual Cards</p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setActiveCardType("DEBIT")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCardType === "DEBIT"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                RuPay Platinum Debit
              </button>
              <button
                onClick={() => setActiveCardType("CREDIT")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCardType === "CREDIT"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                RuPay Select Credit
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 3D Metal Card Display Column (1 Col) */}
            <div className="space-y-6">
              <CreditCard3DCanvas
                cardholderName="ROHIT RATHORE"
                lastFour={activeCardType === "DEBIT" ? "9102" : "4819"}
                expiry="07/29"
                isFrozen={isFrozen}
                tier={activeCardType === "DEBIT" ? "RUPAY_PLATINUM" : "VIP_GOLD"}
              />

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsFrozen(!isFrozen)}
                  className={`py-3 rounded-xl font-bold text-xs transition-all ${
                    isFrozen
                      ? "bg-red-500/20 text-red-300 border border-red-500/40"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {isFrozen ? "Unfreeze Card" : "Freeze Card"}
                </button>
                <button
                  onClick={() => setShowCVV(!showCVV)}
                  className="py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs text-white"
                >
                  {showCVV ? "CVV: 849" : "Reveal CVV"}
                </button>
              </div>
            </div>

            {/* Spend Controls & Security Velocity (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-6">
                <h3 className="font-bold text-white text-base">Card Security & Spend Limits (INR)</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>POS & ATM Daily Limit</span>
                      <span className="text-emerald-400 font-mono">₹{posLimit.toLocaleString()} / day</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="200000"
                      step="5000"
                      value={posLimit}
                      onChange={(e) => setPosLimit(parseInt(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>Online E-Commerce Limit</span>
                      <span className="text-emerald-400 font-mono">₹{onlineLimit.toLocaleString()} / day</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="500000"
                      step="10000"
                      value={onlineLimit}
                      onChange={(e) => setOnlineLimit(parseInt(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-300">NCMC Metro Contactless</span>
                    <span className="text-emerald-400 font-bold">ACTIVE ✓</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-300">International POS</span>
                    <span className="text-slate-400 font-bold">DISABLED</span>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </PageTransition>
    </CustomerDashboardLayout>
  );
};
