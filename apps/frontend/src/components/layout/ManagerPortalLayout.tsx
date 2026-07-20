import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ManagerLayoutProps {
  children: React.ReactNode;
}

export const ManagerPortalLayout: React.FC<ManagerLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Branch Overview", path: "/manager/dashboard", icon: "🏢" },
    { label: "Loan Approvals", path: "/manager/loans", icon: "💎" },
    { label: "Advanced Analytics", path: "/manager/analytics", icon: "📊" },
    { label: "Fraud Monitoring", path: "/manager/fraud", icon: "🛡️" },
    { label: "Employee & Roles", path: "/manager/employees", icon: "👥" },
    { label: "Treasury Reports", path: "/manager/reports", icon: "📑" },
  ];

  return (
    <div className="min-h-screen bg-[#080A0F] text-white font-sans flex flex-col antialiased">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/manager/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-amber-500/20">
              MP
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline-block">
              SmartBank <span className="text-amber-400 font-extrabold">Manager Portal</span>
            </span>
          </Link>
          <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/30">
            TREASURY & BRANCH CFO
          </span>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold">{user?.first_name} {user?.last_name}</div>
            <div className="text-[10px] text-amber-400 font-mono">Branch General Manager</div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="px-3 py-1.5 bg-white/10 hover:bg-red-500/20 text-xs font-semibold rounded-xl text-slate-300 hover:text-red-400 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Dock */}
        <aside className="w-64 border-r border-white/10 bg-slate-900/40 backdrop-blur-xl p-4 hidden md:flex flex-col justify-between shrink-0">
          <nav className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Treasury Operations
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/20 to-orange-600/20 text-amber-300 border border-amber-500/30 shadow-md font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-slate-300 space-y-1">
            <div className="font-bold text-amber-300">Branch Reserve Ratio</div>
            <div className="text-sm font-mono font-extrabold text-white">42.8% (Optimal)</div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
