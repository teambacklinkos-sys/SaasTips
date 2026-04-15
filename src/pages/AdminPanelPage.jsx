import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { LogOut, Plus, Trash2, Edit2, Eye } from 'lucide-react';
import CreateBlogModal from '../components/modals/CreateBlogModal';
import EditBlogModal from '../components/modals/EditBlogModal';

export default function AdminPanelPage() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load blogs from localStorage (will replace with Supabase later)
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    setLoading(true);
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
    setLoading(false);
  };

  const handleCreateBlog = (newBlog) => {
    const updatedBlogs = [...blogs, { ...newBlog, id: Date.now() }];
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setShowCreateModal(false);
  };

  const handleUpdateBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map(blog => 
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setShowEditModal(false);
    setSelectedBlog(null);
  };

  const handleDeleteBlog = (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      const updatedBlogs = blogs.filter(blog => blog.id !== id);
      setBlogs(updatedBlogs);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Blog Manager</h1>
              <p className="text-slate-400 mt-1">Create, edit, and manage your blog posts</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <Plus size={20} />
            Create New Blog
          </button>
        </div>

        {/* Blogs List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
            <p className="text-slate-400 text-lg">No blogs yet. Create your first blog post!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                    <p className="text-slate-400 line-clamp-2 mb-4">{blog.description}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>Category: {blog.category}</span>
                      <span>•</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedBlog(blog);
                        setShowEditModal(true);
                      }}
                      className="bg-slate-700 hover:bg-slate-600 text-blue-400 p-2 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="bg-slate-700 hover:bg-slate-600 text-red-400 p-2 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <a
                      href={`/blog/${blog.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-700 hover:bg-slate-600 text-green-400 p-2 rounded-lg transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateBlogModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateBlog}
        />
      )}
      {showEditModal && selectedBlog && (
        <EditBlogModal
          blog={selectedBlog}
          onClose={() => {
            setShowEditModal(false);
            setSelectedBlog(null);
          }}
          onUpdate={handleUpdateBlog}
        />
      )}
    </div>
  );
}
