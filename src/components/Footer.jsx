import { Link } from 'react-router-dom';
import { Sparkles, X, Globe, GitBranch, Rss } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const CATEGORY_LINKS = [
  { label: 'Growth',    id: 'growth' },
  { label: 'Marketing', id: 'marketing' },
  { label: 'Product',   id: 'product' },
  { label: 'Pricing',   id: 'pricing' },
  { label: 'Retention', id: 'retention' },
  { label: 'Analytics', id: 'analytics' },
];

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer className="bg-white border-t border-surface-200 mt-20 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[50%] h-[50%] bg-brand-50 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-xl font-display font-bold text-surface-900 tracking-tight">
                SaaS<span className="text-brand-500">Tips</span>
              </span>
            </Link>
            <p className="text-[15px] text-surface-500 leading-relaxed max-w-xs font-medium">
              Actionable insights to help founders grow revenue, reduce churn, and ship great products.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {[
                { Icon: X,          href: 'https://twitter.com/saastips',                label: 'X / Twitter' },
                { Icon: Globe,      href: 'https://saastips.com',                        label: 'Website' },
                { Icon: GitBranch,  href: 'https://github.com/saastips',                 label: 'GitHub' },
                { Icon: Rss,        href: '/rss.xml',                                    label: 'RSS Feed' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-50 text-surface-400 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-surface-400 mb-5">Topics</p>
            <ul className="space-y-3">
              {CATEGORY_LINKS.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/?category=${c.id}`}
                    className="text-[15px] font-medium text-surface-600 hover:text-brand-600 transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-surface-400 mb-5">Company</p>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-[15px] font-medium text-surface-600 hover:text-brand-600 transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/" className="text-[15px] font-medium text-surface-600 hover:text-brand-600 transition-colors">Journal</Link>
              </li>
              <li>
                <button
                  onClick={() => openModal('subscribe')}
                  className="text-[15px] font-medium text-surface-600 hover:text-brand-600 transition-colors"
                >
                  Newsletter
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-surface-400 mb-5">Legal</p>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Use'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-[15px] font-medium text-surface-600 hover:text-brand-600 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-surface-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] font-medium text-surface-500">
          <p>© 2026 SaaSTips. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
