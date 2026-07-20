import React from "react";
import { CustomerDashboardLayout } from "../../components/layout/CustomerDashboardLayout";

export const CustomerNotificationsPage: React.FC = () => {
  const notifications = [
    { id: "1", title: "Card Authorization Approved", desc: "$1,299.00 spent at Apple Store Online using Platinum Virtual Card.", time: "10 min ago", icon: "💳" },
    { id: "2", title: "Automatic Yield Reallocated", desc: "$320.00 routed to 5.20% High-Yield Vault based on your Gemini AI spending rule.", time: "2 hours ago", icon: "🤖" },
    { id: "3", title: "Wire Deposit Received", desc: "+$4,850.00 cleared in USD Vault from Stripe Operations.", time: "Yesterday", icon: "💰" },
    { id: "4", title: "Security Login Alert", desc: "New login session authenticated from macOS M3 in New York, USA.", time: "Jul 18, 2026", icon: "🔒" },
  ];

  return (
    <CustomerDashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Notifications & Security Center</h1>
            <p className="text-sm text-slate-400">Real-time transactional and AI rule alert stream</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="p-4 rounded-2xl bg-white/5 flex items-center justify-between border border-white/5">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">{n.icon}</div>
                <div>
                  <div className="font-bold text-white text-sm">{n.title}</div>
                  <div className="text-xs text-slate-400">{n.desc}</div>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};
