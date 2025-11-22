import React from 'react';
import { RESOURCES } from '../constants';
import { ResourceType } from '../types';
import { PlayCircle, Star, Bookmark, TrendingUp, Youtube, ArrowRight } from 'lucide-react';

const ResourceSection: React.FC = () => {
  const mathBResources = RESOURCES.filter(r => r.type === ResourceType.MATH_B);
  const mathCResources = RESOURCES.filter(r => r.type === ResourceType.MATH_C);

  const ResourceCard = ({ resource, colorTheme }: { resource: typeof RESOURCES[0], colorTheme: 'blue' | 'indigo' }) => {
    let Icon = PlayCircle;
    let bgGradient = "from-blue-500 to-blue-600";
    let shadowColor = "shadow-blue-200";
    let iconColor = "text-blue-600";
    
    // Theme overrides
    if (colorTheme === 'indigo') {
        bgGradient = "from-indigo-500 to-purple-600";
        shadowColor = "shadow-indigo-200";
        iconColor = "text-indigo-600";
    }

    // Type specific overrides
    if (resource.title.includes('重點')) { Icon = Bookmark; }
    else if (resource.title.includes('猜題')) { Icon = TrendingUp; }
    else if (resource.title.includes('精選')) { Icon = Star; }

    return (
        <a 
          href={resource.url} 
          onClick={(e) => { e.preventDefault(); alert(`即將前往觀看: ${resource.type} - ${resource.title}`); }}
          className={`group relative bg-white rounded-2xl border border-slate-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${shadowColor}`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${bgGradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} fill="currentColor" className="opacity-90" />
                </div>
                <div className="flex flex-wrap justify-end gap-1 max-w-[60%]">
                    {resource.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-50 text-slate-500 rounded-lg border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            
            <div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-slate-900 mb-1">
                    {resource.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 mb-4 flex items-center gap-1">
                     <Youtube size={12} /> 老蘇就數學
                </p>
            </div>

            <div className={`mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-sm font-bold ${iconColor}`}>
                <span className="group-hover:underline decoration-2 underline-offset-2">立即觀看</span>
                <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-current group-hover:text-white transition-colors">
                    <ArrowRight size={12} />
                </div>
            </div>
        </a>
    );
  };

  return (
    <div className="my-8">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
             <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-24 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
            <span className="relative inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-orange-50 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4 border border-orange-100">
                <Star size={10} fill="currentColor" /> Premium Resources
            </span>
            <h2 className="relative text-4xl font-black text-slate-900 mb-3 tracking-tight">老蘇就數學</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
                專為統測考生打造的數學影音課程，從基礎打底到考前衝刺，陪你一起拿下高分。
            </p>
        </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Math B Section */}
        <div className="bg-blue-50/50 rounded-[2rem] p-6 sm:p-8 border border-blue-100/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl font-black text-blue-600">B</div>
                     <div>
                        <h3 className="text-2xl font-bold text-slate-800">高職數學 B</h3>
                        <p className="text-sm text-slate-500 font-medium">商管 / 外語 / 設計 / 農業群</p>
                     </div>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                {mathBResources.map((r, i) => <ResourceCard key={i} resource={r} colorTheme="blue" />)}
            </div>
        </div>

        {/* Math C Section */}
        <div className="bg-indigo-50/50 rounded-[2rem] p-6 sm:p-8 border border-indigo-100/50">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl font-black text-indigo-600">C</div>
                     <div>
                        <h3 className="text-2xl font-bold text-slate-800">高職數學 C</h3>
                        <p className="text-sm text-slate-500 font-medium">工科 / 電資群</p>
                     </div>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                {mathCResources.map((r, i) => <ResourceCard key={i} resource={r} colorTheme="indigo" />)}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceSection;