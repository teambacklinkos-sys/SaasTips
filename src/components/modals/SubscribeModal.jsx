import { useState } from 'react';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import Modal from '../ui/Modal';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';

export default function SubscribeModal() {
  const { modal, closeModal } = useModal();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const isOpen = modal === 'subscribe';

  const handleClose = () => {
    closeModal();
    setTimeout(() => { setEmail(''); setLoading(false); setDone(false); }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate API
    setLoading(false);
    setDone(true);
    setTimeout(() => {
      handleClose();
      addToast('You are in! Welcome to SaaSTips.', 'success');
    }, 1500);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="p-8">
        {done ? (
          <div className="text-center py-4">
            <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900">You are subscribed!</h3>
            <p className="text-slate-500 text-sm mt-2">Check your inbox — your first tip is on its way.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Mail size={22} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Get SaaS tips weekly</h2>
              <p className="text-slate-500 text-sm mt-2 max-w-xs">
                Join 12,000+ founders getting one actionable tip every Tuesday. No fluff, unsubscribe anytime.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm px-5 py-3 rounded-xl transition"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Subscribing…</>
                ) : (
                  <>Subscribe Free <ArrowRight size={15} /></>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-4">No spam · Unsubscribe at any time</p>

            {/* Social proof */}
            <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-center gap-2">
              <div className="flex -space-x-1.5">
                {['SM', 'JC', 'PN', 'AR'].map((i, idx) => (
                  <div key={idx} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-[8px] font-bold border-2 border-white">
                    {i[0]}
                  </div>
                ))}
              </div>
              <span className="text-xs text-slate-500">12,000+ subscribers</span>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
