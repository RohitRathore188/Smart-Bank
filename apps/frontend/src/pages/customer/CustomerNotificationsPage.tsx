import React, { useState } from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";
import { PageTransition } from "../../components/animations/PageTransition";
import { FloatingCard } from "../../components/animations/MicroInteractions";

export const CustomerNotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<"ALL" | "SECURITY" | "TRANSACTIONS">("ALL");

  const notifications = [
    { title: "UPI Transfer Alert", desc: "₹850.00 transferred via UPI to Zomato Ltd. UTR: 61920491820.", time: "Today, 1:24 PM", type: "TRANSACTIONS", icon: "⚡" },
    { title: "New Device Login Detected", desc: "Logged in from Chrome / Windows 11 (IP 103.21.124.9).", time: "Today, 10:15 AM", type: "SECURITY", icon: "🔒" },
    { title: "Tax-Saver FD Yield Credit", desc: "₹3,690.00 interest credited to your 80C Tax Saver FD.", time: "Jul 15, 2026", type: "TRANSACTIONS", icon: "📈" },
    { title: "RuPay Platinum Card Limit Change", desc: "E-Commerce daily spend limit updated to ₹1,00,000.", time: "Jul 10, 2026", type: "SECURITY", icon: "💳" },
  ];

  const filteredList = filter === "ALL" ? notifications : notifications.filter((n) => n.type === filter);

  return (
    <CustomerDashboardLayout>
      <PageTransition>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Real-Time Security & Transaction Alert Stream
              </h1>
              <p className="text-sm text-slate-400">Instant SMS, Email & Push Security Broadcasts</p>
            </div>

            <div className="flex space-x-2">
              {[
                { id: "ALL", label: "All Alerts" },
                { id: "SECURITY", label: "Security & Login" },
                { id: "TRANSACTIONS", label: "Transactions" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filter === f.id
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <FloatingCard className="p-6 space-y-4">
            <div className="space-y-3">
              {filteredList.map((n, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                      {n.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{n.title}</div>
                      <div className="text-xs text-slate-400">{n.desc}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">{n.time}</span>
                </div>
              ))}
            </div>
          </FloatingCard>
        </div>
      </PageTransition>
    </CustomerDashboardLayout>
  );
};
