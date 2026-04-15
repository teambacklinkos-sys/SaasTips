import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NewsletterConfirmPage({ onOpenSearch }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar onOpenSearch={onOpenSearch} />
      <div className="flex flex-col items-center justify-center text-center px-4 py-32">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-12 max-w-md w-full">
          <CheckCircle size={56} className="text-emerald-500 mx-auto mb-5" />
          <h1 className="text-2xl font-extrabold text-slate-900">You are subscribed!</h1>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Welcome to SaaSTips. You will get one actionable SaaS tip every Tuesday — straight to your inbox, no spam.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md shadow-blue-200 transition"
          >
            Browse Articles <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
