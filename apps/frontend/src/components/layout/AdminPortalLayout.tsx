import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RolePortalSwitcher } from "./RolePortalSwitcher";

interface AdminPortalLayoutProps {
  children: React.ReactNode;
}

export const AdminPortalLayout: React.FC<AdminPortalLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = [
    { name: "Global Command Cockpit", subtitle: "Real-time Platform Telemetry", href: "/admin/dashboard", icon: "⚡" },
    { name: "Branch & IFSC Directory", subtitle: "Branch Codes & Interbank Tariff", href: "/admin/bank-settings", icon: "🏢" },
    { name: "Interest Rate Configurator", subtitle: "FD, Savings & Loan Yields", href: "/admin/rates", icon: "📈" },
    { name: "CDC & Security Audit Logs", subtitle: "Cryptographic Mutation Stream", href: "/admin/audit-logs", icon: "🔒" },
    { name: "Global Customer Directory", subtitle: "Tenant Matrix & KYC Overrides", href: "/admin/users", icon: "👥" },
    { name: "Staff Roster Provisioning", subtitle: "Teller Limits & Role Caps", href: "/admin/employees", icon: "👤" },
    { name: "System Health & Backups", subtitle: "Postgres WAL & ASGI Status", href: "/admin/health", icon: "💾" },
    { name: "Global Telemetry Analytics", subtitle: "P&L, NIM & Volume Growth", href: "/admin/analytics", icon: "📊" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F8FF] text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="h-20 border-b border-white/80 bg-white/60 backdrop-blur-[20px] sticky top-0 z-40 px-6 sm:px-8 flex items-center justify-between shadow-sm">
        {/* Left: Global Search */}
        <div className="flex items-center space-x-3 w-80">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Global Search (Accounts, IFSC, UTR)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-16 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center">
              <kbd className="px-2 py-0.5 text-[10px] font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded-md">
                CTRL + K
              </kbd>
            </span>
          </div>
        </div>

        {/* Center: Current Date & Time */}
        <div className="hidden md:flex items-center space-x-2 font-mono text-xs font-bold text-slate-700 bg-white/80 px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-blue-600">📅</span>
          <span>Jul 20, 2026</span>
          <span className="text-slate-300">|</span>
          <span className="text-purple-600 font-extrabold">15:52:00 IST</span>
        </div>

        {/* Right: Role Switcher, Profile & Quick Actions */}
        <div className="flex items-center space-x-4">
          <RolePortalSwitcher />

          <button className="p-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 relative shadow-sm">
            <span className="text-base">🔔</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          </button>

          <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
              SA
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-900">{user?.first_name || "Super"} {user?.last_name || "Administrator"}</div>
              <div className="text-[10px] text-purple-600 font-mono font-bold">ROLE: SUPER_ADMIN</div>
            </div>
            <button
              onClick={logout}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors text-xs font-bold border border-slate-200"
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Dark Navy Gradient Sidebar */}
        <aside className="w-72 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#090D16] text-white p-5 space-y-6 hidden lg:flex flex-col justify-between overflow-y-auto shadow-2xl m-3 rounded-3xl border border-white/10">
          <div className="space-y-4">
            {/* Sidebar Header Logo */}
            <div className="flex items-center space-x-3 px-2 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                ⚡
              </div>
              <div>
                <h2 className="font-extrabold text-sm tracking-tight text-white">SMARTBANK BHARAT</h2>
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Operating System v2.0</span>
              </div>
            </div>

            {/* Menu List */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Platform Governance
              </div>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-start space-x-3 px-3.5 py-3 rounded-2xl transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-xs font-bold leading-tight">{item.name}</div>
                      <div className="text-[10px] opacity-75 font-normal line-clamp-1 mt-0.5">{item.subtitle}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Live System Status Card with Heartbeat */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold">Live System Status</span>
              <span className="flex items-center space-x-1 text-emerald-400 font-mono text-[10px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>HEALTHY</span>
              </span>
            </div>
            <div className="h-6 w-full opacity-80">
              <svg viewBox="0 0 100 20" className="w-full h-full stroke-emerald-400 fill-none stroke-2">
                <path d="M 0,10 L 30,10 L 35,2 L 40,18 L 45,6 L 50,14 L 55,10 L 100,10" />
              </svg>
            </div>
            <div className="text-[10px] text-slate-400 font-mono flex justify-between">
              <span>Uptime: 99.99%</span>
              <span>FastAPI 8,400 RPS</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
