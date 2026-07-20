import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface EmployeePortalLayoutProps {
  children: React.ReactNode;
}

export const EmployeePortalLayout: React.FC<EmployeePortalLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Teller Dashboard", href: "/employee/dashboard", icon: "💵" },
    { name: "eKYC Inspection Queue", href: "/employee/kyc", icon: "🆔" },
    { name: "Accounts & Lockers", href: "/employee/accounts", icon: "🔐" },
    { name: "AML Monitoring", href: "/employee/transactions", icon: "⚖️" },
    { name: "Grievance Tickets", href: "/employee/complaints", icon: "🎫" },
    { name: "Compliance Reports", href: "/employee/reports", icon: "📊" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Employee Header */}
      <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-2xl sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/employee/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center font-black text-xl shadow-md text-white">
              🏦
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                STAFF OPERATIONS PORTAL
              </span>
              <span className="block text-[9px] font-mono text-emerald-600 uppercase tracking-widest -mt-1 font-bold">
                SmartBank Branch #108 • Mumbai Main
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900">{user?.first_name || "Priya"} {user?.last_name || "Sharma"}</div>
            <div className="text-[10px] text-slate-500 font-mono">STAFF ID: EMP-1082 (Head Cashier)</div>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors text-xs font-bold border border-slate-200"
            title="Logout"
          >
            🚪
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Employee Navigation */}
        <aside className="w-64 border-r border-slate-200 bg-white/60 p-4 space-y-2 hidden lg:block overflow-y-auto">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Staff Operations
          </div>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </aside>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
