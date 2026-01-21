import React from 'react';
import { ScheduleItem } from '../types';
import { Clock, ChevronRight, CalendarCheck, Sparkles, MapPin } from 'lucide-react';

interface EventRowProps {
  item: ScheduleItem;
  isNext: boolean;
  isPast: boolean;
  isLast: boolean;
}

export const EventRow: React.FC<EventRowProps> = ({ item, isNext, isPast, isLast }) => {
  const dateObj = new Date(item.startDate);
  const dateStr = dateObj.toLocaleDateString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
  });
  const yearStr = dateObj.getFullYear();
  
  const timeStr = dateObj.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
  });
  
  const hasTime = timeStr !== '00:00';
  const showEndDate = item.endDate;
  const endDateObj = item.endDate ? new Date(item.endDate) : null;

  // Visual States
  const containerOpacity = isPast ? 'opacity-50 grayscale-[0.8]' : 'opacity-100';
  const borderColor = isNext ? 'border-indigo-200' : 'border-transparent hover:border-slate-200';
  const shadowClass = isNext ? 'shadow-[0_8px_30px_rgb(99,102,241,0.15)]' : 'hover:shadow-lg hover:shadow-slate-200/50';
  const bgClass = isNext ? 'bg-white' : 'bg-white/40 hover:bg-white';
  
  return (
    <div className={`group relative pl-6 sm:pl-10 py-3 transition-all duration-500 ${containerOpacity}`}>
      
      {/* Connector Line (Dashed) */}
      {!isLast && (
        <div className="absolute left-[11px] sm:left-[19px] top-14 bottom-0 w-px border-l-2 border-dashed border-slate-200 group-hover:border-slate-300 transition-colors" />
      )}

      {/* Timeline Node */}
      <div className={`absolute left-0 sm:left-2 top-10 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${isNext ? 'scale-125' : 'group-hover:scale-110'}`}>
        {isPast ? (
            <div className="w-5 h-5 rounded-full bg-slate-200 border-2 border-slate-50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
            </div>
        ) : isNext ? (
            <div className="relative w-7 h-7 flex items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-20 animate-ping"></span>
                <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-100 opacity-60"></span>
                <div className="relative w-4 h-4 rounded-full bg-indigo-500 shadow-md flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
            </div>
        ) : (
            <div className="w-4 h-4 rounded-full bg-white border-[3px] border-slate-300 shadow-sm group-hover:border-indigo-400 transition-colors"></div> 
        )}
      </div>

      {/* Main Card */}
      <div className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${borderColor} ${shadowClass} ${bgClass}`}>
        
        {isNext && (
            <div className="absolute -top-3 -right-2 sm:right-auto sm:left-6 px-3 py-1 bg-indigo-600 rounded-full text-[10px] font-bold text-white shadow-lg shadow-indigo-200 uppercase tracking-wider flex items-center gap-1.5 ring-4 ring-slate-50/50">
                <CalendarCheck className="w-3 h-3" />
                即將到來
            </div>
        )}

        <div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between">
            {/* Date & Title */}
            <div className="flex items-start gap-5">
                {/* Date Box */}
                <div className={`shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-2xl font-bold leading-tight border transition-colors ${item.isExamDay ? 'bg-gradient-to-br from-rose-50 to-white border-rose-100 text-rose-600 shadow-sm' : 'bg-white border-slate-100 text-slate-600 shadow-sm group-hover:border-indigo-100 group-hover:text-indigo-600'}`}>
                    <span className="text-[10px] uppercase tracking-tighter opacity-50 font-mono-nums">{yearStr}</span>
                    <span className="text-xl tracking-tight font-mono-nums">{dateStr}</span>
                </div>

                <div className="space-y-1.5 pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-md font-bold tracking-wide border ${item.isExamDay ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                            {item.category}
                        </span>
                        {hasTime && (
                           <span className="sm:hidden text-xs text-slate-400 font-mono-nums flex items-center gap-1">
                               <Clock className="w-3 h-3" /> {timeStr}
                           </span>
                        )}
                    </div>
                    <h3 className={`font-bold text-lg leading-snug tracking-tight ${item.isExamDay ? 'text-rose-600' : 'text-slate-800'}`}>
                        {item.title}
                    </h3>
                </div>
            </div>

            {/* Time Badge (Desktop) */}
            <div className={`hidden sm:flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border transition-colors ${item.isExamDay ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-slate-50/50 border-slate-100 text-slate-500 group-hover:bg-white group-hover:border-indigo-100 group-hover:text-indigo-600'}`}>
                <Clock className="w-4 h-4 opacity-70" />
                <span className="font-semibold font-mono-nums tabular-nums">
                    {hasTime ? timeStr : '全天'}
                </span>
                {showEndDate && endDateObj && (
                    <div className="flex items-center gap-2 pl-3 border-l border-slate-200/50 ml-1">
                        <ChevronRight className="w-3 h-3 opacity-40" />
                        <span className="font-mono-nums font-medium">{endDateObj.toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' })}</span>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};