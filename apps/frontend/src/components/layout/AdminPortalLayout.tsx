import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminPortalLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Global Command", path: "/admin/dashboard", icon: "⚡" },
    { label: "User Management", path: "/admin/users", icon: "👤" },
    { label: "Staff Directory", path: "/admin/employees", icon: "👥" },
    { label: "Bank Settings", path: "/admin/bank-settings", icon: "⚙️" },
    { label: "Yield & Rates", path: "/admin/rates", icon: "📈" },
    { label: "Audit Logs", path: "/admin/audit-logs", icon: "📑" },
    { label: "System Health", path: "/admin/health", icon: "🟢" },
    { label: "Platform Analytics", path: "/admin/analytics", icon: "📊" },
    { label: "Global Alerts", path: "/admin/notifications", icon: "📢" },
    { label: "Theme Engine", path: "/admin/theme", icon: "🎨" },
  ];

  return (
    <div className="min-h-screen bg-[#080A0F] text-white font-sans flex flex-col antialiased">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/admin/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-cyan-500/20">
              AD
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline-block">
              SmartBank <span className="text-cyan-400 font-extrabold">Super Admin</span>
            </span>
          </Link>
          <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/20 px-2.5 py-1 rounded-full border border-cyan-500/30">
            GLOBAL SYSTEM COMMAND
          </span>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold">{user?.first_name} {user?.last_name}</div>
            <div className="text-[10px] text-cyan-400 font-mono">Platform Super Administrator</div>
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
              System Administration
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30 shadow-md font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-xs text-slate-300 space-y-1">
            <div className="flex items-center justify-between font-bold text-cyan-300">
              <span>FastAPI Throughput</span>
              <span className="font-mono text-emerald-400">8.4k RPS</span>
            </div>
            <div className="text-[10px] text-slate-400">Zero Trust API Guard Enforced</div>
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
