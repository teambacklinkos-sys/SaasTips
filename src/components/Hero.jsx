import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative overflow-hidden bg-[#FAFAFB] pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-200/50 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] bg-blue-200/40 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-indigo-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/80 text-brand-700 text-xs font-semibold px-4 py-2 rounded-full shadow-lg shadow-brand-500/10 mb-8 animate-fade-in hover:scale-105 transition-transform cursor-default">
          <Sparkles size={14} className="text-brand-500" />
          <span>Curated insights for SaaS founders & operators</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-surface-900 leading-[1.1] tracking-tight mb-6">
          Scale your SaaS with <br className="hidden sm:block" />
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-teal-400 to-blue-500">
              actionable strategies
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-3 bg-brand-200/50 -z-10 rounded-full blur-sm" />
          </span>
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-surface-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Deep-dive articles on growth, retention, pricing, and product — written by founders who have done it before.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#blogs"
            className="group relative inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-[15px] px-8 py-4 rounded-full shadow-xl shadow-brand-500/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Reading <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <button
            onClick={() => openModal('subscribe')}
            className="inline-flex items-center justify-center gap-2 bg-white border border-surface-200 text-surface-700 hover:border-brand-300 hover:text-brand-600 font-semibold text-[15px] px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            Join Newsletter
          </button>
        </div>

        {/* Floating Glass Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
          {[
            { label: 'Weekly Readers', value: '85K+', delay: '0' },
            { label: 'Growth Strategies', value: '240+', delay: '100' },
            { label: 'Success Rate', value: '98%', delay: '200' },
          ].map((stat, i) => (
            <div 
              key={stat.label} 
              className={`bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-glass hover:shadow-premium hover:-translate-y-1 transition-all duration-300 ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <div className="text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-surface-900 to-surface-600">{stat.value}</div>
              <div className="text-sm font-medium text-surface-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
