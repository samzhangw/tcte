import React from 'react';
import { X, Calendar, Clock } from 'lucide-react';

interface ExamScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamScheduleModal: React.FC<ExamScheduleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 border border-white/50">
        <div className="bg-slate-50/80 px-6 py-5 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
              <Calendar className="w-5 h-5 text-indigo-600" />
              統測考試日程表
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-slate-200/50 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
            
            {/* Day 1 */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-indigo-50/50 px-4 py-3 border-b border-indigo-100 flex items-center gap-2">
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Day 1</span>
                <span className="font-bold text-slate-800">4月25日（星期六）</span>
              </div>
              <div className="divide-y divide-slate-100 bg-white/60">
                <div className="p-4 flex gap-4">
                  <div className="w-20 shrink-0 flex flex-col items-center justify-center text-slate-500 text-xs font-medium bg-slate-100 rounded-lg p-2 h-fit">
                    <Clock className="w-3 h-3 mb-1" />
                    <span>上午</span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <span className="font-medium text-slate-700">專業科目（二）<span className="text-slate-400 text-xs ml-1">（部分群類）</span></span>
                  </div>
                </div>
                <div className="p-4 flex gap-4">
                  <div className="w-20 shrink-0 flex flex-col items-center justify-center text-indigo-600 text-xs font-bold bg-indigo-50 rounded-lg p-2 border border-indigo-100 h-fit">
                    <Clock className="w-3 h-3 mb-1" />
                    <span>13:30</span>
                    <span className="opacity-75 scale-90 block mt-0.5">15:10</span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <span className="text-lg font-bold text-slate-800">國文</span>
                  </div>
                </div>
                <div className="p-4 flex gap-4">
                  <div className="w-20 shrink-0 flex flex-col items-center justify-center text-indigo-600 text-xs font-bold bg-indigo-50 rounded-lg p-2 border border-indigo-100 h-fit">
                    <Clock className="w-3 h-3 mb-1" />
                    <span>16:00</span>
                    <span className="opacity-75 scale-90 block mt-0.5">17:40</span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <span className="text-lg font-bold text-slate-800">英文</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-violet-50/50 px-4 py-3 border-b border-violet-100 flex items-center gap-2">
                <span className="bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Day 2</span>
                <span className="font-bold text-slate-800">4月26日（星期日）</span>
              </div>
              <div className="divide-y divide-slate-100 bg-white/60">
                <div className="p-4 flex gap-4">
                  <div className="w-20 shrink-0 flex flex-col items-center justify-center text-slate-500 text-xs font-medium bg-slate-100 rounded-lg p-2 h-fit">
                    <Clock className="w-3 h-3 mb-1" />
                    <span>上午</span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <span className="font-medium text-slate-700">專業科目（二）</span>
                  </div>
                </div>
                <div className="p-4 flex gap-4">
                  <div className="w-20 shrink-0 flex flex-col items-center justify-center text-indigo-600 text-xs font-bold bg-indigo-50 rounded-lg p-2 border border-indigo-100 h-fit">
                    <Clock className="w-3 h-3 mb-1" />
                    <span>11:00</span>
                    <span className="opacity-75 scale-90 block mt-0.5">12:20</span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <span className="text-lg font-bold text-slate-800">數學</span>
                  </div>
                </div>
                <div className="p-4 flex gap-4">
                  <div className="w-20 shrink-0 flex flex-col items-center justify-center text-slate-500 text-xs font-medium bg-slate-100 rounded-lg p-2 h-fit">
                    <Clock className="w-3 h-3 mb-1" />
                    <span>下午</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="font-medium text-slate-700 mb-2">專業科目（一）</div>
                    <div className="font-medium text-slate-700">專業科目（二）<span className="text-slate-400 text-xs ml-1">（部分群類）</span></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};