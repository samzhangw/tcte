import React from 'react';

interface TimeCardProps {
  value: number;
  label: string;
  colorClass?: string;
}

export const TimeCard: React.FC<TimeCardProps> = ({ value, label, colorClass = "text-slate-700" }) => {
  const formattedValue = value < 10 ? `0${value}` : value;

  return (
    <div className="flex flex-col items-center group/card">
      <div className="relative">
        {/* Glow effect behind */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-white rounded-2xl blur-md transform scale-95 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
        
        {/* Main Card */}
        <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-white/80 p-3 sm:p-5 min-w-[4.2rem] sm:min-w-[6rem] flex flex-col items-center justify-center transition-all duration-300 group-hover/card:-translate-y-1 group-hover/card:shadow-[0_8px_30px_-4px_rgba(99,102,241,0.15)] group-hover/card:border-indigo-100 overflow-hidden">
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
          
          {/* Subtle inner shadow at top for depth */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent pointer-events-none"></div>

          <span className={`text-3xl sm:text-5xl font-black tracking-tight font-mono-nums relative z-10 ${colorClass} drop-shadow-sm`}>
            {formattedValue}
          </span>
        </div>
      </div>
      <span className="text-[10px] sm:text-xs text-slate-400 mt-2.5 font-bold tracking-[0.2em] uppercase transition-colors group-hover/card:text-indigo-400">{label}</span>
    </div>
  );
};