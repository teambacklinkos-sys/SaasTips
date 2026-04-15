import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, Share2, Tag, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';
import NewsletterBanner from '../components/NewsletterBanner';
import Footer from '../components/Footer';
import { fetchBlogById, fetchRelatedBlogs, fetchCategories } from '../lib/api';
import { useModal } from '../context/ModalContext';

const avatarColors = [
  'bg-blue-500', 'bg-violet-500', 'bg-brand-500',
  'bg-amber-500', 'bg-rose-500', 'bg-cyan-500', 'bg-orange-500',
];
function getAvatarColor(initials) {
  if (!initials) return avatarColors[0];
  return avatarColors[initials.charCodeAt(0) % avatarColors.length];
}

function BlogBodyRenderer({ body }) {
  if (!body) return null;
  return (
    <div className="space-y-6">
      {body.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={i} className="text-surface-700 leading-[1.8] text-[18px]">
                {block.text}
              </p>
            );
          case 'heading':
            return (
              <h2 key={i} className="text-2xl font-display font-bold text-surface-900 mt-12 mb-4 tracking-tight">
                {block.text}
              </h2>
            );
          case 'list':
            return (
              <ul key={i} className="mb-6 space-y-3 pl-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4 text-surface-700 text-[18px] leading-[1.8]">
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-brand-500 shadow-sm shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case 'callout':
            return (
              <div key={i} className="my-10 border-l-[3px] border-brand-500 bg-brand-50/50 px-6 py-5 rounded-r-2xl">
                <p className="text-[17px] text-surface-800 leading-relaxed font-medium">{block.text}</p>
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
  
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [catMeta, setCatMeta] = useState({ label: 'Blog', color: 'bg-surface-100 text-surface-700' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const fetchedBlog = await fetchBlogById(Number(id));
      if (fetchedBlog) {
        setBlog(fetchedBlog);
        const [fetchedRelated, cats] = await Promise.all([
          fetchRelatedBlogs(fetchedBlog.id, fetchedBlog.category, 3),
          fetchCategories()
        ]);
        setRelated(fetchedRelated);
        
        const categoryData = cats.find(c => c.id === fetchedBlog.category);
        if (categoryData) {
          setCatMeta(categoryData);
        }
      }
      setLoading(false);
    }
    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFB] flex flex-col">
        <Navbar onOpenSearch={onOpenSearch} />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={40} className="animate-spin text-brand-500" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#FAFAFB] flex flex-col">
        <Navbar onOpenSearch={onOpenSearch} />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="text-[80px] mb-6 drop-shadow-sm">📭</div>
          <h1 className="text-3xl font-display font-extrabold text-surface-900">Article not found</h1>
          <p className="text-surface-500 mt-3 mb-8 text-lg">This article may have been removed or the link is broken.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-brand-700 shadow-md transition-all hover:-translate-y-0.5">
            <ArrowLeft size={18} /> Back to Journal
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = () => {
    openModal('share', { title: blog.title, url: shareUrl });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <Navbar onOpenSearch={onOpenSearch} />

      {/* Article */}
      <main className="max-w-[700px] mx-auto px-4 sm:px-6 py-20 lg:py-28">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-surface-500 hover:text-brand-600 transition mb-10"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full ${catMeta.color} bg-opacity-10 backdrop-blur-sm border border-current/10`}>
            {catMeta.label}
          </span>
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-surface-500 bg-surface-100 px-3 py-1.5 rounded-full">
            <Clock size={14} /> {blog.readTime}
          </span>
          <span className="text-[13px] font-medium text-surface-400 pl-2 border-l border-surface-200">{blog.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-display font-extrabold text-surface-900 leading-[1.1] tracking-tight mb-8">
          {blog.title}
        </h1>

        {/* Author row */}
        <div className="flex items-center justify-between mb-10 pb-8 border-b border-surface-200">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${getAvatarColor(blog.authorAvatar)}`}>
              {blog.authorAvatar}
            </div>
            <div>
              <p className="text-[15px] font-bold text-surface-900">{blog.author}</p>
              <p className="text-[13px] font-medium text-surface-500">{blog.authorRole}</p>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-surface-600 border border-surface-200 bg-white shadow-sm px-5 py-2.5 rounded-full hover:border-brand-300 hover:text-brand-600 transition-all hover:shadow-md"
          >
            <Share2 size={16} /> Share
          </button>
        </div>

        {/* Hero image */}
        <div className="rounded-3xl overflow-hidden mb-14 bg-surface-100 shadow-premium border border-surface-200/50">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto object-cover max-h-[450px]"
          />
        </div>

        {/* Body */}
        <article className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-a:text-brand-600 pb-10">
          {blog.body ? (
            <BlogBodyRenderer body={blog.body} />
          ) : (
            <p className="text-surface-500">Content coming soon.</p>
          )}
        </article>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-surface-200 flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 text-surface-500 text-[14px] font-medium pr-2">
            <Tag size={16} /> Topics:
          </div>
          {blog.tags?.map((tag) => (
            <span key={tag} className="text-[13px] font-medium bg-white text-surface-600 border border-surface-200 px-4 py-1.5 rounded-full hover:border-brand-300 hover:text-brand-600 transition-colors cursor-pointer shadow-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom share */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between bg-white border border-surface-200 shadow-sm rounded-3xl px-8 py-8 gap-6 text-center sm:text-left">
          <div>
            <p className="text-[18px] font-display font-bold text-surface-900">Found this helpful?</p>
            <p className="text-[14px] font-medium text-surface-500 mt-1">Share it with your network.</p>
          </div>
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white text-[15px] font-semibold px-8 py-3.5 rounded-full transition-all shadow-md hover:-translate-y-0.5"
          >
            <Share2 size={18} /> Share Article
          </button>
        </div>
      </main>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-surface-50 border-t border-surface-200 py-20 relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-brand-100/40 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-display font-bold text-surface-900 mb-10 text-center sm:text-left">Continue Reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((b) => (
                <BlogCard key={b.id} blog={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <NewsletterBanner />
      </div>

      <Footer />
    </div>
  );
}
