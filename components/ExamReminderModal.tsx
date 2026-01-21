import React from 'react';
import { AlertTriangle, FileText, PenTool, Ban, AlertOctagon, X } from 'lucide-react';

interface ExamReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamReminderModal: React.FC<ExamReminderModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-amber-200">
        <div className="bg-amber-500 p-4 text-white flex justify-between items-center">
             <div className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 fill-amber-600 text-white" />
                <h3 className="text-xl font-bold tracking-wide">考前重要叮嚀</h3>
             </div>
             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-5 h-5" />
             </button>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Admission Ticket */}
            <section>
                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2">
                    <FileText className="w-5 h-5 text-amber-500" />
                    准考證查驗
                </h4>
                <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 text-sm leading-relaxed">
                    <li>請攜帶 <span className="font-bold text-slate-800 bg-amber-50 px-1 rounded">准考證正本</span>（若遺失可於現場補發）。</li>
                    <li>入座後須立刻核對 <span className="font-semibold">准考證</span>、<span className="font-semibold">座位貼條</span> 與 <span className="font-semibold">答案卡號碼</span> 是否相符。</li>
                </ul>
            </section>

            {/* Stationery */}
            <section>
                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2">
                    <PenTool className="w-5 h-5 text-amber-500" />
                    文具與作答規範
                </h4>
                <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 text-sm leading-relaxed">
                    <li>選擇題：請務必使用 <span className="font-bold text-slate-800">黑色 2B 鉛筆</span> 畫記。</li>
                    <li>非選擇題：請使用 <span className="font-bold text-slate-800">黑色墨水筆</span> 书寫。</li>
                    <li>設計群考生僅可攜帶指定繪圖媒材，<span className="text-red-600 font-bold bg-red-50 px-1 rounded">嚴禁攜帶色票</span>。</li>
                </ul>
            </section>

            {/* Prohibited */}
            <section>
                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2">
                    <Ban className="w-5 h-5 text-red-500" />
                    禁止攜帶物品
                </h4>
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-sm text-red-800 leading-relaxed">
                    <p className="font-bold mb-1">下列物品請勿攜帶入座或務必關機：</p>
                    手機、智慧手錶、耳機等電子裝置（<span className="font-extrabold underline decoration-2 decoration-red-400 underline-offset-2">須完全關機</span>）、書籍、紙張、具計算或錄影功能之物品。
                </div>
            </section>

             {/* Cheating Warning */}
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-start gap-3">
                    <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-600 leading-relaxed">
                        <span className="font-bold text-red-600 block mb-1">嚴重警告：</span>
                        任何舞弊行為（如代考、夾帶小抄、電子傳訊等）將直接<span className="font-bold text-slate-800">取消成績</span>或<span className="font-bold text-slate-800">考試資格</span>。
                    </div>
                </div>
            </section>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
             <button 
                onClick={onClose}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-8 rounded-full shadow-lg shadow-amber-500/30 transition-all hover:scale-105 active:scale-95"
             >
                我已詳細閱讀並了解
             </button>
        </div>
      </div>
    </div>
  );
};