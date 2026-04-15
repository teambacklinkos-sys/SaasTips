import { Link } from 'react-router-dom';
import { ArrowRight, Mail, TrendingUp, BookOpen, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useModal } from '../context/ModalContext';

const team = [
  { name: 'Sarah Mitchell', role: 'Editor-in-Chief', avatar: 'SM', bio: 'Former VP Growth at two B2B SaaS companies. Writes about retention and PLG.', color: 'bg-blue-500' },
  { name: 'James Carter', role: 'Product Strategist', avatar: 'JC', bio: 'Ex-Stripe product manager. Obsessed with pricing psychology and monetization.', color: 'bg-violet-500' },
  { name: 'Priya Nair', role: 'Founder & CEO', avatar: 'PN', bio: 'Built and sold two SaaS companies. Writes about go-to-market and fundraising.', color: 'bg-emerald-500' },
  { name: 'Alex Rivera', role: 'Marketing Director', avatar: 'AR', bio: 'Performance marketer turned content strategist. Runs our weekly newsletter.', color: 'bg-amber-500' },
];

const stats = [
  { icon: BookOpen, label: 'Articles Published', value: '240+' },
  { icon: Users, label: 'Monthly Readers', value: '85K' },
  { icon: TrendingUp, label: 'Categories Covered', value: '7' },
];

export default function AboutPage({ onOpenSearch }) {
  const { openModal } = useModal();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar onOpenSearch={onOpenSearch} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white border-b border-slate-200">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-blue-100 rounded-full opacity-40 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-64 h-64 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            We are building the best resource for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              SaaS builders
            </span>
          </h1>
          <p className="mt-5 text-lg text-slate-500 leading-relaxed">
            SaaSTips is an independent media publication run by founders, for founders. No VC funding. No sponsor agendas. Just honest, experience-backed content on what it actually takes to grow a SaaS business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md shadow-blue-200 transition"
            >
              Read the Blog <ArrowRight size={15} />
            </Link>
            <button
              onClick={() => openModal('subscribe')}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 font-semibold text-sm px-6 py-3 rounded-full shadow-sm transition"
            >
              Join Newsletter
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Mission */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Our Mission</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: '🎯', title: 'Founders First', body: 'Every article is written or reviewed by someone who has shipped product, talked to customers, and grown a business. We do not publish theory — we publish what has been proven to work.' },
              { icon: '🔍', title: 'Honest & Independent', body: 'We are not funded by SaaS vendors. We do not rank tools based on affiliate commissions. Our recommendations are based on what we would genuinely use ourselves.' },
              { icon: '⚡', title: 'Actionable by Design', body: 'We do not write 5,000-word essays that could be 500 words. Every piece ends with something you can do today. If you cannot act on it, we did not write it well enough.' },
              { icon: '🤝', title: 'Community-Driven', body: 'Our best ideas come from readers. If you have a hard-won lesson from building your SaaS, we want to publish it. Write for us and reach 85,000+ operators.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10">
          <h2 className="text-2xl font-extrabold text-white text-center mb-10">By the Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <Icon size={28} className="text-blue-200 mx-auto mb-3" />
                <div className="text-4xl font-extrabold text-white">{value}</div>
                <div className="text-blue-200 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">The Team</h2>
          <p className="text-slate-500 text-sm mb-8">We are a small, remote team of operators and writers who have been in the SaaS trenches.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {team.map((member) => (
              <div key={member.name} className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
                <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white font-bold ${member.color}`}>
                  {member.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-400 mb-1">{member.role}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Write for us */}
        <section className="bg-slate-900 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Write for SaaSTips</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            Have a hard-won SaaS lesson? Share it with 85,000+ monthly readers. We accept pitches from operators with real-world experience.
          </p>
          <a
            href="mailto:teambacklinkos@gmail.com?subject=Write for SaaSTips"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm px-6 py-3 rounded-full transition"
          >
            <Mail size={15} /> Send Us a Pitch
          </a>
        </section>

      </div>

      <Footer />
    </div>
  );
}
