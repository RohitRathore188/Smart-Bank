import React, { useState } from "react";

export const AnimatedCashflowChart: React.FC = () => {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const points = [
    { label: "May 1", val: 42000, x: 0, y: 120 },
    { label: "May 15", val: 68000, x: 100, y: 90 },
    { label: "Jun 1", val: 54000, x: 200, y: 105 },
    { label: "Jun 15", val: 92000, x: 300, y: 60 },
    { label: "Jul 1", val: 124000, x: 400, y: 30 },
    { label: "Jul 20", val: 148920, x: 500, y: 15 },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
        <span>INTERACTIVE CASHFLOW CANVAS</span>
        <span className="text-emerald-600 font-bold">▲ +12.4% Net Inflow</span>
      </div>

      <div className="relative h-48 w-full bg-slate-50/80 rounded-2xl border border-slate-200 p-4 overflow-hidden">
        <svg viewBox="0 0 500 140" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d="M 0,140 L 0,120 Q 100,90 200,105 T 400,30 T 500,15 L 500,140 Z"
            fill="url(#chartGradient)"
          />

          {/* Glowing Stroke Wave */}
          <path
            d="M 0,120 Q 100,90 200,105 T 400,30 T 500,15"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            className="drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]"
          />

          {/* Data Points */}
          {points.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={activePoint === i ? 6 : 4}
              fill="#10B981"
              className="cursor-pointer transition-all duration-200 hover:r-8"
              onMouseEnter={() => setActivePoint(i)}
              onMouseLeave={() => setActivePoint(null)}
            />
          ))}
        </svg>

        {activePoint !== null && (
          <div
            className="absolute p-2 rounded-xl bg-white border border-emerald-500/50 text-[11px] font-mono text-slate-900 pointer-events-none shadow-xl"
            style={{
              left: `${(points[activePoint].x / 500) * 85 + 5}%`,
              top: "20px"
            }}
          >
            {points[activePoint].label}: <span className="font-bold text-emerald-600">₹{points[activePoint].val.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};
