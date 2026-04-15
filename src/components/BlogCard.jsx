import { Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCategoryMeta } from '../data/blogs';

const avatarColors = [
  'bg-blue-500', 'bg-violet-500', 'bg-brand-500',
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
        className="group col-span-full bg-white rounded-[2rem] border border-surface-200 overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500 flex flex-col lg:flex-row hover:-translate-y-1"
      >
        <div className="relative lg:w-1/2 h-64 lg:h-auto overflow-hidden bg-surface-100">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/40 via-surface-900/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          <span className="absolute top-5 left-5 text-[11px] font-bold uppercase tracking-widest bg-brand-500 text-white px-3 py-1.5 rounded-full shadow-lg shadow-brand-500/20">
            Featured Post
          </span>
        </div>
        <div className="flex flex-col justify-between p-8 lg:p-10 lg:w-1/2 bg-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full -z-10 opacity-50" />
          <div>
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5 ${catMeta.color} bg-opacity-10 backdrop-blur-sm border border-current/10`}>
              {catMeta.label}
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-surface-900 leading-tight group-hover:text-brand-600 transition-colors">
              {blog.title}
            </h2>
            <p className="mt-4 text-surface-500 text-[17px] leading-relaxed line-clamp-3">
              {blog.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {blog.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium bg-surface-50 text-surface-600 px-3 py-1 rounded-full border border-surface-200 hover:border-surface-300 transition-colors">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-100">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md ${getAvatarColor(blog.authorAvatar)}`}>
                {blog.authorAvatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-surface-900">{blog.author}</p>
                <p className="text-xs text-surface-500">{blog.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 text-sm font-medium text-surface-400">
              <span className="flex items-center gap-1.5 bg-surface-50 px-3 py-1.5 rounded-full"><Clock size={14} /> {blog.readTime}</span>
              <span className="hidden sm:block">{blog.date}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${blog.id}`}
      className="group bg-white rounded-3xl border border-surface-200 overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500 flex flex-col hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden bg-surface-100">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        <div className="absolute top-4 left-4 flex justify-between w-[calc(100%-2rem)]">
          <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md ${catMeta.color} bg-white/90`}>
            {catMeta.label}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
            <Clock size={12} /> {blog.readTime}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-6 relative">
        <h3 className="text-[19px] font-display font-bold text-surface-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2 mt-1">
          {blog.title}
        </h3>
        <p className="mt-3 text-[15px] text-surface-500 leading-relaxed line-clamp-2 flex-1">
          {blog.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {blog.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] font-medium bg-surface-50 text-surface-500 border border-surface-100 px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="text-[11px] font-medium bg-surface-50 text-surface-500 border border-surface-100 px-2.5 py-1 rounded-full">
              +{blog.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 pt-5 border-t border-surface-100">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-sm ${getAvatarColor(blog.authorAvatar)}`}>
              {blog.authorAvatar}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-surface-800">{blog.author}</p>
              <p className="text-[11px] font-medium text-surface-400">{blog.date}</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
