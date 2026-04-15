import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import BlogCard from '../components/BlogCard';
import NewsletterBanner from '../components/NewsletterBanner';
import Footer from '../components/Footer';
import { blogs } from '../data/blogs';
import { useToast } from '../context/ToastContext';

const PAGE_SIZE = 6;

export default function HomePage({ onOpenSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToast } = useToast();

  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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
  }, [activeCategory, sortBy]);

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
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar onOpenSearch={onOpenSearch} />
      <Hero />

      <main id="blogs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Latest Articles</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Category filter */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <CategoryFilter
            active={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>

        <div className="border-t border-slate-200 mt-6 mb-8" />

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-slate-700">No articles found</h3>
            <p className="text-slate-400 text-sm mt-1">Try a different category.</p>
            <button
              onClick={() => handleCategoryChange('all')}
              className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Blog grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center mt-10">
            {hasMore ? (
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 text-sm font-semibold px-6 py-2.5 rounded-full shadow-sm transition"
              >
                Load More Articles
              </button>
            ) : (
              <p className="text-sm text-slate-400">
                All {filtered.length} articles loaded
              </p>
            )}
          </div>
        )}

        {/* Newsletter */}
        {filtered.length > 0 && <NewsletterBanner />}
      </main>

      <Footer />
    </div>
  );
}
