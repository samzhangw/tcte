import React from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';

interface ScoreQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  queryDate: Date;
}

export const ScoreQueryModal: React.FC<ScoreQueryModalProps> = ({ isOpen, onClose, queryDate }) => {
  if (!isOpen) return null;

  const dateStr = queryDate.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = queryDate.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
            <X className="w-5 h-5 text-slate-400" />
        </button>
        
        <div className="flex flex-col items-center text-center space-y-5 pt-2">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-2 shadow-inner">
                <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">尚未開放查詢</h3>
              <p className="text-slate-600 leading-relaxed">
                  目前尚未到達成績查詢時間。<br/>
                  請耐心等候，祝您金榜題名！
              </p>
            </div>
            
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 w-full flex items-center justify-center gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                   <Calendar className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="text-left">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">開放查詢時間</div>
                    <div className="font-bold text-slate-800 text-lg">{dateStr} {timeStr} 起</div>
                </div>
            </div>

            <button 
                onClick={onClose}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-slate-900/20"
            >
                我知道了
            </button>
        </div>
      </div>
    </div>
  );
};