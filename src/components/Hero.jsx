import { ArrowRight, TrendingUp } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white border-b border-slate-200">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute top-10 -left-10 w-72 h-72 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm mb-6">
          <TrendingUp size={13} />
          Trusted by 12,000+ SaaS founders &amp; operators
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
          Actionable tips to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            grow your SaaS
          </span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Deep-dive articles on growth, retention, pricing, and product — written by founders who have done it before.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#blogs"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md shadow-blue-200 transition"
          >
            Browse Articles <ArrowRight size={16} />
          </a>
          <button
            onClick={() => openModal('subscribe')}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 font-semibold text-sm px-6 py-3 rounded-full shadow-sm transition"
          >
            Join Newsletter
          </button>
        </div>

        {/* Stats */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 text-center">
          {[
            { label: 'Articles Published', value: '240+' },
            { label: 'Monthly Readers', value: '85K' },
            { label: 'Categories Covered', value: '7' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-2xl font-extrabold text-slate-900">{stat.value}</span>
              <span className="text-xs text-slate-500 mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
