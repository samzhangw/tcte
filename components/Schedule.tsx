import React, { useState, useEffect } from 'react';
import { EXAM_SCHEDULE } from '../constants';
import { Clock, BookOpen, AlertCircle, X, Calendar } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-all duration-300" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-fade-in-up ring-1 ring-slate-900/5">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-4">
             <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                <BookOpen size={24} />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-slate-800">考試日程表</h2>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mt-0.5">115學年度四技二專統一入學測驗</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 bg-slate-50/80 border-b border-slate-100 gap-2">
          {EXAM_SCHEDULE.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 py-4 px-4 rounded-xl text-center transition-all duration-200 relative group ${
                activeTab === index
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
              }`}
            >
              <div className="flex flex-col items-center">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">{day.weekday}</span>
                  <span className="text-lg font-black tracking-tight">{day.date}</span>
              </div>
              {activeTab === index && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-600"></div>
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-white">
          <div className="relative space-y-8">
              {/* Continuous Vertical Line */}
              <div className="absolute left-[27px] sm:left-[139px] top-4 bottom-4 w-0.5 bg-slate-100"></div>

              {EXAM_SCHEDULE[activeTab].events.map((event, idx) => (
                  <div key={idx} className={`relative flex flex-col sm:flex-row sm:gap-10 group ${event.isPrep ? 'opacity-90' : ''}`}>
                      
                      {/* Time Column (Desktop) */}
                      <div className="hidden sm:block w-24 text-right pt-3">
                          <span className={`block font-mono font-bold text-lg ${event.isPrep ? 'text-slate-400' : 'text-indigo-600'}`}>
                              {event.time.split(' - ')[0]}
                          </span>
                          <span className="block text-xs text-slate-400 font-medium mt-1">
                              {event.time.split(' - ')[1] ? `to ${event.time.split(' - ')[1]}` : ''}
                          </span>
                      </div>

                      {/* Timeline Connector */}
                      <div className="absolute left-[14px] sm:left-[126px] top-4 w-7 h-7 rounded-full border-4 border-white z-10 flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 bg-white">
                          <div className={`w-3 h-3 rounded-full ${
                              event.isPrep ? 'bg-slate-300' : 'bg-indigo-500 ring-4 ring-indigo-100'
                          }`}></div>
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 pl-12 sm:pl-0">
                          <div className={`rounded-2xl p-5 border transition-all duration-300 ${
                              event.isPrep 
                                ? 'bg-slate-50 border-dashed border-slate-200' 
                                : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 hover:translate-x-1'
                          }`}>
                               {/* Mobile Time Display */}
                               <div className="sm:hidden mb-3 flex items-center gap-2 text-sm font-mono font-bold text-slate-500">
                                   <Clock size={14} />
                                   {event.time}
                               </div>

                              <div className="flex flex-wrap items-start justify-between gap-3">
                                  <div>
                                      <div className="flex items-center gap-2 mb-2">
                                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                                              event.isPrep ? 'bg-slate-200 text-slate-600' : 'bg-indigo-100 text-indigo-700'
                                          }`}>
                                              {event.period}
                                          </span>
                                      </div>
                                      <h3 className={`text-xl font-bold ${event.isPrep ? 'text-slate-600' : 'text-slate-900'}`}>
                                          {event.subject}
                                      </h3>
                                  </div>
                                  {event.isPrep && (
                                      <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full text-xs font-bold">
                                          <AlertCircle size={14} />
                                          <span>請持准考證入場</span>
                                      </div>
                                  )}
                              </div>
                              
                              {!event.isPrep && (
                                  <div className="mt-4 pt-4 border-t border-slate-50">
                                      <p className="text-sm text-slate-600 leading-relaxed">
                                          <span className="font-bold text-slate-400 mr-2">適用群類:</span>
                                          {event.category}
                                      </p>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 backdrop-blur text-center sm:hidden">
           <button onClick={onClose} className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold active:scale-95 transition-transform">
             關閉日程表
           </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;