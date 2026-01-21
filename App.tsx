import React, { useState, useEffect } from 'react';
import { SCHEDULE_DATA } from './constants';
import { TimeLeft } from './types';
import { TimeCard } from './components/TimeCard';
import { EventRow } from './components/EventRow';
import { ExamScheduleModal } from './components/ExamScheduleModal';
import { ExamReminderModal } from './components/ExamReminderModal';
import { SideMenu } from './components/SideMenu';
import { ScoreQueryModal } from './components/ScoreQueryModal';
import { ExamModeDashboard } from './components/ExamModeDashboard';
import { BookOpen, GraduationCap, ArrowDown, CalendarDays, Timer, Sparkles, ScrollText, MonitorPlay, Youtube, ExternalLink, Menu, Search, FileText, Zap, ChevronRight, BellRing, ChevronDown, ChevronUp, Mail, Star, FileCheck, School, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [now, setNow] = useState(new Date());
  // Uncomment line below to test Exam Mode (e.g., set to Day 1 Morning)
  // const [now, setNow] = useState(new Date('2026-04-25T10:30:00')); 
  
  const [isExamScheduleOpen, setIsExamScheduleOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);
  
  useEffect(() => {
    // Only set interval if we aren't manually overriding time for testing
    // If you uncomment the testing line above, comment out the setInterval
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkExamReminder = () => {
      const examItem = SCHEDULE_DATA.find(item => item.isExamDay);
      if (!examItem) return;

      const examStartDate = new Date(examItem.startDate);
      const examEndDate = examItem.endDate ? new Date(examItem.endDate) : new Date(examStartDate);
      const reminderStartDate = new Date(examStartDate);
      reminderStartDate.setDate(examStartDate.getDate() - 7);
      
      const currentCheckDate = new Date();
      if (currentCheckDate >= reminderStartDate && currentCheckDate <= examEndDate) {
        const hasSeenReminder = sessionStorage.getItem('hasSeenExamReminder');
        if (!hasSeenReminder) {
          setIsReminderOpen(true);
          sessionStorage.setItem('hasSeenExamReminder', 'true');
        }
      }
    };
    checkExamReminder();
  }, []);

  const calculateTimeLeft = (targetDateStr: string): TimeLeft => {
    const targetDate = new Date(targetDateStr);
    const difference = targetDate.getTime() - now.getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false
    };
  };

  const examEvent = SCHEDULE_DATA.find(item => item.isExamDay);
  const sortedSchedule = [...SCHEDULE_DATA].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  const nextEvent = sortedSchedule.find(item => new Date(item.startDate).getTime() > now.getTime());
  
  const examTimeLeft = examEvent ? calculateTimeLeft(examEvent.startDate) : null;
  const nextEventTimeLeft = nextEvent ? calculateTimeLeft(nextEvent.startDate) : null;
  const scoreQueryItem = SCHEDULE_DATA.find(item => item.id === 'score-query');
  const scoreQueryDate = scoreQueryItem ? new Date(scoreQueryItem.startDate) : new Date('2026-05-14T14:00:00');

  // Check if today is an exam day (2026-04-25 or 2026-04-26)
  const isTodayExamDay = examEvent && (
      (now >= new Date(examEvent.startDate) && now <= new Date(examEvent.endDate || examEvent.startDate)) ||
      (now.toDateString() === new Date(examEvent.startDate).toDateString()) || 
      (examEvent.endDate && now.toDateString() === new Date(examEvent.endDate).toDateString())
  );

  const handleScoreQuery = (e: React.MouseEvent) => {
    e.preventDefault();
    if (now < scoreQueryDate) {
      setIsScoreModalOpen(true);
    } else {
      window.open('https://www.tcte.edu.tw/NetServer/forward_score.php', '_blank');
    }
  };

  // Determine visible schedule items
  const getVisibleSchedule = () => {
    if (isScheduleExpanded) return sortedSchedule;
    
    // Find the first event that ends in the future (or starts in the future if no end date)
    // This represents the "current or next" event
    let startIndex = sortedSchedule.findIndex(item => {
        const end = item.endDate ? new Date(item.endDate) : new Date(item.startDate);
        return end.getTime() >= now.getTime();
    });

    // If all events are in the past, show the last 3
    if (startIndex === -1) {
        return sortedSchedule.slice(-3);
    }

    // Show current/next event + 2 more (total 3)
    return sortedSchedule.slice(startIndex, startIndex + 3);
  };

  const visibleSchedule = getVisibleSchedule();

  return (
    <div className="min-h-screen text-slate-800 pb-20 selection:bg-indigo-200 selection:text-indigo-900 relative font-sans">
      
      {/* Modals */}
      <ExamScheduleModal isOpen={isExamScheduleOpen} onClose={() => setIsExamScheduleOpen(false)} />
      <ExamReminderModal isOpen={isReminderOpen} onClose={() => setIsReminderOpen(false)} />
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
      <ScoreQueryModal isOpen={isScoreModalOpen} onClose={() => setIsScoreModalOpen(false)} queryDate={scoreQueryDate} />

      {/* Animated Background Mesh (From global CSS) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="blob bg-purple-200 w-[500px] h-[500px] rounded-full top-[-100px] left-[-100px] mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="blob bg-yellow-200 w-[500px] h-[500px] rounded-full top-[-100px] right-[-100px] mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="blob bg-pink-200 w-[500px] h-[500px] rounded-full bottom-[-100px] left-[20%] mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-4 z-30 px-4 mb-8">
        <div className="max-w-5xl mx-auto glass-panel rounded-full px-5 py-3 flex items-center justify-between shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:bg-white/80">
            <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-2 rounded-full text-white shadow-md shadow-indigo-200 ring-2 ring-white/50">
                    <GraduationCap className="w-5 h-5" />
                </div>
                <h1 className="font-black text-lg tracking-tight text-slate-800 flex items-center gap-1">
                    115 <span className="text-indigo-600">統測倒數</span>
                </h1>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-slate-50/50 rounded-full text-xs font-bold text-slate-500 border border-slate-200/60 shadow-inner font-mono-nums">
                    <Timer className="w-3.5 h-3.5 text-slate-400" />
                    <span>{now.toLocaleDateString('zh-TW')}</span>
                    <span className="w-px h-3 bg-slate-300"></span>
                    <span>{now.toLocaleTimeString('zh-TW', { hour: '2-digit', minute:'2-digit' })}</span>
                </div>
                
                <button 
                  onClick={() => setIsSideMenuOpen(true)}
                  className="p-2.5 bg-white/50 hover:bg-white rounded-full transition-all text-slate-600 hover:text-indigo-600 hover:shadow-md hover:scale-105 active:scale-95"
                >
                  <Menu className="w-5 h-5" />
                </button>
            </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 space-y-12">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left Column: Countdown OR Exam Dashboard (8 cols) */}
            <div className="lg:col-span-8">
                {isTodayExamDay ? (
                    <ExamModeDashboard now={now} />
                ) : (
                    examEvent && examTimeLeft && (
                        <div className="h-full relative overflow-hidden rounded-[2.5rem] bg-white border border-white/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] p-8 sm:p-12 flex flex-col items-center justify-center text-center group transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.15)]">
                            
                            {/* Decorative Background inside card */}
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white pointer-events-none"></div>
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                            
                            {/* Decorative Blobs */}
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-pink-100/50 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>

                            <div className="relative z-10 w-full">
                                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/80 text-slate-600 text-sm font-bold mb-10 border border-slate-100 shadow-sm backdrop-blur-sm">
                                    <span className="relative flex h-2.5 w-2.5">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                    </span>
                                    <span className="font-mono-nums">{new Date(examEvent.startDate).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric'})}</span>
                                    <span className="w-px h-3 bg-slate-300"></span>
                                    <span className="text-slate-800">{examEvent.title}</span>
                                </div>

                                <h2 className="text-xl sm:text-2xl font-bold text-slate-400 mb-8 tracking-wide uppercase">
                                    距離考試還有
                                </h2>

                                {examTimeLeft.isPast ? (
                                    <div className="text-4xl font-bold text-emerald-500 flex justify-center items-center gap-3 bg-emerald-50 px-8 py-6 rounded-3xl border border-emerald-100">
                                        <Sparkles className="w-8 h-8" /> 考試已開始或結束
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-6 sm:gap-5 mb-10">
                                        <TimeCard value={examTimeLeft.days} label="天" colorClass="text-slate-800" />
                                        <div className="hidden sm:block text-4xl text-slate-300 font-light -mt-8">:</div>
                                        <TimeCard value={examTimeLeft.hours} label="時" colorClass="text-slate-700" />
                                        
                                        {/* Mobile Break: Force new line on mobile between Day/Hour and Min/Sec */}
                                        <div className="basis-full h-0 sm:hidden"></div>
                                        
                                        <div className="hidden sm:block text-4xl text-slate-300 font-light -mt-8">:</div>
                                        <TimeCard value={examTimeLeft.minutes} label="分" colorClass="text-slate-700" />
                                        <div className="hidden sm:block text-4xl text-slate-300 font-light -mt-8">:</div>
                                        <TimeCard value={examTimeLeft.seconds} label="秒" colorClass="text-slate-700" />
                                    </div>
                                )}
                                
                                <div className="mt-2">
                                    <p className="text-slate-400 text-sm font-medium italic mb-8 tracking-wide">
                                        「每一個努力的當下，都是未來的伏筆。」
                                    </p>
                                    <button 
                                        onClick={() => setIsExamScheduleOpen(true)}
                                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-95"
                                    >
                                        <ScrollText className="w-4 h-4" />
                                        查看完整考程
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* Right Column: Next Event Card (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Next Event Card */}
                {nextEvent && nextEvent.id !== examEvent?.id && (
                    <div className="h-full glass-card rounded-[2rem] p-8 relative overflow-hidden group hover:border-amber-200/50 transition-colors flex flex-col justify-center">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-15 transition-opacity duration-500">
                            <BellRing className="w-32 h-32 rotate-12" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-wider mb-4 border border-amber-100">
                                <BellRing className="w-3 h-3 fill-amber-600" /> Upcoming
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 leading-tight mb-2 group-hover:text-amber-600 transition-colors">{nextEvent.title}</h3>
                            <p className="text-base text-slate-500 font-medium mb-6 flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" />
                                {new Date(nextEvent.startDate).toLocaleString('zh-TW', { month: 'long', day: 'numeric' })}
                            </p>
                            
                            {nextEventTimeLeft && (
                                <div className="inline-flex items-baseline gap-1.5 bg-gradient-to-br from-amber-50 to-white px-5 py-3 rounded-xl border border-amber-100 text-amber-700 shadow-sm">
                                    <span className="text-3xl font-black tabular-nums font-mono-nums">{nextEventTimeLeft.days}</span>
                                    <span className="text-xs font-bold mr-2 text-amber-500">天</span>
                                    <span className="text-xl font-bold tabular-nums font-mono-nums">{nextEventTimeLeft.hours}</span>
                                    <span className="text-xs font-bold text-amber-500">時</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* SECTION: TIMELINE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
             <div className="lg:col-span-3">
                <div className="sticky top-28">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                            <CalendarDays className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800">重要日程</h2>
                    </div>
                    <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                        115學年度四技二專統一入學測驗重要時間節點，請務必留意。
                    </p>
                    <div className="hidden lg:block p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm">
                        <div className="flex items-start gap-3">
                             <div className="bg-indigo-100 p-1.5 rounded-full shrink-0 mt-0.5">
                                <Zap className="w-4 h-4 text-indigo-600" />
                             </div>
                             <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                點擊「即將到來」的項目可以查看更多細節。保持關注，不要錯過任何截止日期。
                             </p>
                        </div>
                    </div>
                </div>
             </div>

             <div className="lg:col-span-9">
                <div className="relative border-l-2 border-slate-200/60 ml-3 lg:ml-0 pl-8 lg:pl-12 space-y-3">
                    {visibleSchedule.map((item, index) => {
                        const relevantDate = item.endDate ? new Date(item.endDate) : new Date(item.startDate);
                        const isPast = relevantDate.getTime() < now.getTime();
                        const isNext = nextEvent?.id === item.id;
                        // Determine if it's the last item in the *visible* list to hide the connector
                        const isLast = index === visibleSchedule.length - 1;

                        return (
                             <EventRow 
                                key={item.id} 
                                item={item} 
                                isNext={isNext} 
                                isPast={isPast} 
                                isLast={isLast}
                             />
                        );
                    })}
                </div>

                {/* Show More / Collapse Button */}
                <div className="mt-10 pl-8 lg:pl-12">
                    <button 
                        onClick={() => setIsScheduleExpanded(!isScheduleExpanded)}
                        className="w-full py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center justify-center gap-2 group shadow-sm"
                    >
                        {isScheduleExpanded ? (
                            <>
                                <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                收起日程
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                查看完整日程 ({SCHEDULE_DATA.length - visibleSchedule.length} 則隱藏)
                            </>
                        )}
                    </button>
                </div>
             </div>
        </div>

        {/* SECTION: ADMISSION LINKS */}
        <section className="pt-8 pb-4">
             <div className="flex items-center gap-3 mb-8 px-2">
                <div className="p-2.5 bg-gradient-to-br from-slate-100 to-white rounded-xl shadow-sm border border-slate-200 text-slate-700">
                    <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-slate-800">統測重要升學連結</h2>
             </div>
             
             <div className="grid md:grid-cols-3 gap-6">
                {/* Score Query */}
                <a 
                   href="https://www.tcte.edu.tw/NetServer/forward_score.php"
                   onClick={handleScoreQuery}
                   className="group p-6 bg-white rounded-[1.5rem] border border-slate-200 hover:border-indigo-200 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.15)] transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity transform translate-x-4 -translate-y-4">
                        <Search className="w-24 h-24" />
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Search className="w-7 h-7" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">成績查詢</div>
                        <div className="text-sm text-slate-500 mt-2 flex items-center gap-1.5 font-medium group-hover:translate-x-1 transition-transform">
                            前往查詢 <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </a>

                {/* Past Exams */}
                <a 
                   href="https://www.tcte.edu.tw/index.php?mod=TVETest/down_exam4y"
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="group p-6 bg-white rounded-[1.5rem] border border-slate-200 hover:border-cyan-200 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity transform translate-x-4 -translate-y-4">
                        <FileText className="w-24 h-24" />
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <FileText className="w-7 h-7" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">歷屆試題</div>
                        <div className="text-sm text-slate-500 mt-2 flex items-center gap-1.5 font-medium group-hover:translate-x-1 transition-transform">
                            下載試題 <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </a>

                {/* Star Plan */}
                <a href="https://www.jctv.ntut.edu.tw/star/" target="_blank" rel="noopener noreferrer" className="group p-6 bg-white rounded-[1.5rem] border border-slate-200 hover:border-amber-200 hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.15)] transition-all duration-300 flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity transform translate-x-4 -translate-y-4">
                        <Star className="w-24 h-24" />
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Star className="w-7 h-7 fill-current" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-slate-800 group-hover:text-amber-600 transition-colors">科技校院繁星計畫</div>
                        <div className="text-sm text-slate-500 mt-2 flex items-center gap-1.5 font-medium group-hover:translate-x-1 transition-transform">
                            前往官網 <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </a>

                {/* Application */}
                <a href="https://www.jctv.ntut.edu.tw/enter42/apply/" target="_blank" rel="noopener noreferrer" className="group p-6 bg-white rounded-[1.5rem] border border-slate-200 hover:border-emerald-200 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)] transition-all duration-300 flex flex-col gap-4 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity transform translate-x-4 -translate-y-4">
                        <FileCheck className="w-24 h-24" />
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <FileCheck className="w-7 h-7" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">科技校院甄選入學</div>
                        <div className="text-sm text-slate-500 mt-2 flex items-center gap-1.5 font-medium group-hover:translate-x-1 transition-transform">
                            前往官網 <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </a>

                {/* Registration */}
                <a href="https://www.jctv.ntut.edu.tw/union42/" target="_blank" rel="noopener noreferrer" className="group p-6 bg-white rounded-[1.5rem] border border-slate-200 hover:border-blue-200 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity transform translate-x-4 -translate-y-4">
                        <School className="w-24 h-24" />
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <School className="w-7 h-7" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">科技校院登記分發入學</div>
                        <div className="text-sm text-slate-500 mt-2 flex items-center gap-1.5 font-medium group-hover:translate-x-1 transition-transform">
                            前往官網 <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </a>

                {/* TCTE Official */}
                <a href="https://www.tcte.edu.tw/" target="_blank" rel="noopener noreferrer" className="group p-6 bg-white rounded-[1.5rem] border border-slate-200 hover:border-purple-200 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity transform translate-x-4 -translate-y-4">
                        <Globe className="w-24 h-24" />
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Globe className="w-7 h-7" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-slate-800 group-hover:text-purple-600 transition-colors">統測官方網站</div>
                        <div className="text-sm text-slate-500 mt-2 flex items-center gap-1.5 font-medium group-hover:translate-x-1 transition-transform">
                            前往官網 <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </a>
             </div>
        </section>

        {/* SECTION: LEARNING RESOURCES */}
        <section className="pt-8">
            <div className="relative rounded-[2.5rem] bg-slate-900 overflow-hidden p-8 sm:p-14 shadow-2xl shadow-indigo-900/20 group">
                {/* Dark Gradient BG */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1e1b4b] to-slate-900"></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/30 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/50 ring-4 ring-white/10">
                            <Youtube className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">老蘇就數學</h2>
                            <p className="text-indigo-200 mt-2 font-medium">最強數學影音課程，陪你從基礎打底到考前衝刺</p>
                        </div>
                    </div>
                    <a 
                        href="https://www.youtube.com/@math-pass" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-indigo-50 transition-all hover:scale-105 hover:shadow-lg flex items-center gap-2"
                    >
                        前往頻道 <ChevronRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                    <a href="https://www.youtube.com/watch?v=s_aG8Nl58HU&list=PLRCgVe-ZsDYGAfvHc78rKuGdcBdKyGQXp" target="_blank" rel="noopener noreferrer" className="group/item">
                        <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-6 transition-all flex items-center gap-6 backdrop-blur-sm hover:border-white/20">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-900/50 group-hover/item:scale-110 transition-transform">C</div>
                            <div>
                                <h3 className="text-white font-bold text-xl group-hover/item:text-indigo-300 transition-colors">數C 重點速讀</h3>
                                <div className="text-slate-400 text-sm mt-2 flex items-center gap-2 font-medium">
                                    <MonitorPlay className="w-4 h-4" /> 考前衝刺必看清單
                                </div>
                            </div>
                        </div>
                    </a>
                    
                    <a href="https://www.youtube.com/watch?v=s_aG8Nl58HU&list=PLRCgVe-ZsDYFp8gD3cNlRDeHxjfH9XtI5" target="_blank" rel="noopener noreferrer" className="group/item">
                        <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-6 transition-all flex items-center gap-6 backdrop-blur-sm hover:border-white/20">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-emerald-900/50 group-hover/item:scale-110 transition-transform">B</div>
                            <div>
                                <h3 className="text-white font-bold text-xl group-hover/item:text-emerald-300 transition-colors">數B 重點速讀</h3>
                                <div className="text-slate-400 text-sm mt-2 flex items-center gap-2 font-medium">
                                    <MonitorPlay className="w-4 h-4" /> 考前衝刺必看清單
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <footer className="pt-16 pb-12 text-center space-y-6">
            <div className="flex flex-col items-center gap-4">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-bold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    資料來源：115學年度四技二專統一入學測驗重要日程表
                </div>
                
                <a 
                   href="https://www.tcte.edu.tw/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-bold"
                >
                    統測官方網站 <ExternalLink className="w-3 h-3" />
                </a>

                <a href="mailto:tyctw.analyze@gmail.com" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium">
                    <Mail className="w-4 h-4" />
                    tyctw.analyze@gmail.com
                </a>
            </div>
            <p className="text-indigo-300/60 text-sm font-bold tracking-widest uppercase">
                祝所有考生金榜題名
            </p>
        </footer>
      </main>
    </div>
  );
};

export default App;