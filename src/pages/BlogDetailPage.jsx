import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';
import NewsletterBanner from '../components/NewsletterBanner';
import Footer from '../components/Footer';
import { blogs, getCategoryMeta, getRelatedPosts } from '../data/blogs';
import { useModal } from '../context/ModalContext';

const avatarColors = [
  'bg-blue-500', 'bg-violet-500', 'bg-emerald-500',
  'bg-amber-500', 'bg-rose-500', 'bg-cyan-500', 'bg-orange-500',
];
function getAvatarColor(initials) {
  return avatarColors[initials.charCodeAt(0) % avatarColors.length];
}

function BlogBodyRenderer({ body }) {
  return (
    <div className="space-y-0">
      {body.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={i} className="text-slate-700 leading-relaxed text-base mb-5">
                {block.text}
              </p>
            );
          case 'heading':
            return (
              <h2 key={i} className="text-xl font-bold text-slate-900 mt-9 mb-3">
                {block.text}
              </h2>
            );
          case 'list':
            return (
              <ul key={i} className="mb-5 space-y-2 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-slate-700 text-base leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case 'callout':
            return (
              <div key={i} className="my-6 border-l-4 border-blue-500 bg-blue-50 px-5 py-4 rounded-r-xl">
                <p className="text-sm text-blue-900 leading-relaxed font-medium">{block.text}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function BlogDetailPage({ onOpenSearch }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar onOpenSearch={onOpenSearch} />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="text-6xl mb-6">📭</div>
          <h1 className="text-2xl font-extrabold text-slate-900">Article not found</h1>
          <p className="text-slate-500 mt-2 mb-6">This article may have been removed or the link is broken.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-blue-700 transition">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const catMeta = getCategoryMeta(blog.category);
  const related = getRelatedPosts(blog.id, blog.category, 3);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = () => {
    openModal('share', { title: blog.title, url: shareUrl });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar onOpenSearch={onOpenSearch} />

      {/* Article */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition mb-8"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${catMeta.color}`}>
            {catMeta.label}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={12} /> {blog.readTime}
          </span>
          <span className="text-xs text-slate-400">{blog.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
          {blog.title}
        </h1>

        {/* Author row */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold ${getAvatarColor(blog.authorAvatar)}`}>
              {blog.authorAvatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{blog.author}</p>
              <p className="text-xs text-slate-400">{blog.authorRole}</p>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 border border-slate-200 px-4 py-2 rounded-full hover:border-blue-300 hover:text-blue-600 transition"
          >
            <Share2 size={15} /> Share
          </button>
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden mb-10 bg-slate-100 max-h-96">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover max-h-96"
          />
        </div>

        {/* Body */}
        <article className="prose-slate max-w-none">
          {blog.body ? (
            <BlogBodyRenderer body={blog.body} />
          ) : (
            <p className="text-slate-500">Content coming soon.</p>
          )}
        </article>

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
          <Tag size={14} className="text-slate-400" />
          {blog.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom share */}
        <div className="mt-8 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-slate-900">Found this helpful?</p>
            <p className="text-xs text-slate-400 mt-0.5">Share it with your network.</p>
          </div>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
          >
            <Share2 size={15} /> Share Article
          </button>
        </div>
      </main>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterBanner />
      </div>

      <Footer />
    </div>
  );
}
