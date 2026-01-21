import React from 'react';
import { X, ExternalLink, Timer, GraduationCap, School, BookOpen, Mail } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ease-out border-l border-white/50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <Timer className="w-5 h-5 text-indigo-600" />
                    更多考試倒數
                </h2>
                <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4 ml-1">切換倒數計時</p>
                
                <a href="https://tyctw.github.io/115clock/" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300 flex items-center gap-4 hover:shadow-md">
                        <div className="w-10 h-10 rounded-full bg-white text-emerald-600 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <School className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">會考倒數</div>
                            <div className="text-xs text-slate-500 mt-0.5">國中教育會考</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-emerald-400" />
                    </div>
                </a>

                <a href="https://ceecc.vercel.app/" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300 flex items-center gap-4 hover:shadow-md">
                        <div className="w-10 h-10 rounded-full bg-white text-blue-600 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">學測倒數</div>
                            <div className="text-xs text-slate-500 mt-0.5">學科能力測驗</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-400" />
                    </div>
                </a>

                <a href="https://ceeecc.vercel.app/" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-300 flex items-center gap-4 hover:shadow-md">
                        <div className="w-10 h-10 rounded-full bg-white text-amber-600 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-slate-800 group-hover:text-amber-700 transition-colors">分科倒數</div>
                            <div className="text-xs text-slate-500 mt-0.5">大學分科測驗</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-amber-400" />
                    </div>
                </a>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center backdrop-blur-sm space-y-2">
                 <a href="mailto:tyctw.analyze@gmail.com" className="text-xs text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-1 transition-colors">
                    <Mail className="w-3 h-3" /> 聯絡我們
                 </a>
                 <p className="text-xs text-slate-400 font-medium">祝所有考生金榜題名！</p>
            </div>
        </div>
      </div>
    </>
  );
};