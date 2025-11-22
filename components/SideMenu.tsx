import React, { useEffect } from 'react';
import { X, ExternalLink, ChevronRight, Link as LinkIcon, CalendarDays } from 'lucide-react';
import { EXTERNAL_LINKS } from '../constants';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white/90 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col border-l border-white/50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">更多資源連結</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {EXTERNAL_LINKS.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shrink-0">
                        {index === 2 ? <CalendarDays size={18} /> : <LinkIcon size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                             <span className="font-bold text-slate-800 text-lg group-hover:text-indigo-700 transition-colors">{link.title}</span>
                             <ExternalLink size={14} className="text-slate-300 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                        <p className="text-xs text-slate-400 font-mono truncate group-hover:text-slate-500 transition-colors">
                            {link.url.replace('https://', '')}
                        </p>
                    </div>
                </div>
              </a>
            ))}
          </div>
          
          {/* Helper text */}
          <div className="mt-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                關於這些連結
            </h3>
            <p className="text-sm text-blue-700/80 leading-relaxed">
              這些外部連結匯集了會考、分科測驗及統測的重要日期與倒數資訊，希望能幫助你更好地規劃讀書進度。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-white/50 text-center">
           <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Designed for 115 TVE</p>
        </div>
      </div>
    </>
  );
};

export default SideMenu;