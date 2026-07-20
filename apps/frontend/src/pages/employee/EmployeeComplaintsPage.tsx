import React, { useState } from "react";
import { EmployeePortalLayout } from "../../components/layout/EmployeePortalLayout";

export const EmployeeComplaintsPage: React.FC = () => {
  const [tickets, setTickets] = useState([
    { id: "tkt_101", customer: "Alex Morgan", subject: "Disputed Card Charge at Tech Merchant", priority: "HIGH", status: "OPEN", date: "2026-07-20" },
    { id: "tkt_102", customer: "Sarah Connor", subject: "Wire Transfer Settlement Delay to Germany", priority: "MEDIUM", status: "OPEN", date: "2026-07-19" },
    { id: "tkt_103", customer: "Michael Vance", subject: "eKYC Document Re-Upload Assistance", priority: "LOW", status: "RESOLVED", date: "2026-07-15" },
  ]);

  const resolveTicket = (id: string) => {
    alert(`Ticket ${id} marked as RESOLVED and response sent to customer.`);
    setTickets(tickets.map(t => t.id === id ? { ...t, status: "RESOLVED" } : t));
  };

  return (
    <EmployeePortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Customer Complaints & Dispute Tickets</h1>
            <p className="text-sm text-slate-400">Support tickets, card chargebacks, and wire inquiry management</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
          {tickets.map((t) => (
            <div key={t.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">{t.subject}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    t.priority === "HIGH" ? "bg-red-500/20 text-red-300" : "bg-amber-500/20 text-amber-300"
                  }`}>
                    {t.priority}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Customer: {t.customer} • Date: {t.date}</div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`text-xs font-bold font-mono ${t.status === "OPEN" ? "text-amber-400" : "text-emerald-400"}`}>
                  {t.status}
                </span>
                {t.status === "OPEN" && (
                  <button
                    onClick={() => resolveTicket(t.id)}
                    className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl border border-purple-500/30"
                  >
                    Resolve Ticket
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </EmployeePortalLayout>
  );
};
