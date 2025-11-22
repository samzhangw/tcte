import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { EXAM_DATE, MOTIVATIONAL_QUOTES } from '../constants';
import { Clock, Trophy, Sparkles, Quote } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [status, setStatus] = useState<'upcoming' | 'ongoing' | 'finished'>('upcoming');

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = EXAM_DATE.getTime() - now.getTime();

    if (difference > 0) {
      setStatus('upcoming');
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
        const twoDaysAfter = new Date(EXAM_DATE.getTime() + 48 * 60 * 60 * 1000);
        if (now < twoDaysAfter) {
            setStatus('ongoing');
        } else {
            setStatus('finished');
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Determine daily quote based on day of year
  const dailyQuote = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Use modulo to cycle through quotes
    return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-b from-white/40 to-white/10 rounded-2xl blur opacity-50"></div>
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl w-20 h-24 md:w-32 md:h-40 flex flex-col items-center justify-center">
          <span className="text-4xl md:text-7xl font-black font-mono tracking-tighter drop-shadow-lg">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="mt-3 text-blue-100 text-xs md:text-sm font-bold tracking-widest uppercase drop-shadow-sm">{label}</span>
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl mb-12 group">
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-20">
        
        <div className="inline-flex items-center gap-2 mb-6 bg-white/10 px-5 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg animate-fade-in-down">
          <Sparkles size={16} className="text-yellow-300" />
          <span className="text-sm md:text-base font-bold text-white tracking-wide">115學年度 (2026) 統一入學測驗</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-200 mb-4 drop-shadow-sm tracking-tight">
           統測倒數計時
        </h1>

        {/* Daily Motivational Quote */}
        <div className="mb-12 max-w-3xl mx-auto px-4">
             <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 shadow-inner flex flex-col items-center">
                <Quote size={24} className="text-blue-200/50 mb-2" />
                <p className="text-blue-50 text-lg md:text-2xl font-medium font-serif leading-relaxed tracking-wide italic opacity-90">
                  "{dailyQuote}"
                </p>
                <div className="w-12 h-1 bg-blue-400/30 rounded-full mt-4"></div>
             </div>
        </div>

        {status === 'upcoming' && (
          <div className="flex flex-wrap justify-center items-start gap-2 md:gap-4">
            <TimeUnit value={timeLeft.days} label="Days" />
            <span className="text-3xl md:text-6xl font-light text-blue-300/50 pt-4 md:pt-8">:</span>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <span className="text-3xl md:text-6xl font-light text-blue-300/50 pt-4 md:pt-8">:</span>
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <span className="text-3xl md:text-6xl font-light text-blue-300/50 pt-4 md:pt-8 hidden md:block">:</span>
            <div className="hidden md:block">
                 <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>
          </div>
        )}

        {status === 'ongoing' && (
            <div className="bg-white/10 border border-yellow-400/50 text-yellow-50 px-10 py-8 rounded-3xl backdrop-blur-xl shadow-2xl animate-pulse">
                <h2 className="text-3xl md:text-4xl font-black flex items-center gap-4 justify-center">
                    <Clock className="animate-spin-slow w-10 h-10" />
                    考試進行中
                </h2>
                <p className="mt-3 text-lg font-medium text-yellow-100">保持冷靜，發揮實力！</p>
            </div>
        )}

        {status === 'finished' && (
             <div className="bg-emerald-500/20 border border-emerald-400/50 text-white px-10 py-8 rounded-3xl backdrop-blur-xl shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-black flex items-center gap-4 justify-center">
                    <Trophy className="text-yellow-300 w-10 h-10" />
                    考試圓滿結束
                </h2>
                <p className="mt-3 text-lg font-medium text-emerald-100">辛苦了！祝金榜題名。</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;