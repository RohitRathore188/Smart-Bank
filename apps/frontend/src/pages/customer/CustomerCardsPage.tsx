import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";
import { CreditCard3DCanvas } from "../../components/3d/CreditCard3DCanvas";

export const CustomerCardsPage: React.FC = () => {
  const [posLimit, setPosLimit] = useState(50000);
  const [onlineLimit, setOnlineLimit] = useState(100000);
  const [showCvv, setShowCvv] = useState(false);

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                RuPay Platinum & Select Credit Cards
              </h1>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Card Security Sliders, Temporary Freeze & CVV Reveal Timer</p>
            </div>

            <button
              onClick={() => {
                setShowCvv(true);
                setTimeout(() => setShowCvv(false), 60000);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-transform"
            >
              {showCvv ? "CVV Revealed: 849 (Expires 60s)" : "👁️ Reveal CVV (60-Sec Timer)"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 3D Metal Card Spotlight (1 Col) */}
            <div className="space-y-6">
              <CreditCard3DCanvas cardholderName="ROHIT RATHORE" lastFour="9102" expiry="07/29" tier="RUPAY_PLATINUM" />

              <FloatingCard className="p-6 space-y-4 bg-white border border-slate-200 shadow-md">
                <h3 className="font-extrabold text-slate-900 text-sm">Card Status & Security</h3>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Card Status:</span>
                    <span className="font-bold text-emerald-700">ACTIVE ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">NCMC Contactless:</span>
                    <span className="font-bold text-blue-700">ENABLED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">International POS:</span>
                    <span className="font-bold text-slate-900">DISABLED</span>
                  </div>
                </div>
              </FloatingCard>
            </div>

            {/* Spend Limits & Sliders (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FloatingCard className="p-6 space-y-6 bg-white border border-slate-200 shadow-md">
                <h3 className="font-extrabold text-slate-900 text-base">Daily Transaction Spend Limit Controls</h3>

                <div className="space-y-6">
                  {/* POS Limit */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                      <span>POS & Merchant Store Limit</span>
                      <span className="text-blue-700 font-mono text-base font-extrabold">₹{posLimit.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="200000"
                      step="5000"
                      value={posLimit}
                      onChange={(e) => setPosLimit(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  {/* Online Limit */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                      <span>E-Commerce & Online Spend Limit</span>
                      <span className="text-indigo-700 font-mono text-base font-extrabold">₹{onlineLimit.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="300000"
                      step="5000"
                      value={onlineLimit}
                      onChange={(e) => setOnlineLimit(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
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
