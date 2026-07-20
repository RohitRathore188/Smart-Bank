import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";

export const EmployeeAccountsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([
    { id: "usr_1", name: "Alex Morgan", email: "alex.morgan@enterprise.com", balance: "$148,920.45", status: "ACTIVE" },
    { id: "usr_2", name: "Sarah Connor", email: "sarah.connor@smartbank.ai", balance: "$34,120.00", status: "ACTIVE" },
    { id: "usr_3", name: "Michael Vance", email: "mvance@cybernet.io", balance: "$2,400.00", status: "FROZEN" },
  ]);

  const toggleFreeze = (id: string) => {
    setCustomers(customers.map(c => {
      if (c.id === id) {
        const newStatus = c.status === "ACTIVE" ? "FROZEN" : "ACTIVE";
        alert(`Updated ${c.name} status to ${newStatus}`);
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <EmployeePortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Customer Account Directory</h1>
            <p className="text-sm text-slate-400">Search customer vaults, inspect balances, and enforce account freezes</p>
          </div>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer name, email, or user ID..."
          className="w-full bg-slate-900/60 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-400"
        />

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          {filtered.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-base">{c.name}</div>
                <div className="text-xs text-slate-400">{c.email} • ID: {c.id}</div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="font-mono font-bold text-white text-sm">{c.balance}</div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    c.status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}>
                    {c.status}
                  </span>
                </div>

                <button
                  onClick={() => toggleFreeze(c.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    c.status === "ACTIVE" ? "bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30"
                  }`}
                >
                  {c.status === "ACTIVE" ? "Freeze Account" : "Unfreeze Account"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EmployeePortalLayout>
  );
};
