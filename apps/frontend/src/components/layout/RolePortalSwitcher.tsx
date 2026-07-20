import React from "react";
import { Link, useLocation } from "react-router-dom";

export const RolePortalSwitcher: React.FC = () => {
  const location = useLocation();

  const portals = [
    { name: "Customer", path: "/dashboard", icon: "👤", color: "hover:border-blue-500 text-blue-700 bg-blue-50 border-blue-200" },
    { name: "Bank Employee", path: "/employee/dashboard", icon: "💵", color: "hover:border-emerald-500 text-emerald-700 bg-emerald-50 border-emerald-200" },
    { name: "Branch Manager", path: "/manager/dashboard", icon: "🏛️", color: "hover:border-amber-500 text-amber-700 bg-amber-50 border-amber-200" },
    { name: "Super Admin", path: "/admin/dashboard", icon: "⚡", color: "hover:border-purple-500 text-purple-700 bg-purple-50 border-purple-200" },
  ];

  return (
    <div className="flex items-center space-x-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200">
      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase px-2 hidden xl:inline">Role Portal:</span>
      {portals.map((portal) => {
        const isActive = location.pathname.startsWith(portal.path.replace("/dashboard", ""));
        return (
          <Link
            key={portal.name}
            to={portal.path}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1 border ${
              isActive
                ? `${portal.color} shadow-sm font-extrabold`
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span>{portal.icon}</span>
            <span className="hidden sm:inline">{portal.name}</span>
          </Link>
        );
      })}
    </div>
  );
};
