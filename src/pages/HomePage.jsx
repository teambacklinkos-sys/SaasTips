import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import NewsletterBanner from '../components/NewsletterBanner';
import Footer from '../components/Footer';
import { fetchBlogs, fetchCategories } from '../lib/api';
import { useToast } from '../context/ToastContext';

const PAGE_SIZE = 6;

export default function HomePage({ onOpenSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToast } = useToast();

  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedBlogs, fetchedCategories] = await Promise.all([
          fetchBlogs(),
          fetchCategories(),
        ]);
        setBlogs(fetchedBlogs);
        setCategories([{ id: 'all', label: 'All Posts', color: 'bg-surface-50 text-surface-700' }, ...fetchedCategories]);
      } catch (err) {
        console.error('Failed to load data:', err);
        // Fallback already handled inside fetchBlogs/fetchCategories
        setBlogs([]);
        setCategories([{ id: 'all', label: 'All Posts', color: 'bg-surface-50 text-surface-700' }]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Sync category from URL (e.g. footer links)
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    if (cat !== activeCategory) {
      setActiveCategory(cat);
      setVisibleCount(PAGE_SIZE);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = blogs;
    if (activeCategory !== 'all') {
      result = result.filter((b) => b.category === activeCategory);
    }
    if (sortBy === 'oldest') result = [...result].reverse();
    return result;
  }, [blogs, activeCategory, sortBy]);

  const featuredBlog = filtered.find((b) => b.featured);
  const restBlogs = filtered.filter((b) => !b.featured);

  // How many non-featured cards to show
  const nonFeaturedVisible = featuredBlog
    ? Math.max(0, visibleCount - 1)
    : visibleCount;
  const visibleRest = restBlogs.slice(0, nonFeaturedVisible);
  const totalVisible = (featuredBlog ? 1 : 0) + visibleRest.length;
  const hasMore = totalVisible < filtered.length;

  const handleLoadMore = () => {
    setVisibleCount((c) => c + 3);
    addToast('3 more articles loaded', 'info');
  };

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setSearchParams(id === 'all' ? {} : { category: id });
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <Navbar onOpenSearch={onOpenSearch} />
      <Hero />

      <main id="blogs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Subtle background element */}
        <div className="absolute top-40 right-[-10%] w-[30%] h-[30%] bg-brand-100/30 rounded-full blur-[100px] pointer-events-none" />

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 relative z-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-surface-900 tracking-tight">Latest Journals</h2>
            <p className="text-[15px] font-medium text-surface-500 mt-2">
              {filtered.length} curated read{filtered.length !== 1 ? 's' : ''} for you
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm border border-surface-200 text-surface-400">
              <SlidersHorizontal size={16} />
            </div>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="text-[14px] font-medium border border-surface-200 rounded-full px-4 py-2 text-surface-700 bg-white hover:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer shadow-sm transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Category filter */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide relative z-10">
          {categories.length > 0 && (
            <div className="flex items-center gap-2.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`text-[13px] font-medium px-5 py-2.5 rounded-full border transition-all duration-300 whitespace-nowrap outline-none
                    ${activeCategory === cat.id
                      ? 'bg-surface-900 text-white border-surface-900 shadow-md shadow-surface-900/20'
                      : 'bg-white text-surface-600 border-surface-200 hover:border-brand-300 hover:text-brand-600 hover:shadow-sm'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-surface-200 mt-8 mb-12 relative z-10 opacity-70" />

        {loading ? (
          <div className="flex justify-center py-20 text-brand-500">
            <Loader2 size={40} className="animate-spin" />
          </div>
        ) : (
          <>
            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-surface-100 shadow-sm relative z-10">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-display font-bold text-surface-900">No articles found</h3>
                <p className="text-surface-500 text-base mt-2 max-w-md mx-auto">We couldn't find anything matching that category. Try selecting another one.</p>
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="mt-6 inline-flex items-center justify-center bg-surface-900 text-white hover:bg-brand-600 font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Blog grid */}
            {filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {featuredBlog && visibleCount >= 1 && (
                  <BlogCard key={featuredBlog.id} blog={featuredBlog} featured />
                )}
                {visibleRest.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}

            {/* Load more */}
            {filtered.length > 0 && (
              <div className="text-center mt-16 relative z-10">
                {hasMore ? (
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 bg-white text-surface-900 border border-surface-200 hover:border-brand-300 hover:text-brand-600 font-semibold text-[15px] px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Discover More
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 bg-surface-50 text-surface-400 font-medium text-[14px] px-6 py-3 rounded-full border border-surface-100">
                    You've reached the end
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Newsletter */}
        {!loading && filtered.length > 0 && (
          <div className="mt-24 relative z-10">
            <NewsletterBanner />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
