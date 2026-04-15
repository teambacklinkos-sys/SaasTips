import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Zap, Menu, X, Search } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function Navbar({ onOpenSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useModal();

  const navLinks = [
    { to: '/', label: 'Blog' },
    { to: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-blue-200 transition-shadow">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              SaaS<span className="text-blue-600">Tips</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : 'text-slate-600 hover:text-blue-600 transition-colors'
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button
              onClick={() => openModal('subscribe')}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Newsletter
            </button>
            <a
              href="mailto:teambacklinkos@gmail.com"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => openModal('subscribe')}
              className="hidden md:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm shadow-blue-200 transition"
            >
              Subscribe
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 text-sm font-medium text-slate-700">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-blue-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => { setMenuOpen(false); openModal('subscribe'); }}
            className="block hover:text-blue-600 transition-colors"
          >
            Newsletter
          </button>
          <a
            href="mailto:teambacklinkos@gmail.com"
            className="block hover:text-blue-600 transition-colors"
          >
            Contact
          </a>
          <button
            onClick={() => { setMenuOpen(false); openModal('subscribe'); }}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition"
          >
            Subscribe
          </button>
        </div>
      )}
    </header>
  );
}
