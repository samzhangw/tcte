import React, { useState } from 'react';
import CountdownTimer from './components/CountdownTimer';
import ScheduleModal from './components/Schedule';
import ResourceSection from './components/Resources';
import SideMenu from './components/SideMenu';
import { GraduationCap, Menu, Calendar } from 'lucide-react';

const App: React.FC = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-purple-200/30 blur-3xl mix-blend-multiply filter opacity-70 animate-float"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-200/30 blur-3xl mix-blend-multiply filter opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-200/30 blur-3xl mix-blend-multiply filter opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 glass-panel border-b-0 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
                <GraduationCap className="text-white h-5 w-5" />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-800">
                統測戰士 <span className="text-indigo-600">115</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
               <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2.5 rounded-xl text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 flex items-center gap-2 font-medium"
               >
                 <span className="hidden md:inline">更多資訊</span>
                 <Menu size={20} />
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Schedule Modal */}
      <ScheduleModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
        
        {/* Hero / Countdown */}
        <section className="animate-fade-in-down relative z-10">
          <CountdownTimer />
          
          {/* Floating Action Button for Schedule */}
          <div className="flex justify-center -mt-14 sm:-mt-16 mb-16 relative z-20">
             <button 
                onClick={() => setIsScheduleOpen(true)}
                className="group relative bg-white text-slate-800 hover:text-indigo-900 pl-3 pr-8 py-3 rounded-full shadow-xl shadow-indigo-200/50 hover:shadow-2xl hover:shadow-indigo-300/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 border border-white/50"
             >
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-3 rounded-full shadow-md group-hover:rotate-12 transition-transform duration-500">
                    <Calendar size={20} />
                </div>
                <div className="text-left flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Exam Schedule</span>
                    <span className="text-lg font-bold leading-none">查看考試日程表</span>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L5 5L1 1" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
             </button>
          </div>
        </section>

        {/* Resources Section */}
        <section className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
             <ResourceSection />
        </section>

      </main>

      {/* Footer */}
      <footer className="relative mt-auto border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm font-medium">
            &copy; 2026 統測倒數計時 | 為夢想而戰
          </p>
          <div className="flex items-center gap-6 text-slate-400 text-sm">
             <span>Design for TVE Students</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;