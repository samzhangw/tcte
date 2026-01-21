import React, { useState, useEffect } from 'react';
import { EXAM_SESSIONS } from '../constants';
import { TimeCard } from './TimeCard';
import { ExamSession, TimeLeft } from '../types';
import { PenTool, Coffee, Clock, AlertCircle, ChevronRight, Zap, Play } from 'lucide-react';
import { FireworksOverlay } from './FireworksOverlay';

interface ExamModeDashboardProps {
  now: Date;
}

export const ExamModeDashboard: React.FC<ExamModeDashboardProps> = ({ now }) => {
  const [showFireworks, setShowFireworks] = useState(false);

  // 1. Determine Current Status
  const currentSession = EXAM_SESSIONS.find(
    session => now >= new Date(session.startTime) && now <= new Date(session.endTime)
  );

  const nextSession = EXAM_SESSIONS.find(
    session => new Date(session.startTime) > now
  );

  // 2. Fireworks Logic (Trigger when no current and no next session)
  useEffect(() => {
    if (!currentSession && !nextSession) {
      // Check if we've already shown them this session to avoid annoyance on refresh
      const hasSeen = sessionStorage.getItem('hasSeenFireworks');
      if (!hasSeen) {
        handlePlayFireworks();
      }
    }
  }, [currentSession, nextSession]);

  const handlePlayFireworks = () => {
    setShowFireworks(true);
    sessionStorage.setItem('hasSeenFireworks', 'true');
    // Auto stop after 30 seconds
    setTimeout(() => {
      setShowFireworks(false);
    }, 30000);
  };

  // Helper to calc diff
  const calculateDiff = (target: string): TimeLeft => {
    const targetDate = new Date(target);
    const diff = targetDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isPast: false
    };
  };

  // 3. Render Logic
  
  // Case A: Testing Now (Exam In Progress)
  if (currentSession) {
    const timeLeft = calculateDiff(currentSession.endTime);
    return (
      <div className="h-full relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-slate-700 shadow-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/40 via-slate-900 to-slate-900"></div>
        {/* Animated Pulse for "Live" feeling */}
        <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="text-rose-400 text-xs font-bold uppercase tracking-widest">考試進行中</span>
        </div>

        <div className="relative z-10 w-full">
            <h2 className="text-slate-400 font-medium mb-2 tracking-wide uppercase text-sm">Current Subject</h2>
            <div className="text-3xl sm:text-5xl font-black text-white mb-8 drop-shadow-lg flex items-center justify-center gap-3">
                <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/30">
                     <PenTool className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500" />
                </div>
                {currentSession.title}
            </div>

            <p className="text-rose-300 font-bold mb-6 flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" /> 距離本節結束
            </p>

            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-6 sm:gap-6 mb-8">
                 <TimeCard value={timeLeft.hours} label="時" colorClass="text-rose-500" />
                 <div className="text-4xl text-slate-700 font-light -mt-8">:</div>
                 <TimeCard value={timeLeft.minutes} label="分" colorClass="text-rose-500" />
                 <div className="text-4xl text-slate-700 font-light -mt-8">:</div>
                 <TimeCard value={timeLeft.seconds} label="秒" colorClass="text-rose-500" />
            </div>

            {nextSession && (
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center">
                    <p className="text-slate-500 text-sm mb-1">下一科</p>
                    <div className="text-lg text-slate-300 font-medium flex items-center gap-2">
                        {nextSession.title} 
                        <span className="text-slate-500 text-xs font-mono font-bold bg-slate-800 px-2 py-1 rounded border border-slate-700">
                            {new Date(nextSession.startTime).toLocaleTimeString('zh-TW', {hour:'2-digit', minute:'2-digit'})}
                        </span>
                    </div>
                </div>
            )}
        </div>
      </div>
    );
  }

  // Case B: Break Time / Before Exam (Next Session Exists)
  if (nextSession) {
    const timeLeft = calculateDiff(nextSession.startTime);
    const isTomorrow = new Date(nextSession.startTime).getDate() !== now.getDate();
    
    return (
      <div className="h-full relative overflow-hidden rounded-[2.5rem] bg-white border border-white/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] p-8 sm:p-12 flex flex-col items-center justify-center text-center">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-500"></div>
        
        <div className="relative z-10 w-full">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-8 border border-emerald-100">
                <Coffee className="w-4 h-4" />
                <span>{isTomorrow ? '今日考試結束' : '休息時間'}</span>
             </div>

             <h2 className="text-slate-400 font-medium mb-2 tracking-wide uppercase text-sm">Next Subject</h2>
             <div className="text-3xl sm:text-5xl font-black text-slate-800 mb-8 flex items-center justify-center gap-3">
                {nextSession.title}
             </div>

             <p className="text-slate-500 font-bold mb-6 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> 距離{isTomorrow ? '明日' : '下節'}開始
             </p>

             <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-6 sm:gap-6 mb-8">
                 {timeLeft.days > 0 && (
                     <>
                        <TimeCard value={timeLeft.days} label="天" colorClass="text-emerald-600" />
                        <div className="hidden sm:block text-4xl text-slate-300 font-light -mt-8">:</div>
                     </>
                 )}
                 <TimeCard value={timeLeft.hours} label="時" colorClass="text-emerald-600" />
                 
                 {/* Break line on mobile if days present */}
                 {timeLeft.days > 0 && <div className="basis-full h-0 sm:hidden"></div>}

                 <div className="hidden sm:block text-4xl text-slate-300 font-light -mt-8">:</div>
                 <TimeCard value={timeLeft.minutes} label="分" colorClass="text-emerald-600" />
                 <div className="hidden sm:block text-4xl text-slate-300 font-light -mt-8">:</div>
                 <TimeCard value={timeLeft.seconds} label="秒" colorClass="text-emerald-600" />
             </div>

             <div className="mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-block w-full max-w-sm shadow-inner">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">進場時間</span>
                    <span className="font-bold text-slate-800 text-xl font-mono">
                        {new Date(nextSession.startTime).toLocaleTimeString('zh-TW', {hour:'2-digit', minute:'2-digit'})}
                    </span>
                </div>
             </div>
        </div>
      </div>
    );
  }

  // Case C: All Exams Finished (But still on exam day)
  return (
    <>
        {showFireworks && <FireworksOverlay />}
        
        <div className="h-full relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-violet-700 shadow-xl p-8 sm:p-12 flex flex-col items-center justify-center text-center text-white">
            <div className="mb-6 bg-white/20 p-4 rounded-full backdrop-blur-sm animate-bounce ring-4 ring-white/10">
                <Zap className="w-12 h-12 text-yellow-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">考試圓滿結束！</h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                辛苦了！這段時間的努力，終將化為成長的養分。<br/>好好休息，迎接新的開始。
            </p>
            <div className="flex flex-col gap-4 items-center">
                <div className="text-sm font-medium bg-black/20 px-4 py-2 rounded-full border border-white/10">
                    記得核對答案與關注成績公佈
                </div>
                
                {!showFireworks && (
                    <button 
                        onClick={handlePlayFireworks}
                        className="flex items-center gap-2 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-sm font-bold tracking-wide backdrop-blur-sm"
                    >
                        <Play className="w-4 h-4 fill-white" />
                        重看煙火秀
                    </button>
                )}
            </div>
        </div>
    </>
  );
};