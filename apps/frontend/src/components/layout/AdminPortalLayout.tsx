import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface AdminPortalLayoutProps {
  children: React.ReactNode;
}

export const AdminPortalLayout: React.FC<AdminPortalLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Global Command Cockpit", href: "/admin/dashboard", icon: "⚡" },
    { name: "Branch & IFSC Directory", href: "/admin/bank-settings", icon: "🏢" },
    { name: "Interest Rate Configurator", href: "/admin/rates", icon: "📈" },
    { name: "CDC & Security Audit Logs", href: "/admin/audit-logs", icon: "🔒" },
    { name: "Global Customer Directory", href: "/admin/users", icon: "👥" },
    { name: "Staff Roster Provisioning", href: "/admin/employees", icon: "👤" },
    { name: "System Health & Backups", href: "/admin/health", icon: "💾" },
    { name: "Global Telemetry Analytics", href: "/admin/analytics", icon: "📊" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Admin Header */}
      <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-2xl sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-800 flex items-center justify-center font-black text-xl shadow-md text-white">
              ⚡
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                SUPER ADMIN COMMAND CENTER
              </span>
              <span className="block text-[9px] font-mono text-purple-600 uppercase tracking-widest -mt-1 font-bold">
                SmartBank Global Governance Platform
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900">{user?.first_name || "Super"} {user?.last_name || "Admin"}</div>
            <div className="text-[10px] text-slate-500 font-mono">GLOBAL SYSTEM ADMINISTRATOR</div>
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
        {/* Admin Navigation */}
        <aside className="w-64 border-r border-slate-200 bg-white/60 p-4 space-y-2 hidden lg:block overflow-y-auto">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Platform Governance
          </div>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-purple-500/10 text-purple-800 border border-purple-500/30 shadow-sm"
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
