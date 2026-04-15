import { Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCategoryMeta } from '../data/blogs';

const avatarColors = [
  'bg-blue-500', 'bg-violet-500', 'bg-emerald-500',
  'bg-amber-500', 'bg-rose-500', 'bg-cyan-500', 'bg-orange-500',
];

function getAvatarColor(initials) {
  const index = initials.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export default function BlogCard({ blog, featured = false }) {
  const catMeta = getCategoryMeta(blog.category);

  if (featured) {
    return (
      <Link
        to={`/blog/${blog.id}`}
        className="group col-span-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 flex flex-col lg:flex-row"
      >
        <div className="relative lg:w-1/2 h-60 lg:h-auto overflow-hidden bg-slate-100">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white px-2.5 py-1 rounded-full">
            Featured
          </span>
        </div>
        <div className="flex flex-col justify-between p-8 lg:w-1/2">
          <div>
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${catMeta.color}`}>
              {catMeta.label}
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
              {blog.title}
            </h2>
            <p className="mt-3 text-slate-500 text-base leading-relaxed line-clamp-3">
              {blog.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags.map((tag) => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${getAvatarColor(blog.authorAvatar)}`}>
                {blog.authorAvatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{blog.author}</p>
                <p className="text-xs text-slate-400">{blog.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
              <span>{blog.date}</span>
            </div>
          </div>
          <span className="mt-5 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-800 transition-colors group/link">
            Read Article <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${blog.id}`}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catMeta.color}`}>
            {catMeta.label}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={11} /> {blog.readTime}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {blog.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {blog.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${getAvatarColor(blog.authorAvatar)}`}>
              {blog.authorAvatar}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">{blog.author}</p>
              <p className="text-[10px] text-slate-400">{blog.date}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-800 transition-colors">
            Read <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
