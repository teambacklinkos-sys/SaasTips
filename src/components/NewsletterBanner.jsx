import { Mail, ArrowRight } from 'lucide-react';
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
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden shadow-xl shadow-blue-200 my-14">
      <div className="relative px-8 py-12 text-center">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Mail size={13} /> Weekly SaaS Insights
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Get the best SaaS tips in your inbox
          </h2>
          <p className="mt-2 text-blue-100 text-sm sm:text-base max-w-lg mx-auto">
            Join 12,000+ founders getting one actionable tip every Tuesday. No fluff, unsubscribe anytime.
          </p>

          {submitted ? (
            <div className="mt-6 inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-6 py-3 rounded-full">
              You are in! Check your inbox.
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-full text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold text-sm px-5 py-3 rounded-full hover:bg-blue-50 transition shrink-0"
                >
                  Subscribe <ArrowRight size={15} />
                </button>
              </form>
              <button
                onClick={() => openModal('subscribe')}
                className="mt-3 text-blue-200 text-xs hover:text-white underline underline-offset-2 transition"
              >
                Or subscribe via modal
              </button>
            </>
          )}
          <p className="mt-3 text-blue-200 text-xs">No spam. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
