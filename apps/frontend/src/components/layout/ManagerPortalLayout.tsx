import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ManagerPortalLayoutProps {
  children: React.ReactNode;
}

export const ManagerPortalLayout: React.FC<ManagerPortalLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Treasury Cockpit", href: "/manager/dashboard", icon: "🏛️" },
    { name: "Credit Line Sanctions", href: "/manager/loans", icon: "💎" },
    { name: "Branch Growth Analytics", href: "/manager/analytics", icon: "📊" },
    { name: "Gemini Fraud Radar", href: "/manager/fraud", icon: "🚨" },
    { name: "Staff & Teller Caps", href: "/manager/employees", icon: "👤" },
    { name: "Executive P&L Reports", href: "/manager/reports", icon: "📑" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Manager Header */}
      <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-2xl sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/manager/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center font-black text-xl shadow-md text-white">
              🏛️
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                BRANCH TREASURY PORTAL
              </span>
              <span className="block text-[9px] font-mono text-amber-600 uppercase tracking-widest -mt-1 font-bold">
                Branch Manager • Code: SBAIN000108
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900">{user?.first_name || "Vikramaditya"} {user?.last_name || "Singh"}</div>
            <div className="text-[10px] text-slate-500 font-mono">CHIEF BRANCH MANAGER</div>
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
        {/* Manager Navigation */}
        <aside className="w-64 border-r border-slate-200 bg-white/60 p-4 space-y-2 hidden lg:block overflow-y-auto">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Treasury Management
          </div>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-amber-500/10 text-amber-800 border border-amber-500/30 shadow-sm"
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
