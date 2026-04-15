import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Eye, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import CreateBlogModal from '../components/modals/CreateBlogModal';
import EditBlogModal from '../components/modals/EditBlogModal';
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from '../lib/api';

export default function AdminPanelPage() {
  const [blogs, setBlogs] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Error loading blogs:', err);
      setError('Failed to load blogs. Check your Supabase connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (newBlog) => {
    await createBlog(newBlog);
    await loadBlogs();
    setShowCreateModal(false);
  };

  const handleUpdateBlog = async (updatedBlog) => {
    await updateBlog(updatedBlog.id, updatedBlog);
    await loadBlogs();
    setShowEditModal(false);
    setSelectedBlog(null);
  };

  const handleDeleteBlog = async (id) => {
    if (confirm('Delete this blog post? This cannot be undone.')) {
      try {
        await deleteBlog(id);
        await loadBlogs();
      } catch (err) {
        console.error('Error deleting blog:', err);
        alert('Failed to delete blog. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Blog Manager</h1>
              <p className="text-xs text-slate-500">{blogs.length} post{blogs.length !== 1 ? 's' : ''} published</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
          >
            <Plus size={16} />
            New Post
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-8 h-8 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-500">Loading posts...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
            <AlertCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-red-800">Connection Error</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
            <button
              onClick={loadBlogs}
              className="flex items-center gap-1.5 text-sm font-medium text-red-700 hover:text-red-900 transition-colors"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-16 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">No posts yet</h3>
            <p className="text-slate-500 text-sm mb-6">Create your first blog post to get started</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              <Plus size={16} />
              Create First Post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover shrink-0 bg-slate-100"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 shrink-0 flex items-center justify-center">
                      <FileText size={20} className="text-blue-400" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-900 truncate">{blog.title}</h3>
                      <span className="shrink-0 text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">
                        {blog.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{blog.excerpt}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                      {blog.author && <span>By {blog.author}</span>}
                      {blog.author && blog.date && <span>·</span>}
                      {blog.date && <span>{blog.date}</span>}
                      {blog.readTime && <><span>·</span><span>{blog.readTime}</span></>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => { setSelectedBlog(blog); setShowEditModal(true); }}
                      className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <a
                      href={`/blog/${blog.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-500 hover:text-green-600 hover:bg-green-50 transition-colors"
                      title="View live"
                    >
                      <Eye size={16} />
                    </a>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateBlogModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateBlog}
        />
      )}
      {showEditModal && selectedBlog && (
        <EditBlogModal
          blog={selectedBlog}
          onClose={() => { setShowEditModal(false); setSelectedBlog(null); }}
          onUpdate={handleUpdateBlog}
        />
      )}
    </div>
  );
}
