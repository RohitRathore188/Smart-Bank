import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AICopilotDrawer } from "../ai-copilot/AICopilotDrawer";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export const CustomerDashboardLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);

  const navItems = [
    { label: "Overview", path: "/dashboard", icon: "🟢" },
    { label: "Vaults & FX", path: "/vaults", icon: "🌐" },
    { label: "Transactions", path: "/transactions", icon: "📑" },
    { label: "Cards (3D)", path: "/cards", icon: "💳" },
    { label: "Beneficiaries", path: "/beneficiaries", icon: "⚡" },
    { label: "Loans & Credit", path: "/loans", icon: "💎" },
    { label: "Deposits & Export", path: "/deposits", icon: "📥" },
    { label: "Notifications", path: "/notifications", icon: "🔔" },
    { label: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-[#080A0F] text-white font-sans flex flex-col antialiased selection:bg-cyan-500 selection:text-black">
      {/* Top Bar Navigation */}
      <header className="h-16 border-b border-white/10 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-cyan-500/20">
              S
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline-block">
              SmartBank <span className="text-cyan-400 font-extrabold">AI</span>
            </span>
          </Link>

          {/* Live FX Ticker */}
          <div className="hidden md:flex items-center space-x-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-xs">
            <span className="text-slate-400">FX Stream:</span>
            <span className="font-mono text-emerald-400">USD/EUR 0.918 ▲</span>
            <span className="font-mono text-cyan-400">GBP/USD 1.274 ▲</span>
          </div>
        </div>

        {/* Top Bar Actions */}
        <div className="flex items-center space-x-3">
          {/* AI Assistant Button */}
          <button
            onClick={() => setIsAIDrawerOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 hover:border-cyan-400 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-300 shadow-lg shadow-cyan-500/10 transition-all duration-200"
          >
            <span>🤖</span>
            <span>Gemini AI</span>
          </button>

          {/* Notifications Trigger */}
          <Link
            to="/notifications"
            className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <span>🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          </Link>

          {/* User Menu */}
          <div className="flex items-center space-x-3 pl-2 border-l border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 text-white font-bold text-sm flex items-center justify-center shadow-md">
              {user?.first_name?.[0] || "A"}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold leading-tight">{user?.first_name} {user?.last_name}</div>
              <div className="text-[10px] text-cyan-400 font-mono">Personal Vault</div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="text-xs text-slate-400 hover:text-red-400 transition-colors px-2"
              title="Sign Out"
            >
              🚪
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Dock (Desktop) */}
        <aside className="w-64 border-r border-white/10 bg-slate-900/40 backdrop-blur-xl p-4 hidden md:flex flex-col justify-between shrink-0">
          <nav className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Vault Navigation
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/5 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* System Status Footnote */}
          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span>System Health</span>
              <span className="text-emerald-400 font-bold">⚡ 99.99%</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Clean Architecture v1.0</div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
          {children}
        </main>
      </div>

      {/* Gemini AI Floating Drawer Component */}
      <AICopilotDrawer isOpen={isAIDrawerOpen} onClose={() => setIsAIDrawerOpen(false)} />
    </div>
  );
};
