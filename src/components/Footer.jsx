import { Link } from 'react-router-dom';
import { Zap, X, Globe, GitBranch, Rss } from 'lucide-react';
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
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap size={13} className="text-white" fill="white" />
              </div>
              <span className="text-lg font-extrabold text-slate-900">
                SaaS<span className="text-blue-600">Tips</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Actionable articles to help SaaS founders grow revenue, reduce churn, and ship great products.
            </p>
            <div className="flex items-center gap-3 mt-4">
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
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Topics</p>
            <ul className="space-y-2">
              {CATEGORY_LINKS.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/?category=${c.id}`}
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Company</p>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Blog</Link>
              </li>
              <li>
                <button
                  onClick={() => openModal('subscribe')}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Newsletter
                </button>
              </li>
              <li>
                <a
                  href="mailto:teambacklinkos@gmail.com"
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Advertise
                </a>
              </li>
              <li>
                <a
                  href="mailto:teambacklinkos@gmail.com"
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Legal</p>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 SaaSTips. All rights reserved.</p>
          <p>Built with React &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
