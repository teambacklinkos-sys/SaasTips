import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Clock, ArrowUpRight } from 'lucide-react';
import { blogs, getCategoryMeta } from '../../data/blogs';

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') { onClose(); setQuery(''); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Reset query when overlay closes
  useEffect(() => { if (!open) setQuery(''); }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return blogs.slice(0, 6); // show recent when no query
    const q = query.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)) ||
        b.author.toLowerCase().includes(q)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[400] bg-white/97 backdrop-blur-md animate-overlay-in flex flex-col">
      {/* Search bar */}
      <div className="max-w-3xl mx-auto w-full px-4 pt-8 pb-4">
        <div className="flex items-center gap-3 bg-white border-2 border-blue-500 rounded-2xl px-5 py-3 shadow-lg shadow-blue-100">
          <Search size={20} className="text-blue-500 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search articles, topics, authors…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-lg text-slate-900 placeholder:text-slate-400 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 transition">
              <X size={18} />
            </button>
          )}
          <button
            onClick={() => { onClose(); setQuery(''); }}
            className="ml-1 flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-700 transition bg-slate-100 px-3 py-1.5 rounded-lg"
          >
            <X size={13} /> Esc
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          {query ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"` : 'Recent articles'}
        </p>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto max-w-3xl mx-auto w-full px-4 pb-8">
        {results.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-lg font-semibold text-slate-700">No results for &ldquo;{query}&rdquo;</p>
            <p className="text-slate-400 text-sm mt-1">Try a different keyword or browse by category.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {results.map((blog) => {
              const cat = getCategoryMeta(blog.category);
              return (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  onClick={() => { onClose(); setQuery(''); }}
                  className="group flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-blue-300 hover:shadow-md transition"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0 bg-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cat.color}`}>
                        {cat.label}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={10} /> {blog.readTime}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition truncate">
                      {blog.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{blog.author} · {blog.date}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-300 group-hover:text-blue-500 shrink-0 transition" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
