import React from "react";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "🔍",
  title = "No Records Found",
  description = "There are no transactions or records available in this vault category.",
  actionLabel,
  onAction
}) => {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center space-y-3 flex flex-col items-center justify-center my-4">
      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-3xl">
        {icon}
      </div>
      <h4 className="text-base font-bold text-white tracking-tight">{title}</h4>
      <p className="text-xs text-slate-400 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl font-bold text-xs text-white shadow-md active:scale-95 transition-transform"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
