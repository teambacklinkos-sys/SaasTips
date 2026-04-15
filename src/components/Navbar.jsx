import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Search } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function Navbar({ onOpenSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Journal' },
    { to: '/about', label: 'Our Story' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-glass py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 bg-white/40 backdrop-blur-md rounded-2xl px-4 sm:px-6 border border-white/60 shadow-premium transition-all duration-500">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 group-hover:scale-105 transition-all duration-300">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-surface-900 group-hover:text-brand-600 transition-colors">
              SaaS<span className="text-brand-500">Tips</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative py-2 transition-colors ${
                    isActive ? 'text-brand-600 font-semibold' : 'text-surface-600 hover:text-brand-500'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-500 rounded-t-full shadow-glow animate-fade-in" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <button
              onClick={() => openModal('subscribe')}
              className="text-surface-600 hover:text-brand-500 transition-colors py-2"
            >
              Newsletter
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-surface-500 hover:bg-surface-100 hover:text-brand-600 transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => openModal('subscribe')}
              className="hidden md:inline-flex items-center justify-center gap-2 bg-surface-900 hover:bg-surface-800 text-white text-[15px] font-semibold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Subscribe
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2.5 rounded-full text-surface-600 hover:bg-surface-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-xl border-b border-surface-200 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4 text-center">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-lg font-medium text-surface-700 hover:text-brand-600 transition-colors py-2"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => openModal('subscribe')}
            className="text-lg font-medium text-surface-700 hover:text-brand-600 transition-colors py-2"
          >
            Newsletter
          </button>
          <div className="pt-4 border-t border-surface-100 w-full flex justify-center">
            <button
              onClick={() => openModal('subscribe')}
              className="bg-brand-600 hover:bg-brand-700 text-white w-full py-3 rounded-xl font-semibold shadow-md shadow-brand-500/20 transition-all active:scale-95"
            >
              Join the waiting list
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
