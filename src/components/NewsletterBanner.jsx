import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { openModal } = useModal();
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      addToast('You are in! Welcome to SaaSTips.', 'success');
    }
  };

  return (
    <section className="relative overflow-hidden bg-surface-900 rounded-[2.5rem] shadow-2xl my-14 border border-surface-800">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-teal-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative px-6 py-16 sm:px-12 sm:py-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-brand-300 text-[11px] uppercase tracking-widest font-semibold px-4 py-1.5 rounded-full mb-6">
          <Sparkles size={13} className="text-brand-400" /> Weekly SaaS Insights
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Join the inner circle of founders
        </h2>
        <p className="text-surface-400 text-[16px] sm:text-[18px] max-w-xl mx-auto leading-relaxed">
          Join 85,000+ founders getting one actionable tip every Tuesday. No fluff, straight to the point.
        </p>

        {submitted ? (
          <div className="mt-10 inline-flex items-center gap-2 bg-brand-500 text-white font-semibold text-[15px] px-8 py-4 rounded-full shadow-lg shadow-brand-500/20">
            You are on the list! Check your inbox.
          </div>
        ) : (
          <div className="mt-10 w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 relative z-10 p-1.5 bg-surface-800/50 backdrop-blur-md rounded-full border border-surface-700 focus-within:border-brand-500/50 transition-colors">
              <div className="flex-1 flex items-center pl-4 pr-2">
                <Mail size={18} className="text-surface-500" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none text-white placeholder:text-surface-500 focus:outline-none focus:ring-0 px-3 text-[15px]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-[14px] px-6 py-3 rounded-full shadow-lg shadow-brand-500/20 transition-all sm:w-auto w-full"
              >
                Join Now <ArrowRight size={16} />
              </button>
            </form>
            <p className="mt-4 text-surface-500 text-[12px] font-medium">Join completely free. Unsubscribe any time.</p>
          </div>
        )}
      </div>
    </section>
  );
}
