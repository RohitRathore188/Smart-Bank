import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";

export const CustomerTransactionsPage: React.FC = () => {
  const [search, setSearch] = useState("");

  const transactions = [
    { id: "tx_1", name: "Apple Store Online", category: "Electronics", amount: "-$1,299.00", status: "CLEARED", date: "2026-07-20 10:24 AM", icon: "🍏", color: "text-white" },
    { id: "tx_2", name: "Stripe Operations Payout", category: "Revenue", amount: "+$4,850.00", status: "CLEARED", date: "2026-07-19 04:15 PM", icon: "💰", color: "text-emerald-400" },
    { id: "tx_3", name: "AWS Infrastructure Cloud", category: "Hosting", amount: "-$342.50", status: "CLEARED", date: "2026-07-18 09:10 AM", icon: "☁️", color: "text-white" },
    { id: "tx_4", name: "Automated EUR Yield Vault", category: "Yield", amount: "+$124.20", status: "CLEARED", date: "2026-07-15 12:00 PM", icon: "📈", color: "text-amber-400" },
    { id: "tx_5", name: "Uber Technologies Trip", category: "Transport", amount: "-$34.20", status: "CLEARED", date: "2026-07-14 08:45 PM", icon: "🚗", color: "text-white" },
  ];

  const filtered = transactions.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <CustomerDashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Transactions Ledger</h1>
            <p className="text-sm text-slate-400">Immutable double-entry transaction history</p>
          </div>
          <button onClick={() => alert("Exporting CSV Ledger...")} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl">
            📥 Export CSV
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions by merchant, category, or amount..."
          className="w-full bg-slate-900/60 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400"
        />

        {/* Transaction Table Card */}
        <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 space-y-3">
          {filtered.map((tx) => (
            <div key={tx.id} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
                  {tx.icon}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{tx.name}</div>
                  <div className="text-xs text-slate-400">{tx.category} • {tx.date}</div>
                </div>
              </div>

              <div className="text-right">
                <div className={`font-mono font-bold text-base ${tx.color}`}>{tx.amount}</div>
                <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mt-1">
                  {tx.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};
