import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AICopilotDrawer } from "../ai-copilot/AICopilotDrawer";

interface CustomerDashboardLayoutProps {
  children: React.ReactNode;
}

export const CustomerDashboardLayout: React.FC<CustomerDashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Accounts & FD", href: "/vaults", icon: "🏛️" },
    { name: "UPI & Passbook", href: "/transactions", icon: "⚡" },
    { name: "RuPay Cards", href: "/cards", icon: "💳" },
    { name: "Pre-Approved Credit", href: "/loans", icon: "💎" },
    { name: "Beneficiaries", href: "/beneficiaries", icon: "👥" },
    { name: "Deposits & Tax", href: "/deposits", icon: "📄" },
    { name: "SmartBank AI Hub", href: "/copilot", icon: "🤖" },
    { name: "Notifications", href: "/notifications", icon: "🔔" },
    { name: "Settings", href: "/settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-[#080A0F] text-white flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Live Indian FX Ticker Bar */}
      <div className="bg-slate-950/80 border-b border-white/5 px-4 py-1.5 text-[11px] font-mono flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-6 shrink-0">
          <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>RBI LIVE TICKER</span>
          </span>
          <span className="text-slate-400">USD/INR: <strong className="text-white">₹83.42</strong> <span className="text-emerald-400">▲ +0.04</span></span>
          <span className="text-slate-400">EUR/INR: <strong className="text-white">₹90.85</strong> <span className="text-red-400">▼ -0.12</span></span>
          <span className="text-slate-400">GBP/INR: <strong className="text-white">₹107.15</strong> <span className="text-emerald-400">▲ +0.18</span></span>
          <span className="text-slate-400">Gold (24K): <strong className="text-amber-300">₹74,200 /10g</strong></span>
        </div>
        <div className="text-slate-400 shrink-0 hidden md:block">
          DICGC Insured up to ₹5 Lakhs per depositor 🇮🇳
        </div>
      </div>

      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-white/10 bg-slate-900/60 backdrop-blur-2xl sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-blue-600 flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20">
              🇮🇳
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                SMARTBANK INDIA
              </span>
              <span className="block text-[9px] font-mono text-emerald-400 uppercase tracking-widest -mt-1">
                Bharat AI Banking
              </span>
            </div>
          </Link>
        </div>

        {/* Action Controls & User Dropdown */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 hover:border-emerald-500/60 text-xs font-bold text-emerald-300 flex items-center space-x-2 transition-all duration-200 shadow-md active:scale-95"
          >
            <span>🤖 Gemini AI Assistant</span>
          </button>

          <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">{user?.first_name || "Rohit"} {user?.last_name || "Rathore"}</div>
              <div className="text-[10px] text-slate-400 font-mono">PAN: ABCDE1234F</div>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors text-xs font-bold border border-white/10"
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Dock Navigation */}
        <aside className="w-64 border-r border-white/10 bg-slate-950/40 p-4 space-y-2 hidden lg:block overflow-y-auto">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Main Services
          </div>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/20 to-cyan-600/20 text-emerald-300 border border-emerald-500/30 shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-6">
            <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-slate-900 border border-emerald-500/20 text-center space-y-2">
              <div className="text-2xl">🛡️</div>
              <div className="text-xs font-bold text-white">RBI Compliance Shield</div>
              <div className="text-[10px] text-slate-400">256-bit AES Encryption with instant Fraud Freeze</div>
            </div>
          </div>
        </aside>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>

      {/* Slide-over Gemini AI Copilot Drawer */}
      <AICopilotDrawer isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
    </div>
  );
};
