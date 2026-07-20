import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const CustomerAccountsPage: React.FC = () => {
  const [isRequisitionSubmitted, setIsRequisitionSubmitted] = useState(false);

  const accounts = [
    { type: "Savings Bank Vault", accNo: "50100489201945", ifsc: "SBAIN000108", balance: "₹9,24,000.00", status: "ACTIVE ✓" },
    { type: "Tax-Saver 80C Fixed Deposit", accNo: "FD80C910284918", ifsc: "SBAIN000108", balance: "₹5,65,200.00", status: "7.85% p.a." },
    { type: "Salary Account (Corporate)", accNo: "50100998811223", ifsc: "SBAIN000108", balance: "₹1,85,000.00", status: "ZERO BALANCE" },
  ];

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Accounts & Fixed Deposit Vaults
              </h1>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Manage 9 Account Variants, Cheque Books & Positive Pay System (PPS)</p>
            </div>

            <button
              onClick={() => setIsRequisitionSubmitted(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-transform"
            >
              + Requisition 25-Leaf CTS Cheque Book
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accounts.map((acc, i) => (
              <FloatingCard key={i} className="p-6 space-y-4 bg-white border border-slate-200 shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase font-mono">
                      {acc.status}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base mt-2">{acc.type}</h3>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 font-mono text-xs">
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Account Number:</span>
                    <span className="text-slate-900 font-bold">{acc.accNo}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>IFSC Code:</span>
                    <span className="text-blue-700 font-bold">{acc.ifsc}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-semibold">Available Balance</span>
                  <span className="text-lg font-extrabold text-slate-900 font-mono">{acc.balance}</span>
                </div>
              </FloatingCard>
            ))}
          </div>

          {/* Requisition Modal */}
          {isRequisitionSubmitted && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white border border-blue-200 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 border border-blue-300 text-3xl flex items-center justify-center mx-auto">
                  📖
                </div>
                <h3 className="text-lg font-bold text-slate-900">Cheque Book Dispatched!</h3>
                <p className="text-xs text-slate-600 font-medium">
                  25-Leaf CTS-2010 cheque book has been dispatched to your registered address via India Post Speed Post.
                </p>
                <button
                  onClick={() => setIsRequisitionSubmitted(false)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs rounded-xl shadow-md"
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
